import express, { Request, Response } from 'express';
import crypto from 'crypto';
import { body, query, validationResult } from 'express-validator';
import Visitor from '../models/Visitor.model.js';
import { authenticate, AuthRequest } from '../middleware/auth.middleware.js';

const router = express.Router();

const getClientIp = (req: Request): string => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].trim();
  }
  return req.ip || req.socket.remoteAddress || 'unknown';
};

// Track visitor (public endpoint)
router.post('/track', [
  body('path').optional().isString().isLength({ min: 1, max: 2048 }),
  body('referer').optional().isString().isLength({ max: 2048 }),
  body('sessionId').optional().isString().isLength({ min: 8, max: 128 }).matches(/^[a-zA-Z0-9._:-]+$/),
  body('duration').optional().isInt({ min: 0, max: 86400 }),
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { path: requestPath, referer, sessionId, duration } = req.body as {
      path?: string;
      referer?: string;
      sessionId?: string;
      duration?: number;
    };
    const ip = getClientIp(req);
    const userAgent = typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : 'unknown';
    const resolvedPath = requestPath && requestPath.startsWith('/') ? requestPath : '/';
    const resolvedSessionId = sessionId || crypto.randomUUID();
    const resolvedDuration = Number.isFinite(Number(duration)) ? Number(duration) : undefined;

    // Parse user agent (simple parsing)
    const device = /Mobile|Android|iPhone|iPad/.test(userAgent) ? 'Mobile' : 'Desktop';
    const browser = userAgent.includes('Chrome') ? 'Chrome' :
                   userAgent.includes('Firefox') ? 'Firefox' :
                   userAgent.includes('Safari') ? 'Safari' :
                   userAgent.includes('Edge') ? 'Edge' : 'Other';
    const os = userAgent.includes('Windows') ? 'Windows' :
              userAgent.includes('Mac') ? 'macOS' :
              userAgent.includes('Android') ? 'Android' :
              userAgent.includes('Linux') ? 'Linux' :
              userAgent.includes('iOS') ? 'iOS' : 'Other';

    // Check if this is a new visitor (by IP and session)
    const existingVisitor = await Visitor.findOne({
      ip,
      sessionId: resolvedSessionId,
      visitedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24 hours
    });

    const visitor = new Visitor({
      ip,
      userAgent,
      referer: referer || req.headers.referer || undefined,
      path: resolvedPath,
      device,
      browser,
      os,
      isNewVisitor: !existingVisitor,
      sessionId: resolvedSessionId,
      visitedAt: new Date(),
      duration: resolvedDuration,
    });

    await visitor.save();

    res.json({ 
      success: true, 
      sessionId: visitor.sessionId,
      isNewVisitor: visitor.isNewVisitor 
    });
  } catch (error: any) {
    console.error('Visitor tracking error:', error);
    res.status(500).json({ success: false, message: 'Failed to track visitor' });
  }
});

// Get visitor analytics (admin only)
router.get('/analytics', authenticate, [
  query('period').optional().isIn(['24h', '7d', '30d', '90d']),
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    const { period = '7d' } = req.query;
    
    let startDate = new Date();
    switch (period) {
      case '24h':
        startDate.setHours(startDate.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      default:
        startDate.setDate(startDate.getDate() - 7);
    }

    // Total visitors
    const totalVisitors = await Visitor.countDocuments({ visitedAt: { $gte: startDate } });
    
    // New visitors
    const newVisitors = await Visitor.countDocuments({ 
      visitedAt: { $gte: startDate },
      isNewVisitor: true 
    });

    // Unique visitors (by IP)
    const uniqueVisitors = await Visitor.distinct('ip', { visitedAt: { $gte: startDate } });

    // Top pages
    const topPages = await Visitor.aggregate([
      { $match: { visitedAt: { $gte: startDate } } },
      { $group: { _id: '$path', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    // Visitors by device
    const deviceStats = await Visitor.aggregate([
      { $match: { visitedAt: { $gte: startDate } } },
      { $group: { _id: '$device', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Visitors by browser
    const browserStats = await Visitor.aggregate([
      { $match: { visitedAt: { $gte: startDate } } },
      { $group: { _id: '$browser', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // Hourly visitors (last 24 hours)
    const hourlyStats = await Visitor.aggregate([
      { 
        $match: { 
          visitedAt: { 
            $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) 
          } 
        } 
      },
      {
        $group: {
          _id: { $hour: '$visitedAt' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      period,
      totalVisitors,
      newVisitors,
      returningVisitors: totalVisitors - newVisitors,
      uniqueVisitors: uniqueVisitors.length,
      topPages,
      deviceStats,
      browserStats,
      hourlyStats,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get recent visitors (admin only)
router.get('/recent', authenticate, [
  query('limit').optional().isInt({ min: 1, max: 100 }),
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    const { limit = 50 } = req.query;
    const limitNumber = Math.min(Math.max(Number(limit) || 50, 1), 100);
    const visitors = await Visitor.find()
      .sort({ visitedAt: -1 })
      .limit(limitNumber)
      .select('-__v');

    res.json(visitors);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

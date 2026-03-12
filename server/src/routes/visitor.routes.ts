import express, { Request, Response } from 'express';
import Visitor from '../models/Visitor.model.js';
import { authenticate, AuthRequest } from '../middleware/auth.middleware.js';

const router = express.Router();

// Track visitor (public endpoint)
router.post('/track', async (req: Request, res: Response) => {
  try {
    const { path, referer, sessionId, duration } = req.body;
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Parse user agent (simple parsing)
    const device = /Mobile|Android|iPhone|iPad/.test(userAgent) ? 'Mobile' : 'Desktop';
    const browser = userAgent.includes('Chrome') ? 'Chrome' :
                   userAgent.includes('Firefox') ? 'Firefox' :
                   userAgent.includes('Safari') ? 'Safari' :
                   userAgent.includes('Edge') ? 'Edge' : 'Other';
    const os = userAgent.includes('Windows') ? 'Windows' :
              userAgent.includes('Mac') ? 'macOS' :
              userAgent.includes('Linux') ? 'Linux' :
              userAgent.includes('Android') ? 'Android' :
              userAgent.includes('iOS') ? 'iOS' : 'Other';

    // Check if this is a new visitor (by IP and session)
    const existingVisitor = await Visitor.findOne({
      ip: ip.toString(),
      sessionId,
      visitedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24 hours
    });

    const visitor = new Visitor({
      ip: ip.toString(),
      userAgent,
      referer: referer || req.headers.referer || undefined,
      path: path || '/',
      device,
      browser,
      os,
      isNewVisitor: !existingVisitor,
      sessionId: sessionId || `session_${Date.now()}_${Math.random()}`,
      visitedAt: new Date(),
      duration,
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
router.get('/analytics', authenticate, async (req: AuthRequest, res: Response) => {
  try {
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
router.get('/recent', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { limit = 50 } = req.query;
    const visitors = await Visitor.find()
      .sort({ visitedAt: -1 })
      .limit(Number(limit))
      .select('-__v');

    res.json(visitors);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;


import express, { Request, Response } from 'express';
import Visitor from '../models/Visitor.model.js';
import { requireAdmin, verifyFirebaseToken, type FirebaseAuthRequest } from '../middleware/firebaseAuth.middleware.js';

const router = express.Router();

const clampDays = (value: unknown, fallback: number) => {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
    return fallback;
  }

  return Math.min(Math.floor(parsedValue), 365);
};

const getPeriodStart = (days: number) => {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - (days - 1));
  return startDate;
};

const buildDateKey = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const buildLabel = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const buildDailySeries = (
  days: number,
  rawStats: Array<{ _id: { year: number; month: number; day: number }; count: number }>,
) => {
  const counts = new Map<string, number>();

  rawStats.forEach((item) => {
    const rawDate = new Date(Date.UTC(item._id.year, item._id.month - 1, item._id.day));
    counts.set(buildDateKey(rawDate), item.count);
  });

  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (days - index - 1));

    return {
      date: buildLabel(date),
      count: counts.get(buildDateKey(date)) || 0,
    };
  });
};

const getVisitorSummary = async (days: number) => {
  const startDate = getPeriodStart(days);

  const [totalVisits, uniqueVisitors, topPagesRaw, deviceStatsRaw, durationRaw, dailyStatsRaw] = await Promise.all([
    Visitor.countDocuments({ visitedAt: { $gte: startDate } }),
    Visitor.distinct('ip', { visitedAt: { $gte: startDate } }),
    Visitor.aggregate([
      { $match: { visitedAt: { $gte: startDate } } },
      { $group: { _id: '$path', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]) as Promise<Array<{ _id: string; count: number }>>,
    Visitor.aggregate([
      { $match: { visitedAt: { $gte: startDate } } },
      { $group: { _id: '$device', count: { $sum: 1 } } },
    ]) as Promise<Array<{ _id: string | null; count: number }>>,
    Visitor.aggregate([
      { $match: { visitedAt: { $gte: startDate }, duration: { $gt: 0 } } },
      { $group: { _id: null, avgDuration: { $avg: '$duration' } } },
    ]) as Promise<Array<{ _id: null; avgDuration: number }>>,
    Visitor.aggregate([
      { $match: { visitedAt: { $gte: startDate } } },
      {
        $group: {
          _id: {
            year: { $year: '$visitedAt' },
            month: { $month: '$visitedAt' },
            day: { $dayOfMonth: '$visitedAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
    ]) as Promise<Array<{ _id: { year: number; month: number; day: number }; count: number }>>,
  ]);

  const deviceBreakdown = {
    mobile: 0,
    desktop: 0,
    tablet: 0,
  };

  deviceStatsRaw.forEach((item) => {
    const normalizedDevice = (item._id || '').toLowerCase();

    if (normalizedDevice.includes('tablet') || normalizedDevice.includes('ipad')) {
      deviceBreakdown.tablet += item.count;
    } else if (normalizedDevice.includes('mobile')) {
      deviceBreakdown.mobile += item.count;
    } else {
      deviceBreakdown.desktop += item.count;
    }
  });

  return {
    totalVisits,
    totalUnique: uniqueVisitors.length,
    avgDuration: Math.round(durationRaw[0]?.avgDuration || 0),
    topPages: topPagesRaw.map((page) => ({ path: page._id, count: page.count })),
    deviceBreakdown,
    dailyStats: buildDailySeries(days, dailyStatsRaw),
  };
};

router.post('/track', async (req: Request, res: Response) => {
  try {
    const { path, referer, sessionId, duration } = req.body as {
      path?: string;
      referer?: string;
      sessionId?: string;
      duration?: number;
    };

    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    const device = /Mobile|Android|iPhone|iPad/.test(userAgent) ? 'Mobile' : 'Desktop';
    const browser = userAgent.includes('Chrome')
      ? 'Chrome'
      : userAgent.includes('Firefox')
        ? 'Firefox'
        : userAgent.includes('Safari')
          ? 'Safari'
          : userAgent.includes('Edge')
            ? 'Edge'
            : 'Other';
    const os = userAgent.includes('Windows')
      ? 'Windows'
      : userAgent.includes('Mac')
        ? 'macOS'
        : userAgent.includes('Linux')
          ? 'Linux'
          : userAgent.includes('Android')
            ? 'Android'
            : userAgent.includes('iOS')
              ? 'iOS'
              : 'Other';

    const existingVisitor = await Visitor.findOne({
      ip: ip.toString(),
      sessionId,
      visitedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
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

    return res.json({
      success: true,
      sessionId: visitor.sessionId,
      isNewVisitor: visitor.isNewVisitor,
    });
  } catch (error) {
    console.error('Visitor tracking error:', error);
    return res.status(500).json({ success: false, message: 'Failed to track visitor' });
  }
});

router.get('/stats', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const days = clampDays(req.query.days, 30);
    const summary = await getVisitorSummary(days);

    return res.json({
      totalVisitors: summary.totalVisits,
      uniqueVisitors: summary.totalUnique,
      avgDuration: summary.avgDuration,
      topPage: summary.topPages[0]?.path || null,
      dailyStats: summary.dailyStats,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: 'Server error', error: message });
  }
});

router.get('/analytics', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const days = clampDays(req.query.days, 30);
    const summary = await getVisitorSummary(days);

    return res.json(summary);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: 'Server error', error: message });
  }
});

router.get('/recent', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const limit = Math.min(Math.max(Number(req.query.limit || 50), 1), 100);
    const visitors = await Visitor.find()
      .sort({ visitedAt: -1 })
      .limit(limit)
      .select('-__v');

    return res.json(visitors);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: 'Server error', error: message });
  }
});

export default router;

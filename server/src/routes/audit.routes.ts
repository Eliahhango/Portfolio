import express, { Response } from 'express';
import { authenticate, requireMainAdmin, AuthRequest } from '../middleware/auth.middleware.js';
import Audit from '../models/Audit.model.js';

const router = express.Router();

router.get('/', authenticate, requireMainAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { limit = 50, page = 1 } = req.query;
    const l = Math.min(Number(limit), 200);
    const p = Math.max(Number(page), 1);
    const skip = (p - 1) * l;
    const [items, total] = await Promise.all([
      Audit.find().sort({ createdAt: -1 }).limit(l).skip(skip),
      Audit.countDocuments()
    ]);
    res.json({ items, pagination: { page: p, limit: l, total, pages: Math.ceil(total / l) } });
  } catch (e: any) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

export default router;



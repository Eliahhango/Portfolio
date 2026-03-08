import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import crypto from 'crypto';
import Newsletter from '../models/Newsletter.model.js';
import { requireAdmin, verifyFirebaseToken, type FirebaseAuthRequest } from '../middleware/firebaseAuth.middleware.js';

const router = express.Router();

router.get('/subscribers', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const { confirmed, page = '1', limit = '20' } = req.query as {
      confirmed?: string;
      page?: string;
      limit?: string;
    };

    const query: { confirmed?: boolean } = {};

    if (confirmed === 'true') {
      query.confirmed = true;
    } else if (confirmed === 'false') {
      query.confirmed = false;
    }

    const numericLimit = Math.min(Math.max(Number(limit), 1), 100);
    const numericPage = Math.max(Number(page), 1);
    const skip = (numericPage - 1) * numericLimit;

    const [subscribers, total, confirmedCount] = await Promise.all([
      Newsletter.find(query).sort({ createdAt: -1 }).skip(skip).limit(numericLimit),
      Newsletter.countDocuments(query),
      Newsletter.countDocuments({ confirmed: true }),
    ]);

    return res.json({
      subscribers,
      pagination: {
        page: numericPage,
        limit: numericLimit,
        total,
        pages: Math.ceil(total / numericLimit),
      },
      confirmedCount,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: 'Server error', error: message });
  }
});

router.get('/subscribers/count', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const count = await Newsletter.countDocuments({ confirmed: true });
    return res.json({ count });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: 'Server error', error: message });
  }
});

router.post(
  '/subscribe',
  [body('email').isEmail().normalizeEmail().withMessage('Valid email required')],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email } = req.body as { email: string };
    const token = crypto.randomBytes(16).toString('hex');
    const siteUrl = process.env.SITE_URL || 'https://www.elitechwiz.site';
    const confirmUrl = `${siteUrl}/newsletter/confirm/${token}`;

    const existing = await Newsletter.findOne({ email });

    if (existing) {
      if (!existing.confirmed) {
        existing.token = token;
        await existing.save();
      }

      return res.json({ success: true, message: 'Check your email to confirm subscription.', confirmUrl });
    }

    await Newsletter.create({ email, token, confirmed: false });
    return res.json({ success: true, message: 'Check your email to confirm subscription.', confirmUrl });
  },
);

router.post(
  '/confirm',
  [body('token').isString().isLength({ min: 10 })],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { token } = req.body as { token: string };
    const subscription = await Newsletter.findOne({ token });

    if (!subscription) {
      return res.status(404).json({ success: false, message: 'Invalid token' });
    }

    subscription.confirmed = true;
    subscription.confirmedAt = new Date();
    await subscription.save();

    return res.json({ success: true, message: 'Subscription confirmed' });
  },
);

router.delete('/subscribers/:id', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const subscriber = await Newsletter.findByIdAndDelete(req.params.id);

    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    return res.json({ message: 'Subscriber deleted' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: 'Server error', error: message });
  }
});

export default router;

import express, { Request, Response } from 'express';
import { body, validationResult, query } from 'express-validator';
import crypto from 'crypto';
import Newsletter from '../models/Newsletter.model.js';

const router = express.Router();

router.post('/subscribe', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required')
], async (req: Request, res: Response) => {
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
    // refresh token if not confirmed
    if (!existing.confirmed) {
      existing.token = token;
      await existing.save();
    }
    return res.json({ success: true, message: 'Check your email to confirm subscription.', confirmUrl });
  }

  await Newsletter.create({ email, token, confirmed: false });
  // TODO: integrate email service (Resend/SES) to send confirmUrl
  return res.json({ success: true, message: 'Check your email to confirm subscription.', confirmUrl });
});

router.post('/confirm', [
  body('token').isString().isLength({ min: 10 })
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { token } = req.body as { token: string };
  const sub = await Newsletter.findOne({ token });
  if (!sub) return res.status(404).json({ success: false, message: 'Invalid token' });
  sub.confirmed = true;
  sub.confirmedAt = new Date();
  await sub.save();
  return res.json({ success: true, message: 'Subscription confirmed' });
});

export default router;



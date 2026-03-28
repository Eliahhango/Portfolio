import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import crypto from 'crypto';
import Newsletter from '../models/Newsletter.model.js';

const router = express.Router();

const hashToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

router.post('/subscribe', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required')
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { email } = req.body as { email: string };
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = hashToken(token);
  const siteUrl = process.env.SITE_URL || 'https://www.elitechwiz.site';
  const confirmUrl = `${siteUrl}/newsletter/confirm/${token}`;

  const existing = await Newsletter.findOne({ email });
  if (existing) {
    // refresh token if not confirmed
    if (!existing.confirmed) {
      existing.token = hashedToken;
      await existing.save();
    }
    return res.json({ success: true, message: 'Check your email to confirm subscription.' });
  }

  await Newsletter.create({ email, token: hashedToken, confirmed: false });
  // TODO: integrate email service (Resend/SES) to send confirmUrl
  const response: { success: true; message: string; confirmUrl?: string } = {
    success: true,
    message: 'Check your email to confirm subscription.',
  };
  if (process.env.NODE_ENV !== 'production') {
    response.confirmUrl = confirmUrl;
  }
  return res.json(response);
});

router.post('/confirm', [
  body('token').isString().matches(/^[a-fA-F0-9]{32,128}$/).withMessage('Invalid token format')
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { token } = req.body as { token: string };
  const hashedToken = hashToken(token);
  const sub = await Newsletter.findOne({ $or: [{ token: hashedToken }, { token }] });
  if (!sub) return res.status(404).json({ success: false, message: 'Invalid token' });
  sub.confirmed = true;
  sub.confirmedAt = new Date();
  // Rotate token after confirmation so confirmation links are one-time use.
  sub.token = hashToken(crypto.randomBytes(32).toString('hex'));
  await sub.save();
  return res.json({ success: true, message: 'Subscription confirmed' });
});

export default router;


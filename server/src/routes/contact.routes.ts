import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import ContactMessage, { type IContactMessage } from '../models/ContactMessage.model.js';
import { requireAdmin, verifyFirebaseToken, type FirebaseAuthRequest } from '../middleware/firebaseAuth.middleware.js';

const router = express.Router();

router.post(
  '/submit',
  [
    body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('phone').optional().trim().isLength({ max: 20 }).withMessage('Phone must be less than 20 characters'),
    body('subject').trim().isLength({ min: 3, max: 200 }).withMessage('Subject must be 3-200 characters'),
    body('message').trim().isLength({ min: 10, max: 5000 }).withMessage('Message must be 10-5000 characters'),
    body('turnstileToken').isString().withMessage('Captcha token is required'),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array(),
        });
      }

      const { name, email, phone, subject, message, turnstileToken } = req.body as {
        name: string;
        email: string;
        phone?: string;
        subject: string;
        message: string;
        turnstileToken: string;
      };

      const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
      const userAgent = req.headers['user-agent'] || 'unknown';

      const secret = process.env.TURNSTILE_SECRET;

      if (!secret) {
        console.warn('TURNSTILE_SECRET not set - skipping verification');
      } else {
        const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            secret,
            response: turnstileToken,
            remoteip: typeof ip === 'string' ? ip : '',
          }).toString(),
        });

        const outcome = (await verifyRes.json()) as { success?: boolean };

        if (!outcome.success) {
          return res.status(400).json({ success: false, message: 'Captcha verification failed' });
        }
      }

      const recentSubmission = await ContactMessage.findOne({
        $or: [
          { email, createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) } },
          { ip: ip.toString(), createdAt: { $gte: new Date(Date.now() - 15 * 60 * 1000) } },
        ],
      });

      if (recentSubmission) {
        return res.status(429).json({
          success: false,
          message: 'Please wait before submitting another message',
        });
      }

      const contactMessage = new ContactMessage({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || undefined,
        subject: subject.trim(),
        message: message.trim(),
        ip: ip.toString(),
        userAgent,
        status: 'new',
      });

      await contactMessage.save();

      return res.status(201).json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
        id: contactMessage._id,
      });
    } catch (error) {
      console.error('Contact submission error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to submit message. Please try again later.',
      });
    }
  },
);

router.get('/', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const { status, limit = '50', page = '1' } = req.query as {
      status?: string;
      limit?: string;
      page?: string;
    };

    const query: { status?: IContactMessage['status'] } = {};

    if (status && ['new', 'read', 'replied', 'archived'].includes(status)) {
      query.status = status as IContactMessage['status'];
    }

    const numericLimit = Math.max(Number(limit), 1);
    const numericPage = Math.max(Number(page), 1);
    const skip = (numericPage - 1) * numericLimit;

    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .limit(numericLimit)
      .skip(skip);

    const total = await ContactMessage.countDocuments(query);
    const unreadCount = await ContactMessage.countDocuments({ status: 'new' });

    return res.json({
      messages,
      pagination: {
        page: numericPage,
        limit: numericLimit,
        total,
        pages: Math.ceil(total / numericLimit),
      },
      unreadCount,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: 'Server error', error: message });
  }
});

router.get('/:id', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    if (message.status === 'new') {
      message.status = 'read';
      await message.save();
    }

    return res.json(message);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: 'Server error', error: message });
  }
});

router.patch(
  '/:id/status',
  verifyFirebaseToken,
  requireAdmin,
  [
    body('status').isIn(['new', 'read', 'replied', 'archived']).withMessage('Invalid status'),
    body('notes').optional().trim().isLength({ max: 1000 }).withMessage('Notes must be less than 1000 characters'),
  ],
  async (req: FirebaseAuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { status, notes } = req.body as {
        status: IContactMessage['status'];
        notes?: string;
      };

      const message = await ContactMessage.findById(req.params.id);

      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }

      message.status = status;

      if (typeof notes === 'string') {
        message.notes = notes;
      }

      if (status === 'replied' && !message.repliedAt) {
        message.repliedAt = new Date();
        message.repliedBy = req.firebaseUser?.uid;
      }

      await message.save();

      return res.json({ message: 'Status updated', contactMessage: message });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({ message: 'Server error', error: message });
    }
  },
);

router.delete('/:id', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    return res.json({ message: 'Message deleted' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: 'Server error', error: message });
  }
});

export default router;

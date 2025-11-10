import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import ContactMessage from '../models/ContactMessage.model.js';
import { authenticate, AuthRequest } from '../middleware/auth.middleware.js';

const router = express.Router();

// Submit contact form (public)
router.post('/submit', [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().trim().isLength({ max: 20 }).withMessage('Phone must be less than 20 characters'),
  body('subject').trim().isLength({ min: 3, max: 200 }).withMessage('Subject must be 3-200 characters'),
  body('message').trim().isLength({ min: 10, max: 5000 }).withMessage('Message must be 10-5000 characters'),
], async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { name, email, phone, subject, message } = req.body;
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Check for spam (same email/IP submitting multiple times in short period)
    const recentSubmission = await ContactMessage.findOne({
      $or: [
        { email, createdAt: { $gte: new Date(Date.now() - 60 * 60 * 1000) } }, // Last hour
        { ip: ip.toString(), createdAt: { $gte: new Date(Date.now() - 15 * 60 * 1000) } } // Last 15 minutes
      ]
    });

    if (recentSubmission) {
      return res.status(429).json({ 
        success: false,
        message: 'Please wait before submitting another message' 
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

    res.status(201).json({ 
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      id: contactMessage._id
    });
  } catch (error: any) {
    console.error('Contact submission error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to submit message. Please try again later.' 
    });
  }
});

// Get all messages (admin only)
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    const query: any = {};
    
    if (status && ['new', 'read', 'replied', 'archived'].includes(status as string)) {
      query.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);
    
    const messages = await ContactMessage.find(query)
      .populate('repliedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip(skip);

    const total = await ContactMessage.countDocuments(query);
    const unreadCount = await ContactMessage.countDocuments({ status: 'new' });

    res.json({
      messages,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
      unreadCount,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single message (admin only)
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const message = await ContactMessage.findById(req.params.id)
      .populate('repliedBy', 'name email');

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Mark as read if it's new
    if (message.status === 'new') {
      message.status = 'read';
      await message.save();
    }

    res.json(message);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update message status (admin only)
router.patch('/:id/status', authenticate, [
  body('status').isIn(['new', 'read', 'replied', 'archived']).withMessage('Invalid status'),
  body('notes').optional().trim().isLength({ max: 1000 }).withMessage('Notes must be less than 1000 characters'),
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, notes } = req.body;
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    message.status = status;
    if (notes) {
      message.notes = notes;
    }
    if (status === 'replied' && !message.repliedAt) {
      message.repliedAt = new Date();
      message.repliedBy = req.admin?.id as any;
    }

    await message.save();

    res.json({ message: 'Status updated', contactMessage: message });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete message (admin only)
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message deleted' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;


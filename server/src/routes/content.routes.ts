import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate, AuthRequest } from '../middleware/auth.middleware.js';
import Content from '../models/Content.model.js';

const router = express.Router();

// Get all content (public - only active)
router.get('/', async (req: Request, res: Response) => {
  try {
    const content = await Content.find()
      .populate('updatedBy', 'name email')
      .sort({ section: 1, key: 1 });
    res.json(content);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get content by section
router.get('/section/:section', async (req: Request, res: Response) => {
  try {
    const content = await Content.find({ section: req.params.section })
      .populate('updatedBy', 'name email')
      .sort({ key: 1 });
    res.json(content);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single content item
router.get('/:key', async (req: Request, res: Response) => {
  try {
    const content = await Content.findOne({ key: req.params.key })
      .populate('updatedBy', 'name email');
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create or update content (admin only)
router.post('/', authenticate, [
  body('key').trim().notEmpty(),
  body('value').notEmpty(),
  body('section').trim().notEmpty(),
  body('type').optional().isIn(['text', 'html', 'json']),
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { key, value, section, type = 'text' } = req.body;
    
    const content = await Content.findOneAndUpdate(
      { key },
      {
        value,
        section,
        type,
        updatedBy: req.admin?.id,
      },
      { new: true, upsert: true, runValidators: true }
    ).populate('updatedBy', 'name email');

    res.json(content);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Content key already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update content (admin only)
router.put('/:key', authenticate, [
  body('value').notEmpty(),
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const content = await Content.findOneAndUpdate(
      { key: req.params.key },
      {
        value: req.body.value,
        updatedBy: req.admin?.id,
      },
      { new: true, runValidators: true }
    ).populate('updatedBy', 'name email');

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json(content);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete content (admin only)
router.delete('/:key', authenticate, async (req: AuthRequest, res) => {
  try {
    const content = await Content.findOneAndDelete({ key: req.params.key });
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json({ message: 'Content deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;


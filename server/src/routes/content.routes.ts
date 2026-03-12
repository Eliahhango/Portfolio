import express, { Request, Response } from 'express';
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

export default router;

import express, { Request, Response } from 'express';
import Content from '../models/Content.model.js';
import { requireAdmin, verifyFirebaseToken, type FirebaseAuthRequest } from '../middleware/firebaseAuth.middleware.js';

const router = express.Router();

router.get('/admin/all', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const content = await Content.find().sort({ section: 1, key: 1 });
    return res.json(content);
  } catch (error: any) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/admin/bulk', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const { items } = req.body as {
      items?: Array<{
        key: string;
        value: string | Record<string, unknown> | Array<unknown>;
        type?: 'text' | 'html' | 'json';
        section: string;
      }>;
    };

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items array is required' });
    }

    const actorId = req.firebaseUser?.uid || req.adminProfile?.id || 'firebase-admin';
    const operations = items.map((item) => {
      const key = item.key?.trim();
      const section = item.section?.trim();
      const type = item.type || (typeof item.value === 'string' ? 'text' : 'json');

      if (!key || !section || !['text', 'html', 'json'].includes(type)) {
        throw new Error(`Invalid content payload for key "${item.key || 'unknown'}"`);
      }

      return Content.findOneAndUpdate(
        { key },
        {
          key,
          value: item.value,
          type,
          section,
          updatedBy: actorId,
        },
        { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true },
      );
    });

    const updatedItems = await Promise.all(operations);
    return res.json(updatedItems);
  } catch (error: any) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all content (public - only active)
router.get('/', async (req: Request, res: Response) => {
  try {
    const content = await Content.find().sort({ section: 1, key: 1 });
    res.json(content);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get content by section
router.get('/section/:section', async (req: Request, res: Response) => {
  try {
    const content = await Content.find({ section: req.params.section }).sort({ key: 1 });
    res.json(content);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single content item
router.get('/:key', async (req: Request, res: Response) => {
  try {
    const content = await Content.findOne({ key: req.params.key });
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    res.json(content);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

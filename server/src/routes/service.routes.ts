import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Service from '../models/Service.model.js';
import { requireAdmin, verifyFirebaseToken, type FirebaseAuthRequest } from '../middleware/firebaseAuth.middleware.js';

const router = express.Router();

const serviceValidators = [
  body('title').trim().isLength({ min: 2, max: 120 }).withMessage('Title must be 2-120 characters'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description must be 10-1000 characters'),
  body('category').isIn(['cybersecurity', 'development', 'design', 'consulting']).withMessage('Invalid category'),
  body('features').optional().isArray().withMessage('Features must be an array'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
  body('order').optional().isInt({ min: 0, max: 999 }).withMessage('Order must be between 0 and 999'),
  body('pricing.startingAt').optional({ values: 'falsy' }).isFloat({ min: 0 }).withMessage('Starting price must be a positive number'),
  body('pricing.currency').optional({ values: 'falsy' }).trim().isLength({ min: 2, max: 10 }).withMessage('Currency must be 2-10 characters'),
];

const sanitizeFeatures = (value: unknown) => {
  if (!Array.isArray(value)) {
    return [] as string[];
  }

  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim())
    .filter(Boolean);
};

router.get('/admin/all', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    return res.json(services);
  } catch (error: any) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/', verifyFirebaseToken, requireAdmin, serviceValidators, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const actorId = req.firebaseUser?.uid || req.adminProfile?.id || 'firebase-admin';
    const { title, description, category, isActive, order, pricing } = req.body as {
      title: string;
      description: string;
      category: 'cybersecurity' | 'development' | 'design' | 'consulting';
      isActive?: boolean;
      order?: number;
      pricing?: { startingAt?: number; currency?: string };
    };

    const service = await Service.create({
      title: title.trim(),
      description: description.trim(),
      category,
      features: sanitizeFeatures(req.body.features),
      isActive: typeof isActive === 'boolean' ? isActive : true,
      order: typeof order === 'number' ? order : 0,
      pricing: pricing
        ? {
            startingAt: typeof pricing.startingAt === 'number' ? pricing.startingAt : undefined,
            currency: pricing.currency?.trim() || 'USD',
          }
        : undefined,
      createdBy: actorId,
      updatedBy: actorId,
    });

    return res.status(201).json(service);
  } catch (error: any) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/:id', verifyFirebaseToken, requireAdmin, serviceValidators, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const actorId = req.firebaseUser?.uid || req.adminProfile?.id || 'firebase-admin';
    const { title, description, category, isActive, order, pricing } = req.body as {
      title: string;
      description: string;
      category: 'cybersecurity' | 'development' | 'design' | 'consulting';
      isActive?: boolean;
      order?: number;
      pricing?: { startingAt?: number; currency?: string };
    };

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        description: description.trim(),
        category,
        features: sanitizeFeatures(req.body.features),
        isActive: typeof isActive === 'boolean' ? isActive : true,
        order: typeof order === 'number' ? order : 0,
        pricing: pricing
          ? {
              startingAt: typeof pricing.startingAt === 'number' ? pricing.startingAt : undefined,
              currency: pricing.currency?.trim() || 'USD',
            }
          : undefined,
        updatedBy: actorId,
      },
      { new: true, runValidators: true },
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    return res.json(service);
  } catch (error: any) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.delete('/:id', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    return res.json({ message: 'Service deleted' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all services (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single service
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

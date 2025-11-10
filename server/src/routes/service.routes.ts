import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate, AuthRequest } from '../middleware/auth.middleware.js';
import Service from '../models/Service.model.js';

const router = express.Router();

// Get all services (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const services = await Service.find({ isActive: true })
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort({ order: 1, createdAt: -1 });
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all services (admin - includes inactive)
router.get('/admin', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const services = await Service.find()
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')
      .sort({ order: 1, createdAt: -1 });
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single service
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create service (admin only)
router.post('/', authenticate, [
  body('title').trim().notEmpty(),
  body('description').trim().notEmpty(),
  body('category').isIn(['cybersecurity', 'development', 'design', 'consulting']),
  body('features').isArray(),
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const service = new Service({
      ...req.body,
      createdBy: req.admin?.id,
      updatedBy: req.admin?.id,
    });
    await service.save();

    const populatedService = await Service.findById(service._id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email');

    res.status(201).json(populatedService);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update service (admin only)
router.put('/:id', authenticate, [
  body('title').optional().trim().notEmpty(),
  body('description').optional().trim().notEmpty(),
  body('category').optional().isIn(['cybersecurity', 'development', 'design', 'consulting']),
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedBy: req.admin?.id },
      { new: true, runValidators: true }
    ).populate('updatedBy', 'name email');

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete service (admin only)
router.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;


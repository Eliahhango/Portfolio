import express, { Request, Response } from 'express';
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

export default router;

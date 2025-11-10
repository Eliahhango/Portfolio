import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate, requireMainAdmin, AuthRequest } from '../middleware/auth.middleware.js';
import Admin from '../models/Admin.model.js';

const router = express.Router();

// Get all admins (main admin only)
router.get('/', authenticate, requireMainAdmin, async (req, res) => {
  try {
    const admins = await Admin.find().select('-password').sort({ createdAt: -1 });
    res.json(admins);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new admin (main admin only)
router.post('/', authenticate, requireMainAdmin, [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }),
  body('name').trim().notEmpty(),
], async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;
    const admin = new Admin({ email, password, name, role: 'admin' });
    await admin.save();

    res.status(201).json({
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        isActive: admin.isActive,
      },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update admin (main admin only)
router.put('/:id', authenticate, requireMainAdmin, [
  body('name').optional().trim().notEmpty(),
  body('isActive').optional().isBoolean(),
], async (req: AuthRequest, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    
    // Prevent modifying main admin
    const targetAdmin = await Admin.findById(id);
    if (targetAdmin?.role === 'main' && id !== req.admin?.id) {
      return res.status(403).json({ message: 'Cannot modify main admin' });
    }

    const { name, isActive } = req.body;
    const updateData: any = {};
    if (name) updateData.name = name;
    if (isActive !== undefined) updateData.isActive = isActive;

    const admin = await Admin.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.json({ admin });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete admin (main admin only, cannot delete self or other main admin)
router.delete('/:id', authenticate, requireMainAdmin, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Prevent deleting self
    if (id === req.admin?.id) {
      return res.status(403).json({ message: 'Cannot delete yourself' });
    }

    const targetAdmin = await Admin.findById(id);
    if (!targetAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Prevent deleting main admin
    if (targetAdmin.role === 'main') {
      return res.status(403).json({ message: 'Cannot delete main admin' });
    }

    await Admin.findByIdAndDelete(id);
    res.json({ message: 'Admin deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current admin info
router.get('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const admin = await Admin.findById(req.admin?.id).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json({ admin });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;


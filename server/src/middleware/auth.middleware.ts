import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.model.js';

export interface AuthRequest extends Request {
  admin?: {
    id: string;
    email: string;
    role: 'main' | 'admin';
  };
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin || !admin.isActive) {
      return res.status(401).json({ message: 'Invalid or inactive admin' });
    }

    req.admin = {
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireMainAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.admin?.role !== 'main') {
    return res.status(403).json({ message: 'Main admin access required' });
  }
  next();
};


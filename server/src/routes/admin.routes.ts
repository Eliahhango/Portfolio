import express, { Response } from 'express';
import { requireAdmin, verifyFirebaseToken, type FirebaseAuthRequest } from '../middleware/firebaseAuth.middleware.js';

const router = express.Router();

router.post('/verify', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  return res.json({ admin: req.adminProfile });
});

router.get('/profile', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  return res.json({ admin: req.adminProfile });
});

export default router;

import express from 'express';
// @ts-ignore - multer types added separately
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { authenticate } from '../middleware/auth.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  destination: (_req: any, _file: any, cb: any) => cb(null, uploadsDir),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filename: (_req: any, file: any, cb: any) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/[^a-z0-9-_]/gi, '_').toLowerCase();
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

const router = express.Router();

router.post('/', authenticate, upload.single('file'), (req, res) => {
  // @ts-ignore - multer adds file to request
  const file = req.file as any;
  if (!file) return res.status(400).json({ message: 'No file' });
  const url = `/uploads/${file.filename}`;
  res.json({ url });
});

export default router;



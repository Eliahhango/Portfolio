import express, { Response } from 'express';
import { body, validationResult } from 'express-validator';
import BlogPost from '../models/BlogPost.model.js';
import { authenticate, AuthRequest } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public: list posts
router.get('/', async (req, res: Response) => {
  const { published = 'true' } = req.query;
  const query: any = {};
  if (published === 'true') query.published = true;
  const posts = await BlogPost.find(query).sort({ createdAt: -1 }).select('-content');
  res.json(posts);
});

// Public: get single by slug
router.get('/:slug', async (req, res: Response) => {
  const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

// Admin: create
router.post('/', authenticate, [
  body('title').trim().isLength({ min: 3 }),
  body('slug').trim().isLength({ min: 3 }),
  body('content').trim().isLength({ min: 10 }),
  body('description').optional().trim().isLength({ max: 300 }),
  body('tags').optional().isArray()
], async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const exists = await BlogPost.findOne({ slug: req.body.slug });
  if (exists) return res.status(400).json({ message: 'Slug already exists' });
  const post = await BlogPost.create({
    title: req.body.title,
    slug: req.body.slug,
    description: req.body.description,
    content: req.body.content,
    tags: req.body.tags || [],
    cover: req.body.cover,
    published: !!req.body.published
  });
  res.status(201).json(post);
});

// Admin: update
router.put('/:id', authenticate, [
  body('title').optional().trim().isLength({ min: 3 }),
  body('slug').optional().trim().isLength({ min: 3 }),
  body('content').optional().trim().isLength({ min: 10 }),
  body('description').optional().trim().isLength({ max: 300 }),
  body('tags').optional().isArray()
], async (req: AuthRequest, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const update = req.body;
  if (update.slug) {
    const exists = await BlogPost.findOne({ slug: update.slug, _id: { $ne: req.params.id } });
    if (exists) return res.status(400).json({ message: 'Slug already exists' });
  }
  const post = await BlogPost.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

// Admin: delete
router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  const post = await BlogPost.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json({ message: 'Deleted' });
});

export default router;



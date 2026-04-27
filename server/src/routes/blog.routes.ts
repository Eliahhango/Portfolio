import express, { Response } from 'express';
import BlogPost from '../models/BlogPost.model.js';

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

export default router;

import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import BlogPost from '../models/BlogPost.model.js';
import { requireAdmin, verifyFirebaseToken, type FirebaseAuthRequest } from '../middleware/firebaseAuth.middleware.js';

const router = express.Router();

const blogValidators = [
  body('title').trim().isLength({ min: 2, max: 200 }).withMessage('Title must be 2-200 characters'),
  body('slug')
    .trim()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('Slug must contain lowercase letters, numbers, and hyphens only'),
  body('description').optional({ values: 'falsy' }).trim().isLength({ max: 500 }).withMessage('Description must be under 500 characters'),
  body('content').trim().isLength({ min: 10 }).withMessage('Content must be at least 10 characters'),
  body('tags').optional().isArray().withMessage('Tags must be an array'),
  body('published').optional().isBoolean().withMessage('Published must be a boolean'),
];

const sanitizeTags = (value: unknown) => {
  if (!Array.isArray(value)) {
    return [] as string[];
  }

  return value
    .filter((tag): tag is string => typeof tag === 'string')
    .map((tag) => tag.trim())
    .filter(Boolean);
};

router.get('/admin/all', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    return res.json(posts);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: 'Server error', error: message });
  }
});

router.post('/', verifyFirebaseToken, requireAdmin, blogValidators, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const { title, slug, description, content, published } = req.body as {
      title: string;
      slug: string;
      description?: string;
      content: string;
      published?: boolean;
    };

    const existing = await BlogPost.findOne({ slug: slug.trim() });

    if (existing) {
      return res.status(409).json({ message: 'A blog post with this slug already exists' });
    }

    const post = await BlogPost.create({
      title: title.trim(),
      slug: slug.trim(),
      description: description?.trim() || undefined,
      content: content.trim(),
      tags: sanitizeTags(req.body.tags),
      published: Boolean(published),
    });

    return res.status(201).json(post);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: 'Server error', error: message });
  }
});

router.put('/:id', verifyFirebaseToken, requireAdmin, blogValidators, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }

    const { title, slug, description, content, published } = req.body as {
      title: string;
      slug: string;
      description?: string;
      content: string;
      published?: boolean;
    };

    const conflictingPost = await BlogPost.findOne({ slug: slug.trim(), _id: { $ne: req.params.id } });

    if (conflictingPost) {
      return res.status(409).json({ message: 'A blog post with this slug already exists' });
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        slug: slug.trim(),
        description: description?.trim() || undefined,
        content: content.trim(),
        tags: sanitizeTags(req.body.tags),
        published: Boolean(published),
      },
      { new: true, runValidators: true },
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    return res.json(updatedPost);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: 'Server error', error: message });
  }
});

router.delete('/:id', verifyFirebaseToken, requireAdmin, async (req: FirebaseAuthRequest, res: Response) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    return res.json({ message: 'Blog post deleted' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ message: 'Server error', error: message });
  }
});

router.get('/', async (req: Request, res: Response) => {
  const published = typeof req.query.published === 'string' ? req.query.published : 'true';
  const query: { published?: boolean } = {};

  if (published === 'true') {
    query.published = true;
  } else if (published === 'false') {
    query.published = false;
  }

  const posts = await BlogPost.find(query)
    .sort({ createdAt: -1 })
    .select('title slug description tags createdAt cover content')
    .lean();

  return res.json(
    posts.map((post) => {
      const contentLength = post.content.trim().split(/\s+/).filter(Boolean).length;

      return {
        _id: post._id,
        title: post.title,
        slug: post.slug,
        description: post.description,
        tags: post.tags,
        createdAt: post.createdAt,
        cover: post.cover,
        contentLength,
        readTimeMinutes: Math.max(1, Math.ceil(contentLength / 200)),
      };
    }),
  );
});

router.get('/:slug', async (req: Request, res: Response) => {
  const post = await BlogPost.findOne({ slug: req.params.slug, published: true });

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  return res.json(post);
});

export default router;

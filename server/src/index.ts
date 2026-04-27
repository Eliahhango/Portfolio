import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import { connectDatabase, getDatabaseType } from './config/database.js';
import serviceRoutes from './routes/service.routes.js';
import contentRoutes from './routes/content.routes.js';
import visitorRoutes from './routes/visitor.routes.js';
import contactRoutes from './routes/contact.routes.js';
import newsletterRoutes from './routes/newsletter.routes.js';
import blogRoutes from './routes/blog.routes.js';
import BlogPost from './models/BlogPost.model.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet({
  // Strong CSP. Adjusted to allow required third-party resources.
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      defaultSrc: ["'self'"],
      baseUri: ["'self'"],
      frameAncestors: ["'self'"],
      objectSrc: ["'none'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'",
        // Allow Tailwind CDN for runtime styles in current setup
        "https://cdn.tailwindcss.com",
        // Allow any scripts bundled to call out to aistudiocdn if referenced
        "https://aistudiocdn.com"
      ],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://fonts.googleapis.com"
      ],
      imgSrc: ["'self'", "data:", "https:"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "data:"],
      connectSrc: ["'self'", "https:"],
      upgradeInsecureRequests: []
    }
  },
  // Opt out of COEP for now to avoid breaking cross-origin embeds
  crossOriginEmbedderPolicy: false,
  // Enforce X-Content-Type-Options, X-Frame-Options, CORP, COOP, etc.
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  // Ensure HSTS is enabled with stronger settings (Render terminates TLS at proxy)
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  }
}));

// Additional security headers not covered directly by helmet
app.use((req, res, next) => {
  // Modern Permissions-Policy (replace deprecated Feature-Policy)
  res.setHeader(
    'Permissions-Policy',
    [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'accelerometer=()',
      'autoplay=()',
      'clipboard-read=()',
      'clipboard-write=()',
      'fullscreen=(self)',
      'payment=()',
      'usb=()'
    ].join(', ')
  );
  // Reduce XSS risk from inline event handlers (kept 'unsafe-inline' in CSP for now due to setup)
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  next();
});

// Trust proxy (for Render/Heroku)
app.set('trust proxy', 1);

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://www.elitechwiz.site',
  'https://elitechwiz.site'
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Allow same-origin or non-browser requests (no Origin header)
    if (!origin || allowedOrigins.some((o) => o === origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS: Origin not allowed'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit contact submissions to 5 per hour
  message: 'Too many contact form submissions, please try again later.',
});

// Apply rate limiting
app.use('/api/', limiter);
app.use('/api/contact', contactLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Data sanitization against NoSQL injection (only for MongoDB)
if (getDatabaseType() === 'mongodb') {
  app.use(mongoSanitize());
}

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Request logging (in development)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
  });
}

// Database connection - Supports both MongoDB and PostgreSQL
// Priority: MONGODB_URI > DATABASE_URL (PostgreSQL) > local MongoDB
connectDatabase()
  .then(() => {
    const dbType = getDatabaseType();
    if (dbType === 'postgresql') {
      console.log('💡 Using PostgreSQL database (Prisma ORM)');
    } else {
      console.log('💡 Using MongoDB database (Mongoose ODM)');
    }

    // Seed sample blog posts if none exist (one-time helper)
    BlogPost.countDocuments().then(async (count) => {
      if (count === 0) {
        await BlogPost.create([
          {
            title: 'Welcome to the Blog',
            slug: 'welcome',
            description: 'Kicking off posts about security, software, and design.',
            content:
              'This is a sample post. I will share articles on cybersecurity, full‑stack engineering, and design systems. Stay tuned for practical insights and case studies.',
            tags: ['announcement', 'security'],
            published: true
          },
          {
            title: 'Hardening a Web App in Production',
            slug: 'hardening-in-production',
            description: 'A concise checklist to harden your app in production.',
            content:
              '- Enable HSTS and TLS only\n- Set a strict CSP\n- Rate limit auth & sensitive endpoints\n- Use a modern Permissions-Policy\n- Sanitize inputs and validate on server\n- Rotate secrets; least-privileged DB users',
            tags: ['security', 'checklist'],
            published: true
          }
        ]).catch(() => {});
        console.log('📝 Seeded sample blog posts');
      }
    }).catch(() => {});
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    console.log('💡 Database options:');
    console.log('   1. MongoDB: Set MONGODB_URI (Atlas, Render MongoDB, or local)');
    console.log('   2. PostgreSQL: Set DATABASE_URL (Render PostgreSQL or custom)');
    console.log('   3. Local MongoDB: Defaults to localhost in development');
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      console.log('⚠️  Running in development mode without database (UI testing only)');
    }
  });

// API Routes (must come before static files)
app.use('/api/services', serviceRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/blog', blogRoutes);

// Health check
app.get('/api/health', (req: express.Request, res: express.Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Serve static files from React build (in production)
if (process.env.NODE_ENV === 'production') {
  // Serve static assets
  app.use(express.static(path.join(__dirname, '../../dist')));

  // Serve main index.html for all non-API routes
  app.get('*', (req: express.Request, res: express.Response) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ message: 'API route not found' });
    }
    // Serve main index.html for all other routes
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  if (process.env.NODE_ENV === 'production') {
    console.log(`📦 Serving frontend from dist/`);
  }
});

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
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import serviceRoutes from './routes/service.routes.js';
import contentRoutes from './routes/content.routes.js';
import visitorRoutes from './routes/visitor.routes.js';
import contactRoutes from './routes/contact.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Needed for React
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Allow embedding
}));

// Trust proxy (for Render/Heroku)
app.set('trust proxy', 1);

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit auth endpoints to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.',
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit contact submissions to 5 per hour
  message: 'Too many contact form submissions, please try again later.',
});

// Apply rate limiting
app.use('/api/', limiter);
app.use('/api/auth', authLimiter);
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
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req: express.Request, res: express.Response) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Serve static files from React build (in production)
if (process.env.NODE_ENV === 'production') {
  // Serve admin.html
  app.get('/admin.html', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, '../../dist/admin.html'));
  });

  // Serve static assets
  app.use(express.static(path.join(__dirname, '../../dist')));

  // Serve main index.html for all non-API routes
  app.get('*', (req: express.Request, res: express.Response) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ message: 'API route not found' });
    }
    // Serve admin.html for /admin route
    if (req.path === '/admin' || req.path.startsWith('/admin')) {
      return res.sendFile(path.join(__dirname, '../../dist/admin.html'));
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


// Database configuration - supports both MongoDB and PostgreSQL
import mongoose from 'mongoose';

// Initialize Prisma only when needed (lazy loading)
let _PrismaClient: any = null;

export type DatabaseType = 'mongodb' | 'postgresql' | 'none';

let prismaClient: any = null;
let databaseType: DatabaseType | null = null;

export const getDatabaseType = (): DatabaseType | null => {
  return databaseType;
};

export const getPrismaClient = (): any => {
  if (!prismaClient) {
    throw new Error('Prisma client not initialized. PostgreSQL connection failed.');
  }
  return prismaClient;
};

export const connectDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI;
  const postgresUrl = process.env.DATABASE_URL;

  // Determine which database to use (priority: MONGODB_URI > DATABASE_URL)
  if (mongoUri) {
    // Use MongoDB (highest priority)
    databaseType = 'mongodb';
    await connectMongoDB(mongoUri);
  } else if (postgresUrl && !postgresUrl.startsWith('mongodb')) {
    // Use PostgreSQL (Render's default DATABASE_URL or custom PostgreSQL)
    databaseType = 'postgresql';
    await connectPostgreSQL(postgresUrl);
  } else if (postgresUrl && postgresUrl.startsWith('mongodb')) {
    // DATABASE_URL is MongoDB (fallback)
    databaseType = 'mongodb';
    await connectMongoDB(postgresUrl);
  } else if (process.env.NODE_ENV !== 'production') {
    // Default to local MongoDB in development
    databaseType = 'mongodb';
    await connectMongoDB('mongodb://localhost:27017/portfolio');
  } else {
    databaseType = 'none';
    console.warn('⚠️  No database URL configured. Running in Firebase-first mode without backend DB persistence.');
  }
};

const connectMongoDB = async (uri: string): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
    if (uri.includes('localhost')) {
      console.log('📌 Using local MongoDB (development mode)');
    } else if (uri.includes('mongodb.net')) {
      console.log('📌 Using MongoDB Atlas');
    } else if (uri.includes('render.com') || uri.includes('onrender.com')) {
      console.log('📌 Using Render MongoDB');
    } else {
      console.log('📌 Using custom MongoDB connection');
    }
  } catch (err: any) {
    console.error('❌ MongoDB connection error:', err.message);
    throw err;
  }
};

const connectPostgreSQL = async (url: string): Promise<void> => {
  try {
    // Dynamically import Prisma to avoid errors if not using PostgreSQL
    if (!_PrismaClient) {
      try {
        const prismaModule: any = await import('@prisma/client');
        _PrismaClient = prismaModule.PrismaClient || prismaModule.default?.PrismaClient;
      } catch (importError: any) {
        console.error('❌ Failed to import Prisma client:', importError.message);
        console.error('💡 Run: npx prisma generate');
        console.error('💡 Or use MongoDB instead by setting MONGODB_URI');
        throw new Error('Prisma client not available. Run "npx prisma generate" or use MongoDB.');
      }
    }
    
    prismaClient = new _PrismaClient({
      datasources: {
        db: {
          url: url,
        },
      },
    });
    
    // Test connection
    await prismaClient.$connect();
    console.log('✅ Connected to PostgreSQL');
    
    if (url.includes('render.com') || url.includes('onrender.com')) {
      console.log('📌 Using Render PostgreSQL');
    } else {
      console.log('📌 Using custom PostgreSQL connection');
    }
  } catch (err: any) {
    console.error('❌ PostgreSQL connection error:', err.message);
    console.error('💡 Make sure you have run: npx prisma generate');
    console.error('💡 And that DATABASE_URL points to a valid PostgreSQL database');
    console.error('💡 Or use MongoDB by setting MONGODB_URI instead');
    throw err;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  if (databaseType === 'mongodb') {
    await mongoose.disconnect();
  } else if (databaseType === 'postgresql' && prismaClient) {
    await prismaClient.$disconnect();
  }
};

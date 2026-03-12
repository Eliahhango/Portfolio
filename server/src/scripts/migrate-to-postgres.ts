// Migration script to help migrate from MongoDB to PostgreSQL
// Run this after setting up PostgreSQL: npx tsx src/scripts/migrate-to-postgres.ts

import mongoose from 'mongoose';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrate() {
  console.log('🔄 Starting migration from MongoDB to PostgreSQL...');
  
  // Connect to MongoDB
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
  await mongoose.connect(mongoUri);
  console.log('✅ Connected to MongoDB');

  // Connect to PostgreSQL
  const postgresUrl = process.env.DATABASE_URL;
  if (!postgresUrl) {
    throw new Error('DATABASE_URL not set for PostgreSQL');
  }
  await prisma.$connect();
  console.log('✅ Connected to PostgreSQL');

  try {
    // Import MongoDB models
    const Admin = mongoose.model('Admin', new mongoose.Schema({}, { strict: false }));
    const Service = mongoose.model('Service', new mongoose.Schema({}, { strict: false }));
    const Content = mongoose.model('Content', new mongoose.Schema({}, { strict: false }));
    const ContactMessage = mongoose.model('ContactMessage', new mongoose.Schema({}, { strict: false }));
    const Visitor = mongoose.model('Visitor', new mongoose.Schema({}, { strict: false }));

    // Migrate Admins
    const admins = await Admin.find();
    console.log(`📦 Migrating ${admins.length} admins...`);
    for (const admin of admins) {
      await prisma.admin.upsert({
        where: { email: admin.email },
        update: {},
        create: {
          id: admin._id.toString(),
          email: admin.email,
          password: admin.password,
          name: admin.name,
          role: admin.role || 'admin',
          isActive: admin.isActive !== false,
        },
      });
    }

    // Migrate Services
    const services = await Service.find();
    console.log(`📦 Migrating ${services.length} services...`);
    for (const service of services) {
      await prisma.service.create({
        data: {
          id: service._id.toString(),
          title: service.title,
          description: service.description,
          longDescription: service.longDescription,
          category: service.category,
          features: service.features || [],
          pricing: service.pricing || { startingAt: 0, currency: 'USD' },
          imageUrl: service.imageUrl,
          isActive: service.isActive !== false,
          order: service.order || 0,
          createdBy: service.createdBy?.toString(),
          updatedBy: service.updatedBy?.toString(),
        },
      });
    }

    // Migrate Content
    const content = await Content.find();
    console.log(`📦 Migrating ${content.length} content items...`);
    for (const item of content) {
      await prisma.content.upsert({
        where: { key: item.key },
        update: {},
        create: {
          id: item._id.toString(),
          key: item.key,
          value: typeof item.value === 'string' ? item.value : JSON.stringify(item.value),
          type: item.type || 'text',
          section: item.section,
          updatedBy: item.updatedBy?.toString(),
        },
      });
    }

    // Migrate Contact Messages
    const messages = await ContactMessage.find();
    console.log(`📦 Migrating ${messages.length} contact messages...`);
    for (const message of messages) {
      await prisma.contactMessage.create({
        data: {
          id: message._id.toString(),
          name: message.name,
          email: message.email,
          phone: message.phone,
          subject: message.subject,
          message: message.message,
          ip: message.ip,
          userAgent: message.userAgent,
          status: message.status || 'new',
          repliedAt: message.repliedAt,
          repliedBy: message.repliedBy?.toString(),
          notes: message.notes,
        },
      });
    }

    // Migrate Visitors
    const visitors = await Visitor.find();
    console.log(`📦 Migrating ${visitors.length} visitors...`);
    for (const visitor of visitors) {
      await prisma.visitor.create({
        data: {
          id: visitor._id.toString(),
          ip: visitor.ip,
          userAgent: visitor.userAgent,
          referer: visitor.referer,
          path: visitor.path,
          country: visitor.country,
          city: visitor.city,
          device: visitor.device,
          browser: visitor.browser,
          os: visitor.os,
          isNewVisitor: visitor.isNewVisitor !== false,
          sessionId: visitor.sessionId,
          visitedAt: visitor.visitedAt || new Date(),
          duration: visitor.duration,
        },
      });
    }

    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    await prisma.$disconnect();
  }
}

migrate().catch(console.error);


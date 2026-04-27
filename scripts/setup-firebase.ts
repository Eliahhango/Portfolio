import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// Initialize Firebase Admin SDK
const serviceAccountPath = process.env.FIREBASE_ADMIN_KEY_PATH || './firebase-admin-key.json';

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`❌ Firebase admin key not found at: ${serviceAccountPath}`);
  console.log('Please ensure your Firebase service account JSON is in the project root');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  projectId: serviceAccount.project_id,
});

const db = admin.firestore();
const auth = admin.auth();

async function setupFirebase() {
  try {
    console.log('🚀 Starting Firebase setup...\n');

    // 1. Create collections with initial data
    console.log('📦 Creating Firestore collections...');
    await setupCollections();

    // 2. Set up security rules
    console.log('\n🔒 Setting up security rules...');
    await setupSecurityRules();

    // 3. Create admin user
    console.log('\n👤 Creating admin user...');
    await createAdminUser();

    // 4. Generate Web App Config
    console.log('\n🔑 Generating Web App configuration...');
    await generateWebAppConfig();

    console.log('\n✅ Firebase setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Copy the values from .env.local.generated to .env.local');
    console.log('2. Restart your development server');
    console.log('3. Access http://localhost:5173/admin to test login\n');

  } catch (error) {
    console.error('❌ Setup error:', error);
    process.exit(1);
  } finally {
    await admin.app().delete();
  }
}

async function setupCollections() {
  const collections = {
    users: [
      {
        email: 'admin@elitechwiz.site',
        name: 'Admin User',
        role: 'admin',
        status: 'active',
        joinDate: new Date(),
        lastLogin: new Date(),
      },
    ],
    posts: [
      {
        title: 'Getting Started with Web Development',
        content: 'Learn the basics of modern web development with React and TypeScript.',
        author: 'admin@elitechwiz.site',
        published: true,
        views: 1250,
        publishedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        category: 'development',
      },
      {
        title: 'Security Best Practices',
        content: 'Essential security practices for modern applications.',
        author: 'admin@elitechwiz.site',
        published: true,
        views: 856,
        publishedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        category: 'security',
      },
    ],
    visitors: [
      {
        email: 'user@example.com',
        visitDate: new Date(),
        page: '/',
        referrer: 'direct',
      },
    ],
    settings: [
      {
        siteTitle: 'EliteChwiz Portfolio',
        siteDescription: 'Professional portfolio and services',
        contactEmail: 'contact@elitechwiz.site',
        socialLinks: {
          github: 'https://github.com',
          linkedin: 'https://linkedin.com',
          twitter: 'https://twitter.com',
        },
        features: {
          enableNewsletter: true,
          enableComments: false,
          enableAnalytics: true,
        },
      },
    ],
  };

  for (const [collectionName, documents] of Object.entries(collections)) {
    try {
      for (const doc of documents) {
        await db.collection(collectionName).add(doc);
      }
      console.log(`  ✓ Created ${collectionName} collection with ${documents.length} document(s)`);
    } catch (error) {
      console.error(`  ✗ Error creating ${collectionName}:`, error);
    }
  }
}

async function setupSecurityRules() {
  const rules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Admin-only rules
    match /users/{document=**} {
      allow read, write: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    match /posts/{document=**} {
      allow read, write: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    match /visitors/{document=**} {
      allow read, write: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    match /settings/{document=**} {
      allow read, write: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    // Public read for blog posts (optional - for public blog)
    match /posts/{document=**} {
      allow read: if resource.data.published == true;
      allow write: if request.auth != null && 
        request.auth.token.admin == true;
    }
  }
}`;

  const rulesPath = path.join(process.cwd(), 'firestore.rules');
  fs.writeFileSync(rulesPath, rules);
  console.log(`  ✓ Security rules generated at: firestore.rules`);
  console.log('  📌 Deploy with: firebase deploy --only firestore:rules');
}

async function createAdminUser() {
  const adminEmail = 'admin@elitechwiz.site';
  const adminPassword = 'Admin@123456'; // Change this immediately after first login!

  try {
    const user = await auth.getUserByEmail(adminEmail).catch(() => null);
    
    if (user) {
      console.log(`  ℹ Admin user already exists: ${adminEmail}`);
      return;
    }

    await auth.createUser({
      email: adminEmail,
      password: adminPassword,
      displayName: 'Admin User',
      emailVerified: true,
    });

    console.log(`  ✓ Admin user created: ${adminEmail}`);
    console.log(`  🔐 Temporary password: ${adminPassword}`);
    console.log('  ⚠️  IMPORTANT: Change password immediately after first login!');

    // Set admin custom claims
    const userRecord = await auth.getUserByEmail(adminEmail);
    await auth.setCustomUserClaims(userRecord.uid, { admin: true });
    console.log(`  ✓ Admin privileges set`);

  } catch (error) {
    console.error('  ✗ Error creating admin user:', error);
  }
}

async function generateWebAppConfig() {
  // Read from environment or service account
  const projectId = serviceAccount.project_id;
  const webAppConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY || 'YOUR_API_KEY',
    authDomain: `${projectId}.firebaseapp.com`,
    projectId: projectId,
    storageBucket: `${projectId}.appspot.com`,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_SENDER_ID',
    appId: process.env.VITE_FIREBASE_APP_ID || 'YOUR_APP_ID',
  };

  const envContent = `# Firebase Web App Configuration
VITE_FIREBASE_API_KEY=${webAppConfig.apiKey}
VITE_FIREBASE_AUTH_DOMAIN=${webAppConfig.authDomain}
VITE_FIREBASE_PROJECT_ID=${webAppConfig.projectId}
VITE_FIREBASE_STORAGE_BUCKET=${webAppConfig.storageBucket}
VITE_FIREBASE_MESSAGING_SENDER_ID=${webAppConfig.messagingSenderId}
VITE_FIREBASE_APP_ID=${webAppConfig.appId}
`;

  const envPath = path.join(process.cwd(), '.env.local.generated');
  fs.writeFileSync(envPath, envContent);

  console.log(`  ✓ .env.local.generated created with Web App config`);
  console.log('  📋 Update the API key and App ID from Firebase Console if needed');
}

// Run setup
setupFirebase();

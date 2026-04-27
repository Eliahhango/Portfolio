import admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Firebase Admin SDK
const serviceAccountPath = path.join(__dirname, '..', 'firebase-admin-key.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`❌ Firebase admin key not found at: ${serviceAccountPath}`);
  console.log('📝 Please save your Firebase service account JSON to: firebase-admin-key.json (in project root)');
  console.log('📍 Find it at: Firebase Console > Project Settings > Service Accounts > Generate New Private Key');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: serviceAccount.project_id,
});

const db = admin.firestore();
const auth = admin.auth();

async function setupFirebase() {
  try {
    console.log('🚀 Starting Firebase setup...\n');
    console.log(`📦 Project: ${serviceAccount.project_id}\n`);

    // 1. Create collections with initial data
    console.log('📚 Creating Firestore collections...');
    await setupCollections();

    // 2. Create admin user
    console.log('\n👤 Creating admin user...');
    await createAdminUser();

    // 3. Generate Web App Config
    console.log('\n🔑 Generating Web App configuration...');
    const webAppConfig = await generateWebAppConfig();

    // 4. Display security rules
    console.log('\n🔒 Security rules (save to firestore.rules):');
    displaySecurityRules();

    console.log('\n✅ Firebase setup completed successfully!');
    console.log('\n📋 IMPORTANT - Next steps:');
    console.log('1. ✓ Firestore collections created');
    console.log('2. ✓ Admin user created');
    console.log('3. ⏳ Copy .env.local values (shown below)');
    console.log('4. ⏳ Deploy security rules: firebase deploy --only firestore:rules');
    console.log('\n🔐 Admin Credentials:');
    console.log('   Email: admin@elitechwiz.site');
    console.log('   Temporary Password: Admin@123456');
    console.log('   ⚠️  CHANGE PASSWORD IMMEDIATELY AFTER FIRST LOGIN!\n');

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
        publishedDate: admin.firestore.Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
        category: 'development',
      },
      {
        title: 'Security Best Practices',
        content: 'Essential security practices for modern applications.',
        author: 'admin@elitechwiz.site',
        published: true,
        views: 856,
        publishedDate: admin.firestore.Timestamp.fromDate(new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)),
        category: 'security',
      },
    ],
    visitors: [
      {
        email: 'visitor@example.com',
        visitDate: admin.firestore.Timestamp.fromDate(new Date()),
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
        updatedAt: admin.firestore.Timestamp.fromDate(new Date()),
      },
    ],
  };

  for (const [collectionName, documents] of Object.entries(collections)) {
    try {
      for (const doc of documents) {
        await db.collection(collectionName).add(doc);
      }
      console.log(`  ✓ ${collectionName} (${documents.length} document${documents.length !== 1 ? 's' : ''})`);
    } catch (error) {
      console.error(`  ✗ Error creating ${collectionName}:`, error);
    }
  }
}

async function createAdminUser() {
  const adminEmail = 'admin@elitechwiz.site';
  const adminPassword = 'Admin@123456';

  try {
    // Check if user exists
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(adminEmail);
    } catch (e) {
      userRecord = null;
    }

    if (userRecord) {
      console.log(`  ℹ Admin user already exists: ${adminEmail}`);
      return;
    }

    // Create user
    userRecord = await auth.createUser({
      email: adminEmail,
      password: adminPassword,
      displayName: 'Admin User',
      emailVerified: true,
    });

    // Set admin claims
    await auth.setCustomUserClaims(userRecord.uid, { admin: true });

    console.log(`  ✓ Admin user created: ${adminEmail}`);
    console.log(`  ✓ Admin privileges set`);

  } catch (error) {
    console.error('  ✗ Error with admin user:', error);
  }
}

async function generateWebAppConfig() {
  const projectId = serviceAccount.project_id;

  // These need to be updated manually from Firebase Console
  const webAppConfig = {
    apiKey: 'YOUR_API_KEY_FROM_FIREBASE_CONSOLE',
    authDomain: `${projectId}.firebaseapp.com`,
    projectId: projectId,
    storageBucket: `${projectId}.appspot.com`,
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID_FROM_FIREBASE_CONSOLE',
    appId: 'YOUR_APP_ID_FROM_FIREBASE_CONSOLE',
  };

  console.log(`\n📝 Add these to your .env.local file:\n`);
  console.log(`VITE_FIREBASE_API_KEY=${webAppConfig.apiKey}`);
  console.log(`VITE_FIREBASE_AUTH_DOMAIN=${webAppConfig.authDomain}`);
  console.log(`VITE_FIREBASE_PROJECT_ID=${webAppConfig.projectId}`);
  console.log(`VITE_FIREBASE_STORAGE_BUCKET=${webAppConfig.storageBucket}`);
  console.log(`VITE_FIREBASE_MESSAGING_SENDER_ID=${webAppConfig.messagingSenderId}`);
  console.log(`VITE_FIREBASE_APP_ID=${webAppConfig.appId}`);

  // Also save to file
  const envPath = path.join(__dirname, '..', '.env.local.generated');
  const envContent = `# Firebase Web App Configuration
VITE_FIREBASE_API_KEY=${webAppConfig.apiKey}
VITE_FIREBASE_AUTH_DOMAIN=${webAppConfig.authDomain}
VITE_FIREBASE_PROJECT_ID=${webAppConfig.projectId}
VITE_FIREBASE_STORAGE_BUCKET=${webAppConfig.storageBucket}
VITE_FIREBASE_MESSAGING_SENDER_ID=${webAppConfig.messagingSenderId}
VITE_FIREBASE_APP_ID=${webAppConfig.appId}
`;
  fs.writeFileSync(envPath, envContent);
  console.log(`\n✓ Saved to: .env.local.generated`);

  return webAppConfig;
}

function displaySecurityRules() {
  const rules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Require authentication and admin role
    function isAdmin() {
      return request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Admin can read/write all collections
    match /users/{document=**} {
      allow read, write: if isAdmin();
    }
    
    match /posts/{document=**} {
      allow read: if resource.data.published == true;
      allow write: if isAdmin();
    }
    
    match /visitors/{document=**} {
      allow read, write: if isAdmin();
    }
    
    match /settings/{document=**} {
      allow read: if request.auth != null;
      allow write: if isAdmin();
    }
  }
}`;

  console.log(rules);
  console.log('\n💾 Save this as: firestore.rules');
  console.log('📤 Deploy with: firebase deploy --only firestore:rules');
}

// Run setup
setupFirebase();

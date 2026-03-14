import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, doc, Timestamp } from 'firebase/firestore';
import { BLOG_POSTS } from '../constants/blogData';
import { PROJECTS_DATA } from '../constants';

// Firebase config
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedFirestore() {
  try {
    console.log('🚀 Starting Firestore seed...');

    // Upload blog posts
    console.log('📝 Uploading blog posts...');
    for (const post of BLOG_POSTS) {
      const postRef = doc(collection(db, 'posts'), `post_${Date.now()}_${Math.random()}`);
      await setDoc(postRef, {
        title: post.title,
        slug: post.slug,
        description: post.excerpt,
        categories: Array.isArray(post.categories) ? post.categories : [],
        tags: post.tags || [],
        cover: post.image,
        published: true,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log(`✅ Added post: ${post.title}`);
    }

    // Upload projects
    console.log('🎨 Uploading projects...');
    for (const project of PROJECTS_DATA) {
      const projectRef = doc(collection(db, 'projects'), `project_${Date.now()}_${Math.random()}`);
      await setDoc(projectRef, {
        title: project.title,
        description: project.description,
        longDescription: project.longDescription,
        image: project.imageUrl,
        tags: project.tags || [],
        liveUrl: project.liveUrl,
        githubUrl: project.repoUrl,
        caseStudySlug: project.caseStudySlug,
        published: true,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log(`✅ Added project: ${project.title}`);
    }

    // Upload services
    console.log('⚙️ Uploading services...');
    const DEFAULT_SERVICES = [
      {
        id: '1',
        title: 'Web Development',
        description: 'Building fast, scalable web applications with modern technologies',
        icon: '🚀',
        path: 'web-development',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
        order: 1,
      },
      {
        id: '2',
        title: 'Security Consulting',
        description: 'Comprehensive security audits and vulnerability assessments',
        icon: '🔒',
        path: 'security-consulting',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13e493e?w=600&h=400&fit=crop',
        order: 2,
      },
      {
        id: '3',
        title: 'System Architecture',
        description: 'Designing robust and scalable system architectures',
        icon: '🏗️',
        path: 'system-architecture',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        order: 3,
      },
      {
        id: '4',
        title: 'Code Auditing',
        description: 'In-depth code reviews and quality assessments',
        icon: '🔍',
        path: 'code-auditing',
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
        order: 4,
      },
      {
        id: '5',
        title: 'Penetration Testing',
        description: 'Identifying security vulnerabilities through ethical hacking',
        icon: '⚔️',
        path: 'penetration-testing',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13e493e?w=600&h=400&fit=crop',
        order: 5,
      },
      {
        id: '6',
        title: 'Authentication Systems',
        description: 'Implementing secure authentication and authorization',
        icon: '🔐',
        path: 'authentication-systems',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        order: 6,
      },
    ];

    for (const service of DEFAULT_SERVICES) {
      const serviceRef = doc(collection(db, 'services'), `service_${service.id}`);
      await setDoc(serviceRef, {
        title: service.title,
        description: service.description,
        icon: service.icon,
        path: service.path,
        image: service.image,
        order: service.order,
        published: true,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      console.log(`✅ Added service: ${service.title}`);
    }

    console.log('✨ Firestore seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding Firestore:', error);
    process.exit(1);
  }
}

seedFirestore();

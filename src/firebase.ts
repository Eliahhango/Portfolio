import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, inMemoryPersistence, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export interface AdminProfileInput {
  uid: string;
  email: string;
  name?: string | null;
  role?: string;
  isActive?: boolean;
  photoURL?: string | null;
}

export const initializeAuthPersistence = async () => {
  await setPersistence(auth, inMemoryPersistence);
};

export const saveAdminProfile = async (profile: AdminProfileInput) => {
  await setDoc(
    doc(db, 'admins', profile.uid),
    {
      uid: profile.uid,
      email: profile.email.toLowerCase(),
      name: profile.name ?? null,
      role: profile.role ?? 'admin',
      isActive: profile.isActive ?? true,
      photoURL: profile.photoURL ?? null,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  );
};

export { onAuthStateChanged, signInWithEmailAndPassword, signOut };

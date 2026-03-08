import type { NextFunction, Request, Response } from 'express';
import { applicationDefault, cert, getApps, initializeApp, type ServiceAccount } from 'firebase-admin/app';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

interface RawServiceAccount {
  projectId?: string;
  project_id?: string;
  clientEmail?: string;
  client_email?: string;
  privateKey?: string;
  private_key?: string;
}

export interface FirestoreAdminProfile {
  id: string;
  uid?: string;
  email: string;
  name?: string | null;
  role?: string;
  isActive?: boolean;
  photoURL?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface FirebaseAuthRequest extends Request {
  firebaseUser?: DecodedIdToken;
  adminProfile?: FirestoreAdminProfile | null;
}

const parseServiceAccount = (): ServiceAccount | null => {
  const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (!rawJson) {
    return null;
  }

  const parsed = JSON.parse(rawJson) as RawServiceAccount;

  return {
    projectId: parsed.projectId ?? parsed.project_id,
    clientEmail: parsed.clientEmail ?? parsed.client_email,
    privateKey: (parsed.privateKey ?? parsed.private_key ?? '').replace(/\\n/g, '\n'),
  };
};

const firebaseAdminApp = getApps().length
  ? getApps()[0]
  : initializeApp(
      parseServiceAccount()
        ? { credential: cert(parseServiceAccount() as ServiceAccount) }
        : { credential: applicationDefault() },
    );

export const firebaseAdminAuth = getAuth(firebaseAdminApp);
export const firebaseAdminDb = getFirestore(firebaseAdminApp);

const serializeTimestamp = (value: unknown) => {
  if (value instanceof Timestamp) {
    return value.toDate().toISOString();
  }

  return typeof value === 'string' ? value : null;
};

const serializeAdminProfile = (id: string, data: Record<string, unknown>): FirestoreAdminProfile => {
  return {
    id,
    uid: typeof data.uid === 'string' ? data.uid : undefined,
    email: typeof data.email === 'string' ? data.email : '',
    name: typeof data.name === 'string' ? data.name : null,
    role: typeof data.role === 'string' ? data.role : 'admin',
    isActive: typeof data.isActive === 'boolean' ? data.isActive : true,
    photoURL: typeof data.photoURL === 'string' ? data.photoURL : null,
    createdAt: serializeTimestamp(data.createdAt),
    updatedAt: serializeTimestamp(data.updatedAt),
  };
};

export const findAdminProfileByEmail = async (email: string) => {
  const normalizedEmail = email.toLowerCase();
  const snapshot = await firebaseAdminDb
    .collection('admins')
    .where('email', '==', normalizedEmail)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  const adminDoc = snapshot.docs[0];
  return serializeAdminProfile(adminDoc.id, adminDoc.data());
};

export const verifyFirebaseToken = async (req: FirebaseAuthRequest, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing Firebase bearer token' });
    }

    const token = authorization.slice('Bearer '.length).trim();

    if (!token) {
      return res.status(401).json({ message: 'Missing Firebase bearer token' });
    }

    req.firebaseUser = await firebaseAdminAuth.verifyIdToken(token);
    return next();
  } catch (error) {
    console.error('Firebase token verification failed:', error);
    return res.status(401).json({ message: 'Invalid Firebase token' });
  }
};

export const requireAdmin = async (req: FirebaseAuthRequest, res: Response, next: NextFunction) => {
  try {
    const email = req.firebaseUser?.email;

    if (!email) {
      return res.status(403).json({ message: 'Admin access requires a verified email address' });
    }

    const adminProfile = await findAdminProfileByEmail(email);

    if (!adminProfile || adminProfile.isActive === false) {
      return res.status(403).json({ message: 'Admin access denied' });
    }

    req.adminProfile = adminProfile;
    return next();
  } catch (error) {
    console.error('Admin profile lookup failed:', error);
    return res.status(500).json({ message: 'Failed to verify admin access' });
  }
};

export const requireMainAdmin = (req: FirebaseAuthRequest, res: Response, next: NextFunction) => {
  if (req.adminProfile?.role !== 'main') {
    return res.status(403).json({ message: 'Main admin access required' });
  }

  return next();
};

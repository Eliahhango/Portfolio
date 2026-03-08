import dotenv from 'dotenv';
import type { Auth } from 'firebase-admin/auth';
import { FieldValue } from 'firebase-admin/firestore';

dotenv.config();

interface ParsedArgs {
  email: string;
  password: string;
  name: string;
  role: 'main' | 'admin';
}

const printUsage = () => {
  console.log('Usage: npm run firebase:create-admin -- --email you@example.com --password "StrongPassword123!" [--name "Site Admin"] [--role main]');
};

const getArgValue = (args: string[], key: string) => {
  const index = args.indexOf(key);
  if (index === -1) {
    return null;
  }

  return args[index + 1] ?? null;
};

const parseArgs = (args: string[]): ParsedArgs | null => {
  const email = getArgValue(args, '--email')?.trim().toLowerCase() ?? '';
  const password = getArgValue(args, '--password') ?? '';
  const name = getArgValue(args, '--name')?.trim() || 'Site Admin';
  const roleArg = getArgValue(args, '--role')?.trim().toLowerCase();
  const role = roleArg === 'admin' ? 'admin' : 'main';

  if (!email || !password) {
    return null;
  }

  return { email, password, name, role };
};

const ensureAdminUser = async (firebaseAdminAuth: Auth, { email, password, name }: ParsedArgs) => {
  try {
    return await firebaseAdminAuth.getUserByEmail(email);
  } catch (error) {
    const authError = error as { code?: string };

    if (authError.code !== 'auth/user-not-found') {
      throw error;
    }
  }

  return firebaseAdminAuth.createUser({
    email,
    password,
    displayName: name,
    emailVerified: true,
  });
};

const main = async () => {
  const parsedArgs = parseArgs(process.argv.slice(2));

  if (!parsedArgs) {
    printUsage();
    process.exit(1);
  }

  const { firebaseAdminAuth, firebaseAdminDb } = await import('../middleware/firebaseAuth.middleware.js');
  const user = await ensureAdminUser(firebaseAdminAuth, parsedArgs);

  await firebaseAdminDb.collection('admins').doc(user.uid).set(
    {
      uid: user.uid,
      email: parsedArgs.email,
      name: parsedArgs.name,
      role: parsedArgs.role,
      isActive: true,
      photoURL: user.photoURL ?? null,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  console.log(
    JSON.stringify(
      {
        message: 'Firebase admin account is ready.',
        uid: user.uid,
        email: parsedArgs.email,
        role: parsedArgs.role,
      },
      null,
      2,
    ),
  );
};

void main().catch((error) => {
  console.error('Failed to create Firebase admin:', error);
  process.exit(1);
});

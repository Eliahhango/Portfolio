const requiredFirebaseClientEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
] as const;

type FirebaseClientEnvVar = typeof requiredFirebaseClientEnvVars[number];

const envValues: Record<FirebaseClientEnvVar, string | undefined> = {
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const missingFirebaseClientEnvVars = requiredFirebaseClientEnvVars.filter((key) => {
  const value = envValues[key];
  return typeof value !== 'string' || value.trim().length === 0;
});

export const isFirebaseClientConfigured = missingFirebaseClientEnvVars.length === 0;

export const firebaseClientSetupMessage = isFirebaseClientConfigured
  ? null
  : `Missing frontend admin configuration: ${missingFirebaseClientEnvVars.join(', ')}`;

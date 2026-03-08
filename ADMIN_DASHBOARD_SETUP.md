# Admin Dashboard Setup

## 1. Create a Firebase project

1. Open `https://console.firebase.google.com/`
2. Create or select your project
3. Add a Web App
4. Copy the Firebase web config values

## 2. Enable Firebase Authentication

1. Go to `Authentication`
2. Open `Sign-in method`
3. Enable `Email/Password`
4. Create your admin user in `Authentication > Users`

## 3. Configure frontend environment

Fill these in the root `.env` file:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_API_URL=
```

If the frontend is deployed separately from the backend, keep `VITE_API_URL` empty and configure a Vercel runtime env var instead:

```env
API_PROXY_URL=https://your-backend.example.com
```

The Vercel `/api/*` function will proxy browser requests to that backend.

## 4. Configure backend Firebase Admin

Use one of these in `server/.env`:

```env
FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
```

or

```env
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccount.json
```

If you use `serviceAccount.json`, place it in `server/` and keep it out of git.

## 5. Create the Firestore admin profile

Create a document in the `admins` collection for the admin user.

Recommended document id:

- The Firebase Auth user `uid`

Recommended fields:

```json
{
  "uid": "firebase-auth-user-uid",
  "email": "admin@example.com",
  "name": "Site Admin",
  "role": "main",
  "isActive": true
}
```

Important:

- `email` must exactly match the Firebase Auth email
- `isActive` must be `true`
- `role` can be `main` or `admin`

## 6. Restart both apps

Frontend:

```bash
npm run dev
```

Backend:

```bash
cd server
npm run dev
```

## 7. Test the flow

1. Open `/admin/login`
2. Sign in with the Firebase Auth admin user
3. The frontend sends the Firebase ID token to `/api/admin/verify`
4. The backend verifies the token and checks Firestore `admins`
5. If the profile exists, the dashboard loads

## Common failures

### `Missing frontend admin configuration`

One or more `VITE_...` variables are empty or missing.

### `Admin API calls are going to the wrong server`

If you use Vercel with a separate backend, set `API_PROXY_URL` in Vercel Project Settings so `/api/*` is proxied correctly.

### `Admin access denied`

The Firebase Auth user exists, but there is no matching Firestore `admins` document, or `isActive` is false.

### `Invalid Firebase token`

The backend Firebase Admin SDK is not configured correctly, or the project keys do not match the frontend Firebase project.

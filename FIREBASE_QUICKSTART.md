# 🚀 Firebase Setup - Quick Start

**Complete automated setup in 4 steps!**

## Step 1: Copy Your Admin Key

You have the Firebase admin JSON file. Save it to project root as `firebase-admin-key.json`:

```powershell
Copy-Item "C:\Users\hango\Downloads\studio-q1p9c-firebase-adminsdk-fbsvc-c6a786a3a7.json" -Destination "firebase-admin-key.json"
```

## Step 2: Install Dependencies

```powershell
npm install
```

This installs:
- ✅ firebase-admin (for setup automation)
- ✅ All other project dependencies

## Step 3: Run Setup Script

```powershell
npm run firebase:setup
```

This automatically:
- ✅ Creates Firestore collections (users, posts, visitors, settings)
- ✅ Creates admin user: `admin@elitechwiz.site` / `Admin@123456`
- ✅ Generates `.env.local.generated` with your Web App config
- ✅ Displays security rules to deploy

## Step 4: Get Web App Credentials (API Key, etc)

The script output will show:
```
VITE_FIREBASE_API_KEY=YOUR_API_KEY_FROM_FIREBASE_CONSOLE
```

**How to get these values:**
1. Go to: https://console.firebase.google.com/
2. Select project: `studio-q1p9c`
3. ⚙️ Settings → Project Settings
4. Scroll down → "Your apps" → Select Web App
5. Copy `firebaseConfig` object
6. Extract: `apiKey`, `messagingSenderId`, `appId`

**Or if you don't have them:**
Leave as-is for now. The dashboard will still work with email/admin user setup. The Web App credentials just need to be updated when you have them.

## Step 5: Update .env.local

Copy values from `.env.local.generated` to `.env.local`:

```bash
type .env.local.generated
```

If you got the values from Firebase Console, update them. Otherwise, you can use the auto-filled ones.

## Step 6: Deploy Security Rules

```powershell
# Install Firebase CLI globally (if not already)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy rules
firebase deploy --only firestore:rules
```

## Step 7: Test Locally

```powershell
npm run dev
```

Visit: http://localhost:5173/admin

Login with:
- Email: `admin@elitechwiz.site`
- Password: `Admin@123456`

⚠️ **Change password immediately after first login!**

## That's It! 🎉

Your admin dashboard is now using Firebase. Next steps:
- ✅ Change admin password
- ✅ Upload your Web App credentials to `.env.local`
- ✅ Deploy to production with environment variables

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Firebase admin key not found" | Make sure `firebase-admin-key.json` is in project root |
| "Admin user already exists" | That's fine! Script detected it was created |
| Login fails | Check `.env.local` has correct credentials |
| Dashboard shows no data | Make sure `firestore.rules` deployed successfully |

## Files Created

- ✅ `scripts/setup-firebase.mjs` - Setup automation
- ✅ `firestore.rules` - Security rules (deploy these)
- ✅ `FIREBASE_SETUP.md` - Full detailed guide
- ✅ `.env.local.generated` - Config template

## What's Working Now

- ✅ Admin dashboard with authentication
- ✅ Firestore database with collections
- ✅ Admin user account
- ✅ Security rules (when deployed)
- ✅ Web app configuration

You don't need to log in to anything! The script uses your admin key to set everything up automatically.

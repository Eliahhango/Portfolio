# Firebase Complete Setup Guide

This guide will help you set up Firebase completely for your admin dashboard. **No manual Firebase Console navigation needed** - we use automation!

## What Gets Installed

✅ Firestore collections (users, posts, visitors, settings)  
✅ Admin user account  
✅ Security rules  
✅ Web app configuration  

## Step 1: Save Your Firebase Admin Key

1. You have the Firebase service account JSON file already (`studio-q1p9c-firebase-adminsdk-fbsvc-c6a786a3a7.json`)
2. **Save it to your project root as `firebase-admin-key.json`**

```bash
# Copy your downloaded admin SDK key to the project root
Copy-Item "C:\Users\hango\Downloads\studio-q1p9c-firebase-adminsdk-fbsvc-c6a786a3a7.json" -Destination "firebase-admin-key.json"
```

## Step 2: Install Firebase Admin SDK

```bash
npm install firebase-admin
```

## Step 3: Run Setup Script (Choose One)

### Option A: Using npm script (Recommended)
```bash
npm run firebase:setup
```

### Option B: Direct Node command
```bash
node scripts/setup-firebase.mjs
```

## What the Script Does

1. **Creates Firestore Collections:**
   - `users` - Admin user account
   - `posts` - Blog posts (with sample data)
   - `visitors` - Visitor tracking
   - `settings` - Site configuration

2. **Creates Admin User:**
   - Email: `admin@elitechwiz.site`
   - Password: `Admin@123456` (⚠️ Change immediately!)

3. **Sets Admin Privileges:**
   - Custom claims added for authorization

4. **Generates Web App Config:**
   - Creates `.env.local.generated` with credentials

5. **Displays Security Rules:**
   - Output includes rules to save & deploy

## Step 4: Configure Web App Credentials

The script will display something like:
```
VITE_FIREBASE_API_KEY=YOUR_API_KEY_FROM_FIREBASE_CONSOLE
VITE_FIREBASE_AUTH_DOMAIN=studio-q1p9c.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=studio-q1p9c
...
```

**You have 2 options:**

### Option A: Use auto-generated values (Easy)
- The script automatically fills in `authDomain`, `projectId`, and `storageBucket` correctly
- If you don't have `apiKey`, `messagingSenderId`, and `appId`, you need to get them from Firebase Console

### Option B: Get all values from Firebase Console (Complete)
1. Go to: https://console.firebase.google.com/
2. Select project: `studio-q1p9c`
3. Click ⚙️ Settings → Project Settings
4. Scroll to "Your apps" → Click your web app
5. Copy the firebaseConfig object
6. Extract these values:
   - `apiKey`
   - `messagingSenderId`
   - `appId`

## Step 5: Update .env.local

Copy the values to your `.env.local` file:

```bash
# Copy from .env.local.generated
type .env.local.generated
```

Update the values that need Firebase Console input, then save to `.env.local`:

```env
VITE_FIREBASE_API_KEY=<your_api_key>
VITE_FIREBASE_AUTH_DOMAIN=studio-q1p9c.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=studio-q1p9c
VITE_FIREBASE_STORAGE_BUCKET=studio-q1p9c.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=<your_sender_id>
VITE_FIREBASE_APP_ID=<your_app_id>
```

## Step 6: Deploy Security Rules

1. **Install Firebase CLI (if not already installed):**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```
   
3. **Deploy rules:**
   ```bash
   firebase deploy --only firestore:rules
   ```

## Step 7: Test Your Setup

1. **Restart dev server:**
   ```bash
   npm run dev
   ```

2. **Go to admin page:**
   - Open: http://localhost:5173/admin

3. **Login with:**
   - Email: `admin@elitechwiz.site`
   - Password: `Admin@123456`

4. **Change password immediately:**
   - In the admin panel or Firebase Console Auth settings

## Step 8: Deploy to Production

1. **Build:**
   ```bash
   npm run build
   ```

2. **Deploy to your hosting (Render/Firebase Hosting) with environment variables:**
   - Add the same `.env` variables to your hosting platform

3. **Access your live admin dashboard:**
   - https://www.elitechwiz.site/admin

## Troubleshooting

### ❌ "Firebase admin key not found"
- Make sure you saved the JSON file as `firebase-admin-key.json` in project root
- Check file exists: `Test-Path firebase-admin-key.json`

### ❌ "Admin user already exists"
- Script detected user already created - this is fine
- You can still log in with those credentials

### ❌ "Firestore rules not deployed"
- Run: `firebase deploy --only firestore:rules`
- Ensure you're logged in: `firebase login`

### ❌ "Login fails on admin page"
- Verify `.env.local` has correct Firebase credentials
- Check that Firestore rules are deployed
- Ensure admin user exists in Firebase Auth Console

## Security Notes

⚠️ **Important:**
1. Never commit `firebase-admin-key.json` to Git (.gitignore it)
2. Change the temporary admin password immediately
3. Review Firestore rules in production
4. Enable additional auth methods (Google, GitHub, etc.)
5. Set up Email verification for new users

## Files Created/Modified

Created:
- `scripts/setup-firebase.mjs` - Main setup script
- `firestore.rules` - Security rules (from console output)
- `.env.local.generated` - Generated configuration template

Modified:
- `.env.local` - Add your actual credentials here

## What's Next?

After setup is complete:
1. ✅ Test admin dashboard at `/admin`
2. ✅ Update site settings in admin panel
3. ✅ Add more admin users as needed
4. ✅ Set up email notifications (optional)
5. ✅ Enable analytics (optional)

## Questions?

If anything fails, check:
1. Firebase Admin SDK installed: `npm list firebase-admin`
2. Project ID in admin key: `type firebase-admin-key.json | findstr project_id`
3. Firestore enabled in Firebase Console
4. Authentication enabled in Firebase Console

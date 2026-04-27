# 🚀 Vercel Deployment - Firebase Environment Setup

## Quick Summary

You need **6 Firebase Web App values** for your Vercel deployment:

1. `VITE_FIREBASE_API_KEY` 
2. `VITE_FIREBASE_AUTH_DOMAIN`
3. `VITE_FIREBASE_PROJECT_ID`
4. `VITE_FIREBASE_STORAGE_BUCKET`
5. `VITE_FIREBASE_MESSAGING_SENDER_ID`
6. `VITE_FIREBASE_APP_ID`

---

## ✅ Step-by-Step: Get Missing Values

### Step 1: Extract Values from Service Account (Already Have These)

From your Firebase Admin SDK JSON, you already have:
- **authDomain:** `studio-q1p9c.firebaseapp.com`
- **projectId:** `studio-q1p9c`
- **storageBucket:** `studio-q1p9c.appspot.com`

### Step 2: Get Web App Credentials from Firebase Console

These 3 still need to be retrieved:
- **apiKey**
- **messagingSenderId** 
- **appId**

**How to get them:**

1. Go to: https://console.firebase.google.com/
2. Select project: **studio-q1p9c**
3. Click **⚙️ Settings** (gear icon, top-left)
4. Go to **Project Settings** tab
5. Scroll down to **"Your apps"** section
6. Find your **Web App** (or create one if it doesn't exist)
7. Click on the Web App
8. Copy the **firebaseConfig** object - it looks like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDx...",                    // <- Copy this
  authDomain: "studio-q1p9c.firebaseapp.com",
  projectId: "studio-q1p9c",
  storageBucket: "studio-q1p9c.appspot.com",
  messagingSenderId: "123456789",           // <- Copy this
  appId: "1:123456789:web:abc123...",       // <- Copy this
};
```

---

## 📝 Complete `.env` for Vercel

Once you have all 6 values, here's what to set on Vercel:

```env
VITE_FIREBASE_API_KEY=AIzaSyDx...
VITE_FIREBASE_AUTH_DOMAIN=studio-q1p9c.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=studio-q1p9c
VITE_FIREBASE_STORAGE_BUCKET=studio-q1p9c.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123...
```

---

## 🔗 Deploy to Vercel (Step-by-Step)

### Step 1: Go to your Vercel project

1. Visit: https://vercel.com/dashboard
2. Select your Portfolio project
3. Go to **Settings** tab

### Step 2: Add Environment Variables

1. Go to **Settings** → **Environment Variables**
2. Add each variable:

| Name | Value |
|------|-------|
| `VITE_FIREBASE_API_KEY` | `Your API Key from Firebase` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `studio-q1p9c.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `studio-q1p9c` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `studio-q1p9c.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `Your Sender ID from Firebase` |
| `VITE_FIREBASE_APP_ID` | `Your App ID from Firebase` |

### Step 3: Deploy

1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Or make a commit to trigger auto-deploy
4. Wait for build to complete

### Step 4: Test

1. Visit: `https://www.elitechwiz.site/admin`
2. Login with: 
   - Email: `admin@elitechwiz.site`
   - Password: `Admin@123456`

---

## 📁 Files Created

✅ `.env.production` - Template for production
✅ `.env.local` - Already exists for local dev
✅ This guide - Setup instructions

---

## ⚠️ Important Notes

- **Never commit `.env` to Git** - Use Vercel's environment variable settings
- **Different from `.env.local`** - Vercel env vars override local ones
- **API Key is public** - It's safe to put in Vercel (it's client-side)
- **Service account is private** - Never put in Vercel (backend only)
- **Changes take effect** - After you redeploy

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| "apiKey is missing" | Check you added all 6 env vars to Vercel |
| Login doesn't work | Verify Firebase auth is enabled in Console |
| Firestore returns 401 | Check security rules deployed correctly |
| Build fails | Run `npm run build` locally first to verify |

---

## 🎯 Quick Checklist

- [ ] Got Web App credentials from Firebase Console
- [ ] Created `.env.production` locally
- [ ] Added all 6 variables to Vercel Environment Variables
- [ ] Redeployed project on Vercel
- [ ] Tested admin dashboard: `https://www.elitechwiz.site/admin`
- [ ] Logged in successfully
- [ ] Changed admin password

---

## 📊 Environment Variables Explained

| Variable | Where It Comes From | Purpose |
|----------|-------------------|---------|
| `VITE_FIREBASE_API_KEY` | Firebase Console → Web App Config | Authenticates your app with Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase project name + `.firebaseapp.com` | Firebase authentication domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase service account → `project_id` | Identifies your Firebase project |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase project + `.appspot.com` | Firebase Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Console → Web App Config | Cloud Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase Console → Web App Config | Unique app identifier |

---

## 📚 What's Next

1. Get the 3 missing values from Firebase Console
2. Add all 6 to Vercel Environment Variables
3. Redeploy
4. Your admin dashboard goes live! 🚀

That's it! Your production Firebase setup is complete.

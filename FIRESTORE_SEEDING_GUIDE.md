# Firestore Content Seeding Guide

This guide explains how to upload your existing portfolio content (blog posts, projects, and services) to Firestore.

## What Gets Uploaded

The seed script will upload:
- **Blog Posts** from `constants/blogData.ts` → `posts` collection
- **Projects** from `constants.tsx` → `projects` collection  
- **Services** (6 default services) → `services` collection

All content will be marked as `published: true` with timestamps.

## Prerequisites

1. Ensure your Firebase environment variables are set in `.env.local`
2. Firebase must be initialized in your project
3. Firestore database must be created (go to Firebase Console > Firestore Database)

## How to Seed Content

### Option 1: Using Node.js directly

```bash
# Run the seed script
node scripts/seedFirestore.ts
```

### Option 2: Using TypeScript compilation

```bash
# Compile and run
npx ts-node scripts/seedFirestore.ts
```

## What to Expect

When the script runs, you'll see output like:

```
🚀 Starting Firestore seed...
📝 Uploading blog posts...
✅ Added post: Your First Blog Post
✅ Added post: Another Great Post
...
🎨 Uploading projects...
✅ Added project: SecureAuth Platform
...
⚙️ Uploading services...
✅ Added service: Web Development
...
✨ Firestore seed completed successfully!
```

## Verifying in Firebase Console

1. Go to your Firebase Console
2. Navigate to Firestore Database
3. You should see three collections:
   - `posts` - with blog posts
   - `projects` - with portfolio projects
   - `services` - with service offerings

Each document will have:
- `title`, `description`
- `published: true`
- `createdAt` and `updatedAt` timestamps

## Firestore Collection Structure

### Posts Collection

```
{
  title: "Blog Post Title",
  slug: "blog-post-slug",
  description: "Post excerpt",
  categories: ["Technology"],
  tags: ["react", "firebase"],
  cover: "https://...",
  published: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Projects Collection

```
{
  title: "Project Title",
  description: "Short description",
  longDescription: "Detailed description",
  image: "https://...",
  tags: ["React", "TypeScript"],
  liveUrl: "https://...",
  githubUrl: "https://...",
  published: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### Services Collection

```
{
  title: "Service Title",
  description: "Service description",
  icon: "🚀",
  path: "service-slug",
  image: "https://...",
  order: 1,
  published: true,
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## After Seeding

Once content is in Firestore:

1. **Admin Dashboard** will show:
   - Total blog posts count
   - Published projects count
   - Active services count
   - Recent items from Firestore

2. **Public Pages** will display:
   - Blog posts from `posts` collection
   - Projects from `projects` collection
   - Services from `services` collection

3. **Admin Panel** will allow you to:
   - Create new content
   - Edit existing content
   - Delete content
   - Toggle published status

## Error Handling

All errors are logged safely without exposing Firebase details to users. Technical errors are logged in browser console (development mode only) and converted to user-friendly messages.

## Important Notes

⚠️ **Security:**
- All error messages are generic and don't expose Firebase
- Activity logging tracks all content operations
- Published/draft status controls visibility

📌 **Content Updates:**
- After seeding, you can manage all content through the Admin Panel
- No need to run this script again unless you want to reset to original content
- The seed script doesn't delete existing content, just adds new entries

## Troubleshooting

### Script doesn't run
- Verify Node.js is installed: `node --version`
- Check Firebase config in `.env.local`

### Firestore connection errors
- Verify Firebase project is set up correctly
- Check that Firestore database exists
- Verify authentication rules allow writes

### Content not appearing
- Check Firestore console for documents
- Verify `published: true` field is set
- Check browser console for errors (not exposed to users)

## Need Help?

If the seed fails, you can manually add content through:
1. Firebase Console > Firestore Database > Add Document
2. Admin Panel > Content tab (after seeding initial content)

---

**Your existing constants are now safe in Firestore!** 🎉

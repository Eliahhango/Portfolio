# Admin Dashboard Setup Guide

## Quick Start

### 1. Backend Setup

```bash
# Install backend dependencies
npm run server:install

# Create .env file in server/ directory
cd server
cp .env.example .env
# Edit .env and add your MongoDB URI and JWT_SECRET
```

### 2. Start Backend Server

```bash
# From project root
npm run server:dev

# Or from server directory
cd server
npm run dev
```

### 3. Create First Admin (Main Admin)

The first admin you register will automatically become the main admin.

**Option 1: Using API**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@elitechwiz.com",
    "password": "your-secure-password",
    "name": "Your Name"
  }'
```

**Option 2: Using Postman/Thunder Client**
- POST to `http://localhost:5000/api/auth/register`
- Body: `{ "email": "...", "password": "...", "name": "..." }`

### 4. Access Admin Dashboard

1. Start frontend dev server:
```bash
npm run dev
```

2. Navigate to: `http://localhost:3000/admin.html`

3. Login with your admin credentials

## Features

### Main Admin (You)
- ✅ Create/Edit/Delete Services
- ✅ Edit Website Content
- ✅ Add/Remove Other Admins
- ✅ Activate/Deactivate Admins
- ✅ Cannot delete yourself
- ✅ Cannot be deleted by others

### Regular Admins
- ✅ Create/Edit/Delete Services
- ✅ Edit Website Content
- ❌ Cannot manage other admins
- ❌ Cannot delete main admin

## Environment Variables

### Frontend (.env in root)
```env
VITE_API_URL=http://localhost:5000
VITE_GEMINI_API_KEY=your-gemini-api-key
```

### Backend (server/.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use: `mongodb://localhost:27017/portfolio`

### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `server/.env`

## Deployment

### Backend (Vercel/Railway/Render)
1. Deploy server folder separately
2. Set environment variables
3. Update `VITE_API_URL` in frontend

### Frontend
- Admin dashboard is accessible at `/admin.html`
- Make sure to set `VITE_API_URL` to your backend URL

## Security Notes

- Change `JWT_SECRET` to a strong random string in production
- Use HTTPS in production
- Keep MongoDB connection string secure
- Regularly update dependencies


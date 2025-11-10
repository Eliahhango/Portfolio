# Admin Dashboard Features

## 🎯 Overview

A comprehensive admin dashboard system that allows you to manage your portfolio website content, services, and other administrators.

## ✨ Features

### 🔐 Authentication & Authorization
- **Secure Login**: JWT-based authentication
- **Role-Based Access**: Main Admin vs Regular Admin
- **Session Management**: Persistent login with localStorage

### 👤 Admin Management (Main Admin Only)
- ✅ Create new admins
- ✅ View all admins
- ✅ Activate/Deactivate admins
- ✅ Delete admins (except main admin)
- ✅ Cannot delete yourself
- ✅ Cannot delete other main admins
- ✅ Protected main admin account

### 🛠️ Service Management (All Admins)
- ✅ Create new services
- ✅ Edit existing services
- ✅ Delete services
- ✅ Activate/Deactivate services
- ✅ Set service order/priority
- ✅ Add features list
- ✅ Set pricing information
- ✅ Categorize services (Cybersecurity, Development, Design, Consulting)

### 📝 Content Management (All Admins)
- ✅ Edit any website content
- ✅ Create new content items
- ✅ Update content by key (e.g., hero-title, about-text)
- ✅ Organize by sections
- ✅ Support for text, HTML, and JSON content types
- ✅ Filter content by section

### 📊 Dashboard Overview
- ✅ Statistics overview
- ✅ Quick actions
- ✅ Recent activity (coming soon)

## 🚀 Getting Started

### 1. Install Backend Dependencies
```bash
npm run server:install
```

### 2. Setup Environment Variables
Create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### 3. Start Backend Server
```bash
npm run server:dev
```

### 4. Create First Admin (Main Admin)
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@elitechwiz.com",
    "password": "your-secure-password",
    "name": "Your Name"
  }'
```

### 5. Access Admin Dashboard
- Start frontend: `npm run dev`
- Navigate to: `http://localhost:3000/admin.html`
- Login with your credentials

## 📁 Project Structure

```
Portfolio/
├── server/                 # Backend API
│   ├── src/
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth middleware
│   │   └── index.ts       # Server entry
│   └── package.json
├── components/
│   └── admin/             # Admin dashboard components
│       ├── AdminLogin.tsx
│       ├── AdminDashboard.tsx
│       ├── ServicesManager.tsx
│       ├── ContentManager.tsx
│       ├── AdminsManager.tsx
│       └── DashboardStats.tsx
├── admin.html             # Admin dashboard entry
└── admin.tsx              # Admin app root
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation
- Protected routes
- Main admin protection

## 📡 API Endpoints

See `server/README.md` for complete API documentation.

## 🎨 UI Features

- Modern, responsive design
- Dark mode support
- Smooth animations
- Intuitive interface
- Real-time updates
- Error handling
- Loading states

## 🚀 Deployment

### Backend
Deploy the `server/` folder to:
- Railway
- Render
- Heroku
- Vercel (serverless functions)
- Your own server

### Frontend
- Admin dashboard builds to `/admin.html`
- Set `VITE_API_URL` to your backend URL
- Deploy normally with your frontend

## 📝 Notes

- First admin registered becomes main admin automatically
- After first admin, registration is closed
- Main admin can add other admins
- Regular admins can only manage content and services
- All changes are tracked with timestamps


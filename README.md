# 👨‍💻 EliTechWiz Portfolio

<div align="center">

**Cybersecurity Expert | Software Architect | Creative Designer**

*Merging technology, design, and strategy to build secure, innovative, and impactful digital experiences.*

[![GitHub](https://img.shields.io/badge/GitHub-Eliahhango-black?logo=github)](https://github.com/Eliahhango)
[![YouTube](https://img.shields.io/badge/YouTube-@eliahhango-red?logo=youtube)](https://youtube.com/@eliahhango)
[![Email](https://img.shields.io/badge/Email-contact@elitechwiz.com-blue?logo=gmail)](mailto:contact@elitechwiz.com)

</div>

---

## 🎯 About Me

I'm **EliTechWiz**, a visionary technologist specializing in cybersecurity, software development, and design. With expertise in penetration testing, secure application development, and UI/UX design, I help businesses build secure and innovative digital solutions.

**Services:**
- 🔒 Cybersecurity Consulting & Penetration Testing
- 💻 Software Development & System Architecture
- 🎨 UI/UX Design & User Experience Optimization

---

## 🚀 Quick Deploy

Deploy this portfolio to your preferred platform:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Eliahhango/Portfolio)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Eliahhango/Portfolio)

---

## ✨ Features

- **Portfolio Website** - Modern, responsive design with dark mode
- **Admin Dashboard** - Full content management system (`/admin.html`)
- **Visitor Analytics** - Track visitors, pages, devices, and browsers
- **Contact Management** - Receive and manage contact form submissions
- **AI Chatbot** - Google Gemini-powered support assistant
- **Security** - Rate limiting, data sanitization, and security headers
- **Role-Based Access** - Main admin and regular admin roles

---

## 🛠️ Tech Stack

**Frontend:**
- React 19 + TypeScript
- Tailwind CSS + Framer Motion
- Vite for building

**Backend:**
- Node.js + Express.js + TypeScript
- MongoDB with Mongoose
- JWT authentication
- Security: Helmet, Rate Limiting, Data Sanitization

---

## 📦 Quick Start

```bash
# Clone the repository
git clone https://github.com/Eliahhango/Portfolio.git
cd Portfolio

# Install dependencies
npm install
cd server && npm install && cd ..

# Development
npm run dev              # Frontend (port 3000)
npm run server:dev       # Backend (port 5000)

# Production Build
npm run build            # Frontend
cd server && npm run build && npm start  # Backend
```

---

## 🚀 Deployment

### Single Deployment (Recommended - Render)

Deploy both frontend and backend together:

1. **Push code to GitHub**
2. **Create Web Service on Render:**
   - Build Command: `npm install && npm run build && cd server && npm install && npm run build`
   - Start Command: `cd server && npm start`
3. **Add MongoDB (Choose one):**
   - **Render MongoDB:** Create MongoDB service in Render, use internal connection string
   - **MongoDB Atlas:** Create free cluster, get connection string
   
4. **Environment Variables:**
   - `MONGODB_URI` - MongoDB connection string (from Render MongoDB or Atlas)
   - `JWT_SECRET` - Random 32+ character string
   - `NODE_ENV=production`
   - `PORT=10000`

**Access:**
- Main site: `https://yoursite.onrender.com`
- Admin: `https://yoursite.onrender.com/admin.html`

### Frontend Only (Vercel/Netlify)

For frontend-only deployment, use the deploy buttons above. Note: Admin features require backend deployment.

---

## ⚙️ Setup

### Database Options (Choose One)

The app automatically detects which database is configured:

**Option 1: MongoDB Atlas (Free Forever)** ⭐ Recommended
- Create free cluster: https://www.mongodb.com/cloud/atlas
- Set `MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio`

**Option 2: Render MongoDB**
- Create MongoDB service in Render dashboard
- Use internal connection string
- Set `MONGODB_URI=<render-mongodb-connection-string>`

**Option 3: Render External Database URL (MongoDB)**
- Create MongoDB service in Render (not PostgreSQL!)
- Get external connection string from MongoDB service
- Set `DATABASE_URL=<external-mongodb-connection-string>`

**Option 4: Local MongoDB (Development)**
- Install MongoDB locally
- No config needed - defaults to `mongodb://localhost:27017/portfolio`

### Environment Variables

**Required:**
- `JWT_SECRET` - Random 32+ character string

**Optional (Database - choose one):**
- `MONGODB_URI` - MongoDB connection string (Atlas, Render MongoDB internal, or custom)
- `DATABASE_URL` - Render external MongoDB connection string (must be MongoDB, not PostgreSQL)
- If neither is set, defaults to `mongodb://localhost:27017/portfolio` (dev only)

**Note:** Render's default external database is PostgreSQL - you need to create a MongoDB service instead!

**Optional (Other):**
- `VITE_GEMINI_API_KEY` - Google Gemini API key (for chatbot)

### Create First Admin

After MongoDB is connected, create admin:
```javascript
fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'SecurePassword123!',
    name: 'Admin Name'
  })
})
```

---

## 📱 Connect

- 📧 **Email:** [contact@elitechwiz.com](mailto:contact@elitechwiz.com)
- 📱 **Phone:** +255 688 164 510
- 🐙 **GitHub:** [@Eliahhango](https://github.com/Eliahhango)
- 📺 **YouTube:** [@eliahhango](https://youtube.com/@eliahhango)

---

## 📚 Documentation

- `DATABASE_SETUP.md` - Complete database setup guide (all options)
- `LOCAL_SETUP.md` - Local development setup

---

<div align="center">

**Built with ❤️ by EliTechWiz**

⭐ Star this repo if you find it helpful!

</div>

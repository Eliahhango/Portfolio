# Portfolio Backend API

Backend server for the EliTechWiz Portfolio admin dashboard.

## Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Create `.env` file:**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

3. **Start MongoDB:**
   - Make sure MongoDB is running on your system
   - Or use MongoDB Atlas (cloud) and update `MONGODB_URI`

4. **Run the server:**
   ```bash
   npm run dev
   ```

## First Time Setup

1. **Create Main Admin:**
   - The first admin registered will automatically be the main admin
   - Use the registration endpoint: `POST /api/auth/register`
   - After the first admin is created, registration is closed

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register first admin (main admin)
- `POST /api/auth/login` - Login admin

### Admin Management (Main Admin Only)
- `GET /api/admin` - Get all admins
- `POST /api/admin` - Create new admin
- `PUT /api/admin/:id` - Update admin
- `DELETE /api/admin/:id` - Delete admin
- `GET /api/admin/me` - Get current admin info

### Services
- `GET /api/services` - Get all active services (public)
- `GET /api/services/admin` - Get all services (admin)
- `GET /api/services/:id` - Get single service
- `POST /api/services` - Create service (admin)
- `PUT /api/services/:id` - Update service (admin)
- `DELETE /api/services/:id` - Delete service (admin)

### Content
- `GET /api/content` - Get all content
- `GET /api/content/section/:section` - Get content by section
- `GET /api/content/:key` - Get single content item
- `POST /api/content` - Create/update content (admin)
- `PUT /api/content/:key` - Update content (admin)
- `DELETE /api/content/:key` - Delete content (admin)

## Admin Roles

- **Main Admin**: Can manage admins, services, and content
- **Admin**: Can manage services and content only (cannot manage other admins)

## Security

- All admin routes require JWT authentication
- Passwords are hashed using bcrypt
- Main admin cannot be deleted or modified by other admins


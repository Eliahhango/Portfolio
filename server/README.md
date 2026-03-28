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
   ADMIN_API_TOKEN=replace_with_a_long_random_token
   TURNSTILE_SECRET=replace_with_turnstile_secret
   FRONTEND_URL=https://www.elitechwiz.site
   NODE_ENV=development
   ```
   If you are using Firebase-only data flows, you can leave `MONGODB_URI`/`DATABASE_URL` unset and the API will run in Firebase-first mode (DB-backed routes return `503` instead of crashing).

3. **Start MongoDB:**
   - Make sure MongoDB is running on your system
   - Or use MongoDB Atlas (cloud) and update `MONGODB_URI`

4. **Run the server:**
   ```bash
   npm run dev
   ```

## API Endpoints

### Public
- `POST /api/contact/submit` - Contact form submission (Turnstile-protected)
- `POST /api/visitors/track` - Visitor analytics event
- `POST /api/newsletter/subscribe` - Newsletter signup
- `POST /api/newsletter/confirm` - Newsletter confirmation
- `GET /api/blog` - Blog listing
- `GET /api/blog/:slug` - Blog post
- `GET /api/services` - Active services
- `GET /api/content` - Content listing

### Protected Admin (Bearer token required)
- `GET /api/contact` - List contact messages
- `GET /api/contact/:id` - Get contact message details
- `PATCH /api/contact/:id/status` - Update contact message status
- `DELETE /api/contact/:id` - Delete contact message
- `GET /api/visitors/analytics` - Analytics summary
- `GET /api/visitors/recent` - Recent visits
- `GET /api/audit` - Audit activity list (main admin only)

## Admin Roles

- **Main Admin**: Can manage admins, services, and content
- **Admin**: Can manage services and content only (cannot manage other admins)

## Security

- Protected routes require `Authorization: Bearer <ADMIN_API_TOKEN>`
- Main-admin-only routes support separate `MAIN_ADMIN_API_TOKEN(S)`
- Contact submissions enforce Turnstile in production
- Rate limits are enabled on API, contact, newsletter, and visitor tracking endpoints

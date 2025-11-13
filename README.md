# Portfolio Website

A modern, responsive portfolio website with a full content management system, visitor analytics, and more.

## Features

- **Portfolio Website:** Modern, responsive design with dark mode.
- **Admin Dashboard:** Full content management system.
- **Visitor Analytics:** Track visitors, pages, devices, and browsers.
- **Contact Management:** Receive and manage contact form submissions.
- **AI Chatbot:** Google Gemini-powered support assistant.
- **Security:** Rate limiting, data sanitization, and security headers.
- **Role-Based Access:** Main admin and regular admin roles.

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS, Framer Motion, Vite
- **Backend:** Node.js, Express.js, TypeScript, MongoDB, Mongoose, JWT

## Quick Start

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Eliahhango/Portfolio.git
    cd Portfolio
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    cd server && npm install && cd ..
    ```
3.  **Run in development:**
    ```bash
    # Frontend (http://localhost:3000)
    npm run dev

    # Backend (http://localhost:5000)
    npm run server:dev
    ```

## Deployment

Deploy both the frontend and backend to a service like Render.

1.  **Push your code to GitHub.**
2.  **Create a new Web Service on Render.**
    -   **Build Command:** `npm install && npm run build && cd server && npm install && npm run build`
    -   **Start Command:** `cd server && npm start`
3.  **Add a MongoDB database.** You can use Render's MongoDB or a free cluster from MongoDB Atlas.
4.  **Set Environment Variables:**
    -   `MONGODB_URI`: Your MongoDB connection string.
    -   `JWT_SECRET`: A random secret key (at least 32 characters).
    -   `NODE_ENV`: `production`
    -   `PORT`: `10000`

## Configuration

-   The application uses MongoDB. Set the `MONGODB_URI` environment variable to connect to your database. If not set, it defaults to `mongodb://localhost:27017/portfolio` for local development.
-   For the AI Chatbot, set the `VITE_GEMINI_API_KEY` environment variable with your Google Gemini API key.

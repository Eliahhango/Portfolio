# EliTechWiz - Professional Business Portfolio

![Project Banner](https://images.unsplash.com/photo-1559028006-44d5a2b72bf9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)

<p align="center">
  A sleek, modern, and fully responsive portfolio website for **EliTechWiz Company Ltd.**, built with React, TypeScript, and Tailwind CSS.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-blue?logo=tailwind-css" alt="Tailwind CSS">
</p>

---

## 🚀 Live Demo

[**[Your Live URL Here]**](https://your-live-url.com)

## ✨ Features

-   **Stunning UI/UX:** A modern, tech-inspired design with a futuristic aesthetic.
-   **Fully Responsive:** Flawless viewing experience on all devices, from mobile phones to widescreen desktops.
-   **Dark/Light Mode:** A theme toggle with local storage persistence for user preference.
-   **Interactive Animations:** Smooth, engaging animations powered by `framer-motion`.
-   **Dynamic Content:**
    -   Animated particle background for a high-tech feel.
    -   Engaging typewriter effect in the hero section.
    -   Auto-counting stats that animate on scroll.
-   **Comprehensive Showcase:**
    -   Detailed **"My Journey"** timeline to narrate your professional story.
    -   Organized **"Expertise"** section covering Software, Cybersecurity, and Civil Engineering.
    -   Interactive project portfolio with detailed modal pop-ups.
-   **User-Friendly Navigation:** Sticky header, active link highlighting, and a scroll-to-top button.

## 🛠️ Tech Stack

-   **Frontend:** [React](https://react.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (version 18 or later) installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Eliahhango/your-repo-name.git
    cd your-repo-name
    ```
2.  **Install dependencies:**
    *(This project uses a direct CDN importmap setup for development, so no `npm install` is needed for local viewing. Simply open `index.html` in a live server.)*

### Running Locally

Since this project uses ES modules and an importmap, you can run it with any local web server. A popular choice is the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code.

1.  Open the project folder in VS Code.
2.  Right-click on `index.html`.
3.  Select "Open with Live Server".

## 🚀 Deployment

This project is a static site and can be deployed to any static hosting service. Here are instructions for a few popular platforms.

**Note:** For a production deployment, you would typically use a build tool like Vite or Create React App to bundle your TypeScript and React code into optimized static files. The following instructions assume a build process that outputs to a `dist` or `build` folder.

### Vercel (Recommended)

1.  Fork this repository to your own GitHub account.
2.  Sign up or log in to [Vercel](https://vercel.com/).
3.  Click "Add New..." -> "Project".
4.  Import the forked repository from GitHub.
5.  Vercel will automatically detect that it's a React project and configure the build settings for you.
6.  Click **Deploy**. Your site will be live in minutes!

### Netlify

1.  Fork this repository.
2.  Sign up or log in to [Netlify](https://www.netlify.com/).
3.  Click "Add new site" -> "Import an existing project".
4.  Connect to your Git provider (e.g., GitHub) and select the forked repository.
5.  Netlify will likely auto-detect the settings. If not, configure as follows:
    -   **Build command:** `npm run build` (or your build script)
    -   **Publish directory:** `dist` (or your output directory)
6.  Click **Deploy site**.

### Render

1.  Fork this repository.
2.  Sign up or log in to [Render](https://render.com/).
3.  Click "New +" -> "Static Site".
4.  Connect your GitHub account and select the forked repository.
5.  Configure the settings:
    -   **Build command:** `npm run build`
    -   **Publish directory:** `./dist`
6.  Click **Create Static Site**.

### Heroku

While Heroku is primarily for backend applications, you can deploy a static site using a buildpack.

1.  Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).
2.  Log in to Heroku: `heroku login`.
3.  Create a new Heroku app: `heroku create your-app-name`.
4.  Set the static buildpack for your app:
    ```sh
    heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git
    ```
5.  Create a file named `static.json` in the root of your project with the following content (assuming a `build` output folder):
    ```json
    {
      "root": "build/",
      "routes": {
        "/**": "index.html"
      }
    }
    ```
6.  Commit the `static.json` file and push to Heroku:
    ```sh
    git add .
    git commit -m "Add static.json for Heroku deployment"
    git push heroku main
    ```

## 🙏 Acknowledgements

-   Fonts from [Google Fonts](https://fonts.google.com/).
-   Icons from various open-source libraries.
-   Images from [Unsplash](https://unsplash.com/).

## 📄 License

This project is licensed under the MIT License.

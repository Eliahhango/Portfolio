import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Terms from './pages/utility/Terms';
import Privacy from './pages/utility/Privacy';
import Security from './pages/utility/Security';
import Status from './pages/utility/Status';
import Community from './pages/utility/Community';
import Docs from './pages/utility/Docs';
import Cookies from './pages/utility/Cookies';
import DNSMPI from './pages/utility/DNSMPI';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/security" element={<Security />} />
        <Route path="/status" element={<Status />} />
        <Route path="/community" element={<Community />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/dnsmpi" element={<DNSMPI />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

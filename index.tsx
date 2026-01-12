import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import CaseStudies from './pages/CaseStudies';
import CaseStudy from './pages/CaseStudy';
import ConfirmSubscription from './pages/ConfirmSubscription';
import Booking from './pages/Booking';
import Downloads from './pages/Downloads';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Security from './pages/Security';
import Status from './pages/Status';
import Community from './pages/Community';
import Docs from './pages/Docs';
import Cookies from './pages/Cookies';
import DNSMPI from './pages/DNSMPI';

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
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/case-studies/:slug" element={<CaseStudy />} />
        <Route path="/newsletter/confirm/:token" element={<ConfirmSubscription />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/downloads" element={<Downloads />} />
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

import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { initVisitorTracking } from './utils/visitorTracking';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollProgress from './components/ScrollProgress';
import SkipToContent from './components/SkipToContent';
import AnimatedParticles from './components/AnimatedParticles';
import Newsletter from './components/Newsletter';
import { ModalSkeleton } from './components/LoadingSkeleton';
import ChatbotIcon from './components/ChatbotIcon';
import Chatbot from './components/Chatbot';
import SEO from './components/SEO';
import NotFound from './pages/NotFound';
import ErrorBoundary from './pages/ErrorBoundary';

// Lazy load pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Lazy load modals for better performance
const PrivacyModal = lazy(() => import('./components/PrivacyModal'));
const DocumentationModal = lazy(() => import('./components/DocumentationModal'));
const TermsModal = lazy(() => import('./components/TermsModal'));
const SecurityModal = lazy(() => import('./components/SecurityModal'));
const CookieModal = lazy(() => import('./components/CookieModal'));
const DnsmpiModal = lazy(() => import('./components/DnsmpiModal'));
const CommunityModal = lazy(() => import('./components/CommunityModal'));
const StatusModal = lazy(() => import('./components/StatusModal'));

const App: React.FC = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [isDnsmpiModalOpen, setIsDnsmpiModalOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  useEffect(() => {
    // Initialize visitor tracking
    initVisitorTracking();
  }, []);

  // Memoize modal handlers to prevent unnecessary re-renders
  const modalHandlers = {
    privacy: useCallback(() => setIsPrivacyModalOpen(true), []),
    docs: useCallback(() => setIsDocsModalOpen(true), []),
    terms: useCallback(() => setIsTermsModalOpen(true), []),
    security: useCallback(() => setIsSecurityModalOpen(true), []),
    cookie: useCallback(() => setIsCookieModalOpen(true), []),
    dnsmpi: useCallback(() => setIsDnsmpiModalOpen(true), []),
    community: useCallback(() => setIsCommunityModalOpen(true), []),
    status: useCallback(() => setIsStatusModalOpen(true), []),
  };

  const modalCloseHandlers = {
    privacy: useCallback(() => setIsPrivacyModalOpen(false), []),
    docs: useCallback(() => setIsDocsModalOpen(false), []),
    terms: useCallback(() => setIsTermsModalOpen(false), []),
    security: useCallback(() => setIsSecurityModalOpen(false), []),
    cookie: useCallback(() => setIsCookieModalOpen(false), []),
    dnsmpi: useCallback(() => setIsDnsmpiModalOpen(false), []),
    community: useCallback(() => setIsCommunityModalOpen(false), []),
    status: useCallback(() => setIsStatusModalOpen(false), []),
  };

  return (
      <ErrorBoundary>
        <div className="bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-600 dark:text-gray-200 min-h-screen" style={{ overflowX: 'hidden' }}>
          <SEO />
          <SkipToContent />
          <ScrollProgress />
          <AnimatedParticles />
          <Header />
          <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <Suspense fallback={<ModalSkeleton />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Newsletter />
          <Footer />
          
          <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 items-end">
              <ScrollToTopButton />
              <ChatbotIcon 
                onClick={() => setIsChatbotOpen(!isChatbotOpen)} 
                isOpen={isChatbotOpen}
              />
          </div>
          
          {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
          
          <Suspense fallback={<ModalSkeleton />}>
            {isPrivacyModalOpen && <PrivacyModal onClose={modalCloseHandlers.privacy} />}
            {isDocsModalOpen && <DocumentationModal onClose={modalCloseHandlers.docs} />}
            {isTermsModalOpen && <TermsModal onClose={modalCloseHandlers.terms} />}
            {isSecurityModalOpen && <SecurityModal onClose={modalCloseHandlers.security} />}
            {isCookieModalOpen && <CookieModal onClose={modalCloseHandlers.cookie} />}
            {isDnsmpiModalOpen && <DnsmpiModal onClose={modalCloseHandlers.dnsmpi} />}
            {isCommunityModalOpen && <CommunityModal onClose={modalCloseHandlers.community} />}
            {isStatusModalOpen && <StatusModal onClose={modalCloseHandlers.status} />}
          </Suspense>
        </div>
      </ErrorBoundary>
  );
};

export default App;

import React, { useState, useEffect, useCallback, lazy, Suspense, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
const Services = lazy(() => import('./pages/Services'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const Admin = lazy(() => import('./pages/Admin'));

// Lazy load service detail pages
const WebDevelopment = lazy(() => import('./pages/services/WebDevelopment'));
const SecurityConsulting = lazy(() => import('./pages/services/SecurityConsulting'));
const PenetrationTesting = lazy(() => import('./pages/services/PenetrationTesting'));
const AuthenticationSystems = lazy(() => import('./pages/services/AuthenticationSystems'));
const SystemArchitecture = lazy(() => import('./pages/services/SystemArchitecture'));
const CodeAuditing = lazy(() => import('./pages/services/CodeAuditing'));

// Lazy load utility pages
const Terms = lazy(() => import('./pages/utility/Terms'));
const Privacy = lazy(() => import('./pages/utility/Privacy'));
const Security = lazy(() => import('./pages/utility/Security'));
const Status = lazy(() => import('./pages/utility/Status'));
const Community = lazy(() => import('./pages/utility/Community'));
const Docs = lazy(() => import('./pages/utility/Docs'));
const Cookies = lazy(() => import('./pages/utility/Cookies'));
const DNSMPI = lazy(() => import('./pages/utility/DNSMPI'));

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
  useEffect(() => {
    // Initialize visitor tracking
    initVisitorTracking();
  }, []);

  return (
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = useMemo(() => location.pathname.startsWith('/admin'), [location.pathname]);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [isDnsmpiModalOpen, setIsDnsmpiModalOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

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
    <div className="bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-600 dark:text-gray-200 min-h-screen" style={{ overflowX: 'hidden' }}>
      <SEO />
      {!isAdminRoute && <SkipToContent />}
      <ScrollProgress />
      {!isAdminRoute && <AnimatedParticles />}
      {!isAdminRoute && <Header />}
      <main className={`relative z-10 ${!isAdminRoute ? 'px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto' : ''}`}>
        <Suspense fallback={<ModalSkeleton />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/security-consulting" element={<SecurityConsulting />} />
            <Route path="/services/penetration-testing" element={<PenetrationTesting />} />
            <Route path="/services/authentication-systems" element={<AuthenticationSystems />} />
            <Route path="/services/system-architecture" element={<SystemArchitecture />} />
            <Route path="/services/code-auditing" element={<CodeAuditing />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/security" element={<Security />} />
            <Route path="/status" element={<Status />} />
            <Route path="/community" element={<Community />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/dnsmpi" element={<DNSMPI />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Newsletter />}
      {!isAdminRoute && <Footer />}
      
      {!isAdminRoute && (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 items-end">
            <ScrollToTopButton />
            <ChatbotIcon 
              onClick={() => setIsChatbotOpen(!isChatbotOpen)} 
              isOpen={isChatbotOpen}
            />
        </div>
      )}
      
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
  );
};

export default App;

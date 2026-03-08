import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { initVisitorTracking } from './utils/visitorTracking';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Skills';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollProgress from './components/ScrollProgress';
import SkipToContent from './components/SkipToContent';
import AnimatedParticles from './components/AnimatedParticles';
import Newsletter from './components/Newsletter';
import { ModalSkeleton } from './components/LoadingSkeleton';
import CTA from './components/CTA';
import ProjectModal from './components/ProjectModal';
import ChatbotIcon from './components/ChatbotIcon';
import Chatbot from './components/Chatbot';
import type { Project } from './types';
import SEO from './components/SEO';
import NotFound from './pages/NotFound';
import ErrorBoundary from './pages/ErrorBoundary';
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

const PrivacyModal = lazy(() => import('./components/PrivacyModal'));
const DocumentationModal = lazy(() => import('./components/DocumentationModal'));
const TermsModal = lazy(() => import('./components/TermsModal'));
const SecurityModal = lazy(() => import('./components/SecurityModal'));
const CookieModal = lazy(() => import('./components/CookieModal'));
const DnsmpiModal = lazy(() => import('./components/DnsmpiModal'));
const CommunityModal = lazy(() => import('./components/CommunityModal'));
const StatusModal = lazy(() => import('./components/StatusModal'));

const ProtectedRoute = lazy(() => import('./src/components/admin/ProtectedRoute'));
const AdminLogin = lazy(() => import('./src/pages/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./src/pages/admin/AdminLayout'));
const Dashboard = lazy(() => import('./src/pages/admin/Dashboard'));
const Messages = lazy(() => import('./src/pages/admin/Messages'));
const NewsletterAdmin = lazy(() => import('./src/pages/admin/Newsletter'));
const BlogManager = lazy(() => import('./src/pages/admin/BlogManager'));
const Visitors = lazy(() => import('./src/pages/admin/Visitors'));
const ServicesAdmin = lazy(() => import('./src/pages/admin/Services'));
const SettingsPage = lazy(() => import('./src/pages/admin/SettingsPage'));

const RouteLoader: React.FC = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 shadow-2xl backdrop-blur">
        <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    </div>
  );
};

const PortfolioHome: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [isDnsmpiModalOpen, setIsDnsmpiModalOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    initVisitorTracking();

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-30% 0px -70% 0px' });

    const validSections = Array.from(sections).filter((section): section is HTMLElement => section !== null);
    validSections.forEach((section) => observer.observe(section));

    return () => validSections.forEach((section) => observer.unobserve(section));
  }, []);

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
    <div
      className="min-h-screen bg-white text-slate-600 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-gray-200"
      style={{ overflowX: 'hidden' }}
    >
      <SEO />
      <SkipToContent />
      <ScrollProgress />
      <AnimatedParticles />
      <Header activeSection={activeSection} />
      <main className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Expertise />
        <Journey />
        <Projects onProjectClick={setSelectedProject} />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Newsletter />
      <Footer />

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        <ScrollToTopButton />
        <ChatbotIcon onClick={() => setIsChatbotOpen(!isChatbotOpen)} isOpen={isChatbotOpen} />
      </div>

      {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}

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

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<PortfolioHome />} />
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

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={(
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            )}
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="messages" element={<Messages />} />
            <Route path="newsletter" element={<NewsletterAdmin />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="visitors" element={<Visitors />} />
            <Route path="services" element={<ServicesAdmin />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;

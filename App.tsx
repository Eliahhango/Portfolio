import React, { useState, useEffect, useMemo, useCallback, lazy, Suspense } from 'react';
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
import AnimatedParticles from './components/AnimatedParticles';
import Newsletter from './components/Newsletter';
import CTA from './components/CTA';
import ProjectModal from './components/ProjectModal';
import ChatbotIcon from './components/ChatbotIcon';
import Chatbot from './components/Chatbot';
import type { Project } from './types';
import SEO from './components/SEO';

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
    // Initialize visitor tracking
    initVisitorTracking();

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-30% 0px -70% 0px' });

    const validSections = Array.from(sections).filter((section): section is HTMLElement => section !== null);
    validSections.forEach(section => observer.observe(section));

    return () => validSections.forEach(section => observer.unobserve(section));
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
    <div className="bg-slate-50 dark:bg-black text-slate-600 dark:text-gray-300 min-h-screen" style={{ overflowX: 'hidden' }}>
      <SEO />
      <AnimatedParticles />
      <Header 
        activeSection={activeSection} 
      />
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
      <Footer 
        onPrivacyClick={modalHandlers.privacy}
        onDocsClick={modalHandlers.docs}
        onTermsClick={modalHandlers.terms}
        onSecurityClick={modalHandlers.security}
        onCookieClick={modalHandlers.cookie}
        onDnsmpiClick={modalHandlers.dnsmpi}
        onCommunityClick={modalHandlers.community}
        onStatusClick={modalHandlers.status}
      />
      
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 items-end">
          <ScrollToTopButton />
          <ChatbotIcon 
            onClick={() => setIsChatbotOpen(!isChatbotOpen)} 
            isOpen={isChatbotOpen}
          />
      </div>
      
      {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
      
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      <Suspense fallback={null}>
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
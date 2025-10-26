import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Expertise from './components/Skills';
import Projects from './components/Projects';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import AnimatedParticles from './components/AnimatedParticles';
import PrivacyModal from './components/PrivacyModal';
import DocumentationModal from './components/DocumentationModal';
import ProjectModal from './components/ProjectModal';
import type { Project } from './types';
import TermsModal from './components/TermsModal';
import SecurityModal from './components/SecurityModal';
import CookieModal from './components/CookieModal';
import DnsmpiModal from './components/DnsmpiModal';
import CommunityModal from './components/CommunityModal';
import ChatbotIcon from './components/ChatbotIcon';
import { AnimatePresence } from 'framer-motion';

const Chatbot = lazy(() => import('./components/Chatbot'));


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
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
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

  return (
    <div className="bg-slate-50 dark:bg-black text-slate-600 dark:text-gray-300">
      <AnimatedParticles />
      <Header 
        activeSection={activeSection} 
      />
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Hero />
        <About />
        <Stats />
        <Expertise />
        <Journey />
        <Projects onProjectClick={setSelectedProject} />
        <Testimonials />
        <Contact />
      </main>
      <Footer 
        onPrivacyClick={() => setIsPrivacyModalOpen(true)}
        onDocsClick={() => setIsDocsModalOpen(true)}
        onTermsClick={() => setIsTermsModalOpen(true)}
        onSecurityClick={() => setIsSecurityModalOpen(true)}
        onCookieClick={() => setIsCookieModalOpen(true)}
        onDnsmpiClick={() => setIsDnsmpiModalOpen(true)}
        onCommunityClick={() => setIsCommunityModalOpen(true)}
      />
      
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-4">
          <ChatbotIcon onClick={() => setIsChatbotOpen(!isChatbotOpen)} isOpen={isChatbotOpen} />
          <ScrollToTopButton />
      </div>

      <AnimatePresence>
        {isChatbotOpen && (
          <Suspense fallback={
            <div className="fixed bottom-20 right-5 z-[60] w-80 sm:w-96 h-[500px] bg-slate-100 dark:bg-gray-950 rounded-lg shadow-2xl flex items-center justify-center border border-slate-200 dark:border-gray-800">
              <p className="text-slate-500 animate-pulse">Loading Assistant...</p>
            </div>
          }>
            <Chatbot onClose={() => setIsChatbotOpen(false)} />
          </Suspense>
        )}
      </AnimatePresence>
      
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {isPrivacyModalOpen && <PrivacyModal onClose={() => setIsPrivacyModalOpen(false)} />}
      {isDocsModalOpen && <DocumentationModal onClose={() => setIsDocsModalOpen(false)} />}
      {isTermsModalOpen && <TermsModal onClose={() => setIsTermsModalOpen(false)} />}
      {isSecurityModalOpen && <SecurityModal onClose={() => setIsSecurityModalOpen(false)} />}
      {isCookieModalOpen && <CookieModal onClose={() => setIsCookieModalOpen(false)} />}
      {isDnsmpiModalOpen && <DnsmpiModal onClose={() => setIsDnsmpiModalOpen(false)} />}
      {isCommunityModalOpen && <CommunityModal onClose={() => setIsCommunityModalOpen(false)} />}
    </div>
  );
};

export default App;
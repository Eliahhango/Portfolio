import React, { useState, useEffect } from 'react';
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

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);

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
      />
      <ScrollToTopButton />
      
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      {isPrivacyModalOpen && <PrivacyModal onClose={() => setIsPrivacyModalOpen(false)} />}
      {isDocsModalOpen && <DocumentationModal onClose={() => setIsDocsModalOpen(false)} />}
    </div>
  );
};

export default App;
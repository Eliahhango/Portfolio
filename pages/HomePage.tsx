import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Expertise from '../components/Skills';
import Journey from '../components/Journey';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Contact from '../components/Contact';
import ProjectModal from '../components/ProjectModal';
import type { Project } from '../types';

const HomePage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <Journey />
      <Projects onProjectClick={setSelectedProject} />
      <Testimonials />
      <CTA />
      <Contact />
      
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </>
  );
};

export default HomePage;

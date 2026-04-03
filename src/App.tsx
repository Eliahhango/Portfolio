import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Discipline, TechDetail } from './types';
import Home from './components/Home';
import CivilPortal from './components/CivilPortal';
import WebPortal from './components/WebPortal';
import CyberPortal from './components/CyberPortal';
import ConsultationMatrix from './components/ConsultationMatrix';
import TechDetailView from './components/TechDetailView';
import ProcessPortal from './components/ProcessPortal';
import About from './components/About';
import Services from './components/Services';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Team from './components/Team';
import Pricing from './components/Pricing';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import SecurityDisclosure from './components/SecurityDisclosure';
import CaseStudies from './components/CaseStudies';
import Portfolio from './components/Portfolio';
import Error404 from './components/Error404';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ArrowLeft } from 'lucide-react';

import Logo from './components/Logo';

export default function App() {
  const [view, setView] = useState<'HOME' | 'PORTAL' | 'CONSULT' | 'TECH_DETAIL' | 'PROCESS' | 'ABOUT' | 'SERVICES' | 'BLOG' | 'CONTACT' | 'TEAM' | 'PRICING' | 'PRIVACY' | 'TERMS' | 'SECURITY' | 'CASES' | 'PORTFOLIO' | '404'>('HOME');
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline | null>(null);
  const [selectedTech, setSelectedTech] = useState<TechDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleDisciplineSelect = (discipline: Discipline) => {
    setActiveDiscipline(discipline);
    setView('PORTAL');
  };

  const handleProcessSelect = (discipline: Discipline) => {
    setActiveDiscipline(discipline);
    setView('PROCESS');
  };

  const handleConsultClick = () => {
    setView('CONSULT');
  };

  const handleTechSelect = (detail: TechDetail) => {
    setSelectedTech(detail);
    setView('TECH_DETAIL');
  };

  const goHome = () => {
    setView('HOME');
    setActiveDiscipline(null);
    setSelectedTech(null);
  };

  const goToContact = () => {
    setView('CONTACT');
  };

  const backToPortal = () => {
    setView('PORTAL');
    setSelectedTech(null);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
        <div className="w-full h-full blueprint-grid absolute inset-0 opacity-20" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10"
        >
          <Logo />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white selection:bg-accent selection:text-white">
      <Navbar onNavigate={(v) => setView(v)} currentView={view} />

      {/* Global Navigation Overlay */}
      <AnimatePresence>
        {view !== 'HOME' && view !== 'TECH_DETAIL' && !['ABOUT', 'SERVICES', 'BLOG', 'CONTACT', 'TEAM', 'PRICING', 'PRIVACY', 'TERMS', 'SECURITY', 'CASES', 'PORTFOLIO', '404'].includes(view) && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onClick={goHome}
            className="fixed top-28 left-8 z-50 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Triad
          </motion.button>
        )}
      </AnimatePresence>

      <main className="relative">
        <AnimatePresence mode="wait">
          {view === 'HOME' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Home 
                onSelect={handleDisciplineSelect} 
                onProcessSelect={handleProcessSelect}
                onRequestQuote={handleConsultClick}
                onConsultation={handleConsultClick}
              />
            </motion.div>
          )}

          {view === 'ABOUT' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <About onJoin={goToContact} />
            </motion.div>
          )}

          {view === 'SERVICES' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Services onSelect={handleDisciplineSelect} />
            </motion.div>
          )}

          {view === 'BLOG' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Blog />
            </motion.div>
          )}

          {view === 'CONTACT' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Contact />
            </motion.div>
          )}

          {view === 'TEAM' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Team onJoin={goToContact} />
            </motion.div>
          )}

          {view === 'PRICING' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Pricing onQuote={handleConsultClick} />
            </motion.div>
          )}

          {view === 'PRIVACY' && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <PrivacyPolicy />
            </motion.div>
          )}

          {view === 'TERMS' && (
            <motion.div
              key="terms"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <TermsOfService />
            </motion.div>
          )}

          {view === 'SECURITY' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <SecurityDisclosure />
            </motion.div>
          )}

          {view === 'CASES' && (
            <motion.div
              key="cases"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <CaseStudies onConsultation={handleConsultClick} />
            </motion.div>
          )}

          {view === 'PORTFOLIO' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Portfolio onConsultation={handleConsultClick} />
            </motion.div>
          )}

          {view === '404' && (
            <motion.div
              key="404"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Error404 onHome={goHome} />
            </motion.div>
          )}

          {view === 'PROCESS' && activeDiscipline && (
            <motion.div
              key="process"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <ProcessPortal discipline={activeDiscipline} onBack={goHome} />
            </motion.div>
          )}

          {view === 'PORTAL' && activeDiscipline === 'CIVIL' && (
            <motion.div
              key="civil"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <CivilPortal onRequestConsult={handleConsultClick} />
            </motion.div>
          )}

          {view === 'PORTAL' && activeDiscipline === 'WEB' && (
            <motion.div
              key="web"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <WebPortal onRequestConsult={handleConsultClick} onSelectTech={handleTechSelect} />
            </motion.div>
          )}

          {view === 'PORTAL' && activeDiscipline === 'CYBER' && (
            <motion.div
              key="cyber"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <CyberPortal onRequestConsult={handleConsultClick} />
            </motion.div>
          )}

          {view === 'TECH_DETAIL' && selectedTech && (
            <motion.div
              key="tech-detail"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <TechDetailView detail={selectedTech} onBack={backToPortal} />
            </motion.div>
          )}

          {view === 'CONSULT' && (
            <motion.div
              key="consult"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <ConsultationMatrix initialDiscipline={activeDiscipline} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer onNavigate={(v) => setView(v)} />

      {/* Structural Grid Overlay (Subtle) */}
      <div className="fixed inset-0 pointer-events-none blueprint-grid opacity-[0.03] z-[-1]" />
    </div>
  );
}

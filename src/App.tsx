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
import AdminDashboard from './components/AdminDashboard';
import Error404 from './components/Error404';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ArrowLeft } from 'lucide-react';

import Logo from './components/Logo';

type AppView = 'HOME' | 'CIVIL' | 'WEB' | 'CYBER' | 'CONSULT' | 'TECH_DETAIL' | 'PROCESS' | 'ABOUT' | 'SERVICES' | 'BLOG' | 'CONTACT' | 'TEAM' | 'PRICING' | 'PRIVACY' | 'TERMS' | 'SECURITY' | 'CASES' | 'PORTFOLIO' | 'ADMIN' | '404';

const PATH_TO_VIEW: Record<string, AppView> = {
  '/': 'HOME',
  '/civil': 'CIVIL',
  '/web': 'WEB',
  '/cyber': 'CYBER',
  '/about': 'ABOUT',
  '/services': 'SERVICES',
  '/blog': 'BLOG',
  '/contact': 'CONTACT',
  '/team': 'TEAM',
  '/pricing': 'PRICING',
  '/privacy': 'PRIVACY',
  '/terms': 'TERMS',
  '/security': 'SECURITY',
  '/case-studies': 'CASES',
  '/portfolio': 'PORTFOLIO',
  '/consult': 'CONSULT',
  '/admin': 'ADMIN',
};

const VIEW_TO_PATH: Partial<Record<AppView, string>> = {
  HOME: '/',
  CIVIL: '/civil',
  WEB: '/web',
  CYBER: '/cyber',
  ABOUT: '/about',
  SERVICES: '/services',
  BLOG: '/blog',
  CONTACT: '/contact',
  TEAM: '/team',
  PRICING: '/pricing',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  SECURITY: '/security',
  CASES: '/case-studies',
  PORTFOLIO: '/portfolio',
  CONSULT: '/consult',
  ADMIN: '/admin',
};

const resolveViewFromPath = (pathname: string): AppView => PATH_TO_VIEW[pathname] ?? '404';

export default function App() {
  const [view, setView] = useState<AppView>(() => resolveViewFromPath(window.location.pathname));
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline | null>(null);
  const [selectedTech, setSelectedTech] = useState<TechDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  const navigate = (nextView: AppView, options?: { replace?: boolean }) => {
    const nextPath = VIEW_TO_PATH[nextView];

    if (nextPath) {
      const historyMethod = options?.replace ? 'replaceState' : 'pushState';
      window.history[historyMethod](null, '', nextPath);
    }

    setView(nextView);

    if (nextView !== 'TECH_DETAIL' && nextView !== 'PROCESS') {
      setActiveDiscipline(null);
      setSelectedTech(null);
    }
  };

  useEffect(() => {
    // Simulate loading and ensure animation has time to breathe
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Small delay after loading state changes to allow for exit animations if needed
      setTimeout(() => setIsAppReady(true), 100);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setView(resolveViewFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (!isAppReady) {
      return;
    }

    const pathView = resolveViewFromPath(window.location.pathname);
    if (pathView !== view) {
      setView(pathView);
    }
  }, [isAppReady, view]);

  // Global scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [view]);

  const handleDisciplineSelect = (discipline: Discipline) => {
    setActiveDiscipline(discipline);
    navigate(discipline);
  };

  const handleProcessSelect = (discipline: Discipline) => {
    setActiveDiscipline(discipline);
    navigate('PROCESS');
  };

  const handleConsultClick = () => {
    navigate('CONSULT');
  };

  const handleTechSelect = (detail: TechDetail) => {
    setActiveDiscipline('WEB');
    setSelectedTech(detail);
    navigate('TECH_DETAIL');
  };

  const goHome = () => {
    navigate('HOME');
  };

  const goToContact = () => {
    navigate('CONTACT');
  };

  const backToPortal = () => {
    navigate(activeDiscipline ?? 'WEB');
    setSelectedTech(null);
  };

  return (
    <div className="min-h-screen bg-white selection:bg-accent selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[100]"
          >
            <div className="w-full h-full blueprint-grid absolute inset-0 opacity-20" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-center"
            >
              <Logo />
              <div className="w-48 h-[1px] bg-gray-100 mt-12 relative overflow-hidden">
                <motion.div 
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
                  className="absolute inset-0 bg-accent"
                />
              </div>
              <div className="mt-6 text-[10px] font-mono text-muted uppercase tracking-[0.4em] text-center">
                Architectural Framework Initializing
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Navbar onNavigate={navigate} currentView={view} />

      {/* Global Navigation Overlay */}
      <AnimatePresence>
        {view !== 'HOME' && view !== 'TECH_DETAIL' && !['ABOUT', 'SERVICES', 'BLOG', 'CONTACT', 'TEAM', 'PRICING', 'PRIVACY', 'TERMS', 'SECURITY', 'CASES', 'PORTFOLIO', 'ADMIN', '404'].includes(view) && (
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

          {view === 'ADMIN' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="z-[200] relative"
            >
              <AdminDashboard onLogout={goHome} />
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

          {view === 'CIVIL' && (
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

          {view === 'WEB' && (
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

          {view === 'CYBER' && (
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

      {view !== 'ADMIN' && <Footer onNavigate={navigate} />}

      {/* Structural Grid Overlay (Subtle) */}
      <div className="fixed inset-0 pointer-events-none blueprint-grid opacity-[0.03] z-[-1]" />
    </div>
  );
}

import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import Logo from './Logo';

interface NavbarProps {
  onNavigate: (view: any) => void;
  currentView: string;
}

export default function Navbar({ onNavigate, currentView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'HOME', view: 'HOME' },
    { label: 'SERVICES', view: 'SERVICES' },
    { label: 'PRICING', view: 'PRICING' },
    { label: 'TEAM', view: 'TEAM' },
    { label: 'PORTFOLIO', view: 'PORTFOLIO' },
    { label: 'BLOG', view: 'BLOG' },
    { label: 'CONTACT', view: 'CONTACT' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('HOME')}
          className="hover:opacity-80 transition-opacity"
        >
          <Logo />
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigate(item.view)}
              className={`text-[10px] font-bold tracking-[0.2em] transition-colors hover:text-accent ${
                currentView === item.view ? 'text-accent' : 'text-muted'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => onNavigate('CONSULT')}
            className="bg-black text-white text-[10px] font-bold tracking-[0.2em] px-6 py-3 hover:bg-accent transition-all flex items-center gap-2 group"
          >
            CONSULTATION
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-black p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 w-full bg-white border-b border-gray-100 overflow-hidden lg:hidden"
          >
            <div className="p-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    onNavigate(item.view);
                    setIsOpen(false);
                  }}
                  className={`text-left text-xs font-bold tracking-[0.2em] ${
                    currentView === item.view ? 'text-accent' : 'text-muted'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => {
                  onNavigate('CONSULT');
                  setIsOpen(false);
                }}
                className="bg-black text-white text-xs font-bold tracking-[0.2em] px-6 py-4 text-center"
              >
                REQUEST CONSULTATION
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

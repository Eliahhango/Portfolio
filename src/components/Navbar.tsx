import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useState, type MouseEvent } from 'react';
import Logo from './Logo';

interface NavbarProps {
  onNavigate: (view: any) => void;
  currentView: string;
}

export default function Navbar({ onNavigate, currentView }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'HOME', view: 'HOME', href: '/' },
    { label: 'ABOUT', view: 'ABOUT', href: '/about' },
    { label: 'SERVICES', view: 'SERVICES', href: '/services' },
    { label: 'PRICING', view: 'PRICING', href: '/pricing' },
    { label: 'TEAM', view: 'TEAM', href: '/team' },
    { label: 'PORTFOLIO', view: 'PORTFOLIO', href: '/portfolio' },
    { label: 'BLOG', view: 'BLOG', href: '/blog' },
    { label: 'CONTACT', view: 'CONTACT', href: '/contact' },
  ];

  const isActive = (itemView: string) => {
    if (itemView === 'SERVICES') {
      return ['SERVICES', 'CIVIL', 'WEB', 'CYBER'].includes(currentView);
    }

    return currentView === itemView;
  };

  const handleNavigate = (view: any) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <a 
          href="/"
          onClick={handleNavigate('HOME')}
          className="hover:opacity-80 transition-opacity"
        >
          <Logo />
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleNavigate(item.view)}
              className={`text-[10px] font-bold tracking-[0.2em] transition-colors hover:text-accent ${
                isActive(item.view) ? 'text-accent' : 'text-muted'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a 
            href="/consult"
            onClick={handleNavigate('CONSULT')}
            className="bg-black text-white text-[10px] font-bold tracking-[0.2em] px-6 py-3 hover:bg-accent transition-all flex items-center gap-2 group"
          >
            CONSULTATION
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </a>
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
                <a
                  key={item.label}
                  href={item.href}
                  onClick={handleNavigate(item.view)}
                  className={`text-left text-xs font-bold tracking-[0.2em] ${
                    isActive(item.view) ? 'text-accent' : 'text-muted'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a 
                href="/consult"
                onClick={handleNavigate('CONSULT')}
                className="bg-black text-white text-xs font-bold tracking-[0.2em] px-6 py-4 text-center"
              >
                REQUEST CONSULTATION
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

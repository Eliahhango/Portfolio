import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { NAV_LINKS } from '../constants';

interface HeaderProps {
    activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        // Prevent background scroll when mobile menu is open
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-slate-50/80 dark:bg-black/80 backdrop-blur-sm shadow-md' : 'bg-transparent'}`} style={{ willChange: 'background-color, box-shadow' }}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <a href="#home" className="text-2xl sm:text-3xl font-bold tracking-tighter text-slate-900 dark:text-white" onClick={closeMenu}>
                        <span className="text-blue-500">Eli</span>TechWiz
                    </a>
                    <div className="hidden md:flex items-center space-x-8">
                        {NAV_LINKS.map(link => (
                            <a 
                                key={link.name} 
                                href={link.href} 
                                className={`text-sm font-semibold uppercase tracking-wider transition-colors ${activeSection === link.href.substring(1) ? 'text-blue-500' : 'text-slate-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'}`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <ThemeToggle />
                        <button 
                            className="md:hidden ml-4 p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            onClick={() => setIsMenuOpen(!isMenuOpen)} 
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <svg className="w-6 h-6 text-slate-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        id="mobile-menu"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-slate-50/95 dark:bg-black/95 backdrop-blur-sm border-t border-slate-200/50 dark:border-white/10"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                            {NAV_LINKS.map(link => (
                                <a 
                                    key={link.name} 
                                    href={link.href} 
                                    onClick={closeMenu} 
                                    className={`block px-3 py-3 rounded-lg text-base font-semibold tracking-wide transition-colors w-full text-center ${activeSection === link.href.substring(1) ? 'text-white bg-blue-500' : 'text-slate-600 dark:text-gray-300 hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-gray-900'}`}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;

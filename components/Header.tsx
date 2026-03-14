import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { NAV_LINKS } from '../constants';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);

    // Determine if a nav link is active
    const isLinkActive = (href: string): boolean => {
        if (href === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(href);
    };

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
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-slate-50/80 dark:bg-slate-950/90 dark:border-b dark:border-slate-800/50 backdrop-blur-sm shadow-md dark:shadow-slate-900/50' : 'bg-transparent'}`} style={{ willChange: 'background-color, box-shadow' }}>
            <nav className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <Link 
                        to="/"
                        className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter text-slate-900 dark:text-white hover:text-blue-500 transition-colors" 
                    >
                        <span className="text-blue-500">Eli</span>TechWiz
                    </Link>
                    <div className="hidden md:flex items-center space-x-0.5 xl:space-x-1">
                        {NAV_LINKS.map(link => {
                            const isActive = isLinkActive(link.href);
                            return (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={`px-2 sm:px-3 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors rounded-lg ${
                                        isActive
                                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                            : 'text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
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
                        className="md:hidden bg-slate-50/95 dark:bg-slate-950/95 dark:border-slate-800/50 backdrop-blur-sm border-t border-slate-200/50 dark:border-slate-800/50"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                            {NAV_LINKS.map(link => {
                                const isActive = isLinkActive(link.href);
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={closeMenu}
                                        className={`block px-3 py-3 rounded-lg text-base font-semibold tracking-wide transition-colors w-full text-center ${
                                            isActive
                                                ? 'text-white bg-blue-600 dark:bg-blue-600 dark:shadow-lg dark:shadow-blue-500/30'
                                                : 'text-slate-600 dark:text-gray-200 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800/50 dark:hover:text-blue-400'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;

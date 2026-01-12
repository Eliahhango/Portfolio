import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from './Typewriter';
import { GithubIcon } from '../constants';
import { scrollToSection } from '../utils/scrollUtils';

const Hero: React.FC = () => {
    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        scrollToSection('contact');
    };
    return (
        <section id="home" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center text-center pt-20 pb-12">
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/40 via-transparent to-transparent dark:from-blue-500/10" />
            <div className="max-w-5xl px-4 sm:px-6">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900 dark:from-white dark:via-blue-400 dark:to-white">
                        I Am EliTechWiz
                    </span>
                    <br />
                    A <Typewriter words={['Cybersecurity Expert', 'Software Architect', 'Creative Designer', 'Visionary Hacker']} />
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto px-4"
                >
                   Merging technology, design, and strategy to build secure, innovative, and impactful digital experiences.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 px-4"
                >
                    <a 
                        href="#contact" 
                        onClick={handleContactClick}
                        className="px-8 sm:px-10 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base cursor-pointer"
                    >
                        Let's Innovate Together
                    </a>
                    <a href="https://github.com/Eliahhango" target="_blank" rel="noopener noreferrer" className="px-8 sm:px-10 py-3 sm:py-4 bg-slate-200 dark:bg-gray-900 text-slate-800 dark:text-white font-semibold rounded-xl shadow-lg hover:bg-slate-300 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto text-sm sm:text-base">
                        <GithubIcon className="w-5 h-5" /> GitHub
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
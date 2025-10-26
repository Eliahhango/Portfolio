import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from './Typewriter';
import { GithubIcon } from '../constants';

const Hero: React.FC = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center text-center -mt-20">
            <div className="max-w-4xl">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tighter"
                >
                    I Am EliTechWiz
                    <br />
                    A <Typewriter words={['Cybersecurity Expert', 'Software Architect', 'Creative Designer', 'Visionary Hacker']} />
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-6 text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto"
                >
                   Merging technology, design, and strategy to build secure, innovative, and impactful digital experiences.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
                >
                    <a href="#contact" className="px-10 py-4 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                        Let's Innovate Together
                    </a>
                    <a href="https://github.com/Eliahhango" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-slate-200 dark:bg-gray-900 text-slate-800 dark:text-white font-semibold rounded-lg shadow-lg hover:bg-slate-300 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 w-full sm:w-auto">
                        <GithubIcon className="w-5 h-5" /> GitHub
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
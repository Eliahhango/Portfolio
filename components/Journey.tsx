// FIX: Create content for the file to define the Journey component.
import React from 'react';
import { motion } from 'framer-motion';

const JOURNEY_DATA = [
    {
        year: '2020 - Present',
        role: 'CEO & Lead Architect',
        company: 'EliTechWiz Innovations',
        description: 'Leading a team of innovators to build next-generation security and software solutions. Overseeing all aspects from concept to deployment.',
    },
    {
        year: '2018 - 2020',
        role: 'Senior Security Consultant',
        company: 'CyberSafe Corp',
        description: 'Conducted penetration tests and security audits for Fortune 500 companies, identifying critical vulnerabilities and designing mitigation strategies.',
    },
    {
        year: '2015 - 2018',
        role: 'Full-Stack Developer',
        company: 'DevSolutions Ltd.',
        description: 'Developed and maintained web applications for various clients, specializing in scalable backend systems and responsive user interfaces.',
    },
];

const Journey: React.FC = () => {
    return (
        <section id="journey" className="py-12 sm:py-16 md:py-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-4 px-4">My Journey</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-8 sm:mb-12"></div>
            <div className="max-w-3xl mx-auto relative px-4 sm:px-6">
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-slate-200 dark:bg-gray-700"></div>
                {JOURNEY_DATA.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6 sm:mb-8 pl-12 md:pl-0"
                    >
                        <div className={`md:flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center`}>
                            <div className="md:w-1/2 md:px-6">
                                <div className="bg-slate-100 dark:bg-gray-950 p-4 sm:p-6 rounded-lg shadow-md border border-slate-200 dark:border-gray-900">
                                    <p className="text-sm sm:text-base text-blue-500 font-semibold">{item.year}</p>
                                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">{item.role}</h3>
                                    <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 mb-2">{item.company}</p>
                                    <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400">{item.description}</p>
                                </div>
                            </div>
                            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2">
                                <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-slate-50 dark:border-gray-900 z-10"></div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Journey;
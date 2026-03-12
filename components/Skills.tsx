import React from 'react';
import { motion } from 'framer-motion';
import { EXPERTISE_DATA } from '../constants';

const Expertise: React.FC = () => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.1,
                duration: 0.5,
            },
        }),
    };

    return (
        <section id="expertise" className="py-12 sm:py-16 md:py-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-4 px-4">Areas of Expertise</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-8 sm:mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
                {EXPERTISE_DATA.map((category, catIndex) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="bg-slate-100 dark:bg-slate-800/40 dark:border-slate-700/50 p-4 sm:p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700/50 dark:shadow-slate-900/50"
                    >
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 text-center">{category.title}</h3>
                        <div className="space-y-3 sm:space-y-4">
                            {category.skills.map((skill, skillIndex) => (
                                <motion.div
                                    key={skill.name}
                                    custom={skillIndex}
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.8 }}
                                    className="group flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-white dark:bg-slate-700/30 dark:border dark:border-slate-600/30 rounded-md transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:border-blue-500/50 dark:hover:shadow-blue-500/10 hover:shadow-sm"
                                >
                                    <skill.Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
                                    <span className="text-sm sm:text-base font-semibold text-slate-700 dark:text-gray-200">{skill.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Expertise;
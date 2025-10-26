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
        <section id="expertise" className="py-20">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-4">Areas of Expertise</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {EXPERTISE_DATA.map((category, catIndex) => (
                    <motion.div
                        key={category.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6 }}
                        className="bg-slate-100 dark:bg-gray-950 p-6 rounded-lg shadow-md border border-slate-200 dark:border-gray-900"
                    >
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">{category.title}</h3>
                        <div className="space-y-4">
                            {category.skills.map((skill, skillIndex) => (
                                <motion.div
                                    key={skill.name}
                                    custom={skillIndex}
                                    variants={cardVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.8 }}
                                    className="group flex items-center gap-4 p-3 bg-white dark:bg-gray-900 rounded-md transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-sm"
                                >
                                    <skill.Icon className="w-8 h-8 text-blue-500 flex-shrink-0" />
                                    <span className="font-semibold text-slate-700 dark:text-gray-300">{skill.name}</span>
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
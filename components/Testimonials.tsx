import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS_DATA } from '../constants';

const Testimonials: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS_DATA.length);
        }, 5000); // Change testimonial every 5 seconds

        return () => clearInterval(timer);
    }, []);

    const slideVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return (
        <section id="testimonials" className="py-20">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-4">What They Say</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-12"></div>
            <div className="max-w-3xl mx-auto relative h-64">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        variants={slideVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.5 }}
                        className="absolute w-full h-full bg-slate-100 dark:bg-gray-950 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-gray-900 flex flex-col justify-between"
                    >
                        <p className="text-slate-600 dark:text-gray-400 italic text-center md:text-lg">
                            "{TESTIMONIALS_DATA[currentIndex].quote}"
                        </p>
                        <div className="flex items-center self-end mt-4">
                            <img src={TESTIMONIALS_DATA[currentIndex].avatarUrl} alt={TESTIMONIALS_DATA[currentIndex].name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white">{TESTIMONIALS_DATA[currentIndex].name}</h4>
                                <p className="text-sm text-slate-500 dark:text-gray-500">{TESTIMONIALS_DATA[currentIndex].company}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            <div className="flex justify-center space-x-2 mt-8">
                {TESTIMONIALS_DATA.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                            currentIndex === index ? 'bg-blue-500' : 'bg-slate-300 dark:bg-gray-800 hover:bg-blue-300'
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
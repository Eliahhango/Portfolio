import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INSPIRATIONAL_QUOTES } from '../constants/quotes';

const InspirationalQuote: React.FC = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % INSPIRATIONAL_QUOTES.length);
        }, 5000); // Change quote every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center">
            <AnimatePresence mode="wait">
                <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-900 dark:text-white"
                >
                    {INSPIRATIONAL_QUOTES[index]}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

export default InspirationalQuote;

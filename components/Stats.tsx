import React, { useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { STATS_DATA } from '../constants';
import type { Stat } from '../types';

// FIX: Explicitly type StatItem as a React functional component (React.FC) to ensure special props like 'key' are recognized by TypeScript.
const StatItem: React.FC<{ stat: Stat }> = ({ stat }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    
    React.useEffect(() => {
        if (isInView && ref.current) {
            const controls = animate(0, stat.value, {
                duration: 2,
                onUpdate(value) {
                    if(ref.current) {
                       ref.current.textContent = value.toFixed(0);
                    }
                },
            });
            return () => controls.stop();
        }
    }, [isInView, stat.value]);

    return (
        <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-500 dark:text-blue-400">
                <span ref={ref}>0</span>+
            </div>
            <p className="mt-2 text-sm md:text-base font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</p>
        </div>
    );
};

const Stats: React.FC = () => {
  return (
    <section id="stats" className="py-20 bg-slate-100 dark:bg-gray-950 rounded-lg">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {STATS_DATA.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
};

export default Stats;
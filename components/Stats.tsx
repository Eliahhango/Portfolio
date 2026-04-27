import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, animate } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView && ref.current) {
      const node = ref.current;
      const animation = animate(0, value, {
        duration: 2,
        onUpdate(latest) {
          node.textContent = `${Math.round(latest)}+`;
        }
      });
      controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.5 },
      });
      return () => animation.stop();
    }
  }, [isInView, value, controls]);

  return (
    <motion.span ref={ref} animate={controls}>
      0+
    </motion.span>
  );
};

const Stats: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="flex flex-wrap justify-center gap-8 sm:gap-12 md:gap-16"
    >
      <div className="text-center">
        <h3 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white"><AnimatedNumber value={4} /></h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400">Years of Experience</p>
      </div>
      <div className="text-center">
        <h3 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white"><AnimatedNumber value={50} /></h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400">Projects Completed</p>
      </div>
      <div className="text-center">
        <h3 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white"><AnimatedNumber value={100} /></h3>
        <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400">Happy Clients</p>
      </div>
    </motion.div>
  );
};

export default Stats;
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface AnimatedNumberProps {
  value: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.5 },
      });
    }
  }, [isInView, controls]);

  return (
    <motion.span ref={ref} animate={controls}>
      {value}+
    </motion.span>
  );
};

const Stats: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="flex flex-wrap justify-center gap-8 mt-8"
    >
      <div className="text-center">
        <h3 className="text-4xl font-bold"><AnimatedNumber value={4} /></h3>
        <p className="text-lg">Years of Experience</p>
      </div>
      <div className="text-center">
        <h3 className="text-4xl font-bold"><AnimatedNumber value={50} /></h3>
        <p className="text-lg">Projects Completed</p>
      </div>
      <div className="text-center">
        <h3 className="text-4xl font-bold"><AnimatedNumber value={100} /></h3>
        <p className="text-lg">Happy Clients</p>
      </div>
    </motion.div>
  );
};

export default Stats;
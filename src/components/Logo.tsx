import { motion } from 'motion/react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-8 h-8">
        {/* The Triad Triangle */}
        <motion.svg 
          viewBox="0 0 100 100" 
          className="w-full h-full fill-none stroke-black stroke-[4]"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.path 
            d="M50 10 L90 85 L10 85 Z" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {/* Central Node */}
          <motion.circle 
            cx="50" cy="60" r="4" 
            className="fill-accent stroke-none"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          />
          {/* Axon Lines */}
          <motion.line x1="50" y1="60" x2="50" y2="10" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 0.5 }} />
          <motion.line x1="50" y1="60" x2="90" y2="85" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4, duration: 0.5 }} />
          <motion.line x1="50" y1="60" x2="10" y2="85" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.6, duration: 0.5 }} />
        </motion.svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-lg font-heading font-black tracking-tighter uppercase">EliTech</span>
        <span className="text-[8px] font-mono text-accent font-bold tracking-[0.4em] uppercase">Wiz</span>
      </div>
    </div>
  );
}

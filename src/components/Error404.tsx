import { motion } from 'motion/react';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function Error404({ onHome }: { onHome: () => void }) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 md:px-8 relative overflow-hidden">
      {/* Background Blueprint Grid Overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-2xl w-full"
      >
        <h1 className="text-[8rem] md:text-[12rem] font-heading font-black text-black/5 leading-none mb-8 select-none">404</h1>
        <div className="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full">
          <h2 className="text-xs font-mono text-accent uppercase tracking-[0.4em] mb-6 md:mb-8">Structural Failure</h2>
          <h3 className="text-3xl md:text-5xl font-heading font-bold tracking-tighter uppercase mb-8 md:mb-12 leading-tight">
            Architectural<br />Path Not Found.
          </h3>
          <p className="text-base md:text-lg text-muted leading-relaxed mb-12 md:mb-16">
            The coordinates you've requested do not exist within our architectural framework. The blueprint may have been updated or the path is restricted.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8">
            <button 
              onClick={onHome}
              className="w-full sm:w-auto bg-black text-white px-12 py-6 text-xs font-bold tracking-[0.2em] hover:bg-accent transition-all flex items-center justify-center gap-4 group"
            >
              <Home size={16} className="group-hover:-translate-y-1 transition-transform" />
              RETURN TO ELITECHWIZ
            </button>
            <button className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors flex items-center justify-center gap-4 group">
              <Search size={16} className="text-accent" />
              SEARCH BLUEPRINTS
            </button>
          </div>
        </div>
      </motion.div>

      {/* Large Background Text */}
      <div className="absolute -bottom-12 md:-bottom-24 -right-12 md:-right-24 text-[30vw] md:text-[20vw] font-heading font-black text-black/[0.02] leading-none select-none pointer-events-none">
        FAILURE
      </div>
    </div>
  );
}

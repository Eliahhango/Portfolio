import { motion } from 'motion/react';
import { TechDetail } from '../types';
import { ArrowLeft, Cpu, Layers, Activity, Zap } from 'lucide-react';

interface TechDetailViewProps {
  detail: TechDetail;
  onBack: () => void;
}

export default function TechDetailView({ detail, onBack }: TechDetailViewProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 md:py-6 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-accent transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Web Portal
        </button>
        <div className="text-center md:text-right">
          <span className="text-[10px] font-mono text-muted uppercase tracking-widest block mb-1">Architecture / Deep Dive</span>
          <h1 className="text-xl md:text-2xl font-heading font-semibold tracking-tighter">{detail.name}</h1>
        </div>
      </header>

      <main className="pt-16 md:pt-24 px-4 md:px-12 pb-32 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column: Philosophy & Metrics */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-8">Design Philosophy</h2>
              <p className="text-3xl md:text-4xl font-heading font-semibold tracking-tight leading-tight mb-12">
                {detail.philosophy}
              </p>

              <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-12">
                {detail.metrics.map((m, i) => (
                  <div key={i}>
                    <span className="text-[10px] font-mono text-accent uppercase block mb-2">{m.label}</span>
                    <span className="text-2xl font-heading font-bold">{m.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Process Steps */}
          <div className="lg:col-span-7">
            <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-12">The Engineering Process</h2>
            <div className="space-y-1">
              {detail.process.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group border-b border-gray-100 py-12 flex gap-12 hover:bg-surface transition-colors px-8 -mx-8"
                >
                  <span className="text-xs font-mono text-accent">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-heading font-semibold mb-4 uppercase tracking-tight">{step.step}</h3>
                    <p className="text-muted leading-relaxed max-w-lg">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Specs Grid */}
        <section className="mt-24 md:mt-32 border border-black p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-[10px] font-mono text-accent">SYSTEM_SPEC_V1.0</span>
          </div>
          <div className="flex flex-col gap-4">
            <Cpu size={24} className="text-black" />
            <h4 className="text-sm font-bold tracking-widest uppercase">Performance Optimization</h4>
            <p className="text-xs text-muted leading-relaxed">Rigorous profiling and optimization of critical paths to ensure sub-100ms response times.</p>
          </div>
          <div className="flex flex-col gap-4">
            <Layers size={24} className="text-black" />
            <h4 className="text-sm font-bold tracking-widest uppercase">Scalable Foundation</h4>
            <p className="text-xs text-muted leading-relaxed">Modular architecture designed for horizontal scaling across distributed cloud environments.</p>
          </div>
          <div className="flex flex-col gap-4">
            <Zap size={24} className="text-black" />
            <h4 className="text-sm font-bold tracking-widest uppercase">Rapid Deployment</h4>
            <p className="text-xs text-muted leading-relaxed">Automated CI/CD pipelines ensuring safe and frequent releases with zero downtime.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

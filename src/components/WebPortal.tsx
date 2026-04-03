import { motion } from 'motion/react';
import { TechRow, TechDetail } from '../types';
import { ArrowRight } from 'lucide-react';

const TECH_STACK: TechRow[] = [
  { id: 'react', tech: 'REACT / NEXT.JS', useCase: 'HIGH-PERFORMANCE CLIENT INTERFACES' },
  { id: 'typescript', tech: 'TYPESCRIPT', useCase: 'TYPE-SAFE ARCHITECTURAL FOUNDATION' },
  { id: 'node', tech: 'NODE.JS / GO', useCase: 'SCALABLE MICROSERVICES & API GATEWAYS' },
  { id: 'postgresql', tech: 'POSTGRESQL', useCase: 'RELATIONAL DATA INTEGRITY' },
  { id: 'redis', tech: 'REDIS', useCase: 'LOW-LATENCY CACHING SYSTEMS' },
  { id: 'docker', tech: 'DOCKER / K8S', useCase: 'CONTAINERIZED ORCHESTRATION' },
  { id: 'cloud', tech: 'AWS / GCP', useCase: 'ELASTIC CLOUD INFRASTRUCTURE' },
];

const TECH_DETAILS: Record<string, TechDetail> = {
  react: {
    id: 'react',
    name: 'REACT / NEXT.JS',
    philosophy: 'Component-driven architecture for rapid, scalable UI development.',
    metrics: [
      { label: 'AVG LCP', value: '0.8S' },
      { label: 'BUNDLE SIZE', value: '45KB' }
    ],
    process: [
      { step: 'Component Atomic Design', description: 'Breaking down complex interfaces into reusable, isolated atoms and molecules.' },
      { step: 'State Management Strategy', description: 'Implementing robust state containers for predictable data flow and synchronization.' },
      { step: 'Server-Side Rendering', description: 'Optimizing for SEO and initial load performance through Next.js App Router.' },
      { step: 'Performance Profiling', description: 'Continuous monitoring of render cycles and memory usage to ensure sub-60fps interaction.' }
    ]
  },
  typescript: {
    id: 'typescript',
    name: 'TYPESCRIPT',
    philosophy: 'Static typing as the bedrock of large-scale software engineering.',
    metrics: [
      { label: 'TYPE COVERAGE', value: '100%' },
      { label: 'RUNTIME ERRORS', value: '-85%' }
    ],
    process: [
      { step: 'Strict Type Definitions', description: 'Defining clear interfaces and types for every data structure in the system.' },
      { step: 'Generic Abstractions', description: 'Building reusable, type-safe utility functions and components.' },
      { step: 'Automated Documentation', description: 'Leveraging type metadata to generate living API documentation.' },
      { step: 'Refactoring Safety', description: 'Ensuring system-wide integrity during architectural shifts through compiler feedback.' }
    ]
  },
  node: {
    id: 'node',
    name: 'NODE.JS / GO',
    philosophy: 'Asynchronous, event-driven backends for high-concurrency workloads.',
    metrics: [
      { label: 'REQ / SEC', value: '45K+' },
      { label: 'LATENCY P99', value: '120MS' }
    ],
    process: [
      { step: 'Microservices Decomposition', description: 'Splitting monolithic logic into independent, scalable service units.' },
      { step: 'Event-Driven Communication', description: 'Implementing message brokers for decoupled, resilient service interaction.' },
      { step: 'API Gateway Orchestration', description: 'Centralizing authentication, rate limiting, and request routing.' },
      { step: 'Horizontal Scaling', description: 'Designing stateless services for elastic growth across distributed clusters.' }
    ]
  }
  // Add more as needed...
};

interface PortalProps {
  onRequestConsult: () => void;
  onSelectTech?: (detail: TechDetail) => void;
}

export default function WebPortal({ onRequestConsult, onSelectTech }: PortalProps) {
  const handleTechClick = (id: string) => {
    const detail = TECH_DETAILS[id];
    if (detail && onSelectTech) {
      onSelectTech(detail);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 md:py-6 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Discipline / 02</span>
          <h1 className="text-sm font-bold uppercase tracking-[0.2em]">Web Development</h1>
        </div>
        <button 
          onClick={onRequestConsult}
          className="w-full md:w-auto bg-black text-white px-6 py-3 text-[10px] font-semibold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300"
        >
          Request Architecture Review
        </button>
      </header>

      <main className="px-4 md:px-12 pb-24">
        {/* Hero Section */}
        <section className="py-24 md:py-32 border-b border-gray-100 relative overflow-hidden -mx-4 md:-mx-12 px-4 md:px-12">
          <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
          <div className="max-w-5xl relative z-10">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs font-mono text-accent uppercase tracking-[0.3em] mb-8 block"
            >
              Digital Architecture / Scalable Systems
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[clamp(2rem,6vw,5rem)] font-heading font-bold leading-[0.9] tracking-tighter uppercase mb-12"
            >
              Architecting the <span className="text-accent">Digital</span> Infrastructure of Tomorrow.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed"
            >
              We build high-performance, scalable web applications that prioritize user experience, security, and structural integrity. From complex microservices to immersive client interfaces.
            </motion.p>
          </div>
        </section>

        {/* System Architecture Visualization */}
        <section className="py-16 md:py-24 border-b border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
            <h2 className="text-xs font-mono text-muted uppercase tracking-widest">System Architecture Diagram</h2>
            <span className="text-[10px] text-accent font-mono animate-pulse">LIVE_NODE_VISUALIZATION</span>
          </div>
          
          <div className="h-[400px] md:h-[500px] border border-gray-200 bg-surface relative overflow-hidden flex items-center justify-center group">
            <svg width="100%" height="100%" className="absolute inset-0">
              <defs>
                <pattern id="grid-web" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E5E7EB" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-web)" />
              
              {/* Animated Paths */}
              <motion.path
                d="M 100 250 Q 400 100 700 250 T 1300 250"
                fill="none"
                stroke="#0047FF"
                strokeWidth="1"
                strokeDasharray="5,5"
                animate={{ strokeDashoffset: [0, -100] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d="M 100 300 Q 500 450 900 300 T 1300 300"
                fill="none"
                stroke="#000000"
                strokeWidth="1"
                strokeDasharray="10,5"
                animate={{ strokeDashoffset: [0, 100] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </svg>

            <div className="relative z-10 flex flex-wrap justify-center gap-6 md:gap-12 lg:gap-24 px-4 md:px-12">
              {['CLIENT', 'GATEWAY', 'SERVICES', 'DB'].map((node, i) => (
                <motion.div
                  key={node}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 border border-black bg-white flex flex-col items-center justify-center group/node hover:bg-black hover:text-white transition-all duration-500 shadow-xl hover:shadow-2xl"
                >
                  <span className="text-[10px] font-mono text-muted group-hover/node:text-white/60 mb-2">NODE_0{i+1}</span>
                  <span className="text-xs md:text-sm lg:text-base font-bold tracking-widest uppercase">{node}</span>
                  <div className="mt-4 w-6 md:w-8 h-[1px] bg-accent group-hover/node:w-12 transition-all" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Ledger Section */}
        <section className="py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4">
              <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-8">Tech Stack Ledger</h2>
              <p className="text-sm text-muted leading-relaxed mb-12">
                Our selection of technologies is based on rigid performance benchmarks and architectural stability. Each component in our stack is chosen to ensure long-term scalability and absolute data integrity.
              </p>
              <div className="p-6 md:p-8 border border-gray-100 bg-surface">
                <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Performance Target</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span>LOAD_TIME</span>
                      <span>&lt; 1.0S</span>
                    </div>
                    <div className="w-full h-1 bg-gray-200">
                      <div className="w-[90%] h-full bg-accent" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span>UPTIME</span>
                      <span>99.99%</span>
                    </div>
                    <div className="w-full h-1 bg-gray-200">
                      <div className="w-[99%] h-full bg-accent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="border-t border-gray-200">
                {TECH_STACK.map((row, idx) => (
                  <button 
                    key={row.id}
                    onClick={() => handleTechClick(row.id)}
                    className="w-full flex items-center justify-between min-h-[80px] py-4 border-b border-gray-200 px-4 hover:bg-surface transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-center gap-4 md:gap-8">
                      <span className="text-xs font-mono text-muted">0{idx + 1}</span>
                      <span className="text-base md:text-lg font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-300 uppercase text-left">{row.tech}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="hidden lg:block text-[10px] font-mono text-muted uppercase group-hover:text-accent transition-colors">{row.useCase}</span>
                      <ArrowRight size={16} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Design Process Section */}
        <section className="py-24 md:py-32 border-t border-gray-100">
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-16">The Digital Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: 'Atomic Design',
                desc: 'We break down complex interfaces into their smallest components, ensuring absolute consistency and reuse across the entire system.',
                image: 'https://picsum.photos/seed/atomic/1000/750'
              },
              {
                title: 'State Management',
                desc: 'Our applications utilize robust state containers to ensure predictable data flow and real-time synchronization across all client instances.',
                image: 'https://picsum.photos/seed/state/1000/750'
              },
              {
                title: 'Performance First',
                desc: 'We optimize for the critical rendering path, ensuring that our applications are interactive in under 1 second on any device.',
                image: 'https://picsum.photos/seed/perf/1000/750'
              }
            ].map((process, i) => (
              <div key={i} className="group cursor-default">
                <div className="aspect-[4/3] overflow-hidden bg-surface mb-8">
                  <img 
                    src={process.image} 
                    alt={process.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-xl font-heading font-bold mb-4 uppercase tracking-tight group-hover:text-accent transition-colors">{process.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{process.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

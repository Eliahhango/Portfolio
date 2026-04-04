import { motion } from 'motion/react';
import { ArrowRight, ExternalLink, Activity, Shield, Globe } from 'lucide-react';

export default function CaseStudies({ onConsultation }: { onConsultation?: () => void }) {
  const cases = [
    {
      id: 1,
      title: 'Global Financial Hub: Zero-Trust Migration',
      category: 'CYBER SECURITY',
      impact: '99.9% Threat Mitigation',
      description: 'Transitioning a legacy banking infrastructure to a modern zero-trust protocol without a single second of downtime.',
      image: 'https://picsum.photos/seed/finance/800/500',
      icon: Shield,
    },
    {
      id: 2,
      title: 'Smart City: Sustainable Infrastructure',
      category: 'CIVIL ENGINEERING',
      impact: '40% Energy Reduction',
      description: 'Integrating green infrastructure and IoT-enabled load monitoring into a new urban development project.',
      image: 'https://picsum.photos/seed/smartcity/800/500',
      icon: Activity,
    },
    {
      id: 3,
      title: 'E-Commerce Giant: Global Scaling',
      category: 'WEB ARCHITECTURE',
      impact: '200ms Latency Reduction',
      description: 'Architecting a globally distributed edge computing network to handle peak traffic of 1M+ requests per second.',
      image: 'https://picsum.photos/seed/ecommerce/800/500',
      icon: Globe,
    },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-32 max-w-3xl">
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-6 md:mb-8">Proven Results</h2>
          <h1 className="text-4xl md:text-7xl font-heading font-bold tracking-tighter leading-[0.9] uppercase mb-8 md:mb-12">
            Architectural<br /><span className="text-accent">Success</span><br />Stories.
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed">
            A selection of our most challenging and impactful projects across physical and digital disciplines.
          </p>
        </div>

        {/* Case Study Grid */}
        <div className="space-y-16 md:space-y-32">
          {cases.map((caseStudy, i) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className={`aspect-[16/10] bg-surface overflow-hidden relative group cursor-pointer ${i % 2 === 1 ? 'lg:order-last' : ''}`}>
                <img 
                  src={caseStudy.image} 
                  alt={caseStudy.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-white text-black px-6 md:px-8 py-3 md:py-4 text-[10px] md:text-xs font-bold tracking-widest flex items-center gap-3">
                    VIEW CASE STUDY <ExternalLink size={14} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 md:mb-8 text-[10px] font-bold text-muted uppercase tracking-widest">
                  <span className="text-accent flex items-center gap-2"><caseStudy.icon size={14} /> {caseStudy.category}</span>
                  <span className="text-black bg-surface px-3 py-1 border border-gray-100">{caseStudy.impact}</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-heading font-bold tracking-tighter uppercase mb-6 md:mb-8 leading-tight">
                  {caseStudy.title}
                </h3>
                <p className="text-base md:text-lg text-muted leading-relaxed mb-8 md:mb-12">{caseStudy.description}</p>
                <button onClick={onConsultation} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest hover:gap-6 transition-all group">
                  EXPLORE METHODOLOGY <ArrowRight size={16} className="text-accent" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 md:mt-48 p-12 md:p-24 bg-black text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter uppercase mb-6 md:mb-8">Ready to Architect Your Success?</h3>
            <p className="text-gray-400 mb-8 md:mb-12 text-sm md:text-base">Let's discuss how our cross-disciplinary expertise can solve your most complex structural challenges.</p>
            <button 
              onClick={onConsultation}
              className="w-full md:w-auto bg-accent text-white px-12 py-6 text-xs font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-all"
            >
              START A CONSULTATION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

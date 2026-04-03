import { motion } from 'motion/react';
import { Project } from '../types';

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'THE MONOLITH BRIDGE',
    category: 'INFRASTRUCTURE',
    image: 'https://picsum.photos/seed/bridge-portal/1000/600',
    metrics: [{ label: 'LOAD', value: '4500T' }, { label: 'SPAN', value: '1.2KM' }]
  },
  {
    id: '2',
    title: 'VERTEX TOWER',
    category: 'COMMERCIAL',
    image: 'https://picsum.photos/seed/tower-portal/1000/600',
    metrics: [{ label: 'HEIGHT', value: '320M' }, { label: 'STEEL', value: '12KT' }]
  },
  {
    id: '3',
    title: 'GRID DATA CENTER',
    category: 'INDUSTRIAL',
    image: 'https://picsum.photos/seed/datacenter-portal/1000/600',
    metrics: [{ label: 'POWER', value: '50MW' }, { label: 'COOLING', value: 'LIQUID' }]
  },
  {
    id: '4',
    title: 'URBAN CONDUIT',
    category: 'TRANSPORT',
    image: 'https://picsum.photos/seed/conduit-portal/1000/600',
    metrics: [{ label: 'DEPTH', value: '45M' }, { label: 'FLOW', value: 'HIGH' }]
  }
];

interface PortalProps {
  onRequestConsult: () => void;
}

export default function CivilPortal({ onRequestConsult }: PortalProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 md:py-6 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Discipline / 01</span>
          <h1 className="text-sm font-bold uppercase tracking-[0.2em]">Civil Engineering</h1>
        </div>
        <button 
          onClick={onRequestConsult}
          className="w-full md:w-auto bg-black text-white px-6 py-3 text-[10px] font-semibold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300"
        >
          Request Consultation
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
              Structural Integrity / Physical Reality
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[clamp(2rem,6vw,5rem)] font-heading font-bold leading-[0.9] tracking-tighter uppercase mb-12"
            >
              Engineering the <span className="text-accent">Foundations</span> of the Modern World.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed"
            >
              We provide high-precision civil engineering solutions that prioritize structural longevity, environmental sustainability, and aesthetic excellence. From initial blueprints to final audits.
            </motion.p>
          </div>
        </section>

        {/* Featured Image Section */}
        <section className="py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-surface">
              <motion.img 
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
                src="https://picsum.photos/seed/modern-arch/2000/1250" 
                alt="Modern Architecture" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:col-span-5">
              <h3 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-8">Design Philosophy</h3>
              <p className="text-2xl md:text-3xl font-heading font-bold tracking-tight leading-tight uppercase mb-8">
                Form follows <span className="text-accent">Function</span>. Integrity follows <span className="text-accent">Logic</span>.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-1 h-12 bg-accent shrink-0" />
                  <p className="text-sm text-muted leading-relaxed">
                    Our approach is rooted in the belief that every structure must be a testament to engineering precision. We utilize advanced computational modeling to predict stress loads and environmental impacts long before the first stone is laid.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Services Grid */}
        <section className="py-24 md:py-32 border-t border-gray-100">
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-16">Core Engineering Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200">
            {[
              {
                title: 'Architectural Design',
                desc: 'Precision blueprints and 3D BIM modeling for complex structures.',
                icon: '01'
              },
              {
                title: 'Urban Planning',
                desc: 'Strategic site analysis and feasibility studies for large-scale developments.',
                icon: '02'
              },
              {
                title: 'Project Management',
                desc: 'End-to-end oversight ensuring timeline adherence and quality control.',
                icon: '03'
              },
              {
                title: 'Structural Audit',
                desc: 'Rigorous integrity testing and lifecycle maintenance planning.',
                icon: '04'
              }
            ].map((service, i) => (
              <div key={i} className="bg-white p-8 md:p-12 hover:bg-surface transition-colors group">
                <span className="text-xs font-mono text-accent mb-8 block">{service.icon}</span>
                <h4 className="text-xl font-heading font-bold mb-4 uppercase tracking-tight group-hover:text-accent transition-colors">{service.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Service Deep-Dive Section */}
        <section className="py-24 md:py-32">
          <div className="space-y-24 md:space-y-32">
            {[
              {
                title: 'Architectural Drawings & Design',
                description: 'The blueprint is the DNA of any structure. We specialize in high-fidelity architectural drawings that serve as the definitive guide for construction. Our designs integrate aesthetic vision with structural necessity, ensuring that every line serves a purpose.',
                subPoints: [
                  { title: 'BIM Level 3 Integration', desc: 'Full lifecycle digital representation of the physical and functional characteristics of the facility.' },
                  { title: 'Computational Design', desc: 'Using algorithms to solve complex design problems and optimize material usage.' },
                  { title: 'Structural Schematics', desc: 'Detailed load-path analysis and material specification for maximum longevity.' },
                  { title: 'Permit Documentation', desc: 'Comprehensive technical packs designed for rapid regulatory approval.' }
                ],
                image: 'https://picsum.photos/seed/blueprints/1000/1000'
              },
              {
                title: 'Urban Planning & Feasibility',
                description: 'Successful developments start with a deep understanding of the land. Our urban planning services combine data-driven site analysis with long-term vision to create sustainable, high-value environments.',
                subPoints: [
                  { title: 'Site Analysis', desc: 'Topographical, geological, and environmental assessment of the development area.' },
                  { title: 'Zoning Compliance', desc: 'Navigating complex regulatory frameworks to maximize land utility.' },
                  { title: 'Traffic Impact Studies', desc: 'Computational modeling of vehicle and pedestrian flow for optimal accessibility.' },
                  { title: 'Sustainability Audits', desc: 'Ensuring LEED Platinum standards and minimal environmental footprint.' }
                ],
                image: 'https://picsum.photos/seed/urban/1000/1000'
              }
            ].map((deepDive, idx) => (
              <div key={idx} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                  <h3 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter uppercase mb-8">{deepDive.title}</h3>
                  <p className="text-base md:text-lg text-muted leading-relaxed mb-12">{deepDive.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {deepDive.subPoints.map((point, pIdx) => (
                      <div key={pIdx} className="border-l-2 border-gray-100 pl-6 py-2 hover:border-accent transition-colors">
                        <h4 className="text-xs font-bold uppercase tracking-widest mb-2">{point.title}</h4>
                        <p className="text-xs text-muted leading-relaxed">{point.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`aspect-square bg-surface overflow-hidden ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <img 
                    src={deepDive.image} 
                    alt={deepDive.title} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Infrastructure Section */}
        <section className="py-24 md:py-32 border-t border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-12">Featured Infrastructure</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {PROJECTS.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover="hover"
                    className="group relative aspect-[4/5] bg-surface overflow-hidden border border-gray-200"
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[10px] font-mono text-white/60 mb-2 block tracking-widest">{project.category}</span>
                      <h3 className="text-lg md:text-xl font-heading font-medium text-white mb-6 uppercase tracking-tight">{project.title}</h3>
                      
                      <div className="flex gap-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {project.metrics?.map((m) => (
                          <div key={m.label}>
                            <span className="text-[9px] font-mono text-accent block mb-1">{m.label}</span>
                            <span className="text-sm font-semibold text-white">{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <aside className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-gray-200 pt-12 lg:pt-0 lg:pl-12">
              <div className="lg:sticky lg:top-32">
                <h2 className="text-xs font-mono text-muted uppercase tracking-widest mb-8">Technical Capabilities</h2>
                <div className="space-y-12">
                  <div>
                    <h3 className="text-lg font-heading font-semibold mb-4 uppercase">Reinforced Concrete</h3>
                    <p className="text-sm text-muted leading-relaxed">
                      High-performance mix designs for seismic zones and heavy industrial applications.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold mb-4 uppercase">Structural Steel</h3>
                    <p className="text-sm text-muted leading-relaxed">
                      Precision-engineered frameworks for high-rise commercial and complex geometric spans.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold mb-4 uppercase">Geotechnical Analysis</h3>
                    <p className="text-sm text-muted leading-relaxed">
                      Deep foundation systems and soil stabilization for challenging terrain and coastal environments.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

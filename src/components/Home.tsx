import { motion, useMotionValue, useTransform, animate, useInView, AnimatePresence } from 'motion/react';
import { Discipline } from '../types';
import { ArrowRight, ShieldCheck, Globe, Activity, Award, Building2, Shield, CheckCircle2, Quote, Plus, Minus, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface HomeProps {
  onSelect: (discipline: Discipline) => void;
  onProcessSelect: (discipline: Discipline) => void;
}

const PILLARS: { id: Discipline; title: string; subtext: string; icon: any }[] = [
  {
    id: 'CIVIL',
    title: 'CIVIL',
    subtext: 'PHYSICAL INFRASTRUCTURE & STRUCTURAL INTEGRITY',
    icon: Building2,
  },
  {
    id: 'WEB',
    title: 'WEB',
    subtext: 'SCALABLE SYSTEMS & DIGITAL ARCHITECTURE',
    icon: Globe,
  },
  {
    id: 'CYBER',
    title: 'CYBER',
    subtext: 'ZERO-TRUST SECURITY & THREAT MITIGATION',
    icon: Shield,
  },
];

const METRICS = [
  { label: 'INFRASTRUCTURE MANAGED', value: '$4.2B+', icon: Globe },
  { label: 'SECURITY AUDITS COMPLETED', value: '1,200+', icon: ShieldCheck },
  { label: 'SYSTEM UPTIME', value: '99.999%', icon: Activity },
  { label: 'GLOBAL CERTIFICATIONS', value: '14', icon: Award },
];

const METHOD_STEPS = [
  { id: '01', title: 'Analysis', description: 'Deep-dive into existing constraints, performance bottlenecks, and structural requirements.' },
  { id: '02', title: 'Blueprint', description: 'Architectural schematics and digital twins designed for absolute structural integrity.' },
  { id: '03', title: 'Execution', description: 'Rigid adherence to engineering specifications during the build and deployment phase.' },
  { id: '04', title: 'Optimization', description: 'Continuous monitoring and refinement to ensure long-term performance and scale.' }
];

const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'CTO, Global Infra', quote: 'The Architect redefined our digital foundation. Their structural approach to web architecture is unparalleled.' },
  { name: 'Marcus Thorne', role: 'Urban Planner', quote: 'Uncompromising precision in civil engineering. They bridge the gap between vision and reality.' },
  { name: 'Elena Rodriguez', role: 'Head of Security', quote: 'Zero-trust is not just a buzzword for them. It is the core of their engineering mindset.' }
];

const FAQS = [
  { q: 'How do you bridge the gap between physical and digital engineering?', a: 'We apply the same rigid structural principles to both. Whether it is a bridge or a microservice, we focus on load paths, scalability, and integrity.' },
  { q: 'What is your typical project timeline?', a: 'Timelines vary by discipline, but our focus is always on quality over speed. We provide detailed architectural schedules during the blueprint phase.' },
  { q: 'Do you offer long-term maintenance?', a: 'Yes. Engineering excellence extends far beyond the initial build. We provide continuous monitoring and optimization for all our projects.' }
];

function Counter({ value }: { value: string }) {
  const count = useMotionValue(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Parse the value string
  const numericMatch = value.match(/[\d.]+/);
  const numericValue = numericMatch ? parseFloat(numericMatch[0].replace(/,/g, '')) : 0;
  const prefix = value.split(/[\d,.]+/)[0];
  const suffix = value.split(/[\d,.]+/)[1] || '';
  const hasComma = value.includes(',');
  const decimals = numericMatch?.[0].split('.')[1]?.length || 0;

  const rounded = useTransform(count, (latest) => {
    let formatted = latest.toFixed(decimals);
    if (hasComma) {
      const parts = formatted.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      formatted = parts.join('.');
    }
    return `${prefix}${formatted}${suffix}`;
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numericValue, {
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
      });
      return controls.stop;
    }
  }, [isInView, count, numericValue]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const PARTNERS = [
  'AEROSPACE DYNAMICS', 'GLOBAL LOGISTICS', 'NEO-URBAN PLANNERS', 'QUANTUM SYSTEMS', 'TITAN ENERGY'
];

export default function Home({ onSelect, onProcessSelect }: HomeProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <div className="relative pt-24 md:pt-32 px-4 md:px-12 pb-16 md:pb-32 border-b border-gray-100 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6 md:gap-0 mb-12"
        >
          <span className="text-[9px] md:text-[10px] font-mono text-accent tracking-[0.3em] uppercase">Engineering Authority / Global Presence</span>
          <div className="flex flex-wrap gap-3 md:gap-8">
            {['ISO 27001', 'SOC2 TYPE II', 'LEED PLATINUM'].map((cert) => (
              <span key={cert} className="text-[8px] md:text-[9px] font-bold tracking-widest border border-gray-200 px-2 py-1">{cert}</span>
            ))}
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 text-[clamp(2.5rem,10vw,6rem)] font-heading font-semibold leading-[0.85] tracking-tighter max-w-5xl uppercase"
        >
          ENGINEERING REALITY.<br />
          ARCHITECTING DIGITAL.<br />
          SECURING BOTH.
        </motion.h1>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden md:flex absolute bottom-12 left-12 items-center gap-4"
        >
          <div className="w-[1px] h-12 bg-gray-200 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-4 bg-accent"
            />
          </div>
          <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Scroll to Explore</span>
        </motion.div>
      </div>

      {/* Trust Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-gray-200 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
        {METRICS.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 md:p-8 border-r border-gray-200 last:border-r-0 flex flex-col gap-3 md:gap-4 relative z-10"
          >
            <metric.icon size={16} className="text-accent" />
            <div>
              <div className="text-xl md:text-2xl font-heading font-bold tracking-tight">
                <Counter value={metric.value} />
              </div>
              <div className="text-[9px] md:text-[10px] font-mono text-muted uppercase tracking-widest mt-1">{metric.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* The Triad Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 border-b border-gray-200">
        {PILLARS.map((pillar, idx) => (
          <motion.button
            key={pillar.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            onClick={() => onSelect(pillar.id)}
            className="group relative flex flex-col justify-between p-8 md:p-12 text-left border-b lg:border-b-0 lg:border-r border-gray-200 last:border-r-0 hover:bg-black hover:text-white transition-all duration-500 overflow-hidden min-h-[300px] md:min-h-[450px]"
          >
            <div className="relative z-10">
              <span className="text-[10px] font-mono text-accent mb-4 block uppercase tracking-widest">PORTAL_0{idx + 1}</span>
              <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tighter leading-none transition-transform duration-500 group-hover:translate-x-2 uppercase">
                {pillar.title}
              </h2>
              <p className="mt-6 md:mt-8 text-xs md:text-sm text-muted max-w-[240px] leading-relaxed group-hover:text-gray-400 transition-colors duration-500">
                {pillar.subtext}
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-2 text-accent opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
              <span className="text-[10px] font-bold uppercase tracking-widest">Enter Discipline</span>
              <ArrowRight size={16} />
            </div>

            {/* Background Icon */}
            <div className="absolute -bottom-12 -right-12 opacity-5 group-hover:opacity-10 transition-opacity">
              <pillar.icon size={180} className="md:size-[240px]" />
            </div>
          </motion.button>
        ))}
      </div>

      {/* The Architectural Method (Process) */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-8 md:mb-12">The Architectural Method</h2>
              <h3 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter leading-[0.9] uppercase mb-8 md:mb-12">
                A Unified<br />Engineering<br /><span className="text-accent">Mindset.</span>
              </h3>
              <p className="text-base md:text-lg text-muted leading-relaxed mb-8 md:mb-12">
                We do not just build; we architect. Every project follows a rigid, four-phase execution model designed to ensure absolute integrity and performance.
              </p>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => onProcessSelect('CIVIL')}
                  className="flex items-center justify-between p-6 border border-gray-200 bg-white hover:border-accent group transition-all"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest">Civil Design Process</span>
                  <ArrowRight size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-all" />
                </button>
                <button 
                  onClick={() => onProcessSelect('WEB')}
                  className="flex items-center justify-between p-6 border border-gray-200 bg-white hover:border-accent group transition-all"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest">Web Architecture Process</span>
                  <ArrowRight size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-all" />
                </button>
                <button 
                  onClick={() => onProcessSelect('CYBER')}
                  className="flex items-center justify-between p-6 border border-gray-200 bg-white hover:border-accent group transition-all"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest">Cyber Security Protocol</span>
                  <ArrowRight size={14} className="text-accent opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-12">
              {METHOD_STEPS.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 border border-gray-200 bg-white hover:border-accent transition-colors group"
                >
                  <span className="text-xs font-mono text-accent mb-6 block">{step.id}</span>
                  <h4 className="text-xl font-heading font-bold mb-4 uppercase tracking-tight">{step.title}</h4>
                  <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="border-t border-gray-200 bg-white">
        <div className="p-6 md:p-12 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0">
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em]">Featured Case Studies / Tangible Results</h2>
          <button className="text-[10px] font-bold uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-2">
            View All Projects <ArrowRight size={14} />
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {[
            {
              discipline: 'CIVIL' as Discipline,
              title: 'THE MONOLITH BRIDGE',
              stat: '1.2KM SPAN',
              result: 'COMPLETED 4 MONTHS AHEAD OF SCHEDULE',
              image: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=1000'
            },
            {
              discipline: 'WEB' as Discipline,
              title: 'GLOBAL RETAIL ENGINE',
              stat: '150MS LATENCY',
              result: 'MAINTAINED DURING 10X TRAFFIC SPIKE',
              image: 'https://images.unsplash.com/photo-1558441719-ffb4d4520a67?auto=format&fit=crop&q=80&w=1000'
            },
            {
              discipline: 'CYBER' as Discipline,
              title: 'FINANCIAL CORE AUDIT',
              stat: 'ZERO BREACHES',
              result: 'POST-IMPLEMENTATION OF ZERO-TRUST',
              image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000'
            }
          ].map((study, idx) => (
            <div 
              key={study.title}
              className="border-b lg:border-b-0 lg:border-r border-gray-200 last:border-r-0 flex flex-col group cursor-pointer overflow-hidden"
              onClick={() => onSelect(study.discipline)}
            >
              <div className="aspect-[16/9] overflow-hidden border-b border-gray-100">
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-between flex-grow">
                <div>
                  <span className="text-[10px] font-mono text-accent mb-4 block uppercase tracking-widest">{study.discipline}</span>
                  <h3 className="text-xl md:text-2xl font-heading font-bold tracking-tighter mb-4 uppercase group-hover:text-accent transition-colors">{study.title}</h3>
                  <div className="text-2xl md:text-3xl font-heading font-bold mb-2">{study.stat}</div>
                  <p className="text-xs text-muted uppercase tracking-wider leading-relaxed">{study.result}</p>
                </div>
                <div className="mt-8 md:mt-12 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  View Case Details <ArrowRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-xs font-mono text-gray-500 uppercase tracking-[0.3em] mb-16 md:mb-24 text-center">Engineering Trust</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <Quote size={32} className="text-accent mb-8" />
                <p className="text-xl font-heading font-medium leading-relaxed mb-12">"{t.quote}"</p>
                <div>
                  <span className="text-sm font-bold block uppercase tracking-widest mb-1">{t.name}</span>
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{t.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto">
        <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-gray-200">
              <button 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-surface transition-colors gap-4"
              >
                <span className="text-base md:text-lg font-heading font-bold uppercase tracking-tight">{faq.q}</span>
                {activeFaq === i ? <Minus size={20} className="shrink-0" /> : <Plus size={20} className="shrink-0" />}
              </button>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 pt-0 text-muted leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Marquee */}
      <div className="py-12 border-t border-gray-200 overflow-hidden bg-white">
        <div className="flex items-center gap-24 animate-marquee whitespace-nowrap px-12">
          {[...PARTNERS, ...PARTNERS].map((partner, i) => (
            <span 
              key={i} 
              className="text-xs font-bold text-gray-300 uppercase tracking-[0.4em] hover:text-black transition-colors cursor-default"
            >
              {partner}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

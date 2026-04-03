import { motion } from 'motion/react';
import { Building2, Globe, Shield, ArrowRight, CheckCircle2, Zap, Layout, Database, Lock, Terminal, Activity } from 'lucide-react';
import { Discipline } from '../types';

interface ServicesProps {
  onSelect: (discipline: Discipline) => void;
}

export default function Services({ onSelect }: ServicesProps) {
  const services = [
    {
      id: 'CIVIL' as Discipline,
      title: 'CIVIL DESIGN',
      description: 'Physical infrastructure and structural integrity for modern urban environments.',
      icon: Building2,
      features: ['Architectural Drawings', 'Structural Analysis', 'Urban Planning', 'Project Management'],
      color: 'text-accent',
    },
    {
      id: 'WEB' as Discipline,
      title: 'WEB ARCHITECTURE',
      description: 'Scalable systems and digital architecture designed for high-performance client interfaces.',
      icon: Globe,
      features: ['Full-Stack Systems', 'Microservices', 'API Gateways', 'Cloud Orchestration'],
      color: 'text-accent',
    },
    {
      id: 'CYBER' as Discipline,
      title: 'CYBER SECURITY',
      description: 'Zero-trust security and threat mitigation protocols for enterprise-grade protection.',
      icon: Shield,
      features: ['Threat Modeling', 'Security Audits', 'Zero-Trust Implementation', 'Incident Response'],
      color: 'text-accent',
    },
  ];

  const additionalServices = [
    { icon: Zap, title: 'Performance Optimization', text: 'Enhancing system efficiency and throughput across all engineering disciplines.' },
    { icon: Layout, title: 'UI/UX Architecture', text: 'Designing intuitive interfaces that bridge the gap between complex systems and users.' },
    { icon: Database, title: 'Data Integrity', text: 'Ensuring absolute accuracy and reliability of relational and non-relational data systems.' },
    { icon: Lock, title: 'Compliance Auditing', text: 'Rigid adherence to global engineering and security standards (ISO, SOC2, NIST).' },
    { icon: Terminal, title: 'System Automation', text: 'Streamlining complex workflows through custom-built engineering tools and scripts.' },
    { icon: Activity, title: 'Continuous Monitoring', text: 'Real-time oversight and proactive maintenance of physical and digital assets.' },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-32 max-w-3xl">
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-6 md:mb-8">What We Offer</h2>
          <h1 className="text-4xl md:text-7xl font-heading font-bold tracking-tighter leading-[0.9] uppercase mb-8 md:mb-12">
            A Full Range of<br /><span className="text-accent">Engineering</span><br />Services.
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed">
            We provide specialized consulting and execution services across three core pillars of modern engineering. Our approach ensures that your infrastructure is built to last, scale, and perform under any load.
          </p>
        </div>

        {/* Core Services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-24 md:mb-32">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 md:p-12 border border-gray-100 bg-surface group hover:border-accent transition-all flex flex-col h-full"
            >
              <service.icon className={`${service.color} mb-6 md:mb-8 group-hover:scale-110 transition-transform`} size={48} />
              <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tighter mb-4 md:mb-6 uppercase">{service.title}</h3>
              <p className="text-base md:text-muted leading-relaxed mb-8 flex-grow">{service.description}</p>
              <ul className="space-y-4 mb-12">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                    <CheckCircle2 size={14} className="text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => onSelect(service.id)}
                className="flex items-center justify-between p-6 border border-black hover:bg-black hover:text-white transition-all group/btn"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest">Explore Portal</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Services Grid */}
        <div className="bg-black text-white p-12 md:p-24 relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-xs font-mono text-gray-400 uppercase tracking-[0.3em] mb-12 md:mb-16 text-center">Specialized Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
              {additionalServices.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <item.icon className="text-accent mb-4 md:mb-6 group-hover:scale-110 transition-transform" size={24} />
                  <h4 className="text-base md:text-lg font-heading font-bold tracking-tighter uppercase mb-4">{item.title}</h4>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 md:mt-32 text-center py-16 md:py-24 border-t border-gray-100">
          <h3 className="text-2xl md:text-4xl font-heading font-bold tracking-tighter uppercase mb-8">Ready to architect your next project?</h3>
          <button 
            onClick={() => onSelect('CIVIL')} // Default to first portal or specialized consult
            className="w-full md:w-auto bg-accent text-white px-12 py-6 text-xs font-bold tracking-[0.2em] hover:bg-black transition-all"
          >
            REQUEST A FULL AUDIT
          </button>
        </div>
      </div>
    </div>
  );
}

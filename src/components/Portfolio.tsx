import { motion } from 'motion/react';
import { Linkedin, Twitter, Mail, ArrowRight, Award, Code, Shield, Building2, ExternalLink } from 'lucide-react';

export default function Portfolio() {
  const skills = [
    { name: 'CIVIL ENGINEERING', level: 95, icon: Building2 },
    { name: 'WEB ARCHITECTURE', level: 98, icon: Code },
    { name: 'CYBER SECURITY', level: 92, icon: Shield },
    { name: 'SYSTEM DESIGN', level: 99, icon: Award },
  ];

  const projects = [
    {
      title: 'Global Infrastructure Audit',
      category: 'CIVIL',
      description: 'A comprehensive structural audit of a major European transportation hub, identifying and mitigating critical load failures.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800&h=500',
    },
    {
      title: 'Zero-Trust Framework',
      category: 'CYBER',
      description: 'Architecting a proprietary zero-trust security framework for a leading financial institution, protecting over $50B in assets.',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=500',
    },
    {
      title: 'Edge Computing Network',
      category: 'WEB',
      description: 'Designing a globally distributed edge computing network to handle peak traffic of 1M+ requests per second.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800&h=500',
    },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 mb-24 md:mb-48 items-center">
          <div className="max-w-2xl">
            <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-6 md:mb-8">Architect & Visionary</h2>
            <h1 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.9] uppercase mb-8 md:mb-12">
              I am<br /><span className="text-accent">EliTechWiz.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed mb-8 md:mb-12">
              A cross-disciplinary engineer dedicated to bridging the gap between physical infrastructure and digital architecture. I design the foundations of the future.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Linkedin size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Twitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Mail size={24} /></a>
            </div>
          </div>
          <div className="aspect-[4/5] bg-surface overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=1000" 
              alt="EliTechWiz"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
          </div>
        </div>

        {/* Skills */}
        <div className="mb-24 md:mb-48">
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-12 md:mb-16 text-center">Core Disciplines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 md:p-12 bg-surface border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
                <div className="relative z-10">
                  <skill.icon className="text-accent mb-6 md:mb-8" size={32} />
                  <h3 className="text-lg md:text-xl font-heading font-bold tracking-tighter uppercase mb-4 md:mb-6">{skill.name}</h3>
                  <div className="w-full h-1 bg-gray-200 mb-4">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-accent"
                    />
                  </div>
                  <div className="text-[10px] font-bold text-muted uppercase tracking-widest">{skill.level}% PROFICIENCY</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-24 md:mb-48">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-16 md:mb-24">
            <div className="max-w-xl">
              <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-6 md:mb-8">Selected Works</h2>
              <h3 className="text-3xl md:text-5xl font-heading font-bold tracking-tighter uppercase leading-tight">
                Architecting<br />the Reality of Tomorrow.
              </h3>
            </div>
            <button className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-3 group">
              VIEW ALL PROJECTS <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] bg-surface overflow-hidden mb-6 md:mb-8 relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
                </div>
                <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4">{project.category}</div>
                <h4 className="text-xl md:text-2xl font-heading font-bold tracking-tighter uppercase mb-4 md:mb-6 group-hover:text-accent transition-colors">
                  {project.title}
                </h4>
                <p className="text-muted text-sm leading-relaxed mb-6 md:mb-8">{project.description}</p>
                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest group-hover:gap-5 transition-all">
                  EXPLORE CASE STUDY <ExternalLink size={14} className="text-accent" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-12 md:p-24 bg-surface border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter uppercase mb-6 md:mb-8">Let's Architect Your Next Success.</h3>
            <p className="text-muted mb-8 md:mb-12 text-sm md:text-base">Whether you have a specific structural challenge or need a comprehensive engineering audit, I am ready to provide expert guidance.</p>
            <button className="w-full md:w-auto bg-black text-white px-12 py-6 text-xs font-bold tracking-[0.2em] hover:bg-accent transition-all">
              START A CONSULTATION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

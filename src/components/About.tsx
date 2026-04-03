import { motion } from 'motion/react';
import { Shield, Target, Users, Award, Building2, Globe, ShieldCheck } from 'lucide-react';

export default function About() {
  const stats = [
    { label: 'YEARS OF EXCELLENCE', value: '18+' },
    { label: 'PROJECTS DELIVERED', value: '1,200+' },
    { label: 'GLOBAL PARTNERS', value: '90+' },
    { label: 'CERTIFICATIONS', value: '14' },
  ];

  const team = [
    { name: 'Dr. Alistair Vance', role: 'Chief Structural Architect', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500' },
    { name: 'Sarah Chen', role: 'Head of Digital Infrastructure', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=500' },
    { name: 'Marcus Thorne', role: 'Director of Cyber Security', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=500' },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-6 md:mb-8">Expertise and Experience</h2>
            <h1 className="text-4xl md:text-7xl font-heading font-bold tracking-tighter leading-[0.9] uppercase mb-8 md:mb-12">
              Architecting<br />the Future of<br /><span className="text-accent">Integrity.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed mb-8 md:mb-12 max-w-xl">
              We are a multi-disciplinary engineering firm dedicated to the absolute structural integrity of both physical and digital landscapes. Our approach is rooted in the rigid principles of classical architecture, applied to modern infrastructure.
            </p>
            <div className="grid grid-cols-2 gap-8 md:gap-12">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-heading font-bold tracking-tighter mb-2">{stat.value}</div>
                  <div className="text-[10px] font-bold text-muted uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative aspect-[4/5] bg-surface overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000" 
              alt="Architecture"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-24 md:mb-32">
          {[
            { icon: Target, title: 'OUR MISSION', text: 'To provide uncompromising engineering solutions that define the standard for safety, performance, and scale in a rapidly evolving world.' },
            { icon: Shield, title: 'OUR VISION', text: 'A world where physical and digital infrastructures are built on the same immutable principles of structural integrity and zero-trust security.' },
            { icon: Users, title: 'OUR VALUES', text: 'Precision, accountability, and the relentless pursuit of engineering excellence in every blueprint we draft and every system we deploy.' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 md:p-12 border border-gray-100 bg-surface group hover:border-accent transition-all"
            >
              <item.icon className="text-accent mb-6 md:mb-8 group-hover:scale-110 transition-transform" size={32} />
              <h3 className="text-xl font-heading font-bold tracking-tighter mb-4 md:mb-6 uppercase">{item.title}</h3>
              <p className="text-muted leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-24 md:mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-0">
            <div>
              <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-4">The Architects</h2>
              <h3 className="text-3xl md:text-5xl font-heading font-bold tracking-tighter uppercase">Seasoned Professionals</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-[4/5] bg-surface overflow-hidden mb-6 relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-xl font-heading font-bold tracking-tighter uppercase mb-1">{member.name}</h4>
                <p className="text-xs font-mono text-muted uppercase tracking-widest">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Industries Section */}
        <div className="py-16 md:py-24 border-t border-gray-100">
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-12 text-center">Industries We Cover</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-24 opacity-40 grayscale">
            {['REAL ESTATE', 'FINTECH', 'AEROSPACE', 'GOVERNMENT', 'LOGISTICS'].map((industry) => (
              <span key={industry} className="text-xs md:text-sm font-bold tracking-[0.3em]">{industry}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

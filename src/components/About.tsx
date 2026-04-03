import { motion } from 'motion/react';
import { Shield, Target, Users, Award, Building2, Globe, ShieldCheck, Zap, ArrowRight, CheckCircle2, History, Lightbulb } from 'lucide-react';

interface AboutProps {
  onJoin?: () => void;
}

export default function About({ onJoin }: AboutProps) {
  const stats = [
    { label: 'YEARS OF EXCELLENCE', value: '18+', icon: History },
    { label: 'PROJECTS DELIVERED', value: '1,200+', icon: Building2 },
    { label: 'GLOBAL PARTNERS', value: '90+', icon: Globe },
    { label: 'CERTIFICATIONS', value: '14', icon: Award },
  ];

  const team = [
    { 
      name: 'Dr. Alistair Vance', 
      role: 'Chief Structural Architect', 
      image: 'https://picsum.photos/seed/alistair/400/500',
      bio: 'Former lead engineer for global infrastructure projects, specializing in seismic resilience and high-load distribution.'
    },
    { 
      name: 'Sarah Chen', 
      role: 'Head of Digital Infrastructure', 
      image: 'https://picsum.photos/seed/sarah/400/500',
      bio: 'Pioneer in cloud-native architecture and distributed systems, focusing on sub-millisecond latency and absolute data integrity.'
    },
    { 
      name: 'Marcus Thorne', 
      role: 'Director of Cyber Security', 
      image: 'https://picsum.photos/seed/marcus/400/500',
      bio: 'Expert in zero-trust frameworks and threat mitigation, with a background in defensive cyber operations for financial institutions.'
    },
    { 
      name: 'Elena Vance', 
      role: 'Principal Urban Planner', 
      image: 'https://picsum.photos/seed/elena/400/500',
      bio: 'Specializing in sustainable urban development and the integration of digital twins into physical city planning.'
    }
  ];

  const timeline = [
    { year: '2008', title: 'Foundation', desc: 'EliTechWiz established as a boutique civil engineering firm in London.' },
    { year: '2012', title: 'Digital Expansion', desc: 'Launched the Web Architecture division to address the growing need for structural digital systems.' },
    { year: '2016', title: 'Cyber Integration', desc: 'Integrated Zero-Trust security protocols into every engineering discipline.' },
    { year: '2020', title: 'Global Authority', desc: 'Recognized as a leading engineering authority with projects spanning five continents.' },
    { year: '2024', title: 'The Future', desc: 'Pioneering the use of AI-driven structural analysis and autonomous infrastructure monitoring.' }
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 min-h-screen bg-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full blueprint-grid opacity-[0.03]" />
        <div className="absolute top-1/4 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-32 md:mb-48">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xs font-mono text-accent uppercase tracking-[0.4em] mb-8 block"
            >
              Engineering Authority / Est. 2008
            </motion.span>
            <h1 className="text-5xl md:text-8xl font-heading font-bold tracking-tighter leading-[0.85] uppercase mb-12">
              Architecting<br />the Future of<br /><span className="text-accent underline decoration-accent/20 underline-offset-8">Integrity.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted leading-relaxed mb-12 max-w-xl font-light">
              We are a cross-disciplinary engineering firm dedicated to the absolute structural integrity of both physical and digital landscapes.
            </p>
            
            <div className="grid grid-cols-2 gap-12">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="relative group"
                >
                  <div className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mb-3 group-hover:text-accent transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-bold text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                    <stat.icon size={12} className="text-accent" />
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative aspect-[4/5] group"
          >
            <div className="absolute -inset-4 border border-gray-100 -z-10 group-hover:inset-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <img 
              src="https://picsum.photos/seed/architecture-about/1000/1250" 
              alt="Architecture"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none z-20" />
            
            {/* Decorative Label */}
            <div className="absolute bottom-8 -left-12 bg-black text-white p-6 md:p-8 z-30 shadow-2xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] block mb-2 text-accent">Structural Analysis</span>
              <span className="text-lg font-bold uppercase tracking-tighter">Ref: ELITECHWIZ_01</span>
            </div>
          </motion.div>
        </div>

        {/* Philosophy Section */}
        <section className="mb-32 md:mb-48">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-12">Our Philosophy</h2>
              <h3 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter leading-[0.9] uppercase mb-12">
                The Rigid<br />Principles of<br /><span className="text-accent">Excellence.</span>
              </h3>
              <p className="text-lg text-muted leading-relaxed mb-12">
                We believe that the principles of classical engineering—load paths, structural redundancy, and material integrity—are just as applicable to a microservice architecture as they are to a suspension bridge.
              </p>
              <ul className="space-y-6">
                {[
                  'Absolute Structural Integrity',
                  'Zero-Trust Security Frameworks',
                  'Predictable Performance Scaling',
                  'Uncompromising Accountability'
                ].map((point, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest"
                  >
                    <CheckCircle2 size={16} className="text-accent" />
                    {point}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Target, title: 'OUR MISSION', text: 'To provide uncompromising engineering solutions that define the standard for safety, performance, and scale in a rapidly evolving world.' },
                { icon: Shield, title: 'OUR VISION', text: 'A world where physical and digital infrastructures are built on the same immutable principles of structural integrity.' },
                { icon: Users, title: 'OUR VALUES', text: 'Precision, accountability, and the relentless pursuit of engineering excellence in every blueprint we draft.' },
                { icon: Lightbulb, title: 'INNOVATION', text: 'Leveraging cutting-edge computational modeling and AI to predict structural failures before they occur.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 border border-gray-100 bg-surface group hover:border-accent transition-all relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <item.icon size={80} />
                  </div>
                  <item.icon className="text-accent mb-8 group-hover:scale-110 transition-transform" size={32} />
                  <h3 className="text-xl font-heading font-bold tracking-tighter mb-6 uppercase">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="mb-32 md:mb-48 py-24 border-y border-gray-100 relative">
          <div className="absolute inset-0 blueprint-grid opacity-[0.02] pointer-events-none" />
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-24 text-center">The Evolution of EliTechWiz</h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 relative z-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left group"
                >
                  <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center mb-8 group-hover:border-accent group-hover:bg-black group-hover:text-white transition-all duration-500 relative">
                    <span className="text-xs font-mono font-bold">{item.year}</span>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-lg font-heading font-bold uppercase tracking-tight mb-4 group-hover:text-accent transition-colors">{item.title}</h4>
                  <p className="text-xs text-muted leading-relaxed max-w-[200px]">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-32 md:mb-48">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-8">The Architects</h2>
              <h3 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter uppercase leading-[0.9]">
                A Collective of<br /><span className="text-accent">Engineering Authority.</span>
              </h3>
            </div>
            <button 
              onClick={onJoin}
              className="text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-3 group"
            >
              JOIN ELITECHWIZ <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="aspect-[4/5] bg-surface overflow-hidden mb-8 relative">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <p className="text-white text-[10px] leading-relaxed font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all delay-100 translate-y-4 group-hover:translate-y-0">
                      {member.bio}
                    </p>
                  </div>
                  <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
                </div>
                <h4 className="text-xl font-heading font-bold tracking-tighter uppercase mb-2 group-hover:text-accent transition-colors">{member.name}</h4>
                <p className="text-[10px] font-mono text-muted uppercase tracking-[0.2em]">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Global Reach Section */}
        <section className="py-24 md:py-32 bg-black text-white relative overflow-hidden -mx-4 md:-mx-8 px-4 md:px-8">
          <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="text-xs font-mono text-gray-500 uppercase tracking-[0.3em] mb-12">Global Footprint</h2>
                <h3 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter uppercase mb-12 leading-[0.9]">
                  Engineering<br />Without<br /><span className="text-accent">Borders.</span>
                </h3>
                <p className="text-lg text-gray-400 leading-relaxed mb-12">
                  From the structural hubs of London to the digital gateways of Singapore, our authority is recognized globally. We operate where integrity is required.
                </p>
                <div className="grid grid-cols-2 gap-12">
                  {[
                    { region: 'EUROPE', projects: '450+' },
                    { region: 'AMERICAS', projects: '320+' },
                    { region: 'ASIA PACIFIC', projects: '280+' },
                    { region: 'MIDDLE EAST', projects: '150+' },
                  ].map((item) => (
                    <div key={item.region}>
                      <div className="text-2xl font-heading font-bold text-accent mb-2">{item.projects}</div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">{item.region}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-square">
                <div className="absolute inset-0 border border-white/10 rounded-full animate-pulse" />
                <div className="absolute inset-12 border border-white/5 rounded-full animate-pulse delay-700" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe size={200} className="text-accent opacity-20" />
                </div>
                {/* Decorative Points */}
                {[
                  { top: '20%', left: '30%' },
                  { top: '40%', left: '70%' },
                  { top: '60%', left: '40%' },
                  { top: '30%', left: '60%' },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                    style={pos}
                    className="absolute w-2 h-2 bg-accent rounded-full shadow-[0_0_15px_rgba(0,71,255,0.8)]"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <div className="py-24 md:py-32 border-t border-gray-100">
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-16 text-center">Sectors of Authority</h2>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            {['REAL ESTATE', 'FINTECH', 'AEROSPACE', 'GOVERNMENT', 'LOGISTICS', 'ENERGY'].map((industry) => (
              <motion.span 
                key={industry} 
                whileHover={{ scale: 1.1, color: '#0047FF' }}
                className="text-xs md:text-sm font-bold tracking-[0.4em] text-muted hover:text-accent transition-all cursor-default"
              >
                {industry}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

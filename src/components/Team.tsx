import { motion } from 'motion/react';
import { Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';

export default function Team({ onJoin }: { onJoin?: () => void }) {
  const members = [
    {
      name: 'EliTechWiz',
      role: 'Chief Architect & Founder',
      bio: 'Visionary engineer with over 15 years of experience in cross-disciplinary infrastructure. Leading the integration of physical and digital systems.',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=600&q=80',
      socials: { linkedin: 'https://www.linkedin.com/in/eliahhango/', twitter: 'https://github.com/Eliahhango', mail: 'hangoeliah@outlook.com' }
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Web Architecture',
      bio: 'Specialist in distributed systems and cloud-native scaling. Sarah ensures our digital foundations are as solid as steel.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      socials: { linkedin: '#', twitter: '#', mail: 'sarah@elitechwiz.eng' }
    },
    {
      name: 'Marcus Thorne',
      role: 'Director of Cyber Security',
      bio: 'Former intelligence officer turned defensive architect. Marcus designs the zero-trust protocols that protect our clients.',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80',
      socials: { linkedin: '#', twitter: '#', mail: 'marcus@elitechwiz.eng' }
    },
    {
      name: 'Dr. Alistair Vance',
      role: 'Lead Civil Engineer',
      bio: 'Expert in structural load dynamics and sustainable urban planning. Alistair bridges the gap between theory and reality.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      socials: { linkedin: '#', twitter: '#', mail: 'alistair@elitechwiz.eng' }
    }
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-32 max-w-3xl">
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-6 md:mb-8">The Human Element</h2>
          <h1 className="text-4xl md:text-7xl font-heading font-bold tracking-tighter leading-[0.9] uppercase mb-8 md:mb-12">
            Architects of<br /><span className="text-accent">Innovation.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed">
            Meet the elite team of engineers and strategists dedicated to redefining the boundaries of modern infrastructure.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {members.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-[4/5] bg-surface overflow-hidden mb-6 md:mb-8 relative">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform bg-black/80 backdrop-blur-sm">
                  <div className="flex justify-center gap-6">
                    <a href={member.socials.linkedin} className="text-white hover:text-accent transition-colors"><Linkedin size={18} /></a>
                    <a href={member.socials.twitter} className="text-white hover:text-accent transition-colors"><Twitter size={18} /></a>
                    <a href={`mailto:${member.socials.mail}`} className="text-white hover:text-accent transition-colors"><Mail size={18} /></a>
                  </div>
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-heading font-bold tracking-tighter uppercase mb-2 group-hover:text-accent transition-colors">
                {member.name}
              </h3>
              <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4 md:mb-6">{member.role}</div>
              <p className="text-muted text-sm leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>

        {/* Join Us */}
        <div className="mt-24 md:mt-32 p-12 md:p-24 bg-surface border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
          <div className="relative z-10 max-w-xl">
            <h3 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter uppercase mb-6">Join the Collective</h3>
            <p className="text-muted leading-relaxed">
              We are always looking for exceptional talent in civil engineering, web architecture, and cyber security. Think you have what it takes?
            </p>
          </div>
          <button 
            onClick={onJoin}
            className="w-full md:w-auto relative z-10 bg-black text-white px-12 py-6 text-xs font-bold tracking-[0.2em] hover:bg-accent transition-all flex items-center justify-center gap-4 group"
          >
            VIEW OPEN POSITIONS
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

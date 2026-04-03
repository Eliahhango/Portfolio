import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Globe, ArrowRight, MessageSquare, Clock, Send } from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    { icon: Mail, label: 'EMAIL', value: 'ARCHITECT@ENGINEERING.COM', text: 'Our team typically responds within 24 hours.' },
    { icon: Phone, label: 'PHONE', value: '+1 (800) ARCHITECT', text: 'Available for urgent structural inquiries.' },
    { icon: MapPin, label: 'LOCATION', value: 'GLOBAL HEADQUARTERS', text: '123 Architectural Way, San Francisco, CA' },
    { icon: Clock, label: 'HOURS', value: '08:00 - 18:00 PST', text: 'Monday through Friday, excluding holidays.' },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-32 max-w-3xl">
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-6 md:mb-8">Begin Your Journey</h2>
          <h1 className="text-4xl md:text-7xl font-heading font-bold tracking-tighter leading-[0.9] uppercase mb-8 md:mb-12">
            Let's Architect<br />Your Next<br /><span className="text-accent">Success.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed">
            Whether you have a specific structural challenge or need a comprehensive engineering audit, our team is ready to provide expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-12 md:space-y-16">
            {contactInfo.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="flex items-center gap-6 mb-4 md:mb-6">
                  <div className="p-4 bg-surface border border-gray-100 group-hover:border-accent transition-all">
                    <item.icon className="text-accent" size={24} />
                  </div>
                  <div className="text-[10px] font-bold text-muted uppercase tracking-[0.3em]">{item.label}</div>
                </div>
                <div className="text-xl md:text-2xl font-heading font-bold tracking-tighter uppercase mb-2">{item.value}</div>
                <p className="text-muted text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}

            {/* Socials */}
            <div className="pt-12 border-t border-gray-100">
              <h3 className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-8">Connect With Us</h3>
              <div className="flex flex-wrap gap-6 md:gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
                {['LINKEDIN', 'TWITTER', 'GITHUB', 'INSTAGRAM'].map((social) => (
                  <a key={social} href="#" className="text-xs font-bold tracking-widest hover:text-accent transition-colors">{social}</a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-16 bg-surface border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tighter uppercase mb-8 md:mb-12 flex items-center gap-4">
                  <MessageSquare className="text-accent" size={32} />
                  Send a Message
                </h3>
                <form className="space-y-8 md:space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="ENTER NAME" 
                        className="w-full bg-white border border-gray-200 px-6 py-4 text-xs font-bold tracking-widest outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="ENTER EMAIL" 
                        className="w-full bg-white border border-gray-200 px-6 py-4 text-xs font-bold tracking-widest outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Discipline of Interest</label>
                    <select className="w-full bg-white border border-gray-200 px-6 py-4 text-xs font-bold tracking-widest outline-none focus:border-accent transition-colors appearance-none">
                      <option>CIVIL ENGINEERING</option>
                      <option>WEB ARCHITECTURE</option>
                      <option>CYBER SECURITY</option>
                      <option>GENERAL CONSULTATION</option>
                    </select>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-widest">Your Message</label>
                    <textarea 
                      rows={6}
                      placeholder="DESCRIBE YOUR ARCHITECTURAL REQUIREMENTS" 
                      className="w-full bg-white border border-gray-200 px-6 py-4 text-xs font-bold tracking-widest outline-none focus:border-accent transition-colors resize-none"
                    />
                  </div>
                  <button className="w-full bg-black text-white px-12 py-6 text-xs font-bold tracking-[0.2em] hover:bg-accent transition-all flex items-center justify-center gap-4 group">
                    DISPATCH MESSAGE
                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

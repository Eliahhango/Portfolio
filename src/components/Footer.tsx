import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Linkedin, Facebook, Instagram, Github, Dribbble, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (view: any) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-32 pb-12 px-6 md:px-12 overflow-hidden relative">
      {/* Background Blueprint Grid Overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24 lg:mb-32">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <button 
              onClick={() => onNavigate('HOME')}
              className="mb-8 hover:opacity-80 transition-opacity"
            >
              <Logo className="invert" />
            </button>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-12">
              Establishing absolute authority across physical infrastructure, digital architecture, and cybersecurity. Engineering the reality of tomorrow with EliTechWiz.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="https://www.linkedin.com/in/eliahhango/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors"><Linkedin size={20} /></a>
              <a href="https://web.facebook.com/profile.php?id=100086957732931" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/elitechwiz/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors"><Instagram size={20} /></a>
              <a href="https://github.com/Eliahhango" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors"><Github size={20} /></a>
              <a href="https://dribbble.com/eliah-hango" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors"><Dribbble size={20} /></a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-[10px] font-mono text-accent uppercase tracking-[0.3em] mb-8">Disciplines</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><button onClick={() => onNavigate('SERVICES')} className="hover:text-accent transition-colors flex items-center gap-2 group text-left">Civil Engineering <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
                <li><button onClick={() => onNavigate('SERVICES')} className="hover:text-accent transition-colors flex items-center gap-2 group text-left">Web Development <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
                <li><button onClick={() => onNavigate('SERVICES')} className="hover:text-accent transition-colors flex items-center gap-2 group text-left">Cyber Security <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
                <li><button onClick={() => onNavigate('CASES')} className="hover:text-accent transition-colors flex items-center gap-2 group text-left">Case Studies <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-mono text-accent uppercase tracking-[0.3em] mb-8">Company</h3>
              <ul className="space-y-4 text-sm font-medium">
                <li><button onClick={() => onNavigate('PORTFOLIO')} className="hover:text-accent transition-colors text-left">The Portfolio</button></li>
                <li><button onClick={() => onNavigate('TEAM')} className="hover:text-accent transition-colors text-left">The Team</button></li>
                <li><button onClick={() => onNavigate('PRICING')} className="hover:text-accent transition-colors text-left">Pricing</button></li>
                <li><button onClick={() => onNavigate('BLOG')} className="hover:text-accent transition-colors text-left">Insights</button></li>
                <li><button onClick={() => onNavigate('CONTACT')} className="hover:text-accent transition-colors text-left">Contact</button></li>
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="text-[10px] font-mono text-accent uppercase tracking-[0.3em] mb-8">Contact</h3>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-accent shrink-0" />
                <span className="text-gray-400">Kibaha, Pwani,<br />Tanzania</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={18} className="text-accent shrink-0" />
                <span className="text-gray-400">hangoeliah@outlook.com</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-accent shrink-0" />
                <span className="text-gray-400">+255 688 164 510</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest text-center md:text-left">
            © {currentYear} EliTechWiz / ALL RIGHTS RESERVED
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            <button onClick={() => onNavigate('PRIVACY')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => onNavigate('TERMS')} className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => onNavigate('SECURITY')} className="hover:text-white transition-colors text-left">Security Disclosure</button>
          </div>
        </div>
      </div>

      {/* Large Background Text */}
      <div className="absolute -bottom-24 -right-24 text-[15vw] font-heading font-black text-white/[0.02] leading-none select-none pointer-events-none uppercase">
        EliTechWiz
      </div>
    </footer>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThreatModel } from '../types';
import { Shield, ChevronDown, Lock, EyeOff, Terminal, ArrowRight } from 'lucide-react';

const THREATS: ThreatModel[] = [
  {
    id: '1',
    title: 'DISTRIBUTED DENIAL OF SERVICE (DDOS)',
    description: 'Volumetric and application-layer attacks designed to overwhelm system resources.',
    mitigation: 'Edge-based filtering, rate limiting, and elastic resource scaling.'
  },
  {
    id: '2',
    title: 'SQL INJECTION & XSS',
    description: 'Exploitation of input vulnerabilities to compromise data integrity or execute malicious scripts.',
    mitigation: 'Strict input sanitization, parameterized queries, and Content Security Policy (CSP).'
  },
  {
    id: '3',
    title: 'SOCIAL ENGINEERING',
    description: 'Human-centric attacks targeting organizational trust through phishing and pretexting.',
    mitigation: 'Multi-factor authentication (MFA), security awareness training, and least-privilege access.'
  },
  {
    id: '4',
    title: 'ZERO-DAY EXPLOITS',
    description: 'Undiscovered vulnerabilities in software or hardware that are exploited before a patch is available.',
    mitigation: 'Continuous monitoring, behavioral analysis, and rapid incident response protocols.'
  }
];

interface PortalProps {
  onRequestConsult: () => void;
}

export default function CyberPortal({ onRequestConsult }: PortalProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 md:py-6 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono text-muted uppercase tracking-widest">Discipline / 03</span>
          <h1 className="text-sm font-bold uppercase tracking-[0.2em]">Cyber Security</h1>
        </div>
        <button 
          onClick={onRequestConsult}
          className="w-full md:w-auto bg-black text-white px-6 py-3 text-[10px] font-semibold uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300"
        >
          Request Security Audit
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
              Zero-Trust Architecture / Threat Mitigation
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[clamp(2rem,6vw,5rem)] font-heading font-bold leading-[0.9] tracking-tighter uppercase mb-12"
            >
              Trust Nothing. <span className="text-accent">Verify</span> Continuously.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed"
            >
              Our Zero-Trust methodology assumes every request is a potential threat. We build impenetrable digital perimeters through rigorous auditing and real-time monitoring.
            </motion.p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 py-16 md:py-32">
          {/* Left Sticky Panel */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-12">Security Philosophy</h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter leading-[0.9] mb-12 uppercase">
                Impenetrable<br />Digital<br /><span className="text-accent">Perimeters.</span>
              </h3>
              <p className="text-base md:text-lg text-muted leading-relaxed mb-12">
                We provide end-to-end security solutions that protect your data, your users, and your reputation. Our approach is proactive, not reactive.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 border border-gray-200 flex items-center justify-center group-hover:border-accent transition-colors">
                    <Lock size={20} className="text-accent" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest block mb-1">End-to-End Encryption</span>
                    <span className="text-[10px] font-mono text-muted uppercase">AES-256-GCM / TLS 1.3</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 border border-gray-200 flex items-center justify-center group-hover:border-accent transition-colors">
                    <EyeOff size={20} className="text-accent" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest block mb-1">Identity Obfuscation</span>
                    <span className="text-[10px] font-mono text-muted uppercase">OIDC / SAML 2.0 / MFA</span>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 border border-gray-200 flex items-center justify-center group-hover:border-accent transition-colors">
                    <Terminal size={20} className="text-accent" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest block mb-1">Automated Audit Logs</span>
                    <span className="text-[10px] font-mono text-muted uppercase">SIEM / SOAR INTEGRATION</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Content */}
          <div className="lg:col-span-7">
            <header className="mb-16">
              <h2 className="text-xs font-mono text-muted uppercase tracking-widest mb-4">Methodology / Threat Modeling</h2>
              <div className="w-12 h-1 bg-black" />
            </header>

            <div className="space-y-4">
              {THREATS.map((threat) => (
                <div 
                  key={threat.id}
                  className="border border-gray-200 bg-white overflow-hidden"
                >
                  <button
                    onClick={() => setExpanded(expanded === threat.id ? null : threat.id)}
                    className={`w-full flex items-center justify-between p-6 md:p-8 text-left transition-all duration-300 ${expanded === threat.id ? 'bg-black text-white' : 'hover:bg-surface'}`}
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <Shield size={20} className={expanded === threat.id ? 'text-accent' : 'text-black'} />
                      <h3 className="text-base md:text-lg font-heading font-bold tracking-tight uppercase">{threat.title}</h3>
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`transition-transform duration-300 shrink-0 ${expanded === threat.id ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  
                  <AnimatePresence>
                    {expanded === threat.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-6 md:p-8 border-t border-gray-800 bg-black text-white/80">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            <div>
                              <span className="text-[10px] font-mono text-accent uppercase block mb-4">Vector Analysis</span>
                              <p className="text-sm leading-relaxed">{threat.description}</p>
                            </div>
                            <div>
                              <span className="text-[10px] font-mono text-accent uppercase block mb-4">Mitigation Protocol</span>
                              <p className="text-sm leading-relaxed">{threat.mitigation}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Security Audit Section */}
            <section className="mt-16 md:mt-24 p-8 md:p-12 border border-black bg-white relative overflow-hidden group cursor-pointer" onClick={onRequestConsult}>
              <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
              <div className="absolute top-0 right-0 p-4 md:p-6">
                <span className="text-[10px] font-mono text-accent animate-pulse">SECURE_CHANNEL_ACTIVE</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-6 uppercase tracking-tighter">Ready for a Security Audit?</h3>
              <p className="text-muted text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                Our audit process is rigorous, transparent, and designed for enterprise-grade security requirements. We identify vulnerabilities before they become liabilities.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-widest">Initiate Audit Protocol</span>
                <ArrowRight size={16} className="text-accent group-hover:translate-x-2 transition-transform" />
              </div>
            </section>
          </div>
        </div>

        {/* Visual Security Section */}
        <section className="py-24 md:py-32 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="aspect-square bg-surface overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?auto=format&fit=crop&w=1200&q=80" 
                alt="Cyber Security" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-accent/10 pointer-events-none" />
            </div>
            <div>
              <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-8">Continuous Monitoring</h2>
              <h3 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter uppercase mb-8">Real-Time Threat Intelligence.</h3>
              <p className="text-base md:text-lg text-muted leading-relaxed mb-12">
                Our systems provide real-time visibility into your security posture. We monitor every endpoint, every request, and every data transfer to ensure absolute compliance and safety.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-2xl md:text-3xl font-heading font-bold text-accent mb-2">24/7</div>
                  <div className="text-[10px] font-mono text-muted uppercase tracking-widest">Active Monitoring</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-heading font-bold text-accent mb-2">&lt; 5MS</div>
                  <div className="text-[10px] font-mono text-muted uppercase tracking-widest">Threat Detection</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import { motion } from 'motion/react';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle2, Terminal } from 'lucide-react';

export default function SecurityDisclosure() {
  const principles = [
    {
      title: 'Zero-Trust Architecture',
      icon: Shield,
      content: 'We assume no implicit trust. Every request, whether internal or external, is verified, authenticated, and authorized before access is granted.'
    },
    {
      title: 'Data Encryption',
      icon: Lock,
      content: 'All sensitive data is encrypted at rest and in transit using industry-standard AES-256 and TLS 1.3 protocols.'
    },
    {
      title: 'Continuous Monitoring',
      icon: Eye,
      content: 'Our systems are monitored 24/7 for anomalous behavior, potential threats, and structural performance bottlenecks.'
    }
  ];

  const protocols = [
    {
      id: 'SEC-01',
      name: 'Vulnerability Disclosure',
      status: 'ACTIVE',
      desc: 'We maintain a transparent channel for security researchers to report potential vulnerabilities in our architectural framework.'
    },
    {
      id: 'SEC-02',
      name: 'Incident Response',
      status: 'ACTIVE',
      desc: 'A rigid, multi-phase protocol for identifying, containing, and mitigating security incidents within 15 minutes of detection.'
    },
    {
      id: 'SEC-03',
      name: 'Structural Audits',
      status: 'QUARTERLY',
      desc: 'Comprehensive external audits of our codebase and physical infrastructure to ensure absolute integrity.'
    }
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-6 md:mb-8">Security Framework</h2>
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter leading-[0.9] uppercase mb-8 md:mb-12">
            Security<br /><span className="text-accent">Disclosure.</span>
          </h1>
          <p className="text-base md:text-lg text-muted leading-relaxed">
            EliTechWiz operates on a foundation of absolute transparency and rigid security protocols. This document outlines our commitment to protecting architectural integrity.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-surface border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
              <p.icon className="text-accent mb-6" size={32} />
              <h3 className="text-lg font-heading font-bold tracking-tighter uppercase mb-4">{p.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{p.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Protocols */}
        <div className="space-y-8 mb-24">
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-12">Active Protocols</h2>
          {protocols.map((protocol, i) => (
            <motion.div
              key={protocol.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col md:flex-row md:items-center justify-between p-8 border border-gray-100 hover:border-accent transition-colors group"
            >
              <div className="flex items-center gap-6 mb-4 md:mb-0">
                <span className="text-[10px] font-mono text-accent">{protocol.id}</span>
                <div>
                  <h4 className="text-lg font-heading font-bold uppercase tracking-tight group-hover:text-accent transition-colors">{protocol.name}</h4>
                  <p className="text-xs text-muted leading-relaxed max-w-md">{protocol.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted">{protocol.status}</span>
                <CheckCircle2 size={16} className="text-accent" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reporting */}
        <div className="p-12 md:p-16 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
          <div className="relative z-10 text-center">
            <Terminal className="text-accent mx-auto mb-8" size={40} />
            <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tighter uppercase mb-6">Report a Vulnerability</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-12 max-w-xl mx-auto">
              If you have identified a potential security flaw in our infrastructure, please contact our security team immediately. We operate a responsible disclosure program.
            </p>
            <button className="bg-accent text-white px-12 py-6 text-xs font-bold tracking-[0.2em] hover:bg-white hover:text-black transition-all">
              SECURITY@ELITECHWIZ.ENG
            </button>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-gray-100">
          <p className="text-xs md:text-sm text-muted">
            For general security inquiries or compliance documentation requests, contact our security officer at <span className="text-accent font-bold">security@elitechwiz.eng</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

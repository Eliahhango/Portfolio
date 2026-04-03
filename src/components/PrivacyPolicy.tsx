import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  const sections = [
    {
      title: 'Data Collection Protocols',
      content: 'We collect only the essential structural data required to architect your solutions. This includes technical specifications, infrastructure logs, and communication metadata. We do not sell your architectural blueprints to third parties.'
    },
    {
      title: 'Security Measures',
      content: 'All client data is stored within a zero-trust environment, encrypted at rest and in transit using AES-256 protocols. Access is restricted to authorized architects only.'
    },
    {
      title: 'Client Rights',
      content: 'You maintain absolute ownership of your intellectual property. You have the right to request a complete data purge from our secure vaults at any time, subject to regulatory retention requirements.'
    },
    {
      title: 'Cookies and Tracking',
      content: 'Our platform uses minimal functional cookies to maintain session integrity and performance metrics. We do not employ invasive behavioral tracking.'
    }
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-6 md:mb-8">Legal Framework</h2>
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter leading-[0.9] uppercase mb-8 md:mb-12">
            Privacy<br /><span className="text-accent">Policy.</span>
          </h1>
          <p className="text-base md:text-lg text-muted leading-relaxed">
            Last Updated: April 03, 2026. This document outlines our commitment to data integrity and client confidentiality.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 md:space-y-16">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 md:p-12 bg-surface border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
              <h3 className="text-xl md:text-2xl font-heading font-bold tracking-tighter uppercase mb-4 md:mb-6">{section.title}</h3>
              <p className="text-muted text-sm md:text-base leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-16 md:mt-24 pt-8 md:pt-12 border-t border-gray-100">
          <p className="text-xs md:text-sm text-muted">
            For inquiries regarding our data protection protocols, contact our legal department at <span className="text-accent font-bold">legal@elitechwiz.eng</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

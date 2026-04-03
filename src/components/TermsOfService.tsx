import { motion } from 'motion/react';

export default function TermsOfService() {
  const sections = [
    {
      title: 'Architectural Scope',
      content: 'Our services are provided on a project-by-project basis, defined by the specific architectural scope agreed upon in the initial consultation matrix. Any deviations from the original blueprints will require a formal change request.'
    },
    {
      title: 'Liability and Integrity',
      content: 'While we strive for absolute structural and digital integrity, we are not liable for failures resulting from external environmental factors, third-party infrastructure compromises, or client-side modifications without our prior approval.'
    },
    {
      title: 'Payment and Milestones',
      content: 'Payments are structured around architectural milestones. Failure to meet payment deadlines may result in a temporary suspension of architectural services and data access.'
    },
    {
      title: 'Intellectual Property',
      content: 'All custom architectural designs, codebases, and structural reports created specifically for the client remain the property of the client upon final payment. We retain the right to reuse general architectural patterns and methodologies.'
    }
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 min-h-screen bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-6 md:mb-8">Operational Framework</h2>
          <h1 className="text-4xl md:text-6xl font-heading font-bold tracking-tighter leading-[0.9] uppercase mb-8 md:mb-12">
            Terms of<br /><span className="text-accent">Service.</span>
          </h1>
          <p className="text-base md:text-lg text-muted leading-relaxed">
            Last Updated: April 03, 2026. These terms govern your engagement with EliTechWiz architectural services.
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
            For inquiries regarding our operational framework, contact our legal department at <span className="text-accent font-bold">legal@elitechwiz.eng</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

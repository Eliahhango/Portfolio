import { motion } from 'motion/react';
import { Check, ArrowRight, Zap, Shield, Building2, Globe } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'CIVIL INFRASTRUCTURE',
      icon: Building2,
      price: 'FROM $15,000',
      description: 'Structural audits, load analysis, and urban planning consultation.',
      features: [
        'Comprehensive Site Analysis',
        'Structural Integrity Reports',
        'Regulatory Compliance Audit',
        '2D/3D Blueprint Drafting',
        'Material Stress Testing',
      ],
      color: 'text-blue-600',
    },
    {
      name: 'WEB ARCHITECTURE',
      icon: Globe,
      price: 'FROM $12,000',
      description: 'Full-stack system design, cloud-native migration, and performance scaling.',
      features: [
        'Custom System Architecture',
        'Cloud Infrastructure Setup',
        'API Design & Integration',
        'Performance Optimization',
        'Scalability Roadmap',
      ],
      color: 'text-accent',
      featured: true,
    },
    {
      name: 'CYBER SECURITY',
      icon: Shield,
      price: 'FROM $20,000',
      description: 'Zero-trust implementation, penetration testing, and threat modeling.',
      features: [
        'Full Perimeter Audit',
        'Penetration Testing',
        'Zero-Trust Protocol Setup',
        'Incident Response Plan',
        'Continuous Monitoring',
      ],
      color: 'text-red-600',
    },
  ];

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-32 max-w-3xl">
          <h2 className="text-xs font-mono text-muted uppercase tracking-[0.3em] mb-6 md:mb-8">Investment Structure</h2>
          <h1 className="text-4xl md:text-7xl font-heading font-bold tracking-tighter leading-[0.9] uppercase mb-8 md:mb-12">
            Transparent<br />Architectural<br /><span className="text-accent">Value.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed">
            We provide premium engineering services with clear, milestone-based pricing. No hidden costs, just absolute structural integrity.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 md:p-12 border ${plan.featured ? 'border-accent bg-surface' : 'border-gray-100'} relative overflow-hidden group`}
            >
              {plan.featured && (
                <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold tracking-widest px-4 py-1">
                  RECOMMENDED
                </div>
              )}
              <div className="absolute inset-0 blueprint-grid opacity-5 pointer-events-none" />
              
              <div className="relative z-10">
                <plan.icon className={`${plan.color} mb-6 md:mb-8`} size={40} />
                <h3 className="text-xl md:text-2xl font-heading font-bold tracking-tighter uppercase mb-2">{plan.name}</h3>
                <div className="text-3xl md:text-4xl font-heading font-bold tracking-tighter mb-4 md:mb-6">{plan.price}</div>
                <p className="text-muted text-sm leading-relaxed mb-8 md:mb-12 h-auto md:h-12">{plan.description}</p>
                
                <div className="space-y-4 mb-12">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-[10px] md:text-xs font-bold tracking-wide uppercase">
                      <Check size={14} className="text-accent" />
                      {feature}
                    </div>
                  ))}
                </div>

                <button className={`w-full py-5 text-[10px] font-bold tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${plan.featured ? 'bg-accent text-white hover:bg-black' : 'bg-black text-white hover:bg-accent'}`}>
                  REQUEST QUOTE <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Callout */}
        <div className="mt-16 md:mt-24 p-8 md:p-16 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-heading font-bold tracking-tighter uppercase mb-4">Enterprise Solutions</h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                For large-scale infrastructure projects or multi-discipline requirements, we offer custom-tailored enterprise agreements with dedicated architectural oversight.
              </p>
            </div>
            <button className="w-full md:w-auto px-12 py-6 border border-white/20 hover:border-accent hover:text-accent transition-all text-xs font-bold tracking-[0.2em] uppercase">
              CONTACT ENTERPRISE TEAM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

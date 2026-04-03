import { motion } from 'motion/react';
import { Discipline } from '../types';
import { ArrowLeft, CheckCircle2, Clock, Users, Zap } from 'lucide-react';

interface ProcessPortalProps {
  discipline: Discipline;
  onBack: () => void;
}

const PROCESS_DATA = {
  CIVIL: {
    title: 'CIVIL ENGINEERING PROCESS',
    subtitle: 'From Blueprint to Infrastructure',
    steps: [
      {
        id: '01',
        name: 'Site Analysis & Feasibility',
        duration: '2-4 Weeks',
        description: 'Comprehensive evaluation of geological, environmental, and regulatory constraints.',
        details: ['Topographical Surveying', 'Soil Composition Analysis', 'Environmental Impact Assessment', 'Zoning & Regulatory Review']
      },
      {
        id: '02',
        name: 'Structural Schematic Design',
        duration: '4-8 Weeks',
        description: 'Developing the core architectural and structural framework using advanced CAD/BIM.',
        details: ['Load Path Optimization', 'Material Specification', 'Initial Cost Estimation', 'Structural Integrity Simulation']
      },
      {
        id: '03',
        name: 'Detailed Engineering & Permitting',
        duration: '8-12 Weeks',
        description: 'Finalizing construction documents and securing all necessary government approvals.',
        details: ['Final Blueprint Generation', 'MEP Coordination', 'Permit Application Management', 'Contractor Selection Support']
      },
      {
        id: '04',
        name: 'Construction Oversight',
        duration: 'Project Dependent',
        description: 'Rigid adherence to design specifications during the physical build phase.',
        details: ['On-site Quality Control', 'Structural Milestone Verification', 'Change Order Management', 'Final Safety Certification']
      }
    ]
  },
  WEB: {
    title: 'WEB ARCHITECTURE PROCESS',
    subtitle: 'Engineering Scalable Digital Systems',
    steps: [
      {
        id: '01',
        name: 'Requirement Discovery',
        duration: '1-2 Weeks',
        description: 'Defining system goals, user personas, and technical constraints.',
        details: ['Stakeholder Interviews', 'Technical Debt Assessment', 'Scalability Requirement Mapping', 'User Flow Documentation']
      },
      {
        id: '02',
        name: 'System Design & Prototyping',
        duration: '2-4 Weeks',
        description: 'Architecting the data schema, API contracts, and high-fidelity UI components.',
        details: ['Database Schema Design', 'API Endpoint Specification', 'Atomic Design Implementation', 'Interactive Wireframing']
      },
      {
        id: '03',
        name: 'Agile Development Sprint',
        duration: 'Continuous',
        description: 'Iterative build cycles with continuous integration and deployment.',
        details: ['Test-Driven Development', 'Code Review Protocols', 'CI/CD Pipeline Execution', 'Performance Profiling']
      },
      {
        id: '04',
        name: 'Deployment & Scaling',
        duration: '1 Week',
        description: 'Launching to production with automated scaling and monitoring.',
        details: ['Blue-Green Deployment', 'Load Balancer Configuration', 'Real-time Error Tracking', 'Edge Caching Optimization']
      }
    ]
  },
  CYBER: {
    title: 'SECURITY PROTOCOL PROCESS',
    subtitle: 'Implementing Zero-Trust Perimeters',
    steps: [
      {
        id: '01',
        name: 'Vulnerability Assessment',
        duration: '1-2 Weeks',
        description: 'Comprehensive scanning and penetration testing of existing infrastructure.',
        details: ['Surface Area Mapping', 'Automated Vulnerability Scanning', 'Manual Penetration Testing', 'Risk Prioritization Matrix']
      },
      {
        id: '02',
        name: 'Zero-Trust Architecture Design',
        duration: '2-3 Weeks',
        description: 'Designing identity-centric security perimeters and access controls.',
        details: ['IAM Policy Definition', 'Network Segmentation Planning', 'MFA Implementation Strategy', 'Data Encryption Standards']
      },
      {
        id: '03',
        name: 'Protocol Implementation',
        duration: '3-6 Weeks',
        description: 'Deploying security controls and hardening system configurations.',
        details: ['Firewall Rule Orchestration', 'Endpoint Protection Deployment', 'Audit Log Centralization', 'Incident Response Automation']
      },
      {
        id: '04',
        name: 'Continuous Compliance',
        duration: 'Ongoing',
        description: 'Real-time monitoring and regular security audits to ensure persistent safety.',
        details: ['SIEM / SOAR Monitoring', 'Regular Compliance Audits', 'Threat Intelligence Integration', 'Security Awareness Training']
      }
    ]
  }
};

export default function ProcessPortal({ discipline, onBack }: ProcessPortalProps) {
  const data = PROCESS_DATA[discipline];

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 md:py-6 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-accent transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>
        <div className="text-center md:text-right">
          <span className="text-[10px] font-mono text-muted uppercase tracking-widest block mb-1">Methodology / {discipline}</span>
          <h1 className="text-sm font-bold uppercase tracking-[0.2em]">{data.title}</h1>
        </div>
      </header>

      <main className="px-4 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-heading font-bold tracking-tighter uppercase leading-[0.9] mb-8"
            >
              {data.subtitle}
            </motion.h2>
            <div className="w-24 h-1 bg-accent" />
          </div>

          <div className="space-y-24 md:space-y-32">
            {data.steps.map((step, idx) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24"
              >
                <div className="lg:col-span-4">
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl md:text-4xl font-heading font-bold text-accent/20">{step.id}</span>
                    <div className="h-[1px] flex-grow bg-gray-100" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-tight mb-6">{step.name}</h3>
                  <div className="flex items-center gap-4 text-xs font-mono text-muted uppercase tracking-widest mb-8">
                    <Clock size={14} className="text-accent" />
                    <span>Estimated Duration: {step.duration}</span>
                  </div>
                  <p className="text-base md:text-lg text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {step.details.map((detail, i) => (
                      <div key={i} className="p-6 md:p-8 border border-gray-100 bg-surface flex items-start gap-4 group hover:border-accent transition-colors">
                        <CheckCircle2 size={18} className="text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm font-bold uppercase tracking-tight leading-snug">{detail}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Decorative Process Visual */}
                  <div className="mt-8 md:mt-12 p-6 md:p-8 border border-gray-100 border-dashed relative overflow-hidden">
                    <div className="absolute inset-0 blueprint-grid opacity-5" />
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
                      <div className="flex gap-4">
                        <Users size={16} className="text-muted" />
                        <span className="text-[10px] font-mono text-muted uppercase">Resource Allocation: Optimal</span>
                      </div>
                      <div className="flex gap-4">
                        <Zap size={16} className="text-accent" />
                        <span className="text-[10px] font-mono text-muted uppercase">Phase Efficiency: 98%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final Call to Action */}
          <section className="mt-24 md:mt-48 py-16 md:py-24 border-t border-gray-100 text-center">
            <h3 className="text-3xl md:text-4xl font-heading font-bold tracking-tighter uppercase mb-8">Ready to Architect Your Vision?</h3>
            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12">
              Our engineering process is designed for those who demand absolute precision and long-term structural integrity.
            </p>
            <button 
              onClick={onBack}
              className="w-full md:w-auto bg-black text-white px-12 py-6 text-xs font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all"
            >
              Initiate Project Analysis
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

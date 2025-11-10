import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon, ExternalLinkIcon, MailIcon } from '../constants';

interface ModalProps {
    onClose: () => void;
}

const DocumentationModal: React.FC<ModalProps> = ({ onClose }) => {
    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4" onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl max-w-4xl w-full relative border border-slate-200 dark:border-gray-800 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/75 transition-colors z-10"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Service Documentation</h1>
                        
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">About Our Services</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                EliTechWiz provides professional technology services including cybersecurity consulting, software development, system architecture, and design services. This documentation provides information about our service offerings, processes, and how to engage with us.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Service Offerings</h2>
                            
                            <div className="space-y-4">
                                <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-gray-200">Cybersecurity Services</h3>
                                    <ul className="text-sm text-slate-600 dark:text-gray-400 space-y-1 list-disc pl-5">
                                        <li>Penetration Testing & Vulnerability Assessments</li>
                                        <li>Security Audits & Compliance Reviews</li>
                                        <li>Network Security Design & Implementation</li>
                                        <li>Ethical Hacking & Security Testing</li>
                                        <li>Incident Response & Forensics</li>
                                        <li>Security Consulting & Strategy</li>
                                    </ul>
                                </div>

                                <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-gray-200">Software Development</h3>
                                    <ul className="text-sm text-slate-600 dark:text-gray-400 space-y-1 list-disc pl-5">
                                        <li>Custom Web & Mobile Application Development</li>
                                        <li>System Integration & API Development</li>
                                        <li>Software Architecture & Design</li>
                                        <li>Legacy System Modernization</li>
                                        <li>Full-Stack Development (React, Node.js, Python, etc.)</li>
                                    </ul>
                                </div>

                                <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-gray-200">Design Services</h3>
                                    <ul className="text-sm text-slate-600 dark:text-gray-400 space-y-1 list-disc pl-5">
                                        <li>UI/UX Design & User Experience Optimization</li>
                                        <li>System Architecture Design</li>
                                        <li>Graphic Design & Branding</li>
                                        <li>Prototyping & Wireframing</li>
                                        <li>Design System Development</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Service Engagement Process</h2>
                            
                            <ol className="list-decimal pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-3">
                                <li>
                                    <strong>Initial Consultation:</strong> Discuss your needs, requirements, and objectives. We'll assess your situation and provide initial recommendations.
                                </li>
                                <li>
                                    <strong>Proposal & Agreement:</strong> We'll provide a detailed proposal including scope, timeline, deliverables, and pricing. Once approved, we'll formalize the agreement.
                                </li>
                                <li>
                                    <strong>Project Kickoff:</strong> Establish communication channels, access requirements, and project management processes.
                                </li>
                                <li>
                                    <strong>Service Delivery:</strong> Execute the agreed-upon services with regular updates and communication.
                                </li>
                                <li>
                                    <strong>Reporting & Deliverables:</strong> Provide comprehensive reports, documentation, and deliverables as specified.
                                </li>
                                <li>
                                    <strong>Follow-up & Support:</strong> Address questions, provide clarifications, and offer ongoing support as needed.
                                </li>
                            </ol>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Security Assessment Methodology</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                For cybersecurity services, we follow industry-standard methodologies:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li><strong>OWASP Top 10:</strong> Testing against common web application vulnerabilities</li>
                                <li><strong>PTES (Penetration Testing Execution Standard):</strong> Comprehensive penetration testing framework</li>
                                <li><strong>NIST Framework:</strong> Alignment with NIST Cybersecurity Framework</li>
                                <li><strong>ISO 27001:</strong> Information security management standards</li>
                                <li><strong>Custom Methodologies:</strong> Tailored approaches based on specific requirements</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Technology Stack</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg">
                                    <h3 className="font-semibold text-slate-800 dark:text-gray-200 mb-2">Security Tools</h3>
                                    <ul className="text-sm text-slate-600 dark:text-gray-400 space-y-1">
                                        <li>• Burp Suite, OWASP ZAP</li>
                                        <li>• Metasploit, Nmap</li>
                                        <li>• Custom security scripts</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg">
                                    <h3 className="font-semibold text-slate-800 dark:text-gray-200 mb-2">Development</h3>
                                    <ul className="text-sm text-slate-600 dark:text-gray-400 space-y-1">
                                        <li>• React, TypeScript, Node.js</li>
                                        <li>• Python, Django, Flask</li>
                                        <li>• Modern development frameworks</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Deliverables</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Typical deliverables include:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li><strong>Security Assessments:</strong> Detailed vulnerability reports with risk ratings, proof-of-concept exploits, and remediation recommendations</li>
                                <li><strong>Software Development:</strong> Source code, documentation, deployment guides, and technical specifications</li>
                                <li><strong>Design Services:</strong> Design files, style guides, prototypes, and implementation specifications</li>
                                <li><strong>Consulting:</strong> Strategic recommendations, architecture diagrams, and implementation roadmaps</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Resources</h2>
                            <div className="space-y-3">
                                <a 
                                    href="https://github.com/Eliahhango" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-gray-800 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <GithubIcon className="w-5 h-5 text-slate-700 dark:text-gray-300" />
                                    <span className="text-slate-700 dark:text-gray-300">View Projects on GitHub</span>
                                    <ExternalLinkIcon className="w-4 h-4 ml-auto text-slate-500 dark:text-gray-400" />
                                </a>
                                <a 
                                    href="mailto:contact@elitechwiz.com" 
                                    className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-gray-800 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <MailIcon className="w-5 h-5 text-slate-700 dark:text-gray-300" />
                                    <span className="text-slate-700 dark:text-gray-300">Contact for Service Inquiries</span>
                                    <ExternalLinkIcon className="w-4 h-4 ml-auto text-slate-500 dark:text-gray-400" />
                                </a>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Support</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                For questions about our services, documentation, or to discuss your project needs:
                            </p>
                            <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
                                    <strong>Email:</strong> <a href="mailto:contact@elitechwiz.com" className="text-blue-500 hover:underline">contact@elitechwiz.com</a>
                                </p>
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
                                    <strong>Phone:</strong> <a href="tel:+255688164510" className="text-blue-500 hover:underline">+255 688 164 510</a>
                                </p>
                                <p className="text-slate-700 dark:text-gray-300">
                                    <strong>Security Inquiries:</strong> <a href="mailto:security@elitechwiz.com" className="text-blue-500 hover:underline">security@elitechwiz.com</a>
                                </p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DocumentationModal;

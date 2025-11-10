import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    onClose: () => void;
}

const SecurityModal: React.FC<ModalProps> = ({ onClose }) => {
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
                        <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Security Services & Practices</h1>
                        
                        <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">
                            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Our Security Services</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                EliTechWiz provides comprehensive cybersecurity services to help protect your business, systems, and data from threats. Our security expertise includes:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li><strong>Penetration Testing:</strong> Simulated attacks to identify vulnerabilities before malicious actors exploit them</li>
                                <li><strong>Vulnerability Assessments:</strong> Comprehensive scanning and analysis of your systems for security weaknesses</li>
                                <li><strong>Security Audits:</strong> In-depth reviews of your security policies, procedures, and infrastructure</li>
                                <li><strong>Network Security:</strong> Design and implementation of secure network architectures and firewalls</li>
                                <li><strong>Ethical Hacking:</strong> Authorized security testing to find and fix vulnerabilities</li>
                                <li><strong>Security Consulting:</strong> Strategic guidance on building robust security postures</li>
                                <li><strong>Incident Response:</strong> Assistance with security incident investigation and remediation</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">How We Protect Your Data</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                When you engage our services, we implement rigorous security measures to protect your information:
                            </p>
                            
                            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">Encryption</h3>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>All data in transit is encrypted using TLS 1.2+ protocols</li>
                                <li>Sensitive data at rest is encrypted using AES-256 encryption</li>
                                <li>Credentials and access tokens are stored in encrypted vaults</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">Access Controls</h3>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Multi-factor authentication (MFA) for all administrative access</li>
                                <li>Role-based access control (RBAC) limiting access to necessary data only</li>
                                <li>Regular access reviews and credential rotation</li>
                                <li>Principle of least privilege enforced</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">Secure Infrastructure</h3>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Secure hosting on enterprise-grade infrastructure</li>
                                <li>Regular security patches and updates</li>
                                <li>Network segmentation and firewall protection</li>
                                <li>Intrusion detection and monitoring systems</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Security Assessment Process</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                When conducting security assessments, we follow a structured, professional process:
                            </p>
                            <ol className="list-decimal pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li><strong>Planning & Authorization:</strong> Define scope, obtain written authorization, and establish testing boundaries</li>
                                <li><strong>Reconnaissance:</strong> Gather information about target systems (authorized methods only)</li>
                                <li><strong>Vulnerability Scanning:</strong> Use automated and manual techniques to identify weaknesses</li>
                                <li><strong>Exploitation:</strong> Safely test identified vulnerabilities (within agreed scope)</li>
                                <li><strong>Reporting:</strong> Document findings with detailed reports including risk ratings and remediation recommendations</li>
                                <li><strong>Remediation Support:</strong> Assist with fixing identified vulnerabilities</li>
                                <li><strong>Re-testing:</strong> Verify that vulnerabilities have been properly addressed</li>
                            </ol>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Responsible Disclosure</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We follow responsible disclosure practices:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Vulnerabilities are reported privately to clients first</li>
                                <li>We provide reasonable time for remediation before public disclosure</li>
                                <li>All findings remain confidential until authorized for disclosure</li>
                                <li>We work collaboratively with clients to address security issues</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Continuous Security Improvement</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We continuously improve our security practices through:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Regular security training and certifications</li>
                                <li>Staying current with latest threats and vulnerabilities</li>
                                <li>Regular internal security audits</li>
                                <li>Participation in security research and bug bounty programs</li>
                                <li>Following industry best practices and frameworks (OWASP, NIST, etc.)</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Reporting Security Issues</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                If you discover a security vulnerability in our services or systems, please report it responsibly:
                            </p>
                            <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
                                    <strong>Security Email:</strong> <a href="mailto:security@elitechwiz.com" className="text-blue-500 hover:underline">security@elitechwiz.com</a>
                                </p>
                                <p className="text-slate-700 dark:text-gray-300 text-sm">
                                    Please include: detailed description, steps to reproduce, potential impact, and your contact information. We will respond within 48 hours and work with you to resolve the issue responsibly.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Contact Us</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                To learn more about our security services or discuss your security needs:
                            </p>
                            <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
                                    <strong>Email:</strong> <a href="mailto:security@elitechwiz.com" className="text-blue-500 hover:underline">security@elitechwiz.com</a>
                                </p>
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
                                    <strong>General Contact:</strong> <a href="mailto:contact@elitechwiz.com" className="text-blue-500 hover:underline">contact@elitechwiz.com</a>
                                </p>
                                <p className="text-slate-700 dark:text-gray-300">
                                    <strong>Phone:</strong> <a href="tel:+255688164510" className="text-blue-500 hover:underline">+255 688 164 510</a>
                                </p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default SecurityModal;

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
                        <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Security Information</h1>
                        
                        <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">
                            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Our Commitment to Security</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                At EliTechWiz, we take the security of your data and our systems very seriously. We implement industry-standard security measures and continuously work to improve our security posture to protect against threats and vulnerabilities.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">1. Data Encryption</h2>
                            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">Encryption in Transit</h3>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                All data transmitted between your browser and our servers is encrypted using Transport Layer Security (TLS) 1.2 or higher. This ensures that your information cannot be intercepted or read by unauthorized parties during transmission.
                            </p>
                            
                            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">Encryption at Rest</h3>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Sensitive data stored on our servers is encrypted using Advanced Encryption Standard (AES-256), one of the strongest encryption algorithms available. This protects your data even if physical access to our storage systems is compromised.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">2. Access Controls</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We implement strict access controls to ensure that only authorized personnel can access your data:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Multi-factor authentication (MFA) for all administrative accounts</li>
                                <li>Role-based access control (RBAC) to limit access based on job function</li>
                                <li>Regular access reviews and audits</li>
                                <li>Principle of least privilege - users only have access to data necessary for their role</li>
                                <li>Secure password policies requiring strong, unique passwords</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">3. Vulnerability Management</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We maintain a comprehensive vulnerability management program:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Regular security scans and assessments of our systems</li>
                                <li>Automated dependency updates to patch known vulnerabilities</li>
                                <li>Penetration testing conducted by third-party security experts</li>
                                <li>Bug bounty program for responsible disclosure of security issues</li>
                                <li>Rapid response to security advisories and patches</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">4. Network Security</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Our network infrastructure is protected by multiple layers of security:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Firewalls and intrusion detection/prevention systems (IDS/IPS)</li>
                                <li>DDoS protection and mitigation services</li>
                                <li>Network segmentation to isolate critical systems</li>
                                <li>Regular monitoring and analysis of network traffic</li>
                                <li>Secure VPN access for remote administration</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">5. Incident Response</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We have a documented incident response plan to quickly address and mitigate security incidents:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>24/7 security monitoring and alerting</li>
                                <li>Rapid incident detection and response procedures</li>
                                <li>Regular security incident drills and tabletop exercises</li>
                                <li>Post-incident reviews and improvements</li>
                                <li>Compliance with data breach notification requirements</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">6. Secure Development Practices</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Security is built into our development process:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Secure coding practices and training for developers</li>
                                <li>Code reviews focused on security vulnerabilities</li>
                                <li>Automated security testing in CI/CD pipelines</li>
                                <li>Dependency scanning for known vulnerabilities</li>
                                <li>Regular security training and awareness programs</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">7. Third-Party Security</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We carefully vet and monitor third-party services and vendors:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Security assessments of third-party vendors</li>
                                <li>Contracts requiring security standards compliance</li>
                                <li>Regular reviews of third-party security practices</li>
                                <li>Limiting data sharing to what is necessary</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">8. Compliance and Certifications</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We strive to maintain compliance with relevant security standards and regulations:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>GDPR compliance for European users</li>
                                <li>CCPA compliance for California residents</li>
                                <li>Industry best practices and frameworks</li>
                                <li>Regular security audits and assessments</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">9. Reporting Security Issues</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                If you discover a security vulnerability, we appreciate your responsible disclosure. Please report security issues to:
                            </p>
                            <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
                                    <strong>Security Email:</strong> <a href="mailto:security@elitechwiz.com" className="text-blue-500 hover:underline">security@elitechwiz.com</a>
                                </p>
                                <p className="text-slate-700 dark:text-gray-300 text-sm">
                                    Please include detailed information about the vulnerability, steps to reproduce, and potential impact. We will respond within 48 hours and work with you to resolve the issue.
                                </p>
                            </div>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                <strong>Please do not:</strong> Access or modify data that does not belong to you, perform any actions that could harm our users or services, or publicly disclose the vulnerability before we have had a chance to address it.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">10. Your Role in Security</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Security is a shared responsibility. You can help protect your information by:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Using strong, unique passwords</li>
                                <li>Enabling two-factor authentication when available</li>
                                <li>Keeping your devices and browsers updated</li>
                                <li>Being cautious of phishing attempts</li>
                                <li>Not sharing your account credentials</li>
                                <li>Reporting suspicious activity immediately</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">11. Contact Us</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                If you have questions about our security practices, please contact us:
                            </p>
                            <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
                                    <strong>Security Team:</strong> <a href="mailto:security@elitechwiz.com" className="text-blue-500 hover:underline">security@elitechwiz.com</a>
                                </p>
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
                                    <strong>General Contact:</strong> <a href="mailto:contact@elitechwiz.com" className="text-blue-500 hover:underline">contact@elitechwiz.com</a>
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

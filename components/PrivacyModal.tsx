import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    onClose: () => void;
}

const PrivacyModal: React.FC<ModalProps> = ({ onClose }) => {
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
                        <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Privacy Policy</h1>
                        
                        <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">
                            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">1. Introduction</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                This Privacy Policy describes how EliTechWiz ("we," "our," or "us") collects, uses, and protects your personal information when you engage with our professional services, including cybersecurity consulting, software development, design services, and when you visit our website or contact us.
                            </p>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We are committed to protecting your privacy and handling your data with the highest level of security and confidentiality, especially given our expertise in cybersecurity.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">2. Information We Collect</h2>
                            
                            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">2.1 Information from Service Engagement</h3>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                When you engage our services (cybersecurity, software development, design), we may collect:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Business contact information (name, title, company, email, phone)</li>
                                <li>Project requirements and specifications</li>
                                <li>System information and access credentials (securely stored and encrypted)</li>
                                <li>Security assessment findings and vulnerability reports</li>
                                <li>Communication records and correspondence</li>
                                <li>Payment and billing information</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">2.2 Website and Contact Information</h3>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                When you visit our website or contact us:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Contact form submissions (name, email, phone, message)</li>
                                <li>Newsletter subscriptions (email address)</li>
                                <li>AI chatbot interactions (conversation data)</li>
                                <li>Website usage data (IP address, browser type, pages visited)</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">3. How We Use Your Information</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We use your information to:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Provide and deliver our professional services (cybersecurity assessments, software development, design work)</li>
                                <li>Communicate with you about projects, services, and inquiries</li>
                                <li>Process payments and manage service agreements</li>
                                <li>Conduct security assessments and penetration testing (with your authorization)</li>
                                <li>Send service updates, security advisories, and marketing communications (with consent)</li>
                                <li>Improve our services and website experience</li>
                                <li>Comply with legal obligations and protect our legal rights</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">4. Information Sharing and Disclosure</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We do not sell your personal information. We may share information only in these circumstances:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li><strong>Service Providers:</strong> Trusted third parties who assist in service delivery (hosting, payment processing, email services) under strict confidentiality agreements</li>
                                <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                                <li><strong>Security Threats:</strong> To protect against security threats, fraud, or illegal activities</li>
                                <li><strong>With Your Consent:</strong> When you explicitly authorize sharing</li>
                                <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (with notice)</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">5. Data Security</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                As cybersecurity professionals, we implement industry-leading security measures:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>End-to-end encryption for data in transit (TLS 1.2+)</li>
                                <li>AES-256 encryption for data at rest</li>
                                <li>Secure credential management and access controls</li>
                                <li>Regular security audits and vulnerability assessments</li>
                                <li>Secure hosting infrastructure with redundant backups</li>
                                <li>Multi-factor authentication for administrative access</li>
                                <li>Regular security training and awareness programs</li>
                            </ul>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                However, no method of transmission or storage is 100% secure. We cannot guarantee absolute security but commit to using best practices.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">6. Data Retention</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We retain your information for as long as necessary to:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Provide ongoing services and support</li>
                                <li>Comply with legal and regulatory requirements</li>
                                <li>Resolve disputes and enforce agreements</li>
                                <li>Maintain security assessment records (as required for compliance)</li>
                            </ul>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                When data is no longer needed, we securely delete or anonymize it in accordance with our data retention policies.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">7. Your Rights</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Depending on your location, you may have the right to:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li><strong>Access:</strong> Request a copy of your personal information</li>
                                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                                <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                                <li><strong>Portability:</strong> Request your data in a portable format</li>
                                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                                <li><strong>Objection:</strong> Object to certain processing activities</li>
                            </ul>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                To exercise these rights, contact us at <a href="mailto:privacy@elitechwiz.com" className="text-blue-500 hover:underline">privacy@elitechwiz.com</a>.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">8. Cookies and Tracking</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Our website uses cookies and similar technologies. See our <a href="#" className="text-blue-500 hover:underline" onClick={(e) => { e.preventDefault(); onClose(); }}>Cookie Policy</a> for details and to manage your preferences.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">9. International Data Transfers</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Your information may be processed in countries other than your country of residence. We ensure appropriate safeguards are in place for international transfers.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">10. Changes to This Policy</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We may update this Privacy Policy periodically. We will notify you of material changes by posting the updated policy on our website and updating the "Last Updated" date.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">11. Contact Us</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                For privacy-related questions or to exercise your rights:
                            </p>
                            <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
                                    <strong>Privacy Officer:</strong> <a href="mailto:privacy@elitechwiz.com" className="text-blue-500 hover:underline">privacy@elitechwiz.com</a>
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

export default PrivacyModal;

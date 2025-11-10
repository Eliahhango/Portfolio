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
                                Welcome to EliTechWiz's Portfolio ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our portfolio website.
                            </p>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                By using our website, you consent to the data practices described in this policy. If you do not agree with the practices described in this policy, please do not use our services.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">2. Information We Collect</h2>
                            
                            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">2.1 Information You Provide</h3>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We may collect personal information that you voluntarily provide when you:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Contact us through our contact form (name, email, phone number, subject, message)</li>
                                <li>Subscribe to our newsletter (email address)</li>
                                <li>Interact with our AI chatbot (conversation data)</li>
                                <li>Request information about our services</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">2.2 Automatically Collected Information</h3>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                When you visit our website, we may automatically collect certain information about your device, including:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>IP address and location data</li>
                                <li>Browser type and version</li>
                                <li>Operating system</li>
                                <li>Pages visited and time spent on pages</li>
                                <li>Referring website addresses</li>
                                <li>Device identifiers</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">2.3 Cookies and Tracking Technologies</h3>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We use cookies and similar tracking technologies to track activity on our website and store certain information. You can control cookie preferences through your browser settings or our cookie management tool.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">3. How We Use Your Information</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We use the information we collect for various purposes, including:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>To provide, maintain, and improve our services</li>
                                <li>To respond to your inquiries and provide customer support</li>
                                <li>To send you newsletters and marketing communications (with your consent)</li>
                                <li>To analyze website usage and improve user experience</li>
                                <li>To detect, prevent, and address technical issues and security threats</li>
                                <li>To comply with legal obligations</li>
                                <li>To personalize your experience on our website</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">4. Information Sharing and Disclosure</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf (e.g., hosting, analytics, email services)</li>
                                <li><strong>Legal Requirements:</strong> We may disclose information if required by law or in response to valid requests by public authorities</li>
                                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                                <li><strong>With Your Consent:</strong> We may share information with your explicit consent</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">5. Data Security</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                            </p>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Our security measures include:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Encryption of data in transit (TLS/SSL)</li>
                                <li>Secure hosting infrastructure</li>
                                <li>Regular security assessments and updates</li>
                                <li>Access controls and authentication</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">6. Your Rights and Choices</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Depending on your location, you may have the following rights regarding your personal information:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li><strong>Access:</strong> Request access to your personal information</li>
                                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                                <li><strong>Opt-out:</strong> Opt-out of marketing communications</li>
                                <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
                                <li><strong>Do Not Sell:</strong> California residents can opt-out of the sale of personal information (we do not sell personal information)</li>
                            </ul>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                To exercise these rights, please contact us at <a href="mailto:privacy@elitechwiz.com" className="text-blue-500 hover:underline">privacy@elitechwiz.com</a>.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">7. Third-Party Services</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Our website may contain links to third-party websites or integrate with third-party services (e.g., Google Analytics, social media platforms). We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">8. Children's Privacy</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">9. International Data Transfers</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. By using our services, you consent to such transfers.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">10. Changes to This Privacy Policy</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">11. Contact Us</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                If you have any questions about this Privacy Policy or our data practices, please contact us:
                            </p>
                            <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
                                    <strong>Email:</strong> <a href="mailto:privacy@elitechwiz.com" className="text-blue-500 hover:underline">privacy@elitechwiz.com</a>
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

export default PrivacyModal;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    onClose: () => void;
}

const TermsModal: React.FC<ModalProps> = ({ onClose }) => {
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
                        <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Terms of Service</h1>
                        
                        <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">
                            <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">1. Service Agreement</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                By engaging with EliTechWiz's services, including but not limited to cybersecurity consulting, penetration testing, software development, system architecture, UI/UX design, and related professional services, you agree to be bound by these Terms of Service.
                            </p>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                These Terms govern the relationship between you (the "Client") and EliTechWiz ("Service Provider") regarding the provision of professional technology and security services.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">2. Services Offered</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                EliTechWiz provides the following professional services:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li><strong>Cybersecurity Services:</strong> Penetration testing, vulnerability assessments, security audits, network security, ethical hacking, and security consulting</li>
                                <li><strong>Software Development:</strong> Custom application development, web development, system integration, and software architecture</li>
                                <li><strong>Design Services:</strong> UI/UX design, graphic design, system architecture design, and user experience optimization</li>
                                <li><strong>Consulting Services:</strong> Technology strategy, security planning, system optimization, and technical advisory services</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">3. Service Engagement</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                All services are provided subject to a written agreement or statement of work (SOW) that specifies:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Scope of work and deliverables</li>
                                <li>Timeline and milestones</li>
                                <li>Pricing and payment terms</li>
                                <li>Intellectual property rights</li>
                                <li>Confidentiality obligations</li>
                                <li>Limitation of liability</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">4. Client Responsibilities</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Clients are responsible for:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Providing accurate information and necessary access to systems for service delivery</li>
                                <li>Obtaining necessary permissions and authorizations for security testing and assessments</li>
                                <li>Timely payment of fees as agreed in the service agreement</li>
                                <li>Implementing recommended security measures and fixes</li>
                                <li>Maintaining confidentiality of any credentials or access provided</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">5. Payment Terms</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Payment terms will be specified in individual service agreements. Generally:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Invoices are due within the timeframe specified in the agreement (typically 15-30 days)</li>
                                <li>Late payments may incur interest charges as specified in the agreement</li>
                                <li>Services may be suspended for non-payment after appropriate notice</li>
                                <li>All fees are non-refundable unless otherwise specified in writing</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">6. Intellectual Property</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Unless otherwise agreed in writing:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>All work products, code, designs, and deliverables created specifically for the Client become the Client's property upon full payment</li>
                                <li>EliTechWiz retains rights to methodologies, tools, frameworks, and general knowledge developed independently</li>
                                <li>Pre-existing intellectual property remains with its original owner</li>
                                <li>Client grants EliTechWiz permission to use project outcomes (anonymized) for portfolio and marketing purposes unless otherwise specified</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">7. Confidentiality</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Both parties agree to maintain confidentiality of:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Business information and trade secrets</li>
                                <li>Security vulnerabilities and assessment findings (until remediated)</li>
                                <li>Proprietary methodologies and processes</li>
                                <li>Client data and system information</li>
                            </ul>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Confidentiality obligations survive termination of the service agreement.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">8. Security Testing Authorization</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                For cybersecurity services, including penetration testing and security assessments:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Client must provide written authorization before any security testing begins</li>
                                <li>Testing will be conducted within the agreed scope and boundaries</li>
                                <li>Client is responsible for backing up systems before testing</li>
                                <li>EliTechWiz will follow responsible disclosure practices for any vulnerabilities found</li>
                                <li>Client agrees not to hold EliTechWiz liable for any disruption caused by authorized security testing</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">9. Limitation of Liability</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                To the maximum extent permitted by law:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>EliTechWiz's total liability shall not exceed the fees paid for the specific service in question</li>
                                <li>EliTechWiz is not liable for indirect, incidental, or consequential damages</li>
                                <li>Security services are provided on an "as-is" basis - no guarantee of complete security</li>
                                <li>Client is responsible for implementing recommended security measures</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">10. Service Modifications and Cancellation</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Either party may request modifications to the service scope, which must be agreed upon in writing. Cancellation terms will be specified in individual service agreements.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">11. Governing Law</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                These Terms shall be governed by the laws of Tanzania. Any disputes will be resolved through good faith negotiation, and if necessary, through appropriate legal channels.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">12. Contact Information</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                For questions about these Terms of Service or to engage our services:
                            </p>
                            <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
                                    <strong>Email:</strong> <a href="mailto:contact@elitechwiz.com" className="text-blue-500 hover:underline">contact@elitechwiz.com</a>
                                </p>
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
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

export default TermsModal;

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
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">1. Agreement to Terms</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                By accessing or using the EliTechWiz Portfolio website ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, then you may not access the Service.
                            </p>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                These Terms apply to all visitors, users, and others who access or use the Service. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">2. Use License</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Permission is granted to temporarily access the materials on EliTechWiz's Portfolio website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Modify or copy the materials</li>
                                <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                                <li>Attempt to reverse engineer any software contained on the website</li>
                                <li>Remove any copyright or other proprietary notations from the materials</li>
                                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                            </ul>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                This license shall automatically terminate if you violate any of these restrictions and may be terminated by EliTechWiz at any time.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">3. Acceptable Use</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                You agree not to use the Service:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>In any way that violates any applicable national or international law or regulation</li>
                                <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                                <li>To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity</li>
                                <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
                                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">4. Intellectual Property Rights</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                The Service and its original content, features, and functionality are and will remain the exclusive property of EliTechWiz and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
                            </p>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                All content displayed on this website, including but not limited to text, graphics, logos, images, and software, is the property of EliTechWiz or its content suppliers and is protected by international copyright laws.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">5. User Accounts</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                            </p>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account, whether or not you have authorized such activities or actions.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">6. Disclaimer</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                The materials on EliTechWiz's Portfolio website are provided on an 'as is' basis. EliTechWiz makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                            </p>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Further, EliTechWiz does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">7. Limitations</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                In no event shall EliTechWiz or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on EliTechWiz's Portfolio website, even if EliTechWiz or an authorized representative has been notified orally or in writing of the possibility of such damage.
                            </p>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">8. Links to Other Websites</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Our Service may contain links to third-party websites or services that are not owned or controlled by EliTechWiz. EliTechWiz has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
                            </p>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                You acknowledge and agree that EliTechWiz shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">9. Termination</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                            </p>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">10. Governing Law</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                These Terms shall be interpreted and governed by the laws of Tanzania, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">11. Changes to Terms</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                            </p>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">12. Contact Information</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                If you have any questions about these Terms of Service, please contact us:
                            </p>
                            <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
                                    <strong>Email:</strong> <a href="mailto:legal@elitechwiz.com" className="text-blue-500 hover:underline">legal@elitechwiz.com</a>
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

export default TermsModal;

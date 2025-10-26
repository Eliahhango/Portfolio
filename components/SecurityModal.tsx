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
                    className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl max-w-2xl w-full relative border border-slate-200 dark:border-gray-800 p-8 max-h-[80vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Security Information</h2>
                    <p className="mb-4 text-slate-600 dark:text-gray-400">This is a placeholder for Security information. We take the security of your data very seriously. Here are some of the measures we take to protect your information.</p>
                    <h3 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">Encryption</h3>
                    <p className="mb-4 text-slate-600 dark:text-gray-400">All data is encrypted in transit using TLS 1.2+ and at rest using AES-256. We are committed to using strong encryption protocols.</p>
                    <h3 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">Vulnerability Management</h3>
                    <p className="mb-4 text-slate-600 dark:text-gray-400">We continuously scan our systems for vulnerabilities and apply patches in a timely manner. We also engage with third-party security experts to conduct penetration tests.</p>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/75 transition-colors"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default SecurityModal;
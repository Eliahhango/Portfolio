// FIX: Create content for the file to define the PrivacyModal component.
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
                    className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl max-w-2xl w-full relative border border-slate-200 dark:border-gray-800 p-8 max-h-[80vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Privacy Policy</h2>
                    <p className="mb-4 text-slate-600 dark:text-gray-400">This is a placeholder for the Privacy Policy. We are committed to protecting your privacy. This policy outlines how we handle your personal information to protect your privacy.</p>
                    <h3 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">Information We Collect</h3>
                    <p className="mb-4 text-slate-600 dark:text-gray-400">We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services.</p>
                    <h3 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">How We Use Your Information</h3>
                    <p className="mb-4 text-slate-600 dark:text-gray-400">We use personal information collected via our sites for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
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

export default PrivacyModal;
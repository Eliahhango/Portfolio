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
                    className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl max-w-2xl w-full relative border border-slate-200 dark:border-gray-800 p-8 max-h-[80vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Terms of Service</h2>
                    <p className="mb-4 text-slate-600 dark:text-gray-400">This is a placeholder for the Terms of Service. By using our services, you agree to these terms. Please read them carefully.</p>
                    <h3 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">1. Your Agreement</h3>
                    <p className="mb-4 text-slate-600 dark:text-gray-400">By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
                    <h3 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">2. Changes to Terms</h3>
                    <p className="mb-4 text-slate-600 dark:text-gray-400">We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect.</p>
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

export default TermsModal;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    onClose: () => void;
}

const DnsmpiModal: React.FC<ModalProps> = ({ onClose }) => {
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
                    <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Do Not Share My Personal Information</h2>
                    <p className="mb-4 text-slate-600 dark:text-gray-400">This is a placeholder for the "Do Not Share My Personal Information" page. Under the CCPA, you have the right to opt-out of the sale of your personal information. </p>
                    <p className="mb-4 text-slate-600 dark:text-gray-400">We do not sell your personal information. However, we support the CCPA by allowing California residents to opt-out of any future sale of their personal information.</p>
                    <p className="mb-4 text-slate-600 dark:text-gray-400">If you would like to record your preference that we do not sell your data, please contact us at <a href="mailto:privacy@elitechwiz.com" className="text-blue-500 hover:underline">privacy@elitechwiz.com</a>.</p>
                    <div className="mt-6 text-right">
                        <button onClick={onClose} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">Close</button>
                    </div>
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

export default DnsmpiModal;
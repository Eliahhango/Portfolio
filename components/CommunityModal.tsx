import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    onClose: () => void;
}

const CommunityModal: React.FC<ModalProps> = ({ onClose }) => {
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
                    <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Join Our Community</h2>
                    <p className="mb-4 text-slate-600 dark:text-gray-400">This is a placeholder for community information. We are building a vibrant community of innovators, hackers, and creators. Connect with us on our platforms to stay updated, ask questions, and collaborate on exciting projects.</p>
                    <div className="space-y-4 my-6">
                        <a href="#" className="flex items-center p-3 bg-slate-100 dark:bg-gray-800 rounded-md hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors">
                            <span className="font-bold text-blue-500">Discord Server:</span>
                            <span className="ml-2 text-slate-700 dark:text-gray-300">Join the conversation!</span>
                        </a>
                         <a href="#" className="flex items-center p-3 bg-slate-100 dark:bg-gray-800 rounded-md hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors">
                            <span className="font-bold text-blue-500">GitHub Discussions:</span>
                            <span className="ml-2 text-slate-700 dark:text-gray-300">Contribute and get help.</span>
                        </a>
                         <a href="#" className="flex items-center p-3 bg-slate-100 dark:bg-gray-800 rounded-md hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors">
                            <span className="font-bold text-blue-500">Community Forum:</span>
                            <span className="ml-2 text-slate-700 dark:text-gray-300">Share your ideas and projects.</span>
                        </a>
                    </div>
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

export default CommunityModal;
// FIX: Create content for the file to define the DocumentationModal component.
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    onClose: () => void;
}

const DocumentationModal: React.FC<ModalProps> = ({ onClose }) => {
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
                    <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Documentation</h2>
                    <p className="mb-4 text-slate-600 dark:text-gray-400">This is a placeholder for project documentation. Here you would find detailed information about the project's architecture, setup, and API usage.</p>
                    <h3 className="text-xl font-bold mt-6 mb-2 text-slate-900 dark:text-white">Getting Started</h3>
                    <p className="mb-4 text-slate-600 dark:text-gray-400">To get started with this project, clone the repository and install the dependencies using your favorite package manager.</p>
                    <pre className="bg-slate-100 dark:bg-gray-800 p-4 rounded-md text-sm text-slate-800 dark:text-slate-200 overflow-x-auto">
                        <code>
                            git clone [repository-url]<br />
                            cd [project-directory]<br />
                            npm install<br />
                            npm start
                        </code>
                    </pre>
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

export default DocumentationModal;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    onClose: () => void;
}

const CookieModal: React.FC<ModalProps> = ({ onClose }) => {
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
                    <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Manage Cookies</h2>
                    <p className="mb-4 text-slate-600 dark:text-gray-400">This is a placeholder for cookie management. Here you would be able to customize your cookie preferences.</p>
                    <div className="space-y-4">
                        <div>
                            <label className="flex items-center justify-between">
                                <span className="text-slate-800 dark:text-slate-200 font-semibold">Strictly Necessary Cookies</span>
                                <input type="checkbox" checked disabled />
                            </label>
                            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">These cookies are essential for you to browse the website and use its features.</p>
                        </div>
                        <div>
                           <label className="flex items-center justify-between">
                                <span className="text-slate-800 dark:text-slate-200 font-semibold">Performance Cookies</span>
                                <input type="checkbox" defaultChecked />
                            </label>
                            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">These cookies collect information about how you use our website, like which pages you visited.</p>
                        </div>
                        <div>
                           <label className="flex items-center justify-between">
                                <span className="text-slate-800 dark:text-slate-200 font-semibold">Functional Cookies</span>
                                <input type="checkbox" defaultChecked />
                            </label>
                            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">These cookies allow the website to remember choices you have made in the past.</p>
                        </div>
                    </div>
                     <div className="mt-6 flex justify-end space-x-4">
                        <button onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-gray-700 text-slate-800 dark:text-white font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-gray-600 transition-colors">Save Preferences</button>
                        <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">Accept All</button>
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

export default CookieModal;
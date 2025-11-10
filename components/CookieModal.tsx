import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    onClose: () => void;
}

interface CookiePreferences {
    necessary: boolean;
    performance: boolean;
    functional: boolean;
    analytics: boolean;
}

const CookieModal: React.FC<ModalProps> = ({ onClose }) => {
    const [preferences, setPreferences] = useState<CookiePreferences>({
        necessary: true, // Always required
        performance: false,
        functional: false,
        analytics: false,
    });

    useEffect(() => {
        // Load saved preferences from localStorage
        const saved = localStorage.getItem('cookiePreferences');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setPreferences({ ...preferences, ...parsed });
            } catch (e) {
                console.error('Error parsing cookie preferences:', e);
            }
        }
    }, []);

    const handleToggle = (key: keyof CookiePreferences) => {
        if (key === 'necessary') return; // Cannot disable necessary cookies
        setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
        localStorage.setItem('cookieConsent', 'true');
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        onClose();
    };

    const handleAcceptAll = () => {
        const allAccepted = {
            necessary: true,
            performance: true,
            functional: true,
            analytics: true,
        };
        setPreferences(allAccepted);
        localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted));
        localStorage.setItem('cookieConsent', 'true');
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        onClose();
    };

    const handleRejectAll = () => {
        const onlyNecessary = {
            necessary: true,
            performance: false,
            functional: false,
            analytics: false,
        };
        setPreferences(onlyNecessary);
        localStorage.setItem('cookiePreferences', JSON.stringify(onlyNecessary));
        localStorage.setItem('cookieConsent', 'true');
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        onClose();
    };

    const cookieTypes = [
        {
            key: 'necessary' as keyof CookiePreferences,
            title: 'Strictly Necessary Cookies',
            description: 'These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility. You cannot opt-out of these cookies.',
            required: true,
        },
        {
            key: 'performance' as keyof CookiePreferences,
            title: 'Performance Cookies',
            description: 'These cookies collect information about how you use our website, such as which pages you visit most often. This data helps us optimize our website performance and improve user experience.',
            required: false,
        },
        {
            key: 'functional' as keyof CookiePreferences,
            title: 'Functional Cookies',
            description: 'These cookies allow the website to remember choices you have made in the past, such as your preferred language, region, or username. They provide enhanced, personalized features.',
            required: false,
        },
        {
            key: 'analytics' as keyof CookiePreferences,
            title: 'Analytics Cookies',
            description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.',
            required: false,
        },
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4" onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl max-w-3xl w-full relative border border-slate-200 dark:border-gray-800 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
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
                        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Cookie Preferences</h1>
                        <p className="text-slate-600 dark:text-gray-400 mb-6">
                            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences below.
                        </p>

                        <section className="mb-8">
                            <div className="space-y-4">
                                {cookieTypes.map((cookie) => (
                                    <div
                                        key={cookie.key}
                                        className={`p-4 rounded-lg border ${
                                            cookie.required
                                                ? 'bg-slate-50 dark:bg-gray-900 border-slate-200 dark:border-gray-800'
                                                : 'bg-white dark:bg-gray-950 border-slate-200 dark:border-gray-800'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-200">
                                                        {cookie.title}
                                                    </h3>
                                                    {cookie.required && (
                                                        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                                                            Required
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-slate-600 dark:text-gray-400">
                                                    {cookie.description}
                                                </p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={preferences[cookie.key]}
                                                    onChange={() => handleToggle(cookie.key)}
                                                    disabled={cookie.required}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">More Information</h2>
                            <p className="text-sm text-slate-600 dark:text-gray-400 mb-4 leading-relaxed">
                                Cookies help us provide better service experiences and understand how visitors interact with our website. For more detailed information about how we use cookies and handle your data, please review our{' '}
                                <a href="#" className="text-blue-500 hover:underline" onClick={(e) => { e.preventDefault(); onClose(); }}>
                                    Privacy Policy
                                </a>
                                . You can change your cookie preferences at any time by visiting this page again.
                            </p>
                            <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                                As cybersecurity professionals, we take data privacy seriously and use cookies responsibly to enhance your experience while maintaining your privacy and security.
                            </p>
                        </section>

                        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-4 border-t border-slate-200 dark:border-gray-800">
                            <button
                                onClick={handleRejectAll}
                                className="px-6 py-2.5 bg-slate-200 dark:bg-gray-700 text-slate-800 dark:text-white font-semibold rounded-lg hover:bg-slate-300 dark:hover:bg-gray-600 transition-colors"
                            >
                                Reject All
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Save Preferences
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Accept All
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CookieModal;

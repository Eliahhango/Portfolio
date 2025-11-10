import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    onClose: () => void;
}

interface ServiceStatus {
    name: string;
    status: 'operational' | 'degraded' | 'down';
    uptime: string;
    description: string;
}

const StatusModal: React.FC<ModalProps> = ({ onClose }) => {
    const [services, setServices] = useState<ServiceStatus[]>([
        { 
            name: 'Cybersecurity Services', 
            status: 'operational', 
            uptime: '99.9%',
            description: 'Penetration testing, vulnerability assessments, and security consulting'
        },
        { 
            name: 'Software Development', 
            status: 'operational', 
            uptime: '99.8%',
            description: 'Custom application development and system integration services'
        },
        { 
            name: 'Design Services', 
            status: 'operational', 
            uptime: '99.9%',
            description: 'UI/UX design and system architecture services'
        },
        { 
            name: 'Consulting Services', 
            status: 'operational', 
            uptime: '99.7%',
            description: 'Technology strategy and security planning consultations'
        },
        { 
            name: 'Client Communication', 
            status: 'operational', 
            uptime: '99.9%',
            description: 'Email, phone, and project management systems'
        },
    ]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'operational':
                return 'bg-green-500';
            case 'degraded':
                return 'bg-yellow-500';
            case 'down':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'operational':
                return 'Operational';
            case 'degraded':
                return 'Degraded Performance';
            case 'down':
                return 'Service Unavailable';
            default:
                return 'Unknown';
        }
    };

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
                        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Service Status</h1>
                        <p className="text-slate-600 dark:text-gray-400 mb-6">
                            Current status of EliTechWiz professional services and systems.
                        </p>

                        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <div>
                                    <p className="font-semibold text-green-800 dark:text-green-300">All Services Operational</p>
                                    <p className="text-sm text-green-700 dark:text-green-400">All services are running normally and accepting new engagements</p>
                                </div>
                            </div>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Service Status</h2>
                            <div className="space-y-3">
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-slate-50 dark:bg-gray-900 rounded-lg border border-slate-200 dark:border-gray-800"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-3 flex-1">
                                                <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)} mt-1.5 flex-shrink-0`}></div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-slate-800 dark:text-gray-200 mb-1">{service.name}</h3>
                                                    <p className="text-sm text-slate-600 dark:text-gray-400 mb-2">{service.description}</p>
                                                    <p className="text-xs text-slate-500 dark:text-gray-500">
                                                        Status: <span className="font-medium">{getStatusText(service.status)}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <p className="text-sm font-medium text-slate-700 dark:text-gray-300">Uptime</p>
                                                <p className="text-sm text-slate-600 dark:text-gray-400">{service.uptime}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Service Availability</h2>
                            <div className="bg-slate-50 dark:bg-gray-900 p-4 rounded-lg">
                                <p className="text-slate-600 dark:text-gray-400 mb-2">
                                    <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EAT
                                </p>
                                <p className="text-slate-600 dark:text-gray-400 mb-2">
                                    <strong>Emergency Support:</strong> Available 24/7 for critical security incidents
                                </p>
                                <p className="text-slate-600 dark:text-gray-400">
                                    <strong>Response Time:</strong> We aim to respond to all inquiries within 24 hours during business days
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Recent Incidents</h2>
                            <div className="bg-slate-50 dark:bg-gray-900 p-4 rounded-lg">
                                <p className="text-slate-600 dark:text-gray-400 text-center py-4">
                                    No service disruptions reported in the last 90 days.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Scheduled Maintenance</h2>
                            <div className="bg-slate-50 dark:bg-gray-900 p-4 rounded-lg">
                                <p className="text-slate-600 dark:text-gray-400 text-center py-4">
                                    No scheduled maintenance at this time. All maintenance is performed during off-peak hours with advance notice.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Status Definitions</h2>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-gray-900 rounded-lg">
                                    <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 dark:text-gray-200">Operational</h3>
                                        <p className="text-sm text-slate-600 dark:text-gray-400">
                                            Service is fully functional and accepting new engagements. All systems operating normally.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-gray-900 rounded-lg">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 dark:text-gray-200">Degraded Performance</h3>
                                        <p className="text-sm text-slate-600 dark:text-gray-400">
                                            Service is operational but experiencing delays or limited capacity. We're working to restore full functionality.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-gray-900 rounded-lg">
                                    <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 dark:text-gray-200">Service Unavailable</h3>
                                        <p className="text-sm text-slate-600 dark:text-gray-400">
                                            Service is temporarily unavailable. We're actively working to resolve the issue and will provide updates.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Contact & Support</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                For service inquiries or to report issues:
                            </p>
                            <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
                                    <strong>Email:</strong> <a href="mailto:contact@elitechwiz.com" className="text-blue-500 hover:underline">contact@elitechwiz.com</a>
                                </p>
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
                                    <strong>Phone:</strong> <a href="tel:+255688164510" className="text-blue-500 hover:underline">+255 688 164 510</a>
                                </p>
                                <p className="text-slate-700 dark:text-gray-300">
                                    <strong>Emergency Security:</strong> <a href="mailto:security@elitechwiz.com" className="text-blue-500 hover:underline">security@elitechwiz.com</a>
                                </p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default StatusModal;

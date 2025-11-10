import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
    onClose: () => void;
}

interface ServiceStatus {
    name: string;
    status: 'operational' | 'degraded' | 'down';
    uptime: string;
}

const StatusModal: React.FC<ModalProps> = ({ onClose }) => {
    const [services, setServices] = useState<ServiceStatus[]>([
        { name: 'Website', status: 'operational', uptime: '99.9%' },
        { name: 'API Services', status: 'operational', uptime: '99.8%' },
        { name: 'AI Chatbot', status: 'operational', uptime: '99.7%' },
        { name: 'Email Service', status: 'operational', uptime: '99.9%' },
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
                return 'Service Down';
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
                            Real-time status of all our services and systems.
                        </p>

                        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <div>
                                    <p className="font-semibold text-green-800 dark:text-green-300">All Systems Operational</p>
                                    <p className="text-sm text-green-700 dark:text-green-400">All services are running normally</p>
                                </div>
                            </div>
                        </div>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Service Status</h2>
                            <div className="space-y-3">
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-gray-900 rounded-lg border border-slate-200 dark:border-gray-800"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`}></div>
                                            <div>
                                                <h3 className="font-semibold text-slate-800 dark:text-gray-200">{service.name}</h3>
                                                <p className="text-sm text-slate-600 dark:text-gray-400">
                                                    {getStatusText(service.status)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-slate-700 dark:text-gray-300">Uptime</p>
                                            <p className="text-sm text-slate-600 dark:text-gray-400">{service.uptime}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Recent Incidents</h2>
                            <div className="bg-slate-50 dark:bg-gray-900 p-4 rounded-lg">
                                <p className="text-slate-600 dark:text-gray-400 text-center py-4">
                                    No incidents reported in the last 90 days.
                                </p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Scheduled Maintenance</h2>
                            <div className="bg-slate-50 dark:bg-gray-900 p-4 rounded-lg">
                                <p className="text-slate-600 dark:text-gray-400 text-center py-4">
                                    No scheduled maintenance at this time.
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
                                            Service is functioning normally with no known issues.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-gray-900 rounded-lg">
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 dark:text-gray-200">Degraded Performance</h3>
                                        <p className="text-sm text-slate-600 dark:text-gray-400">
                                            Service is operational but experiencing performance issues or partial outages.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-gray-900 rounded-lg">
                                    <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                    <div>
                                        <h3 className="font-semibold text-slate-800 dark:text-gray-200">Service Down</h3>
                                        <p className="text-sm text-slate-600 dark:text-gray-400">
                                            Service is currently unavailable or experiencing a major outage.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Subscribe to Updates</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Get notified about service status updates and incidents via email.
                            </p>
                            <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
                                <p className="text-slate-700 dark:text-gray-300">
                                    <strong>Email:</strong> <a href="mailto:status@elitechwiz.com" className="text-blue-500 hover:underline">status@elitechwiz.com</a>
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


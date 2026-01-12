import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import { ArrowLeft } from 'lucide-react';

interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: string;
  description: string;
}

const Status: React.FC = () => {
  const [services] = useState<ServiceStatus[]>([
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

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
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <SEO 
        title="Service Status | EliTechWiz"
        description="Real-time status of all EliTechWiz services including cybersecurity, software development, and consulting services."
        url="https://www.elitechwiz.site/status"
      />
      <ScrollProgress />
      <Header activeSection="" />
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto py-12 sm:py-16 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-slate-800/50 dark:border dark:border-slate-700/50 rounded-lg shadow-lg p-6 sm:p-8 md:p-10"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Service Status</h1>
            <p className="text-sm text-slate-500 dark:text-gray-400">
              All systems operational. Last updated: {new Date().toLocaleString()}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                variants={itemVariants}
                className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-lg border border-slate-200 dark:border-slate-600"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(service.status)}`} />
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{service.name}</h3>
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-gray-300">{getStatusText(service.status)}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-gray-400 mb-2">{service.description}</p>
                <p className="text-xs text-slate-500 dark:text-gray-500">Uptime: {service.uptime}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Status;

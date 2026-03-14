import React from 'react';
import { motion } from 'framer-motion';

interface Service {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

const ServicesPage: React.FC = () => {
  const services: Service[] = [
    {
      title: 'Penetration Testing',
      description: 'Comprehensive security assessments to identify vulnerabilities before attackers do.',
      features: [
        'Network security audits',
        'Web application testing',
        'Social engineering assessments',
        'Post-test reporting and remediation guidance'
      ],
      icon: '🔒'
    },
    {
      title: 'Web Development',
      description: 'Full-stack web solutions built with modern technologies and best practices.',
      features: [
        'React & TypeScript applications',
        'Node.js backend systems',
        'Database design & optimization',
        'API development and integration'
      ],
      icon: '💻'
    },
    {
      title: 'Security Consulting',
      description: 'Strategic guidance to implement robust security frameworks across your organization.',
      features: [
        'Security architecture design',
        'Compliance & regulatory guidance',
        'Incident response planning',
        'Team security training'
      ],
      icon: '🛡️'
    },
    {
      title: 'Authentication Systems',
      description: 'Enterprise-grade authentication solutions including MFA and advanced security.',
      features: [
        'Multi-factor authentication (MFA)',
        'OAuth2 & OpenID Connect',
        'Biometric integration',
        'Session management systems'
      ],
      icon: '🔑'
    },
    {
      title: 'System Architecture',
      description: 'Design scalable, secure, and maintainable system architectures.',
      features: [
        'Microservices architecture',
        'Cloud infrastructure design',
        'Database optimization',
        'DevOps & CI/CD implementation'
      ],
      icon: '🏗️'
    },
    {
      title: 'Code Auditing',
      description: 'Detailed code reviews focusing on security, performance, and maintainability.',
      features: [
        'Security vulnerability scanning',
        'Performance optimization',
        'Code quality assessment',
        'Best practices implementation'
      ],
      icon: '🔍'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 sm:py-16 md:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Page Header */}
          <motion.div variants={itemVariants} className="text-center space-y-3 sm:space-y-4 pt-4 sm:pt-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
              Services
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive solutions for security, development, and digital transformation
            </p>
          </motion.div>

          {/* Services Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ translateY: -8 }}
                className="group p-8 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{service.icon}</div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 sm:mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300 mb-4 sm:mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-gray-400">
                      <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 p-12 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 opacity-90">
              Let's discuss how we can help secure and scale your business
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Schedule a Consultation
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServicesPage;

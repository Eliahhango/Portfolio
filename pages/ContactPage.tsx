import React from 'react';
import { motion } from 'framer-motion';
import Contact from '../components/Contact';

const ContactPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Page Header */}
          <motion.div variants={itemVariants} className="text-center space-y-3 sm:space-y-4 pt-4 sm:pt-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
              Get In Touch
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-300">
              Let's discuss your project and how I can help
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12"
          >
            <motion.div 
              variants={itemVariants}
              className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center"
            >
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Email</h3>
              <a 
                href="mailto:contact@example.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                contact@example.com
              </a>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center"
            >
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Phone</h3>
              <a 
                href="tel:+1234567890"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                +1 (234) 567-890
              </a>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center"
            >
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Location</h3>
              <p className="text-slate-600 dark:text-gray-300">
                Remote / Available Worldwide
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Contact />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;

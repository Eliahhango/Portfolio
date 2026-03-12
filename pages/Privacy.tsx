import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import { ArrowLeft } from 'lucide-react';

const Privacy: React.FC = () => {
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

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <SEO 
        title="Privacy Policy | EliTechWiz"
        description="Privacy Policy for EliTechWiz professional services. Learn how we collect, use, and protect your personal information."
        url="https://www.elitechwiz.site/privacy"
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Privacy Policy</h1>
            <p className="text-sm text-slate-500 dark:text-gray-400">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">1. Introduction</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              This Privacy Policy describes how EliTechWiz ("we," "our," or "us") collects, uses, and protects your personal information when you engage with our professional services, including cybersecurity consulting, software development, design services, and when you visit our website or contact us.
            </p>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              We are committed to protecting your privacy and handling your data with the highest level of security and confidentiality, especially given our expertise in cybersecurity.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">2. Information We Collect</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              When you engage our services or visit our website, we may collect:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-300 space-y-2">
              <li>Business contact information (name, email, phone, company)</li>
              <li>Project requirements and specifications</li>
              <li>Website usage data (IP address, browser type, pages visited)</li>
              <li>Communication records and correspondence</li>
              <li>Payment and billing information</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">3. How We Use Your Information</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              We use your information to provide services, communicate with you, process payments, improve our services, and comply with legal obligations.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">4. Data Security</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              As cybersecurity professionals, we implement industry-leading security measures including encryption, access controls, secure infrastructure, and regular security audits to protect your information.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">5. Your Rights</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              You have the right to access, correct, delete, or port your personal information. You can also opt-out of marketing communications. To exercise these rights, contact us at <a href="mailto:privacy@elitechwiz.com" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@elitechwiz.com</a>.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">6. Contact Us</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              For privacy-related questions:
            </p>
            <div className="bg-slate-100 dark:bg-slate-700/30 p-4 rounded-lg mb-4">
              <p className="text-slate-700 dark:text-gray-300 mb-2">
                <strong>Privacy Officer:</strong> <a href="mailto:privacy@elitechwiz.com" className="text-blue-600 dark:text-blue-400 hover:underline">privacy@elitechwiz.com</a>
              </p>
              <p className="text-slate-700 dark:text-gray-300 mb-2">
                <strong>General Contact:</strong> <a href="mailto:contact@elitechwiz.com" className="text-blue-600 dark:text-blue-400 hover:underline">contact@elitechwiz.com</a>
              </p>
              <p className="text-slate-700 dark:text-gray-300">
                <strong>Phone:</strong> <a href="tel:+255688164510" className="text-blue-600 dark:text-blue-400 hover:underline">+255 688 164 510</a>
              </p>
            </div>
          </motion.section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;

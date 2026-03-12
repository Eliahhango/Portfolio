import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import { ArrowLeft } from 'lucide-react';

const DNSMPI: React.FC = () => {
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
        title="Do Not Sell My Personal Information | EliTechWiz"
        description="Opt-out of the sale of your personal information. We do not sell your data, but you can record your preference here."
        url="https://www.elitechwiz.site/dnsmpi"
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Do Not Sell My Personal Information</h1>
          </motion.div>

          <motion.section variants={itemVariants} className="mb-8">
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              Under the California Consumer Privacy Act (CCPA) and similar privacy laws, you have the right to opt-out of the sale of your personal information.
            </p>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              <strong>We do not sell your personal information.</strong> However, we support your privacy rights by allowing you to record your preference that we do not sell your data, now or in the future.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Your Rights</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-300 space-y-2">
              <li>Opt-out of the sale of your personal information</li>
              <li>Request access to your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Not be discriminated against for exercising your privacy rights</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">How to Exercise Your Rights</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              If you would like to record your preference that we do not sell your data, or if you have any questions about your privacy rights, please contact us:
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

export default DNSMPI;

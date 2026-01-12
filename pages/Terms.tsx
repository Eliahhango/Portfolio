import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import { ArrowLeft } from 'lucide-react';

const Terms: React.FC = () => {
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
        title="Terms of Service | EliTechWiz"
        description="Terms of Service for EliTechWiz professional services including cybersecurity, software development, and design services."
        url="https://www.elitechwiz.site/terms"
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Terms of Service</h1>
            <p className="text-sm text-slate-500 dark:text-gray-400">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">1. Service Agreement</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              By engaging with EliTechWiz's services, including but not limited to cybersecurity consulting, penetration testing, software development, system architecture, UI/UX design, and related professional services, you agree to be bound by these Terms of Service.
            </p>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              These Terms govern the relationship between you (the "Client") and EliTechWiz ("Service Provider") regarding the provision of professional technology and security services.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">2. Services Offered</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              EliTechWiz provides the following professional services:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-300 space-y-2">
              <li><strong>Cybersecurity Services:</strong> Penetration testing, vulnerability assessments, security audits, network security, ethical hacking, and security consulting</li>
              <li><strong>Software Development:</strong> Custom software solutions, web applications, mobile applications, API development, and system integration</li>
              <li><strong>System Architecture:</strong> Cloud architecture, system design, infrastructure planning, and technical consulting</li>
              <li><strong>Design Services:</strong> UI/UX design, graphic design, branding, and visual identity development</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">3. Client Responsibilities</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              Clients are responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-300 space-y-2">
              <li>Providing accurate and complete information necessary for service delivery</li>
              <li>Obtaining necessary permissions and authorizations for work to be performed</li>
              <li>Complying with applicable laws and regulations</li>
              <li>Timely payment of fees as agreed upon in service agreements</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">4. Intellectual Property</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              Unless otherwise agreed in writing, all work product, code, designs, and deliverables created by EliTechWiz remain the property of EliTechWiz until full payment is received. Upon full payment, ownership rights as specified in the service agreement will apply.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">5. Limitation of Liability</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              EliTechWiz's liability is limited to the amount paid for the specific service. We are not liable for indirect, incidental, or consequential damages arising from the use of our services.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">6. Contact Information</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              For questions about these Terms, please contact us at:
            </p>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              Email: <a href="mailto:contact@elitechwiz.com" className="text-blue-600 dark:text-blue-400 hover:underline">contact@elitechwiz.com</a><br />
              Phone: <a href="tel:+255688164510" className="text-blue-600 dark:text-blue-400 hover:underline">+255 688 164 510</a>
            </p>
          </motion.section>
        </motion.div>
      </main>
      <Footer 
        onPrivacyClick={() => {}}
        onDocsClick={() => {}}
        onTermsClick={() => {}}
        onSecurityClick={() => {}}
        onCookieClick={() => {}}
        onDnsmpiClick={() => {}}
        onCommunityClick={() => {}}
        onStatusClick={() => {}}
      />
    </div>
  );
};

export default Terms;

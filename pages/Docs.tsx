import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import { ArrowLeft } from 'lucide-react';

const Docs: React.FC = () => {
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
        title="Service Documentation | EliTechWiz"
        description="Comprehensive documentation for EliTechWiz services including cybersecurity, software development, and design services."
        url="https://www.elitechwiz.site/docs"
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Service Documentation</h1>
          </motion.div>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">About Our Services</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              EliTechWiz provides professional technology services including cybersecurity consulting, software development, system architecture, and design services. This documentation provides information about our service offerings, processes, and how to engage with us.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Service Offerings</h2>
            
            <div className="space-y-4">
              <div className="bg-slate-100 dark:bg-slate-700/30 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-gray-200">Cybersecurity Services</h3>
                <ul className="text-sm text-slate-600 dark:text-gray-300 space-y-1 list-disc pl-5">
                  <li>Penetration Testing & Vulnerability Assessments</li>
                  <li>Security Audits & Compliance Reviews</li>
                  <li>Network Security Design & Implementation</li>
                  <li>Ethical Hacking & Security Testing</li>
                  <li>Incident Response & Forensics</li>
                  <li>Security Consulting & Strategy</li>
                </ul>
              </div>

              <div className="bg-slate-100 dark:bg-slate-700/30 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-gray-200">Software Development</h3>
                <ul className="text-sm text-slate-600 dark:text-gray-300 space-y-1 list-disc pl-5">
                  <li>Custom Web & Mobile Application Development</li>
                  <li>System Integration & API Development</li>
                  <li>Software Architecture & Design</li>
                  <li>Legacy System Modernization</li>
                  <li>Full-Stack Development (React, Node.js, Python, etc.)</li>
                </ul>
              </div>

              <div className="bg-slate-100 dark:bg-slate-700/30 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-gray-200">Design Services</h3>
                <ul className="text-sm text-slate-600 dark:text-gray-300 space-y-1 list-disc pl-5">
                  <li>UI/UX Design & User Experience Optimization</li>
                  <li>System Architecture Design</li>
                  <li>Graphic Design & Branding</li>
                  <li>Prototyping & Wireframing</li>
                  <li>Design System Development</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Service Engagement Process</h2>
            
            <ol className="list-decimal pl-6 mb-4 text-slate-600 dark:text-gray-300 space-y-3">
              <li><strong>Initial Consultation:</strong> Discuss your needs, requirements, and objectives.</li>
              <li><strong>Proposal & Agreement:</strong> We'll provide a detailed proposal including scope, timeline, deliverables, and pricing.</li>
              <li><strong>Project Kickoff:</strong> Establish communication channels, access requirements, and project management processes.</li>
              <li><strong>Service Delivery:</strong> Execute the agreed-upon services with regular updates and communication.</li>
              <li><strong>Reporting & Deliverables:</strong> Provide comprehensive reports, documentation, and deliverables as specified.</li>
              <li><strong>Follow-up & Support:</strong> Address questions, provide clarifications, and offer ongoing support as needed.</li>
            </ol>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Contact Us</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              For questions about our services or to get started:
            </p>
            <div className="bg-slate-100 dark:bg-slate-700/30 p-4 rounded-lg mb-4">
              <p className="text-slate-700 dark:text-gray-300 mb-2">
                <strong>Email:</strong> <a href="mailto:contact@elitechwiz.com" className="text-blue-600 dark:text-blue-400 hover:underline">contact@elitechwiz.com</a>
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

export default Docs;

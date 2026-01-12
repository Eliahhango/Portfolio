import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import { ArrowLeft } from 'lucide-react';

const Security: React.FC = () => {
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
        title="Security Services & Practices | EliTechWiz"
        description="Comprehensive cybersecurity services including penetration testing, vulnerability assessments, and security consulting."
        url="https://www.elitechwiz.site/security"
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Security Services & Practices</h1>
            <p className="text-sm text-slate-500 dark:text-gray-400">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Our Security Services</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              EliTechWiz provides comprehensive cybersecurity services to help protect your business, systems, and data from threats. Our security expertise includes:
            </p>
            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-300 space-y-2">
              <li><strong>Penetration Testing:</strong> Simulated attacks to identify vulnerabilities before malicious actors exploit them</li>
              <li><strong>Vulnerability Assessments:</strong> Comprehensive scanning and analysis of your systems for security weaknesses</li>
              <li><strong>Security Audits:</strong> In-depth reviews of your security policies, procedures, and infrastructure</li>
              <li><strong>Network Security:</strong> Design and implementation of secure network architectures and firewalls</li>
              <li><strong>Ethical Hacking:</strong> Authorized security testing to find and fix vulnerabilities</li>
              <li><strong>Security Consulting:</strong> Strategic guidance on building robust security postures</li>
              <li><strong>Incident Response:</strong> Assistance with security incident investigation and remediation</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">How We Protect Your Data</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              When you engage our services, we implement rigorous security measures to protect your information:
            </p>
            
            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">Encryption</h3>
            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-300 space-y-2">
              <li>All data in transit is encrypted using TLS 1.2+ protocols</li>
              <li>Sensitive data at rest is encrypted using AES-256 encryption</li>
              <li>Credentials and access tokens are stored in encrypted vaults</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">Access Controls</h3>
            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-300 space-y-2">
              <li>Multi-factor authentication (MFA) for all administrative access</li>
              <li>Role-based access control (RBAC) limiting access to necessary data only</li>
              <li>Regular access reviews and credential rotation</li>
              <li>Principle of least privilege enforced</li>
            </ul>

            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">Secure Infrastructure</h3>
            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-300 space-y-2">
              <li>Secure hosting on enterprise-grade infrastructure</li>
              <li>Regular security patches and updates</li>
              <li>Network segmentation and firewall protection</li>
              <li>Intrusion detection and monitoring systems</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Security Best Practices</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              We follow industry-leading security practices and frameworks including OWASP, NIST, and ISO 27001 standards to ensure comprehensive security coverage.
            </p>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Contact Us</h2>
            <p className="mb-4 text-slate-600 dark:text-gray-300 leading-relaxed">
              For security-related questions or to engage our services:
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

export default Security;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollProgress from '../../components/ScrollProgress';

const CodeAuditing: React.FC = () => {
  return (
    <>
      <Header />
      <ScrollProgress />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-32 pb-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/services"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Services
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <img
              src="https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2"
              alt="Code Auditing"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl mb-8"
            />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
              Code Auditing & Code Review
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 leading-relaxed">
              Comprehensive code reviews that identify vulnerabilities, improve quality, and ensure your code meets industry best practices and security standards.
            </p>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Audit Services</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Security Audits</h3>
                <p className="text-slate-600 dark:text-gray-300 mb-4">
                  Identify and remediate security vulnerabilities throughout your codebase.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Vulnerability scanning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">OWASP Top 10 assessment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Dependency vulnerability analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Authentication & authorization review</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Code Quality Review</h3>
                <p className="text-slate-600 dark:text-gray-300 mb-4">
                  Improve code quality, maintainability, and performance through expert analysis.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Code standards compliance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Performance optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Architecture review</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Testing coverage analysis</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 p-8 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl"
          >
            <h2 className="text-3xl font-bold mb-8">Supported Technologies</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-slate-800 dark:bg-slate-700 rounded-lg">
                <h3 className="font-semibold text-blue-300 mb-3">Frontend</h3>
                <ul className="text-sm space-y-2 text-gray-300">
                  <li>JavaScript / TypeScript</li>
                  <li>React, Vue, Angular</li>
                  <li>HTML/CSS Security</li>
                  <li>Third-party integration</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-800 dark:bg-slate-700 rounded-lg">
                <h3 className="font-semibold text-blue-300 mb-3">Backend</h3>
                <ul className="text-sm space-y-2 text-gray-300">
                  <li>Node.js / Express</li>
                  <li>Python / Django / Flask</li>
                  <li>Java / Spring Boot</li>
                  <li>Go, Rust, C#/.NET</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-800 dark:bg-slate-700 rounded-lg">
                <h3 className="font-semibold text-blue-300 mb-3">Infrastructure</h3>
                <ul className="text-sm space-y-2 text-gray-300">
                  <li>Kubernetes configs</li>
                  <li>Infrastructure as Code</li>
                  <li>Database queries</li>
                  <li>API design patterns</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 p-8 bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-blue-900 rounded-2xl"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">What You Get</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <span className="text-blue-600 dark:text-blue-400 text-2xl font-bold min-w-fit">✓</span>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Detailed Report</h3>
                  <p className="text-slate-600 dark:text-gray-300">Comprehensive findings with severity levels and remediation guidance</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-blue-600 dark:text-blue-400 text-2xl font-bold min-w-fit">✓</span>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Code Examples</h3>
                  <p className="text-slate-600 dark:text-gray-300">Specific code references with before/after examples</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-blue-600 dark:text-blue-400 text-2xl font-bold min-w-fit">✓</span>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Implementation Support</h3>
                  <p className="text-slate-600 dark:text-gray-300">Guidance on fixing issues and preventing future occurrences</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-blue-600 dark:text-blue-400 text-2xl font-bold min-w-fit">✓</span>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Follow-up Review</h3>
                  <p className="text-slate-600 dark:text-gray-300">Optional verification that recommendations have been implemented</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Audit Process</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="flex items-center justify-center min-w-fit w-12 h-12 rounded-full bg-blue-600 text-white font-bold">1</span>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Scope Definition</h3>
                  <p className="text-slate-600 dark:text-gray-300">Identify what areas of code to review and audit focus areas</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center justify-center min-w-fit w-12 h-12 rounded-full bg-blue-600 text-white font-bold">2</span>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Static Analysis</h3>
                  <p className="text-slate-600 dark:text-gray-300">Automated scanning for vulnerabilities and code patterns</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center justify-center min-w-fit w-12 h-12 rounded-full bg-blue-600 text-white font-bold">3</span>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Manual Review</h3>
                  <p className="text-slate-600 dark:text-gray-300">Expert code review for logic flaws and security issues</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center justify-center min-w-fit w-12 h-12 rounded-full bg-blue-600 text-white font-bold">4</span>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Reporting & Consultation</h3>
                  <p className="text-slate-600 dark:text-gray-300">Detailed findings with remediation recommendations and guidance</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center p-12 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 rounded-2xl text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Strengthen Your Code Quality</h2>
            <p className="text-lg mb-8 opacity-90">
              Get expert insights on security, performance, and best practices
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Request Code Audit
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default CodeAuditing;

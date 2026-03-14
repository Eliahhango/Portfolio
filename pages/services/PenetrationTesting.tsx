import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollProgress from '../../components/ScrollProgress';

const PenetrationTesting: React.FC = () => {
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
          {/* Back Button */}
          <Link 
            to="/services"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Services
          </Link>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <img
              src="https://images.pexels.com/photos/5380649/pexels-photo-5380649.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2"
              alt="Penetration Testing"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl mb-8"
            />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
              Penetration Testing Services
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 leading-relaxed">
              Identify vulnerabilities before attackers do. Our comprehensive penetration testing services simulate real-world attacks to strengthen your security posture.
            </p>
          </motion.div>

          {/* Overview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">What We Test</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Network Security</h3>
                <p className="text-slate-600 dark:text-gray-300 mb-4">
                  We test your network infrastructure, firewalls, and access controls to ensure robust protection against unauthorized access and lateral movement.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Network reconnaissance and scanning</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Firewall & intrusion detection bypass</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Wireless security assessment</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Web Application Testing</h3>
                <p className="text-slate-600 dark:text-gray-300 mb-4">
                  Our experts analyze your web applications for common vulnerabilities including SQL injection, XSS, CSRF, and authentication flaws.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">OWASP Top 10 vulnerability testing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">API security assessment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Authentication & authorization testing</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Process */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Our Testing Methodology</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: 1, title: 'Planning', description: 'Define scope, obtain authorization, and establish testing boundaries' },
                { step: 2, title: 'Reconnaissance', description: 'Gather information about target systems using authorized methods' },
                { step: 3, title: 'Exploitation', description: 'Safely test identified vulnerabilities within agreed scope' },
                { step: 4, title: 'Reporting', description: 'Document findings with risk ratings and remediation guidance' }
              ].map((item) => (
                <motion.div
                  key={item.step}
                  whileHover={{ translateY: -8 }}
                  className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl border border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3">{item.step}</div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-gray-300 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Benefits */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 p-8 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl"
          >
            <h2 className="text-3xl font-bold mb-8">Why Choose Our Penetration Testing?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-blue-400 text-2xl font-bold">✓</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Certified Experts</h3>
                    <p className="text-gray-300">Our team holds industry certifications including OSCP, CEH, and GPEN.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-blue-400 text-2xl font-bold">✓</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Real-World Scenarios</h3>
                    <p className="text-gray-300">We simulate actual attack patterns used by threat actors.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="text-blue-400 text-2xl font-bold">✓</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Comprehensive Reports</h3>
                    <p className="text-gray-300">Detailed documentation with clear remediation steps for your team.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-blue-400 text-2xl font-bold">✓</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
                    <p className="text-gray-300">We assist with remediation and re-testing to verify fixes.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center p-12 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 rounded-2xl text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Secure Your Systems Today</h2>
            <p className="text-lg mb-8 opacity-90">
              Schedule a free security assessment with our expert team
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default PenetrationTesting;

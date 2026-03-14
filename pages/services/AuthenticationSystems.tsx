import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollProgress from '../../components/ScrollProgress';

const AuthenticationSystems: React.FC = () => {
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
              src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2"
              alt="Authentication Systems"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl mb-8"
            />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
              Authentication Systems Implementation
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 leading-relaxed">
              Secure your applications with modern authentication and authorization systems that protect user data while maintaining exceptional user experience.
            </p>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Authentication Solutions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Modern Auth Methods</h3>
                <p className="text-slate-600 dark:text-gray-300 mb-4">
                  Implement cutting-edge authentication mechanisms tailored to your application needs.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">OAuth 2.0 and OpenID Connect</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Multi-factor authentication (MFA)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Passwordless authentication</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Single Sign-On (SSO) integration</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Authorization & Access</h3>
                <p className="text-slate-600 dark:text-gray-300 mb-4">
                  Granular access control systems that scale with your organization.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Role-based access control (RBAC)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Attribute-based access control (ABAC)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Permission management systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Audit logging and compliance</span>
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
            <h2 className="text-3xl font-bold mb-8">Technology Stack</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-slate-800 dark:bg-slate-700 rounded-lg">
                <h3 className="font-semibold text-blue-300 mb-3">Identity Platforms</h3>
                <ul className="text-sm space-y-2 text-gray-300">
                  <li>Auth0</li>
                  <li>Okta</li>
                  <li>Firebase Auth</li>
                  <li>Amazon Cognito</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-800 dark:bg-slate-700 rounded-lg">
                <h3 className="font-semibold text-blue-300 mb-3">Frameworks & Libraries</h3>
                <ul className="text-sm space-y-2 text-gray-300">
                  <li>NextAuth.js</li>
                  <li>Passport.js</li>
                  <li>Spring Security</li>
                  <li>Django Auth</li>
                </ul>
              </div>
              <div className="p-4 bg-slate-800 dark:bg-slate-700 rounded-lg">
                <h3 className="font-semibold text-blue-300 mb-3">Security Standards</h3>
                <ul className="text-sm space-y-2 text-gray-300">
                  <li>JWT tokens</li>
                  <li>SAML 2.0</li>
                  <li>OAuth 2.0</li>
                  <li>WebAuthn/FIDO2</li>
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
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Implementation Process</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="flex items-center justify-center min-w-fit w-12 h-12 rounded-full bg-blue-600 text-white font-bold">1</span>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Requirement Analysis</h3>
                  <p className="text-slate-600 dark:text-gray-300">Assess your security needs and user experience requirements</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center justify-center min-w-fit w-12 h-12 rounded-full bg-blue-600 text-white font-bold">2</span>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Architecture Design</h3>
                  <p className="text-slate-600 dark:text-gray-300">Design scalable and secure authentication architecture</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center justify-center min-w-fit w-12 h-12 rounded-full bg-blue-600 text-white font-bold">3</span>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Implementation & Integration</h3>
                  <p className="text-slate-600 dark:text-gray-300">Build and integrate with your existing systems</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center justify-center min-w-fit w-12 h-12 rounded-full bg-blue-600 text-white font-bold">4</span>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-2">Testing & Deployment</h3>
                  <p className="text-slate-600 dark:text-gray-300">Comprehensive testing and secure rollout</p>
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
            <h2 className="text-3xl font-bold mb-4">Secure Your Application Today</h2>
            <p className="text-lg mb-8 opacity-90">
              Implement enterprise-grade authentication systems
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

export default AuthenticationSystems;

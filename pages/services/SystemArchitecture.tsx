import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollProgress from '../../components/ScrollProgress';

const SystemArchitecture: React.FC = () => {
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
              src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2"
              alt="System Architecture"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl mb-8"
            />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
              System Architecture Design
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 leading-relaxed">
              Architecting resilient, scalable systems with security built in from the ground up. We design systems that grow with your business while maintaining performance and protection.
            </p>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Architectural Services</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Design Services</h3>
                <p className="text-slate-600 dark:text-gray-300 mb-4">
                  Create comprehensive system designs that balance functionality, security, and scalability.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Microservices architecture</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Cloud-native design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">API design and integration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Database architecture</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Infrastructure & DevOps</h3>
                <p className="text-slate-600 dark:text-gray-300 mb-4">
                  Build robust infrastructure with security and reliability as core principles.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Kubernetes orchestration</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">CI/CD pipeline design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Infrastructure as Code</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Disaster recovery planning</span>
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
            <h2 className="text-3xl font-bold mb-8">Our Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Cloud Platforms</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>AWS (EC2, RDS, Lambda, ECS, EKS)</li>
                  <li>Google Cloud Platform (GCP)</li>
                  <li>Microsoft Azure</li>
                  <li>Multi-cloud strategies</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-4">Technologies</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Kubernetes & Docker</li>
                  <li>PostgreSQL, MongoDB, Redis</li>
                  <li>Message queues (RabbitMQ, Kafka)</li>
                  <li>Load balancing, caching</li>
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
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Security-First Approach</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">Network Security</h3>
                <ul className="space-y-2 text-slate-700 dark:text-gray-300">
                  <li>VPC design and segmentation</li>
                  <li>WAF and DDoS protection</li>
                  <li>Network encryption</li>
                  <li>Zero-trust architecture</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-3">Data Protection</h3>
                <ul className="space-y-2 text-slate-700 dark:text-gray-300">
                  <li>End-to-end encryption</li>
                  <li>Data classification & retention</li>
                  <li>Backup & recovery strategies</li>
                  <li>Secrets management</li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center p-12 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 rounded-2xl text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Build Your Secure Foundation</h2>
            <p className="text-lg mb-8 opacity-90">
              Let's design an architecture that scales securely with your business
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Schedule Architecture Consultation
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default SystemArchitecture;

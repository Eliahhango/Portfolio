import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ScrollProgress from '../../components/ScrollProgress';

const WebDevelopment: React.FC = () => {
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
              src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2"
              alt="Web Development"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl mb-8"
            />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
              Full-Stack Web Development
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 leading-relaxed">
              Modern web solutions built with cutting-edge technologies. From responsive frontends to scalable backends, we create web applications that drive business growth.
            </p>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Our Development Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Frontend Development</h3>
                <p className="text-slate-600 dark:text-gray-300 mb-4">
                  Create stunning, responsive user interfaces that engage users and drive conversions using modern frameworks.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">React & React Native applications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">TypeScript for type-safe code</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Tailwind CSS & custom styling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Progressive Web Apps (PWA)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-3">Backend Development</h3>
                <p className="text-slate-600 dark:text-gray-300 mb-4">
                  Robust server-side solutions that handle complex business logic and scale to millions of users.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Node.js & Express servers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">RESTful & GraphQL APIs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Database design & optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">✓</span>
                    <span className="text-slate-700 dark:text-gray-300">Real-time features with WebSockets</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Our Development Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: 1, title: 'Discovery', description: 'Understand your business goals and user needs' },
                { step: 2, title: 'Design', description: 'Create wireframes and design mockups' },
                { step: 3, title: 'Development', description: 'Build robust and scalable solutions' },
                { step: 4, title: 'Deployment', description: 'Launch and monitor performance' }
              ].map((item) => (
                <motion.div
                  key={item.step}
                  whileHover={{ translateY: -8 }}
                  className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl border border-blue-200 dark:border-blue-700"
                >
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3">{item.step}</div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-gray-300 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 p-8 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl"
          >
            <h2 className="text-3xl font-bold mb-8">Technologies We Use</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { cat: 'Frontend', techs: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion'] },
                { cat: 'Backend', techs: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'MongoDB'] },
                { cat: 'DevOps', techs: ['Docker', 'AWS', 'GitHub Actions', 'Vercel', 'Netlify'] }
              ].map((group) => (
                <div key={group.cat} className="p-6 bg-slate-700/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4 text-blue-400">{group.cat}</h3>
                  <div className="space-y-2">
                    {group.techs.map((tech) => (
                      <div key={tech} className="flex items-center gap-2">
                        <span className="text-blue-400">●</span>
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center p-12 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 rounded-2xl text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Web Application?</h2>
            <p className="text-lg mb-8 opacity-90">
              Let's discuss your project requirements and how we can help
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Schedule Consultation
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default WebDevelopment;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';

const Services: React.FC = () => {
  const services = [
    {
      id: 1,
      title: 'Web Development',
      description: 'Build modern, responsive web applications with cutting-edge technologies. We create secure, scalable solutions that position your business for growth.',
      icon: 'WEB',
      path: '/services/web-development',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2'
    },
    {
      id: 2,
      title: 'Security Consulting',
      description: 'Strategic guidance to build a comprehensive security program. We help you navigate regulatory requirements and protect your digital assets.',
      icon: 'SEC',
      path: '/services/security-consulting',
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2'
    },
    {
      id: 3,
      title: 'Penetration Testing',
      description: 'Comprehensive security assessment through controlled attacks. Identify vulnerabilities before real threats can exploit them.',
      icon: 'PEN',
      path: '/services/penetration-testing',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2'
    },
    {
      id: 4,
      title: 'Authentication Systems',
      description: 'Secure, scalable authentication solutions with modern standards. Implement OAuth, MFA, and passwordless authentication systems.',
      icon: 'AUTH',
      path: '/services/authentication-systems',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2'
    },
    {
      id: 5,
      title: 'System Architecture',
      description: 'Design resilient, scalable systems with security built in. From microservices to cloud-native solutions, we architect for growth.',
      icon: 'ARCH',
      path: '/services/system-architecture',
      image: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2'
    },
    {
      id: 6,
      title: 'Code Auditing',
      description: 'Comprehensive code reviews identifying vulnerabilities and improving quality. Ensure your code meets industry best practices.',
      icon: 'CODE',
      path: '/services/code-auditing',
      image: 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=2'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
              Professional Services
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions built on security, scalability, and excellence. From development to deployment, we deliver services that drive results.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className="group"
              >
                <Link to={service.path}>
                  <div className="h-full bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-slate-200 dark:border-slate-700">
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-900 dark:to-blue-700">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-bold text-sm">
                          {service.icon}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      
                      <p className="text-slate-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-2 transition-all duration-300">
                        <span>Learn More</span>
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-20 p-12 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 rounded-2xl text-white"
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Custom Solutions</h2>
              <p className="text-lg opacity-90 mb-6">
                Don't see exactly what you need? We create custom solutions tailored to your unique business requirements and technical challenges.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Discuss Your Project
              </motion.button>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16 p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Why Choose Us</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">15+</div>
                <p className="text-slate-600 dark:text-gray-300">Years of Experience</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">500+</div>
                <p className="text-slate-600 dark:text-gray-300">Successful Projects</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
                <p className="text-slate-600 dark:text-gray-300">Client Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">24/7</div>
                <p className="text-slate-600 dark:text-gray-300">Support Available</p>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Services;

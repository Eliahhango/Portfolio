import React from 'react';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 sm:py-16 md:py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Page Header */}
          <motion.div variants={itemVariants} className="text-center space-y-3 sm:space-y-4 pt-4 sm:pt-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
              About Me
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-300">
              Cybersecurity specialist and full-stack developer
            </p>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-slate-700 dark:text-gray-300 leading-relaxed">
              I'm a passionate cybersecurity specialist and full-stack developer with over 10 years of experience in the industry. My journey has been defined by a commitment to building secure, scalable, and user-centric solutions.
            </p>
            
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
              My Story
            </h2>
            <p className="text-lg text-slate-700 dark:text-gray-300 leading-relaxed">
              Starting as a curious developer interested in security, I've evolved into a full-stack engineer specializing in delivering enterprise-grade solutions. My passion for cybersecurity led me to pursue advanced certifications and hands-on penetration testing experience.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
              What I Do
            </h2>
            <ul className="space-y-4 text-lg text-slate-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
                <span>Design and implement secure authentication systems</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
                <span>Conduct security audits and penetration testing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
                <span>Build scalable full-stack web applications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
                <span>Mentor junior developers and security professionals</span>
              </li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
              Life Beyond Code
            </h2>
            <p className="text-lg text-slate-700 dark:text-gray-300 leading-relaxed">
              When I'm not working on security vulnerabilities or building applications, you'll find me contributing to open-source projects, writing technical articles, and speaking at industry conferences. I'm also an avid learner who stays current with emerging security threats and technologies.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPage;

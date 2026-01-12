import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import { GithubIcon, YoutubeIcon, MailIcon } from '../constants';
import { ArrowLeft } from 'lucide-react';

const Community: React.FC = () => {
  const communityLinks = [
    {
      name: 'GitHub',
      description: 'Explore open-source security tools, development projects, and contribute to cybersecurity initiatives',
      icon: GithubIcon,
      href: 'https://github.com/Eliahhango',
      color: 'bg-slate-800 hover:bg-slate-900'
    },
    {
      name: 'YouTube',
      description: 'Watch cybersecurity tutorials, penetration testing walkthroughs, and software development content',
      icon: YoutubeIcon,
      href: 'https://youtube.com/@eliahhango',
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      name: 'Email Newsletter',
      description: 'Stay updated with security advisories, project updates, and industry insights',
      icon: MailIcon,
      href: '#newsletter',
      color: 'bg-blue-600 hover:bg-blue-700'
    }
  ];

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
        title="Join Our Community | EliTechWiz"
        description="Connect with cybersecurity professionals, developers, and technology enthusiasts. Share knowledge and collaborate on projects."
        url="https://www.elitechwiz.site/community"
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Join Our Community</h1>
            <p className="text-slate-600 dark:text-gray-300 mb-4">
              Connect with cybersecurity professionals, developers, and technology enthusiasts. Share knowledge, collaborate on projects, and stay updated with the latest in security and technology.
            </p>
          </motion.div>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Connect With Us</h2>
            <div className="space-y-4">
              {communityLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith('#') ? undefined : '_blank'}
                  rel={link.href.startsWith('#') ? undefined : 'noopener noreferrer'}
                  className={`flex items-center gap-4 p-4 ${link.color} text-white rounded-lg transition-all transform hover:scale-105 shadow-lg`}
                >
                  <link.icon className="w-8 h-8 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{link.name}</h3>
                    <p className="text-sm text-white/90">{link.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.section>

          <motion.section variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Get Involved</h2>
            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-300 space-y-2">
              <li>Contribute to open-source security tools and development projects</li>
              <li>Share your own security research and findings (responsibly)</li>
              <li>Participate in discussions about cybersecurity and technology</li>
              <li>Subscribe to our newsletter for security advisories and updates</li>
              <li>Watch and subscribe to our YouTube channel for tutorials</li>
              <li>Engage with content and share your expertise</li>
            </ul>
          </motion.section>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;

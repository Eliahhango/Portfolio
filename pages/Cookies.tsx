import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import { ArrowLeft } from 'lucide-react';

interface CookiePreferences {
  necessary: boolean;
  performance: boolean;
  functional: boolean;
  analytics: boolean;
}

const Cookies: React.FC = () => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    performance: false,
    functional: false,
    analytics: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem('cookiePreferences');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences({ ...preferences, ...parsed });
      } catch (e) {
        console.error('Error parsing cookie preferences:', e);
      }
    }
  }, []);

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return;
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    alert('Cookie preferences saved successfully!');
  };

  const cookieTypes = [
    {
      key: 'necessary' as keyof CookiePreferences,
      title: 'Strictly Necessary Cookies',
      description: 'These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.',
      required: true,
    },
    {
      key: 'performance' as keyof CookiePreferences,
      title: 'Performance Cookies',
      description: 'These cookies collect information about how you use our website, such as which pages you visit most often. This data helps us optimize our website performance.',
      required: false,
    },
    {
      key: 'functional' as keyof CookiePreferences,
      title: 'Functional Cookies',
      description: 'These cookies allow the website to remember choices you have made in the past, such as your preferred language, region, or username.',
      required: false,
    },
    {
      key: 'analytics' as keyof CookiePreferences,
      title: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      required: false,
    },
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
        title="Cookie Policy | EliTechWiz"
        description="Manage your cookie preferences and learn how we use cookies to enhance your browsing experience."
        url="https://www.elitechwiz.site/cookies"
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900 dark:text-white">Cookie Preferences</h1>
            <p className="text-slate-600 dark:text-gray-300 mb-4">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences below.
            </p>
          </motion.div>

          <motion.section variants={itemVariants} className="mb-8">
            <div className="space-y-4">
              {cookieTypes.map((cookie) => (
                <div
                  key={cookie.key}
                  className={`p-4 rounded-lg border ${
                    cookie.required
                      ? 'bg-slate-50 dark:bg-slate-700/30 border-slate-200 dark:border-slate-600'
                      : 'bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-600'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-gray-200">
                          {cookie.title}
                        </h3>
                        {cookie.required && (
                          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-gray-300">
                        {cookie.description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences[cookie.key]}
                        onChange={() => handleToggle(cookie.key)}
                        disabled={cookie.required}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600 peer-disabled:opacity-50"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.div variants={itemVariants} className="flex gap-4 justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Preferences
            </button>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Cookies;

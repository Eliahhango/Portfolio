
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <AlertTriangle className="w-24 h-24 text-blue-500 mx-auto mb-6" />
        <h1 className="text-6xl md:text-8xl font-bold text-blue-500 dark:text-blue-400">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-4 mb-2">Page Not Found</h2>
        <p className="text-slate-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-colors duration-300 shadow-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            <span>Go Back to Home</span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;

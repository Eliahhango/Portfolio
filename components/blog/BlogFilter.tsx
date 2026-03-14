import React from 'react';
import { motion } from 'framer-motion';

interface BlogFilterProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const BlogFilter: React.FC<BlogFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
      className="flex flex-wrap items-center gap-3"
    >
      {/* All Categories Button */}
      <motion.button
        variants={categoryVariants}
        onClick={() => onCategoryChange(null)}
        className={`px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 border ${
          activeCategory === null
            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
            : 'text-slate-600 border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        All
      </motion.button>

      {/* Category Buttons */}
      {categories.map((category, index) => (
        <motion.button
          key={category}
          variants={categoryVariants}
          custom={index}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-lg font-medium text-sm transition-all duration-300 border ${
            activeCategory === category
              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
              : 'text-slate-600 border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category}
          <motion.span
            className="inline-block ml-2 text-xs"
            animate={{ opacity: activeCategory === category ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            •
          </motion.span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default BlogFilter;

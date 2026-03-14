import React from 'react';
import { motion } from 'framer-motion';

const BlogHero: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 pt-32 pb-20 border-b border-slate-200">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, 0.05) 25%, rgba(0, 0, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.05) 75%, rgba(0, 0, 0, 0.05) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, 0.05) 25%, rgba(0, 0, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.05) 75%, rgba(0, 0, 0, 0.05) 76%, transparent 77%, transparent)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Subtle gradient glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Accent lines */}
        <motion.div
          className="absolute top-20 right-20 w-px h-32 bg-gradient-to-b from-blue-400/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-32 h-px bg-gradient-to-r from-cyan-400/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.6, duration: 1 }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Breadcrumb */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-8">
            <span className="text-sm text-slate-600 font-medium">Home</span>
            <span className="text-slate-400">→</span>
            <span className="text-sm text-blue-600 font-medium">Blog</span>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight">
              Insights &<br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-cyan-500 bg-clip-text text-transparent">
                Innovation
              </span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed"
          >
            Deep dives into cybersecurity, software architecture, and digital transformation. Practical insights from the frontlines of modern technology.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="mt-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 transform"
            >
              Explore Articles
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats Line */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
          className="mt-16 pt-8 border-t border-slate-200 flex flex-col sm:flex-row gap-8"
        >
          <motion.div variants={itemVariants}>
            <div className="text-3xl font-bold text-slate-900">50+</div>
            <p className="text-sm text-slate-500 mt-1">Articles Published</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className="text-3xl font-bold text-slate-900">12</div>
            <p className="text-sm text-slate-500 mt-1">Topics Covered</p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <div className="text-3xl font-bold text-slate-900">Weekly</div>
            <p className="text-sm text-slate-500 mt-1">New Updates</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogHero;

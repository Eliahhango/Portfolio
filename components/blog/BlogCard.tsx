import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime?: string;
  index?: number;
}

const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  title,
  excerpt,
  image,
  category,
  date,
  readTime = '5 min read',
  index = 0,
}) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.1,
      },
    },
  };

  const imageVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.04,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
  };

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Category color map (cybersecurity/tech themed)
  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    'Cybersecurity': { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
    'Software Development': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
    'Architecture': { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-200' },
    'DevOps': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
    'Cloud': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
    'Performance': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  };

  const colors = categoryColors[category] || {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group h-full flex flex-col overflow-hidden rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Image Container */}
      <motion.div
        className="relative overflow-hidden h-56 bg-slate-100"
        initial="rest"
        whileHover="hover"
        variants={imageVariants}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Overlay gradient on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />

        {/* Category badge */}
        <motion.div
          className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${colors.text} ${colors.bg} border ${colors.border}`}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: (index || 0) * 0.1 + 0.3 }}
        >
          {category}
        </motion.div>
      </motion.div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-6">
        {/* Date and Read Time */}
        <div className="flex items-center justify-between mb-4">
          <time className="text-xs text-slate-500 font-medium">{formattedDate}</time>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-500">{readTime}</span>
        </div>

        {/* Title */}
        <Link to={`/blog/${slug}`} className="block mb-3">
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 flex-grow mb-4">
          {excerpt}
        </p>

        {/* Read More Link */}
        <Link
          to={`/blog/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 group/link transition-colors duration-300"
        >
          Read Article
        </Link>
      </div>
    </motion.article>
  );
};

export default BlogCard;

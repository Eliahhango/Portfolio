import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description?: string;
  excerpt?: string;
  image: string;
  categories?: string[];
  tags?: string[];
  createdAt?: string;
  cover?: string;
}

interface BlogGridProps {
  posts: BlogPost[];
  loading?: boolean;
  children?: ReactNode;
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts, loading = false }) => {
  // Map API format to component format
  const normalizedPosts = posts.map((post, index) => ({
    id: post.id || post.slug,
    slug: post.slug,
    title: post.title,
    excerpt: post.description || post.excerpt || 'Discover insights on technology, security, and innovation.',
    image: post.cover || post.image || 'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: post.categories?.[0] || post.tags?.[0] || 'Technology',
    date: post.createdAt || new Date().toISOString(),
    readTime: '5 min read',
    index,
  }));

  return (
    <div className="py-12">
      {/* Grid Container */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-56 bg-slate-200 rounded-xl mb-4" />
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-3" />
              <div className="h-6 bg-slate-200 rounded w-full mb-2" />
              <div className="h-4 bg-slate-200 rounded w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {normalizedPosts.map((post) => (
            <BlogCard
              key={post.id}
              id={post.id}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              image={post.image}
              category={post.category}
              date={post.date}
              readTime={post.readTime}
              index={post.index}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && posts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <svg
              className="w-16 h-16 text-slate-400 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v.756a3 3 0 01.822 5.946l-.989.989a3 3 0 01-4.247 0l-.989-.989A3 3 0 0111.244 6H9m12-8v8m0 0l-3-3m3 3l3-3"
              />
            </svg>
          </motion.div>
          <p className="text-lg text-slate-600 font-medium">No articles found</p>
          <p className="text-slate-500 mt-2">Try adjusting your filters or check back soon</p>
        </motion.div>
      )}
    </div>
  );
};

export default BlogGrid;

import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase.js';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { logError } from '../utils/errorHandler.js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BlogHero from '../components/blog/BlogHero';
import BlogFilter from '../components/blog/BlogFilter';
import BlogGrid from '../components/blog/BlogGrid';
import PaginationControl from '../components/blog/PaginationControl';
import NewsletterCTA from '../components/blog/NewsletterCTA';

type ApiPost = { id: string; title: string; slug: string; description?: string; tags?: string[]; createdAt?: string; cover?: string };

const POSTS_PER_PAGE = 6;

const Blog: React.FC = () => {
  const [list, setList] = useState<ApiPost[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(
          collection(db, 'posts'),
          where('published', '==', true),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(postsQuery);
        const posts: ApiPost[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title || 'Untitled',
          slug: doc.data().slug || doc.id,
          description: doc.data().description || '',
          tags: doc.data().tags || [],
          createdAt: doc.data().createdAt?.toDate?.().toISOString() || new Date().toISOString(),
          cover: doc.data().cover || 'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?auto=compress&cs=tinysrgb&w=800',
        }));
        setList(posts);
        setLoaded(true);
      } catch (error) {
        logError('Blog.fetchPosts', error);
        // Show empty state gracefully on error
        setList([]);
        setLoaded(true);
      }
    };
    fetchPosts();
  }, []);

  // Get unique categories from posts
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    list.forEach((post) => {
      if (post.tags?.length) {
        post.tags.forEach((tag) => {
          categories.add(tag);
        });
      }
    });
    return Array.from(categories).slice(0, 6); // Limit to 6 categories
  }, [list]);

  // Filter posts based on active category
  const filteredPosts = useMemo(() => {
    if (!activeCategory) return list;
    return list.filter((post) => post.tags?.includes(activeCategory));
  }, [activeCategory, list]);

  // Paginate filtered posts
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const rawPaginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Transform ApiPost to BlogPost format
  const paginatedPosts = rawPaginatedPosts.map((post) => ({
    id: post.id || Math.random().toString(),
    slug: post.slug || post.id || '',
    title: post.title || 'Untitled',
    excerpt: post.description || 'No description available',
    image: post.cover || 'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: post.tags?.[0] || 'Technology',
    date: post.createdAt || new Date().toISOString(),
    readTime: '5 min read',
  }));

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-24">
        {/* Hero Section */}
        <BlogHero />

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          {/* Filter Section */}
          {allCategories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">Filter by Category</p>
              </motion.div>
              <BlogFilter
                categories={allCategories}
                activeCategory={activeCategory}
                onCategoryChange={handleCategoryChange}
              />
            </motion.div>
          )}

          {/* Blog Grid */}
          {paginatedPosts.length > 0 ? (
            <>
              <BlogGrid posts={paginatedPosts} loading={!loaded} />

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  className="mt-20"
                >
                  <PaginationControl
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-20"
            >
              <motion.p
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-lg text-slate-600 font-medium"
              >
                {loaded ? 'No articles found in this category.' : 'Loading articles...'}
              </motion.p>
            </motion.div>
          )}
        </div>

        {/* Newsletter CTA Section */}
        <NewsletterCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Blog;



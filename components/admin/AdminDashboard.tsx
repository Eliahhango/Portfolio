import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, Zap, Users, BarChart3, FileText, Settings, Activity, Home, AlertCircle } from 'lucide-react';
import { db, auth } from '../../firebase.js';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, Timestamp, query, orderBy } from 'firebase/firestore';
import { logPostCreated, logPostPublished, logContentDeleted } from '../../utils/activityLogger.js';

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description?: string;
  excerpt?: string;
  image?: string;
  categories?: string[];
  tags?: string[];
  createdAt?: any;
  updatedAt?: any;
  cover?: string;
  content?: string;
  author?: string;
  featured?: boolean;
  published?: boolean;
}

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    body: '',
    tags: '',
    coverImage: '',
    published: false,
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(postsQuery);
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as BlogPost[];
      setPosts(postsData);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      setError('Title and slug are required');
      return;
    }

    try {
      const newPost = {
        title: formData.title,
        slug: formData.slug,
        description: formData.body,
        categories: formData.category ? [formData.category] : [],
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
        cover: formData.coverImage,
        published: formData.published,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        author: auth.currentUser?.email || 'admin',
      };

      const docRef = await addDoc(collection(db, 'posts'), newPost);
      const createdPost = { id: docRef.id, ...newPost } as BlogPost;
      setPosts([createdPost, ...posts]);

      await logPostCreated(createdPost.title);
      if (formData.published) {
        await logPostPublished(createdPost.title);
      }

      setFormData({
        title: '',
        slug: '',
        category: '',
        body: '',
        tags: '',
        coverImage: '',
        published: false,
      });
      setShowNewPostModal(false);
      setError(null);
    } catch (err) {
      console.error('Error creating post:', err);
      setError('Failed to create post');
    }
  };

  const handleDeletePost = async (postId: string, title: string) => {
    if (confirm(`Delete "${title}"?`)) {
      try {
        await deleteDoc(doc(db, 'posts', postId));
        setPosts(posts.filter(p => p.id !== postId));
        await logContentDeleted(title);
      } catch (err) {
        console.error('Error deleting post:', err);
        setError('Failed to delete post');
      }
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const newPublishedState = !post.published;
      await updateDoc(doc(db, 'posts', post.id), {
        published: newPublishedState,
        updatedAt: Timestamp.now(),
      });

      setPosts(posts.map(p => 
        p.id === post.id ? { ...p, published: newPublishedState, updatedAt: Timestamp.now() } : p
      ));

      if (newPublishedState) {
        await logPostPublished(post.title);
      }
    } catch (err) {
      console.error('Error updating post:', err);
      setError('Failed to update post');
    }
  };

  const quickActions = [
    { title: 'Edit Hero Text', icon: Home, color: 'from-blue-500 to-blue-600', action: () => onNavigate('content') },
    { title: 'Manage Users', icon: Users, color: 'from-purple-500 to-purple-600', action: () => onNavigate('users') },
    { title: 'Manage Content', icon: FileText, color: 'from-green-500 to-green-600', action: () => onNavigate('content') },
    { title: 'View Analytics', icon: BarChart3, color: 'from-orange-500 to-orange-600', action: () => onNavigate('analytics') },
    { title: 'Activity Log', icon: Activity, color: 'from-red-500 to-red-600', action: () => onNavigate('activities') },
    { title: 'Settings', icon: Settings, color: 'from-indigo-500 to-indigo-600', action: () => onNavigate('settings') },
  ];

  const contentShortcuts = [
    { title: 'Hero Section', icon: Home, action: () => onNavigate('content') },
    { title: 'About Bio', icon: FileText, action: () => onNavigate('content') },
    { title: 'Skills', icon: Zap, action: () => onNavigate('content') },
    { title: 'Projects', icon: BarChart3, action: () => onNavigate('content') },
    { title: 'Testimonials', icon: Users, action: () => onNavigate('content') },
    { title: 'Contact Info', icon: Settings, action: () => onNavigate('content') },
  ];

  const recentPosts = posts.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Content Command Center</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your site content, posts, and settings from here.</p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg p-4 flex items-Start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Quick Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={action.action}
                className={`group relative overflow-hidden rounded-lg p-4 bg-gradient-to-br ${action.color} hover:shadow-lg transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                <div className="relative text-white text-center">
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">{action.title}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Blog Posts Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Blog Posts</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewPostModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Post
          </motion.button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">No posts yet. Create one to get started!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300">Date</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {posts.map((post, i) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{post.title}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        post.published 
                          ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                      {post.createdAt?.toDate?.().toLocaleDateString?.() || 'N/A'}
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTogglePublish(post)}
                        className="inline-flex items-center gap-1 p-2 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded transition-colors"
                        title={post.published ? 'Unpublish' : 'Publish'}
                      >
                        {post.published ? (
                          <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="inline-flex items-center gap-1 p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Site Content Shortcuts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Site Content Shortcuts</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {contentShortcuts.map((shortcut, i) => {
              const Icon = shortcut.icon;
              return (
                <motion.button
                  key={shortcut.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  onClick={shortcut.action}
                  className="flex flex-col items-center gap-3 p-4 bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-lg hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-md transition-all"
                >
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white text-center">{shortcut.title}</span>
                  <span className="text-xs text-blue-600 dark:text-blue-400">Edit</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Recent Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-xl p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Posts</h2>
          <div className="space-y-3">
            {recentPosts.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">No posts yet</p>
            ) : (
              recentPosts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="p-3 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700"
                >
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{post.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className={`text-xs px-2 py-1 rounded ${
                      post.published
                        ? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {post.createdAt?.toDate?.().toLocaleDateString?.() || 'N/A'}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewPostModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Create New Post</h3>
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddPost} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white outline-none focus:border-blue-500"
                    placeholder="Post title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white outline-none focus:border-blue-500"
                    placeholder="post-slug"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white outline-none focus:border-blue-500"
                      placeholder="Category"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.published}
                        onChange={e => setFormData({ ...formData, published: e.target.checked })}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Publish</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cover Image URL</label>
                  <input
                    type="text"
                    value={formData.coverImage}
                    onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white outline-none focus:border-blue-500"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
                  <textarea
                    value={formData.body}
                    onChange={e => setFormData({ ...formData, body: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white outline-none focus:border-blue-500 h-32 resize-none"
                    placeholder="Post content..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white outline-none focus:border-blue-500"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
                  >
                    Create Post
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewPostModal(false)}
                    className="flex-1 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white font-medium py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminDashboard;

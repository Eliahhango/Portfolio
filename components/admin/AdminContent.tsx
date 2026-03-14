import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, Search, Plus, Eye, Calendar, X } from 'lucide-react';
import { db } from '../../firebase.js';
import { collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { logPostCreated, logPostPublished, logContentDeleted } from '../../utils/activityLogger';
import { auth } from '../../firebase.js';

interface ContentItem {
  id: string;
  title: string;
  type: string;
  status: string;
  author: string;
  views: number;
  publishedDate: string;
}

interface AddContentForm {
  title: string;
  type: string;
  author: string;
  published: boolean;
}

const AdminContent: React.FC = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState<AddContentForm>({ title: '', type: 'Article', author: '', published: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const contentList: ContentItem[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title || 'Untitled',
        type: doc.data().type || 'Post',
        status: doc.data().published ? 'Published' : 'Draft',
        author: doc.data().author || 'Unknown',
        views: doc.data().views || 0,
        publishedDate: doc.data().publishedDate
          ? new Date(doc.data().publishedDate).toLocaleDateString()
          : 'N/A',
      }));
      setContents(contentList);
    } catch (error) {
      console.error('Error fetching content:', error);
      setError('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleAddContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!formData.title || !formData.author) {
        setError('Title and author are required');
        setIsSubmitting(false);
        return;
      }

      const contentId = `post_${Date.now()}`;
      const publishedDate = formData.published ? new Date().toLocaleDateString() : 'N/A';
      
      await setDoc(doc(db, 'posts', contentId), {
        title: formData.title,
        type: formData.type,
        author: formData.author,
        published: formData.published,
        publishedDate: publishedDate,
        views: 0,
        createdAt: new Date(),
      });

      // Log activity
      await logPostCreated(auth.currentUser?.email || 'Admin', formData.title, contentId);
      
      if (formData.published) {
        await logPostPublished(auth.currentUser?.email || 'Admin', formData.title, contentId);
      }

      // Add to local state
      setContents([
        ...contents,
        {
          id: contentId,
          title: formData.title,
          type: formData.type,
          status: formData.published ? 'Published' : 'Draft',
          author: formData.author,
          views: 0,
          publishedDate: publishedDate,
        },
      ]);

      // Reset form
      setFormData({ title: '', type: 'Article', author: '', published: false });
      setShowAddModal(false);
    } catch (error: any) {
      console.error('Error adding content:', error);
      setError(error.message || 'Failed to add content');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    const content = contents.find((c) => c.id === contentId);
    if (window.confirm(`Are you sure you want to delete "${content?.title}"?`)) {
      try {
        await deleteDoc(doc(db, 'posts', contentId));
        
        // Log activity
        await logContentDeleted(auth.currentUser?.email || 'Admin', content?.title || 'Unknown', contentId);

        setContents(contents.filter((c) => c.id !== contentId));
      } catch (error) {
        console.error('Error deleting content:', error);
        setError('Failed to delete content');
      }
    }
  };

  const filteredContents = contents.filter(
    (content) =>
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all published content</p>
        </div>
        <motion.button
          onClick={() => setShowAddModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all"
        >
          <Plus className="w-5 h-5" />
          Create Content
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-50 dark:bg-slate-800/50 border border-gray-300 dark:border-slate-700 rounded-lg pl-12 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6">
        {loading ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">Loading content...</div>
        ) : filteredContents.length === 0 ? (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">No content found</div>
        ) : (
          filteredContents.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-xl p-4 hover:border-gray-300 dark:hover:border-slate-600 transition-all group shadow-sm dark:shadow-none"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-gray-900 dark:text-white font-bold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {content.title}
                    </h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        content.status === 'Published'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                      }`}
                    >
                      {content.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400 text-sm">
                    <span>{content.type}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {content.publishedDate}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {content.views} views
                    </div>
                    <span>By {content.author}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteContent(content.id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Content Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Content</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/50 rounded-lg text-red-700 dark:text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleAddContent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                    placeholder="Article Title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                    placeholder="Author Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Content Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-slate-700/50 border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="Article">Article</option>
                    <option value="Blog Post">Blog Post</option>
                    <option value="Case Study">Case Study</option>
                    <option value="Guide">Guide</option>
                  </select>
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 bg-gray-50 dark:border-slate-600 dark:bg-slate-700/50 cursor-pointer accent-blue-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Publish immediately</span>
                </label>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-slate-700 rounded-lg text-gray-900 dark:text-white font-medium hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 px-4 py-2.5 rounded-lg text-white font-medium transition-all ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-lg hover:shadow-blue-500/50'
                    }`}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Content'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminContent;

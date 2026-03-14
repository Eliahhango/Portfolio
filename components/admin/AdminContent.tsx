import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit2, Search, Plus, Eye, Calendar } from 'lucide-react';
import { db } from '../../firebase.js';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

interface ContentItem {
  id: string;
  title: string;
  type: string;
  status: string;
  author: string;
  views: number;
  publishedDate: string;
}

const AdminContent: React.FC = () => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        await deleteDoc(doc(db, 'posts', contentId));
        setContents(contents.filter((c) => c.id !== contentId));
      } catch (error) {
        console.error('Error deleting content:', error);
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
          <h1 className="text-3xl font-bold text-white">Content Management</h1>
          <p className="text-gray-400">Manage all published content</p>
        </div>
        <motion.button
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
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading content...</div>
        ) : filteredContents.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No content found</div>
        ) : (
          filteredContents.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">
                      {content.title}
                    </h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        content.status === 'Published'
                          ? 'bg-green-900/30 text-green-300'
                          : 'bg-yellow-900/30 text-yellow-300'
                      }`}
                    >
                      {content.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-gray-400 text-sm">
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
                    className="p-2 hover:bg-blue-900/30 rounded-lg text-blue-400 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteContent(content.id)}
                    className="p-2 hover:bg-red-900/30 rounded-lg text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default AdminContent;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Content {
  _id: string;
  key: string;
  value: string | object;
  type: 'text' | 'html' | 'json';
  section: string;
}

const ContentManager: React.FC = () => {
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingContent, setEditingContent] = useState<Content | null>(null);
  const [formData, setFormData] = useState({
    key: '',
    value: '',
    section: '',
    type: 'text' as 'text' | 'html' | 'json',
  });
  const [filterSection, setFilterSection] = useState('all');

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/content`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = `${apiUrl}/api/content`;
      const method = editingContent ? 'PUT' : 'POST';
      const endpoint = editingContent ? `${url}/${editingContent.key}` : url;

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(false);
        setEditingContent(null);
        resetForm();
        fetchContent();
      }
    } catch (error) {
      console.error('Failed to save content:', error);
    }
  };

  const handleDelete = async (key: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    try {
      await fetch(`${apiUrl}/api/content/${key}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchContent();
    } catch (error) {
      console.error('Failed to delete content:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      key: '',
      value: '',
      section: '',
      type: 'text',
    });
  };

  const openEditModal = (item: Content) => {
    setEditingContent(item);
    setFormData({
      key: item.key,
      value: typeof item.value === 'string' ? item.value : JSON.stringify(item.value, null, 2),
      section: item.section,
      type: item.type,
    });
    setShowModal(true);
  };

  const sections = Array.from(new Set(content.map((c) => c.section)));

  const filteredContent =
    filterSection === 'all'
      ? content
      : content.filter((c) => c.section === filterSection);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Content Management</h2>
        <button
          onClick={() => {
            resetForm();
            setEditingContent(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          + Add Content
        </button>
      </div>

      <div className="mb-4">
        <select
          value={filterSection}
          onChange={(e) => setFilterSection(e.target.value)}
          className="px-4 py-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
        >
          <option value="all">All Sections</option>
          {sections.map((section) => (
            <option key={section} value={section}>
              {section}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredContent.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow border border-slate-200 dark:border-gray-800"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.key}</h3>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                    {item.section}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                    {item.type}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.key)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-gray-900 p-4 rounded-lg">
              <p className="text-sm text-slate-700 dark:text-gray-300 line-clamp-3">
                {typeof item.value === 'string'
                  ? item.value
                  : JSON.stringify(item.value, null, 2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            >
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                {editingContent ? 'Edit Content' : 'Add New Content'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                    Key * (e.g., hero-title, about-text)
                  </label>
                  <input
                    type="text"
                    value={formData.key}
                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                    required
                    disabled={!!editingContent}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white disabled:opacity-50"
                    placeholder="hero-title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                    Section *
                  </label>
                  <input
                    type="text"
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
                    placeholder="hero"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
                  >
                    <option value="text">Text</option>
                    <option value="html">HTML</option>
                    <option value="json">JSON</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                    Value *
                  </label>
                  <textarea
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    required
                    rows={8}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white font-mono text-sm"
                    placeholder="Enter content value..."
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    {editingContent ? 'Update' : 'Create'} Content
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingContent(null);
                      resetForm();
                    }}
                    className="px-4 py-2 bg-slate-200 dark:bg-gray-700 text-slate-900 dark:text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContentManager;


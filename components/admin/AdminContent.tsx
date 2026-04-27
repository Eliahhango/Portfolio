import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Edit2, Search, Plus, Eye, EyeOff, Calendar, X, AlertCircle } from 'lucide-react';
import { db, auth } from '../../firebase.js';
import { collection, getDocs, deleteDoc, doc, setDoc, updateDoc, Timestamp, query, where } from 'firebase/firestore';
import { logPostCreated, logPostPublished, logContentDeleted } from '../../utils/activityLogger.js';
import { logError, getUserFriendlyError } from '../../utils/errorHandler.js';
import { BLOG_CATEGORIES } from '../../constants/blogData.js';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description?: string;
  categories?: string[];
  tags?: string[];
  cover?: string;
  published: boolean;
  createdAt?: any;
  updatedAt?: any;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  published: boolean;
  createdAt?: any;
  updatedAt?: any;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  image: string;
  order: number;
  published: boolean;
  createdAt?: any;
  updatedAt?: any;
}

type TabType = 'posts' | 'projects' | 'services';

const AdminContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [postForm, setPostForm] = useState({
    title: '',
    slug: '',
    category: '',
    excerpt: '',
    body: '',
    cover: '',
    tags: '',
    published: false,
  });

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    tags: '',
    image: '',
    liveUrl: '',
    githubUrl: '',
    published: false,
  });

  const [serviceForm, setServiceForm] = useState({
    title: '',
    description: '',
    icon: '',
    path: '',
    image: '',
    order: 0,
    published: false,
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchPosts(), fetchProjects(), fetchServices()]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'posts'));
      const data: BlogPost[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as BlogPost[];
      setPosts(data);
    } catch (err) {
      logError('AdminContent.fetchPosts', err);
    }
  };

  const fetchProjects = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'projects'));
      const data: Project[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];
      setProjects(data);
    } catch (err) {
      logError('AdminContent.fetchProjects', err);
    }
  };

  const fetchServices = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'services'));
      const data: Service[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Service[];
      setServices(data);
    } catch (err) {
      logError('AdminContent.fetchServices', err);
    }
  };

  // Blog Post Handlers
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.title || !postForm.slug) {
      setError('Title and slug are required');
      return;
    }

    try {
      const postData = {
        title: postForm.title,
        slug: postForm.slug,
        description: postForm.excerpt,
        categories: postForm.category ? [postForm.category] : [],
        tags: postForm.tags ? postForm.tags.split(',').map(t => t.trim()) : [],
        cover: postForm.cover,
        published: postForm.published,
        updatedAt: Timestamp.now(),
        ...(editingId ? {} : { createdAt: Timestamp.now() }),
      };

      if (editingId) {
        await updateDoc(doc(db, 'posts', editingId), postData);
        setPosts(posts.map(p => p.id === editingId ? { ...p, ...postData } : p));
      } else {
        const docRef = await setDoc(doc(db, 'posts', `post_${Date.now()}`), postData, { merge: false }).then(() => {
          fetchPosts();
        });
      }

      resetPostForm();
      setShowModal(false);
      setError(null);
    } catch (err: any) {
      logError('AdminContent.handleSavePost', err);
      setError(getUserFriendlyError(err));
    }
  };

  const handleDeletePost = async (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"?`)) {
      try {
        await deleteDoc(doc(db, 'posts', id));
        setPosts(posts.filter(p => p.id !== id));
        await logContentDeleted(title);
      } catch (err) {
        logError('AdminContent.handleDeletePost', err);
        setError('Failed to delete post. Please try again.');
      }
    }
  };

  const handleTogglePostPublish = async (post: BlogPost) => {
    try {
      await updateDoc(doc(db, 'posts', post.id), { published: !post.published, updatedAt: Timestamp.now() });
      setPosts(posts.map(p => p.id === post.id ? { ...p, published: !p.published } : p));
      if (!post.published) {
        await logPostPublished(post.title);
      }
    } catch (err) {
      logError('AdminContent.handleTogglePostPublish', err);
      setError('Failed to update post. Please try again.');
    }
  };

  const resetPostForm = () => {
    setPostForm({ title: '', slug: '', category: '', excerpt: '', body: '', cover: '', tags: '', published: false });
    setEditingId(null);
  };

  // Project Handlers
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) {
      setError('Title and description are required');
      return;
    }

    try {
      const projectData = {
        title: projectForm.title,
        description: projectForm.description,
        tags: projectForm.tags ? projectForm.tags.split(',').map(t => t.trim()) : [],
        image: projectForm.image,
        liveUrl: projectForm.liveUrl,
        githubUrl: projectForm.githubUrl,
        published: projectForm.published,
        updatedAt: Timestamp.now(),
        ...(editingId ? {} : { createdAt: Timestamp.now() }),
      };

      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), projectData);
        setProjects(projects.map(p => p.id === editingId ? { ...p, ...projectData } : p));
      } else {
        await setDoc(doc(db, 'projects', `proj_${Date.now()}`), projectData);
        fetchProjects();
      }

      resetProjectForm();
      setShowModal(false);
      setError(null);
    } catch (err: any) {
      logError('AdminContent.handleSaveProject', err);
      setError(getUserFriendlyError(err));
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"?`)) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        setProjects(projects.filter(p => p.id !== id));
       await logContentDeleted(title);
      } catch (err) {
        logError('AdminContent.handleDeleteProject', err);
        setError('Failed to delete project. Please try again.');
      }
    }
  };

  const handleToggleProjectPublish = async (project: Project) => {
    try {
      await updateDoc(doc(db, 'projects', project.id), { published: !project.published, updatedAt: Timestamp.now() });
      setProjects(projects.map(p => p.id === project.id ? { ...p, published: !p.published } : p));
    } catch (err) {
      logError('AdminContent.handleToggleProjectPublish', err);
      setError('Failed to update project. Please try again.');
    }
  };

  const resetProjectForm = () => {
    setProjectForm({ title: '', description: '', tags: '', image: '', liveUrl: '', githubUrl: '', published: false });
    setEditingId(null);
  };

  // Service Handlers
  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title || !serviceForm.description) {
      setError('Title and description are required');
      return;
    }

    try {
      const serviceData = {
        title: serviceForm.title,
        description: serviceForm.description,
        icon: serviceForm.icon,
        path: serviceForm.path,
        image: serviceForm.image,
        order: serviceForm.order,
        published: serviceForm.published,
        updatedAt: Timestamp.now(),
        ...(editingId ? {} : { createdAt: Timestamp.now() }),
      };

      if (editingId) {
        await updateDoc(doc(db, 'services', editingId), serviceData);
        setServices(services.map(s => s.id === editingId ? { ...s, ...serviceData } : s));
      } else {
        await setDoc(doc(db, 'services', `svc_${Date.now()}`), serviceData);
        fetchServices();
      }

      resetServiceForm();
      setShowModal(false);
      setError(null);
    } catch (err: any) {
      logError('AdminContent.handleSaveService', err);
      setError(getUserFriendlyError(err));
    }
  };

  const handleDeleteService = async (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"?`)) {
      try {
        await deleteDoc(doc(db, 'services', id));
        setServices(services.filter(s => s.id !== id));
        await logContentDeleted(title);
      } catch (err) {
        logError('AdminContent.handleDeleteService', err);
        setError('Failed to delete service. Please try again.');
      }
    }
  };

  const handleToggleServicePublish = async (service: Service) => {
    try {
      await updateDoc(doc(db, 'services', service.id), { published: !service.published, updatedAt: Timestamp.now() });
      setServices(services.map(s => s.id === service.id ? { ...s, published: !s.published } : s));
    } catch (err) {
      logError('AdminContent.handleToggleServicePublish', err);
      setError('Failed to update service. Please try again.');
    }
  };

  const resetServiceForm = () => {
    setServiceForm({ title: '', description: '', icon: '', path: '', image: '', order: 0, published: false });
    setEditingId(null);
  };

  // Filter and render items
  const getFilteredItems = () => {
    if (activeTab === 'posts') {
      return posts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    } else if (activeTab === 'projects') {
      return projects.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
      return services.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <h1 className="font-rajdhani text-3xl font-bold text-slate-900 dark:text-white mb-2">Content Management</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage blog posts, projects, and services</p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl p-4 flex items-center gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
          <p className="text-red-800 dark:text-red-300 text-sm">{error}</p>
        </motion.div>
      )}

      {/* Tabs - Pill style matching Header nav */}
      <div className="flex gap-2">
        {(['posts', 'projects', 'services'] as TabType[]).map(tab => (
          <motion.button
            key={tab}
            onClick={() => { setActiveTab(tab); setSearchQuery(''); }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === tab
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
          >
            {tab === 'posts' ? 'Blog Posts' : tab === 'projects' ? 'Projects' : 'Services'}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <motion.button
          onClick={() => {
            resetPostForm();
            resetProjectForm();
            resetServiceForm();
            setShowModal(true);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-rajdhani font-bold shadow-lg transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          New
        </motion.button>
      </div>

      {/* Items Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-600 dark:text-slate-400">
          <div className="animate-pulse">Loading...</div>
        </div>
      ) : getFilteredItems().length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <AlertCircle className="w-12 h-12 text-slate-400 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">No items found</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {getFilteredItems().map((item: any, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:border-blue-500/50 transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-rajdhani font-bold text-slate-900 dark:text-white truncate">{item.title}</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                      item.published
                        ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                        : 'bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                    }`}>
                      {item.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{item.description || item.excerpt || 'No description'}</p>
                  {item.createdAt && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-500">
                      <Calendar className="w-3 h-3" />
                      {item.createdAt?.toDate?.().toLocaleDateString?.() || 'N/A'}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (activeTab === 'posts') handleTogglePostPublish(item as BlogPost);
                      else if (activeTab === 'projects') handleToggleProjectPublish(item as Project);
                      else handleToggleServicePublish(item as Service);
                    }}
                    className="p-2 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors text-blue-600 dark:text-blue-400"
                  >
                    {item.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      if (activeTab === 'posts') handleDeletePost(item.id, item.title);
                      else if (activeTab === 'projects') handleDeleteProject(item.id, item.title);
                      else handleDeleteService(item.id, item.title);
                    }}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
                <h2 className="font-rajdhani text-xl font-bold text-slate-900 dark:text-white">
                  {activeTab === 'posts' ? 'New Blog Post' : activeTab === 'projects' ? 'New Project' : 'New Service'}
                </h2>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  onClick={() => setShowModal(false)}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <form onSubmit={activeTab === 'posts' ? handleSavePost : activeTab === 'projects' ? handleSaveProject : handleSaveService} className="p-6 space-y-4">
                {activeTab === 'posts' && (
                  <>
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Title</label>
                      <input type="text" value={postForm.title} onChange={(e) => setPostForm({...postForm, title: e.target.value})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="Post title" />
                    </div>
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Slug</label>
                      <input type="text" value={postForm.slug} onChange={(e) => setPostForm({...postForm, slug: e.target.value})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="post-slug" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Category</label>
                        <select value={postForm.category} onChange={(e) => setPostForm({...postForm, category: e.target.value})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all">
                          <option>Select category</option>
                          {BLOG_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="flex items-center gap-2 cursor-pointer pt-6">
                          <input type="checkbox" checked={postForm.published} onChange={(e) => setPostForm({...postForm, published: e.target.checked})} className="w-4 h-4 accent-blue-600 rounded" />
                          <span className="text-sm font-rajdhani font-bold text-slate-900 dark:text-white">Published</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Cover Image</label>
                      <input type="text" value={postForm.cover} onChange={(e) => setPostForm({...postForm, cover: e.target.value})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="https://..." />
                    </div>
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Excerpt</label>
                      <textarea value={postForm.excerpt} onChange={(e) => setPostForm({...postForm, excerpt: e.target.value})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all h-24 resize-none" placeholder="Brief description" />
                    </div>
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Tags (comma-separated)</label>
                      <input type="text" value={postForm.tags} onChange={(e) => setPostForm({...postForm, tags: e.target.value})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="tag1, tag2" />
                    </div>
                  </>
                )}

                {activeTab === 'projects' && (
                  <>
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Title</label>
                      <input type="text" value={projectForm.title} onChange={(e) => setProjectForm({...projectForm, title: e.target.value})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="Project title" />
                    </div>
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Description</label>
                      <textarea value={projectForm.description} onChange={(e) => setProjectForm({...projectForm, description: e.target.value})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all h-24 resize-none" placeholder="Project description" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Image URL</label>
                        <input type="text" value={projectForm.image} onChange={(e) => setProjectForm({...projectForm, image: e.target.value})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="https://..." />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 cursor-pointer pt-6">
                          <input type="checkbox" checked={projectForm.published} onChange={(e) => setProjectForm({...projectForm, published: e.target.checked})} className="w-4 h-4 accent-blue-600 rounded" />
                          <span className="text-sm font-rajdhani font-bold text-slate-900 dark:text-white">Published</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Live URL</label>
                      <input type="text" value={projectForm.liveUrl} onChange={(e) => setProjectForm({...projectForm, liveUrl: e.target.value})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="https://..." />
                    </div>
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">GitHub URL</label>
                      <input type="text" value={projectForm.githubUrl} onChange={(e) => setProjectForm({...projectForm, githubUrl: e.target.value})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="https://github.com/..." />
                    </div>
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Tags (comma-separated)</label>
                      <input type="text" value={projectForm.tags} onChange={(e) => setProjectForm({...projectForm, tags: e.target.value})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="React, Node.js" />
                    </div>
                  </>
                )}

                {activeTab === 'services' && (
                  <>
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Title</label>
                      <input type="text" value={serviceForm.title} onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="Service title" />
                    </div>
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Description</label>
                      <textarea value={serviceForm.description} onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all h-24 resize-none" placeholder="Service description" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Icon Code</label>
                        <input type="text" value={serviceForm.icon} onChange={(e) => setServiceForm({...serviceForm, icon: e.target.value})} maxLength={4} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="WEB" />
                      </div>
                      <div>
                        <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Order</label>
                        <input type="number" value={serviceForm.order} onChange={(e) => setServiceForm({...serviceForm, order: parseInt(e.target.value)})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Path</label>
                      <input type="text" value={serviceForm.path} onChange={(e) => setServiceForm({...serviceForm, path: e.target.value})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="/services/web-dev" />
                    </div>
                    <div>
                      <label className="block text-sm font-rajdhani font-bold text-slate-900 dark:text-white mb-2">Image URL</label>
                      <input type="text" value={serviceForm.image} onChange={(e) => setServiceForm({...serviceForm, image: e.target.value})} className="w-full px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all" placeholder="https://..." />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={serviceForm.published} onChange={(e) => setServiceForm({...serviceForm, published: e.target.checked})} className="w-4 h-4 accent-blue-600 rounded" />
                        <span className="text-sm font-rajdhani font-bold text-slate-900 dark:text-white">Published</span>
                      </label>
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-rajdhani font-bold shadow-lg transition-all"
                  >
                    Save
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowModal(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-6 py-3 bg-slate-200 dark:bg-slate-800/50 text-slate-900 dark:text-white rounded-xl font-rajdhani font-bold hover:bg-slate-300 dark:hover:bg-slate-700/50 transition-all"
                  >
                    Cancel
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

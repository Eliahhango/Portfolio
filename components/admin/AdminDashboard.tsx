import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Folder, FileText, Settings, ExternalLink, Edit2, TrendingUp } from 'lucide-react';
import { db } from '../../firebase.js';
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { logError } from '../../utils/errorHandler.js';

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedProjects: 0,
    activeServices: 0,
  });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [recentServices, setRecentServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch stats
      const postsSnap = await getDocs(collection(db, 'posts'));
      const projectsSnap = await getDocs(query(collection(db, 'projects'), where('published', '==', true)));
      const servicesSnap = await getDocs(query(collection(db, 'services'), where('published', '==', true)));

      // Fetch recent items
      const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(5));
      const projectsQuery = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(5));
      const servicesQuery = query(collection(db, 'services'));

      const [postsData, projectsData, servicesData] = await Promise.all([
        getDocs(postsQuery),
        getDocs(projectsQuery),
        getDocs(servicesQuery),
      ]);

      setStats({
        totalPosts: postsSnap.size,
        publishedProjects: projectsSnap.size,
        activeServices: servicesSnap.size,
      });

      setRecentPosts(postsData.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setRecentProjects(projectsData.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setRecentServices(servicesData.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    } catch (error) {
      logError('AdminDashboard.fetchData', error);
      setLoading(false);
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    try {
      return new Date(timestamp.toDate?.() || timestamp).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return 'N/A';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your site content and view analytics</p>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase text-xs tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'New blog\npost', icon: FileText, color: 'from-blue-500 to-blue-600', action: () => { onNavigate('content'); } },
            { label: 'New\nproject', icon: Folder, color: 'from-purple-500 to-purple-600', action: () => { onNavigate('content'); } },
            { label: 'New\nservice', icon: Settings, color: 'from-orange-500 to-orange-600', action: () => { onNavigate('content'); } },
            { label: 'View live\nsite', icon: ExternalLink, color: 'from-indigo-500 to-indigo-600', action: () => window.open('/', '_blank') },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={item.action}
                className={`group relative overflow-hidden rounded-lg bg-gradient-to-br ${item.color} p-6 text-white hover:shadow-xl transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                <div className="relative flex flex-col items-center justify-center gap-3 h-full min-h-32">
                  <Icon className="w-8 h-8" />
                  <p className="text-sm font-semibold text-center whitespace-pre-line leading-snug">{item.label}</p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          { label: 'Total blog posts', value: stats.totalPosts, change: '+5 this month', icon: FileText },
          { label: 'Published projects', value: stats.publishedProjects, change: '+1 this week', icon: Folder },
          { label: 'Active services', value: stats.activeServices, change: 'No change', icon: Settings },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{loading ? '-' : stat.value}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-100 dark:bg-slate-700">
                  <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">{stat.change}</p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Blog Posts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent blog posts</h3>
            <button
              onClick={() => onNavigate('content')}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
            >
              Manage all <span>→</span>
            </button>
          </div>
          <div className="space-y-3">
            {loading ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
            ) : recentPosts.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No posts yet</p>
            ) : (
              recentPosts.map(post => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start justify-between p-3 bg-gray-50 dark:bg-slate-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{post.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{formatDate(post.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                      post.published
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    <button className="p-1.5 hover:bg-gray-300 dark:hover:bg-slate-700 rounded transition-colors text-gray-600 dark:text-gray-400">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Recent Projects */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent projects</h3>
            <button
              onClick={() => onNavigate('content')}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
            >
              Manage all <span>→</span>
            </button>
          </div>
          <div className="space-y-3">
            {loading ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
            ) : recentProjects.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm">No projects yet</p>
            ) : (
              recentProjects.map(project => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start justify-between p-3 bg-gray-50 dark:bg-slate-900/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{project.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{formatDate(project.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                      project.published
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {project.published ? 'Live' : 'Draft'}
                    </span>
                    <button className="p-1.5 hover:bg-gray-300 dark:hover:bg-slate-700 rounded transition-colors text-gray-600 dark:text-gray-400">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Recent Services */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Active services</h3>
          <button
            onClick={() => onNavigate('content')}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
          >
            Manage all <span>→</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
          ) : recentServices.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No services yet</p>
          ) : (
            recentServices.map(service => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                    {service.icon || '∙'}
                  </div>
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                    service.published
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {service.published ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white text-sm">{service.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 line-clamp-2">{service.description}</p>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;

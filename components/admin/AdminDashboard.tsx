import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Folder, FileText, Settings, ExternalLink, Edit2, TrendingUp, Users, Activity, Globe } from 'lucide-react';
import { db } from '../../firebase.js';
import { collection, getDocs, query, orderBy, limit, where, Timestamp } from 'firebase/firestore';
import { logError } from '../../utils/errorHandler.js';

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedProjects: 0,
    activeServices: 0,
    totalVisitors: 0,
    weeklyVisitors: 0,
  });
  const [trafficSeries, setTrafficSeries] = useState<Array<{ day: string; value: number }>>([]);
  const [topPages, setTopPages] = useState<Array<{ path: string; views: number }>>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [recentServices, setRecentServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch core content stats
      const postsSnap = await getDocs(collection(db, 'posts'));
      const projectsSnap = await getDocs(query(collection(db, 'projects'), where('published', '==', true)));
      const servicesSnap = await getDocs(query(collection(db, 'services'), where('published', '==', true)));

      const now = new Date();
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - 6);
      weekStart.setHours(0, 0, 0, 0);

      const [allVisitorsSnap, weeklyVisitorsSnap] = await Promise.all([
        getDocs(collection(db, 'visitors')),
        getDocs(query(collection(db, 'visitors'), where('timestamp', '>=', Timestamp.fromDate(weekStart)))),
      ]);

      // Fetch recent items
      const postsQuery = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(4));
      const projectsQuery = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(4));
      const servicesQuery = query(collection(db, 'services'));

      const [postsData, projectsData, servicesData] = await Promise.all([
        getDocs(postsQuery),
        getDocs(projectsQuery),
        getDocs(servicesQuery),
      ]);

      const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const trafficMap: Record<string, number> = dayLabels.reduce((acc, day) => {
        acc[day] = 0;
        return acc;
      }, {} as Record<string, number>);

      const pageMap: Record<string, number> = {};

      weeklyVisitorsSnap.forEach((visitorDoc) => {
        const visitor = visitorDoc.data();
        const ts = visitor.timestamp?.toDate ? visitor.timestamp.toDate() : null;
        if (ts) {
          const label = dayLabels[(ts.getDay() + 6) % 7];
          trafficMap[label] += 1;
        }

        const path = visitor.path || '/';
        pageMap[path] = (pageMap[path] || 0) + 1;
      });

      const traffic = dayLabels.map((day) => ({ day, value: trafficMap[day] || 0 }));
      const pages = Object.entries(pageMap)
        .map(([path, views]) => ({ path, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 4);

      setStats({
        totalPosts: postsSnap.size,
        publishedProjects: projectsSnap.size,
        activeServices: servicesSnap.size,
        totalVisitors: allVisitorsSnap.size,
        weeklyVisitors: weeklyVisitorsSnap.size,
      });

      setTrafficSeries(traffic);
      setTopPages(pages);
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

  const buildTrafficLinePath = () => {
    if (!trafficSeries.length) return '';

    const width = 560;
    const height = 180;
    const padding = 20;
    const maxValue = Math.max(...trafficSeries.map((point) => point.value), 1);
    const stepX = (width - padding * 2) / Math.max(trafficSeries.length - 1, 1);

    return trafficSeries
      .map((point, index) => {
        const x = padding + index * stepX;
        const y = height - padding - (point.value / maxValue) * (height - padding * 2);
        return `${x},${y}`;
      })
      .join(' ');
  };

  const maxTraffic = Math.max(...trafficSeries.map((point) => point.value), 1);
  const contentTotal = Math.max(stats.totalPosts + stats.publishedProjects + stats.activeServices, 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 p-6 text-white shadow-xl">
        <div className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-white/15 blur-md" />
        <div className="absolute -left-16 bottom-0 h-36 w-36 rounded-full bg-teal-300/20 blur-md" />
        <div className="relative z-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/90">Administration</p>
            <h1 className="font-rajdhani text-3xl font-bold md:text-4xl">Performance Dashboard</h1>
            <p className="mt-2 text-sm text-cyan-100/90">
              Monitor traffic, publish faster, and keep your content pipeline healthy.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 backdrop-blur-sm">
            <Activity className="h-4 w-4 text-cyan-100" />
            <span className="text-sm font-semibold">{loading ? '...' : stats.weeklyVisitors} visits this week</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: 'Total Visitors',
            value: stats.totalVisitors,
            accent: 'from-cyan-500 to-blue-500',
            text: 'text-cyan-600 dark:text-cyan-400',
            bg: 'bg-cyan-50 dark:bg-cyan-900/20',
            icon: Users,
          },
          {
            label: 'Blog Posts',
            value: stats.totalPosts,
            accent: 'from-indigo-500 to-violet-500',
            text: 'text-indigo-600 dark:text-indigo-400',
            bg: 'bg-indigo-50 dark:bg-indigo-900/20',
            icon: FileText,
          },
          {
            label: 'Published Projects',
            value: stats.publishedProjects,
            accent: 'from-emerald-500 to-green-500',
            text: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-50 dark:bg-emerald-900/20',
            icon: Folder,
          },
          {
            label: 'Active Services',
            value: stats.activeServices,
            accent: 'from-amber-500 to-orange-500',
            text: 'text-amber-600 dark:text-amber-400',
            bg: 'bg-amber-50 dark:bg-amber-900/20',
            icon: Settings,
          },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-700/50 dark:bg-slate-800/50 dark:shadow-none"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className={`rounded-xl ${item.bg} p-3`}>
                  <Icon className={`h-5 w-5 ${item.text}`} />
                </div>
                <div className={`h-1.5 w-16 rounded-full bg-gradient-to-r ${item.accent}`} />
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
              <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{loading ? '-' : item.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="xl:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-700/50 dark:bg-slate-800/50 dark:shadow-none"
        >
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-rajdhani text-xl font-bold text-slate-900 dark:text-white">Traffic Trend</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Last 7 days site activity</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
              <TrendingUp className="h-3.5 w-3.5" /> Peak {maxTraffic}
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700/50 dark:bg-slate-900/40">
            <svg viewBox="0 0 560 180" className="h-48 w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="trafficLine" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity="1" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="1" />
                </linearGradient>
              </defs>
              {[0, 1, 2, 3].map((tick) => {
                const y = 20 + tick * 40;
                return <line key={tick} x1="20" y1={y} x2="540" y2={y} stroke="rgba(148,163,184,0.25)" strokeDasharray="4 6" />;
              })}
              <polyline fill="none" stroke="url(#trafficLine)" strokeWidth="4" strokeLinecap="round" points={buildTrafficLinePath()} />
              {trafficSeries.map((point, index) => {
                const x = 20 + index * ((560 - 40) / Math.max(trafficSeries.length - 1, 1));
                const y = 160 - (point.value / maxTraffic) * 120;
                return <circle key={point.day} cx={x} cy={y} r="4" fill="#0ea5e9" />;
              })}
            </svg>

            <div className="mt-2 grid grid-cols-7 text-center text-xs text-slate-500 dark:text-slate-400">
              {trafficSeries.map((point) => (
                <div key={point.day}>
                  <p>{point.day}</p>
                  <p className="font-semibold text-slate-700 dark:text-slate-300">{point.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 dark:border-slate-700/50 dark:bg-slate-800/50 dark:shadow-none"
        >
          <h3 className="font-rajdhani text-xl font-bold text-slate-900 dark:text-white">Content Mix</h3>
          <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">Distribution across your assets</p>

          <div className="space-y-4">
            {[
              { label: 'Posts', value: stats.totalPosts, color: 'bg-indigo-500' },
              { label: 'Projects', value: stats.publishedProjects, color: 'bg-emerald-500' },
              { label: 'Services', value: stats.activeServices, color: 'bg-amber-500' },
            ].map((item) => {
              const percentage = Math.round((item.value / contentTotal) * 100);
              return (
                <div key={item.label}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{item.label}</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{item.value}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-700/50">
                    <div className={`h-2.5 rounded-full ${item.color}`} style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-700/50 dark:bg-slate-900/40">
            <h4 className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Top Pages</h4>
            <div className="space-y-2">
              {topPages.length === 0 && <p className="text-xs text-slate-500 dark:text-slate-400">No visit data yet.</p>}
              {topPages.map((page) => (
                <div key={page.path} className="flex items-center justify-between text-xs">
                  <span className="max-w-[180px] truncate text-slate-600 dark:text-slate-300">{page.path}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{page.views}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h2 className="text-xs font-medium tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { 
              title: 'New blog post', 
              subtitle: 'Write & publish',
              icon: FileText, 
              bgColor: 'bg-blue-50 dark:bg-blue-900/20',
              iconBg: 'bg-blue-100 dark:bg-blue-900/40',
              textColor: 'text-blue-600 dark:text-blue-400',
              action: () => { onNavigate('content'); } 
            },
            { 
              title: 'New project', 
              subtitle: 'Add to portfolio',
              icon: Folder, 
              bgColor: 'bg-green-50 dark:bg-green-900/20',
              iconBg: 'bg-green-100 dark:bg-green-900/40',
              textColor: 'text-green-600 dark:text-green-400',
              action: () => { onNavigate('content'); } 
            },
            { 
              title: 'New service', 
              subtitle: 'Add offering',
              icon: Settings, 
              bgColor: 'bg-amber-50 dark:bg-amber-900/20',
              iconBg: 'bg-amber-100 dark:bg-amber-900/40',
              textColor: 'text-amber-600 dark:text-amber-400',
              action: () => { onNavigate('content'); } 
            },
            { 
              title: 'View live site',
              subtitle: 'Open public portfolio',
              icon: Globe,
              bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
              iconBg: 'bg-cyan-100 dark:bg-cyan-900/40',
              textColor: 'text-cyan-600 dark:text-cyan-400',
              action: () => window.open('/', '_blank') 
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={item.action}
                className={`group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700/50 ${item.bgColor} hover:-translate-y-0.5 hover:border-blue-300 dark:hover:border-blue-700 p-5 hover:shadow-lg transition-all duration-300 h-full min-h-[72px] w-full flex items-center`}
              >
                <div className="flex flex-row items-center gap-4">
                  <div className={`p-2.5 rounded-lg flex-shrink-0 ${item.iconBg}`}>
                    <Icon className={`w-5 h-5 ${item.textColor}`} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{item.subtitle}</p>
                  </div>
                  <span className="ml-auto text-gray-300 dark:text-gray-600 text-sm flex-shrink-0">↗</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Stats */}
      {/* Recent Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Blog Posts */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-xl p-6"
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
          <div className="divide-y divide-gray-100 dark:divide-slate-700/50">
            {loading ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm py-3">Loading...</p>
            ) : recentPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No posts yet</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Create your first blog post</p>
                <button onClick={() => onNavigate('content')} className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline">
                  + Create now
                </button>
              </div>
            ) : (
              recentPosts.map(post => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start justify-between py-3 hover:bg-gray-50 dark:hover:bg-slate-700/30 px-2 -mx-2 rounded transition-colors"
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
                    <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-slate-700 rounded transition-colors text-gray-600 dark:text-gray-400">
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
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-xl p-6"
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
          <div className="divide-y divide-gray-100 dark:divide-slate-700/50">
            {loading ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm py-3">Loading...</p>
            ) : recentProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center mb-3">
                  <Folder className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No projects yet</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Add your first project</p>
                <button onClick={() => onNavigate('content')} className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline">
                  + Create now
                </button>
              </div>
            ) : (
              recentProjects.map(project => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start justify-between py-3 hover:bg-gray-50 dark:hover:bg-slate-700/30 px-2 -mx-2 rounded transition-colors"
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
                    <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-slate-700 rounded transition-colors text-gray-600 dark:text-gray-400">
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
        transition={{ delay: 0.35 }}
        className="bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-xl p-6"
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
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-12 text-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center mb-3">
                <Settings className="w-5 h-5 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">No services yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Set up your service offerings</p>
              <button onClick={() => onNavigate('content')} className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline">
                + Create now
              </button>
            </div>
          ) : (
            recentServices.map(service => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 transition-colors"
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

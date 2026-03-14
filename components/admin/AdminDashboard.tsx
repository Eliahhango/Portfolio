import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, FileText, Eye, ArrowUp, Calendar } from 'lucide-react';
import { db } from '../../firebase';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    pageViews: 0,
    engagement: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch users count
        const usersSnap = await getDocs(collection(db, 'users'));
        const postsSnap = await getDocs(collection(db, 'posts'));
        const visitorSnap = await getDocs(collection(db, 'visitors'));

        setStats({
          totalUsers: usersSnap.size,
          totalPosts: postsSnap.size,
          pageViews: visitorSnap.size,
          engagement: Math.floor(Math.random() * 100) + 40,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      change: '+12%',
      icon: Users,
      color: 'from-blue-600 to-blue-400',
    },
    {
      title: 'Total Posts',
      value: stats.totalPosts,
      change: '+8%',
      icon: FileText,
      color: 'from-purple-600 to-purple-400',
    },
    {
      title: 'Page Views',
      value: stats.pageViews,
      change: '+24%',
      icon: Eye,
      color: 'from-green-600 to-green-400',
    },
    {
      title: 'Engagement',
      value: `${stats.engagement}%`,
      change: '+5%',
      icon: TrendingUp,
      color: 'from-orange-600 to-orange-400',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your performance overview.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600 transition-all duration-300 overflow-hidden relative"
            >
              <div className={`absolute -right-12 -top-12 w-32 h-32 bg-gradient-to-br ${card.color} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity`} />

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-400 text-sm font-medium">{card.title}</p>
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color} bg-opacity-20`}>
                    <Icon className={`w-5 h-5 text-${card.color.split('-')[1]}-400`} />
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-3xl font-bold text-white">{loading ? '-' : card.value}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <ArrowUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">{card.change}</span>
                    <span className="text-gray-500 text-sm">from last period</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Traffic Over Time</h2>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select className="bg-slate-800/50 border border-slate-700 rounded px-3 py-1 text-gray-300 text-sm outline-none">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
          </div>

          <div className="h-64 flex items-end gap-3">
            {[40, 60, 45, 80, 55, 70, 65].map((height, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ delay: i * 0.1 }}
                className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity cursor-pointer group relative"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {height}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6"
        >
          <h2 className="text-lg font-bold text-white mb-4">Quick Stats</h2>
          <div className="space-y-4">
            {[
              { label: 'Active Users', value: '234', change: '+18%' },
              { label: 'New Signups', value: '42', change: '+12%' },
              { label: 'Bounce Rate', value: '32%', change: '-5%' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800/50"
              >
                <div>
                  <p className="text-gray-400 text-sm">{item.label}</p>
                  <p className="text-white font-bold text-lg">{item.value}</p>
                </div>
                <span className="text-green-400 text-sm font-medium">{item.change}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6"
      >
        <h2 className="text-lg font-bold text-white mb-4">Recent Activities</h2>
        <div className="space-y-3">
          {[
            { action: 'New user registration', user: 'john_doe@example.com', time: '5 minutes ago' },
            { action: 'Blog post published', user: 'admin', time: '1 hour ago' },
            { action: 'System backup completed', user: 'system', time: '3 hours ago' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-800/50 rounded-lg transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div>
                  <p className="text-white text-sm font-medium">{item.action}</p>
                  <p className="text-gray-500 text-xs">{item.user}</p>
                </div>
              </div>
              <span className="text-gray-500 text-xs">{item.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;

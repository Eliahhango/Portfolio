import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Filter, TrendingUp } from 'lucide-react';

const AdminAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7days');

  const analyticsData = [
    { day: 'Mon', visits: 240, users: 200, bounceRate: 24 },
    { day: 'Tue', visits: 290, users: 250, bounceRate: 18 },
    { day: 'Wed', visits: 340, users: 280, bounceRate: 20 },
    { day: 'Thu', visits: 290, users: 230, bounceRate: 22 },
    { day: 'Fri', visits: 390, users: 320, bounceRate: 15 },
    { day: 'Sat', visits: 440, users: 380, bounceRate: 12 },
    { day: 'Sun', visits: 380, users: 320, bounceRate: 16 },
  ];

  const topPages = [
    { path: '/', pageViews: 4520, uniqueVisitors: 3840, bounceRate: '24%' },
    { path: '/services', pageViews: 3210, uniqueVisitors: 2890, bounceRate: '18%' },
    { path: '/projects', pageViews: 2890, uniqueVisitors: 2450, bounceRate: '22%' },
    { path: '/blog', pageViews: 2340, uniqueVisitors: 1980, bounceRate: '28%' },
    { path: '/contact', pageViews: 1890, uniqueVisitors: 1650, bounceRate: '15%' },
  ];

  const maxVisits = Math.max(...analyticsData.map((d) => d.visits));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analytics</h1>
          <p className="text-gray-400">Track your website performance</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white hover:bg-slate-800 transition-colors"
          >
            <Filter className="w-5 h-5" />
            Filter
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all"
          >
            <Download className="w-5 h-5" />
            Export
          </motion.button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {['7days', '30days', '90days', '1year'].map((range) => (
          <motion.button
            key={range}
            whileHover={{ scale: 1.05 }}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              timeRange === range
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800/50 text-gray-300 hover:bg-slate-800'
            }`}
          >
            {range === '7days'
              ? 'Last 7 Days'
              : range === '30days'
              ? 'Last 30 Days'
              : range === '90days'
              ? 'Last 90 Days'
              : 'Last Year'}
          </motion.button>
        ))}
      </div>

      {/* Visits Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6"
      >
        <h2 className="text-lg font-bold text-white mb-6">Website Traffic</h2>
        <div className="h-80 flex items-end gap-3">
          {analyticsData.map((data, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${(data.visits / maxVisits) * 100}%` }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 relative group"
            >
              <div className="h-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs font-medium">
                {data.day}
              </div>
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {data.visits} visits
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Top Pages */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-6"
        >
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            Top Pages
          </h2>
          <div className="space-y-3">
            {topPages.map((page, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center justify-between p-3 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <div className="flex-1">
                  <p className="text-white font-medium text-sm">{page.path}</p>
                  <p className="text-gray-400 text-xs">{page.pageViews} page views</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-sm">{page.uniqueVisitors}</p>
                  <p className="text-gray-400 text-xs">Unique visitors</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {[
            { label: 'Avg. Session Duration', value: '4m 32s', change: '+12%' },
            { label: 'Bounce Rate', value: '32.4%', change: '-8%' },
            { label: 'Conversion Rate', value: '3.2%', change: '+5%' },
            { label: 'New Visitors', value: '2,340', change: '+18%' },
          ].map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-xl p-4"
            >
              <p className="text-gray-400 text-sm mb-2">{metric.label}</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                <span className="text-green-400 text-sm font-medium">{metric.change}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminAnalytics;

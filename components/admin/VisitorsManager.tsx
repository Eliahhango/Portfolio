import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Visitor {
  _id: string;
  ip: string;
  path: string;
  device: string;
  browser: string;
  os: string;
  isNewVisitor: boolean;
  visitedAt: string;
  referer?: string;
}

interface Analytics {
  period: string;
  totalVisitors: number;
  newVisitors: number;
  returningVisitors: number;
  uniqueVisitors: number;
  topPages: Array<{ _id: string; count: number }>;
  deviceStats: Array<{ _id: string; count: number }>;
  browserStats: Array<{ _id: string; count: number }>;
  hourlyStats: Array<{ _id: number; count: number }>;
}

const VisitorsManager: React.FC = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [recentVisitors, setRecentVisitors] = useState<Visitor[]>([]);
  const [period, setPeriod] = useState<'24h' | '7d' | '30d' | '90d'>('7d');
  const [loading, setLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || '';
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchAnalytics();
    fetchRecentVisitors();
  }, [period]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/visitors/analytics?period=${period}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentVisitors = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/visitors/recent?limit=20`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setRecentVisitors(data);
      }
    } catch (error) {
      console.error('Failed to fetch recent visitors:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Visitor Analytics</h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as any)}
          className="px-4 py-2 border border-slate-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
        >
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading analytics...</div>
      ) : analytics ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg border border-slate-200 dark:border-gray-800">
              <h3 className="text-sm text-slate-600 dark:text-gray-400 mb-2">Total Visitors</h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{analytics.totalVisitors}</p>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg border border-slate-200 dark:border-gray-800">
              <h3 className="text-sm text-slate-600 dark:text-gray-400 mb-2">New Visitors</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{analytics.newVisitors}</p>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg border border-slate-200 dark:border-gray-800">
              <h3 className="text-sm text-slate-600 dark:text-gray-400 mb-2">Returning Visitors</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">{analytics.returningVisitors}</p>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg border border-slate-200 dark:border-gray-800">
              <h3 className="text-sm text-slate-600 dark:text-gray-400 mb-2">Unique Visitors</h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{analytics.uniqueVisitors}</p>
            </div>
          </div>

          {/* Top Pages */}
          <div className="bg-white dark:bg-gray-950 p-6 rounded-lg border border-slate-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Top Pages</h3>
            <div className="space-y-2">
              {analytics.topPages.map((page) => (
                <div key={page._id} className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-gray-300">{page._id}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{page.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Device & Browser Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg border border-slate-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Devices</h3>
              <div className="space-y-2">
                {analytics.deviceStats.map((device) => (
                  <div key={device._id} className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-gray-300">{device._id}</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{device.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg border border-slate-200 dark:border-gray-800">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Browsers</h3>
              <div className="space-y-2">
                {analytics.browserStats.map((browser) => (
                  <div key={browser._id} className="flex items-center justify-between">
                    <span className="text-slate-700 dark:text-gray-300">{browser._id}</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{browser.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Visitors */}
          <div className="bg-white dark:bg-gray-950 p-6 rounded-lg border border-slate-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Recent Visitors</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-gray-800">
                    <th className="text-left py-2 px-4 text-slate-600 dark:text-gray-400">IP</th>
                    <th className="text-left py-2 px-4 text-slate-600 dark:text-gray-400">Path</th>
                    <th className="text-left py-2 px-4 text-slate-600 dark:text-gray-400">Device</th>
                    <th className="text-left py-2 px-4 text-slate-600 dark:text-gray-400">Browser</th>
                    <th className="text-left py-2 px-4 text-slate-600 dark:text-gray-400">Type</th>
                    <th className="text-left py-2 px-4 text-slate-600 dark:text-gray-400">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentVisitors.map((visitor) => (
                    <tr key={visitor._id} className="border-b border-slate-100 dark:border-gray-900">
                      <td className="py-2 px-4 text-slate-700 dark:text-gray-300">{visitor.ip}</td>
                      <td className="py-2 px-4 text-slate-700 dark:text-gray-300">{visitor.path}</td>
                      <td className="py-2 px-4 text-slate-700 dark:text-gray-300">{visitor.device}</td>
                      <td className="py-2 px-4 text-slate-700 dark:text-gray-300">{visitor.browser}</td>
                      <td className="py-2 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          visitor.isNewVisitor 
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                            : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        }`}>
                          {visitor.isNewVisitor ? 'New' : 'Returning'}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-slate-600 dark:text-gray-400 text-sm">
                        {new Date(visitor.visitedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-slate-600 dark:text-gray-400">No analytics data available</div>
      )}
    </div>
  );
};

export default VisitorsManager;


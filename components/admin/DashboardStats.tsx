import React, { useState, useEffect } from 'react';

interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'main' | 'admin';
}

interface DashboardStatsProps {
  admin: Admin;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ admin }) => {
  const [stats, setStats] = useState({
    services: 0,
    content: 0,
    admins: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('adminToken');
      // Use relative URL for single deployment, or VITE_API_URL if set
      const apiUrl = import.meta.env.VITE_API_URL || '';

      try {
        const [servicesRes, contentRes, adminsRes] = await Promise.all([
          fetch(`${apiUrl}/api/services/admin`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${apiUrl}/api/content`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          admin.role === 'main'
            ? fetch(`${apiUrl}/api/admin`, {
                headers: { Authorization: `Bearer ${token}` },
              })
            : Promise.resolve({ json: () => Promise.resolve([]) }),
        ]);

        const services = await servicesRes.json();
        const content = await contentRes.json();
        const admins = await adminsRes.json();

        setStats({
          services: services.length || 0,
          content: content.length || 0,
          admins: admins.length || 0,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, [admin.role]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow border border-slate-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-gray-400">Total Services</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats.services}</p>
            </div>
            <div className="text-4xl">🛠️</div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow border border-slate-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-gray-400">Content Items</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats.content}</p>
            </div>
            <div className="text-4xl">📝</div>
          </div>
        </div>

        {admin.role === 'main' && (
          <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow border border-slate-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-gray-400">Total Admins</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{stats.admins}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow border border-slate-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium text-slate-900 dark:text-white mb-2">Add New Service</h4>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              Create a new service offering to showcase your expertise
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-gray-900 rounded-lg">
            <h4 className="font-medium text-slate-900 dark:text-white mb-2">Edit Website Content</h4>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              Update text, descriptions, and other content across your portfolio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;


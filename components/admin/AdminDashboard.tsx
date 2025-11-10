import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ServicesManager from './ServicesManager';
import ContentManager from './ContentManager';
import AdminsManager from './AdminsManager';
import DashboardStats from './DashboardStats';
import VisitorsManager from './VisitorsManager';
import MessagesManager from './MessagesManager';

interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'main' | 'admin';
}

interface AdminDashboardProps {
  admin: Admin;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ admin, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'services' | 'content' | 'visitors' | 'messages' | 'admins'>('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'services', label: 'Services', icon: '🛠️' },
    { id: 'content', label: 'Content', icon: '📝' },
    { id: 'visitors', label: 'Visitors', icon: '👁️' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    ...(admin.role === 'main' ? [{ id: 'admins', label: 'Admins', icon: '👥' }] : []),
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-950 border-b border-slate-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-sm text-slate-600 dark:text-gray-400">
                Welcome back, {admin.name} ({admin.role === 'main' ? 'Main Admin' : 'Admin'})
              </p>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white dark:bg-gray-950 border-b border-slate-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'dashboard' && <DashboardStats admin={admin} />}
          {activeTab === 'services' && <ServicesManager />}
          {activeTab === 'content' && <ContentManager />}
          {activeTab === 'visitors' && <VisitorsManager />}
          {activeTab === 'messages' && <MessagesManager />}
          {activeTab === 'admins' && admin.role === 'main' && <AdminsManager />}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;


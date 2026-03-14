import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, BarChart3, Users, Settings, FileText, Bell, Search, Menu, X } from 'lucide-react';
import { auth } from '../firebase.js';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import AdminDashboard from '../components/admin/AdminDashboard.js';
import AdminUsers from '../components/admin/AdminUsers.js';
import AdminSettings from '../components/admin/AdminSettings.js';
import AdminContent from '../components/admin/AdminContent.js';
import AdminAnalytics from '../components/admin/AdminAnalytics.js';
import AdminLogin from './AdminLogin.js';

type AdminTab = 'dashboard' | 'users' | 'analytics' | 'content' | 'settings';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
        }
        setLoading(false);
      });

      return unsubscribe;
    } catch (error: any) {
      console.error('Firebase initialization error:', error);
      setError(error?.message || 'Failed to initialize Firebase. Please check your environment variables.');
      setLoading(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-blue-900/30 dark:to-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-500 border-t-blue-300 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-blue-900/30 dark:to-slate-900 flex items-center justify-center p-4">
        <div className="bg-red-100 dark:bg-red-500/10 border border-red-300 dark:border-red-500/50 rounded-lg p-6 max-w-md">
          <h2 className="text-red-600 dark:text-red-400 text-xl font-bold mb-2">Error</h2>
          <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
          <p className="text-red-600 dark:text-red-300 text-sm">Check that all Firebase environment variables are set on Vercel.</p>
          <a href="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-4 inline-block">← Go Home</a>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin />;
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: FileText },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-blue-900/20 dark:to-slate-900">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-screen w-72 bg-white dark:bg-slate-800/50 backdrop-blur-lg border-r border-gray-200 dark:border-slate-700/50 z-40 overflow-y-auto"
      >
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">AD</span>
            </div>
            <div>
              <h2 className="text-gray-900 dark:text-white font-bold text-lg">Admin Panel</h2>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Control Center</p>
            </div>
          </motion.div>

          <nav className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveTab(item.id as AdminTab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50 dark:shadow-blue-500/30'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700/50 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 rounded-full bg-white"
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700/50 space-y-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-0'}`}>
        {/* Top Navigation Bar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-30 bg-white dark:bg-slate-800/50 backdrop-blur-lg border-b border-gray-200 dark:border-slate-700/50 px-6 py-4 shadow-sm dark:shadow-none"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="hidden md:flex items-center bg-gray-100 dark:bg-slate-700/30 rounded-lg px-4 py-2 border border-gray-300 dark:border-slate-600/50">
                <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent ml-3 outline-none text-gray-900 dark:text-white placeholder-gray-500 w-48"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-slate-700/50">
                <div className="text-right hidden sm:block">
                  <p className="text-gray-900 dark:text-white text-sm font-medium">{user?.email?.split('@')[0]}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Administrator</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && <AdminDashboard key="dashboard" />}
            {activeTab === 'users' && <AdminUsers key="users" />}
            {activeTab === 'analytics' && <AdminAnalytics key="analytics" />}
            {activeTab === 'content' && <AdminContent key="content" />}
            {activeTab === 'settings' && <AdminSettings key="settings" />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Admin;

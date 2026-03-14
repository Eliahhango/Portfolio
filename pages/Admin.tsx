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

type AdminTab = 'dashboard' | 'users' | 'analytics' | 'content' | 'settings';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        window.location.href = '/';
      }
      setLoading(false);
    });

    return unsubscribe;
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-500 border-t-blue-300 rounded-full"
        />
      </div>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: FileText },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 h-screen w-72 bg-slate-950/50 backdrop-blur-lg border-r border-slate-800/50 z-40 overflow-y-auto"
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
              <h2 className="text-white font-bold text-lg">Admin Panel</h2>
              <p className="text-gray-400 text-xs">Control Center</p>
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
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                      : 'text-gray-300 hover:bg-slate-800/50 hover:text-white'
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

          <div className="mt-8 pt-8 border-t border-slate-800/50 space-y-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors duration-200"
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
          className="sticky top-0 z-30 bg-slate-950/50 backdrop-blur-lg border-b border-slate-800/50 px-6 py-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors text-gray-300 hover:text-white"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="hidden md:flex items-center bg-slate-800/30 rounded-lg px-4 py-2 border border-slate-700/50">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent ml-3 outline-none text-white placeholder-gray-500 w-48"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-slate-800/50 transition-colors text-gray-300 hover:text-white">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-700/50">
                <div className="text-right hidden sm:block">
                  <p className="text-white text-sm font-medium">{user?.email?.split('@')[0]}</p>
                  <p className="text-gray-400 text-xs">Administrator</p>
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

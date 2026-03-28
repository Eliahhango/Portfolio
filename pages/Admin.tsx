import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, BarChart3, Users, Settings, FileText, Bell, Search, Menu, Activity } from 'lucide-react';
import { auth, db } from '../firebase.js';
import { signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
import { logError, getUserFriendlyError } from '../utils/errorHandler.js';
import AdminDashboard from '../components/admin/AdminDashboard.js';
import AdminUsers from '../components/admin/AdminUsers.js';
import AdminSettings from '../components/admin/AdminSettings.js';
import AdminContent from '../components/admin/AdminContent.js';
import AdminAnalytics from '../components/admin/AdminAnalytics.js';
import AdminActivity from '../components/admin/AdminActivity.js';
import AdminLogin from './AdminLogin.js';

type AdminTab = 'dashboard' | 'users' | 'analytics' | 'content' | 'activities' | 'settings';

const BOOTSTRAP_ADMIN_EMAILS = ['hangoeliah@gmail.com', 'contact@elitechwiz.com'];

const ADMIN_EMAIL_ALLOWLIST = Array.from(new Set([
  ...BOOTSTRAP_ADMIN_EMAILS,
  ...String(import.meta.env.VITE_ADMIN_EMAIL_ALLOWLIST || '')
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean),
]));

const normalizeRole = (value: unknown): string => String(value || '').toLowerCase();

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768); // Open on desktop, closed on mobile
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        const verifyAccess = async (candidate: User | null) => {
          if (!candidate) {
            setUser(null);
            setError(null);
            setLoading(false);
            return;
          }

          const email = String(candidate.email || '').toLowerCase();

          try {
            if (email && ADMIN_EMAIL_ALLOWLIST.includes(email)) {
              setUser(candidate);
              setError(null);
              return;
            }

            const tokenResult = await candidate.getIdTokenResult().catch(() => null);
            const tokenRole = normalizeRole(tokenResult?.claims?.role);
            if (tokenRole === 'admin' || tokenRole === 'main') {
              setUser(candidate);
              setError(null);
              return;
            }

            const userRef = doc(db, 'users', candidate.uid);
            const userSnap = await getDoc(userRef);
            const primaryRole = normalizeRole(userSnap.data()?.role);

            if (primaryRole === 'admin' || primaryRole === 'main') {
              setUser(candidate);
              setError(null);
              return;
            }

            if (email) {
              const fallbackQuery = query(
                collection(db, 'users'),
                where('email', '==', email),
                limit(1),
              );
              const fallbackSnap = await getDocs(fallbackQuery);
              const fallbackRole = normalizeRole(fallbackSnap.docs[0]?.data()?.role);
              if (fallbackRole === 'admin' || fallbackRole === 'main') {
                setUser(candidate);
                setError(null);
                return;
              }
            }

            await signOut(auth).catch(() => {});
            setUser(null);
            setError('Your account does not have admin access.');
          } catch (error: any) {
            logError('Admin.verifyAccess', error);
            if (email && ADMIN_EMAIL_ALLOWLIST.includes(email)) {
              setUser(candidate);
              setError(null);
              return;
            }
            await signOut(auth).catch(() => {});
            setUser(null);
            setError('Unable to verify admin permissions. Check Firestore rules and your users role record.');
          } finally {
            setLoading(false);
          }
        };

        void verifyAccess(currentUser);
      });

      return unsubscribe;
    } catch (error: any) {
      logError('Admin.onAuthStateChanged', error);
      setError('Unable to load admin panel. Please try again.');
      setLoading(false);
    }
  }, []);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      // Auto-close sidebar on mobile
      if (width < 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-close sidebar when navigating on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [activeTab, isMobile]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      logError('Admin.handleLogout', error);
      console.log('Unable to logout. Please try again.');
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
          <h2 className="text-red-600 dark:text-red-400 text-xl font-bold mb-2">Unable to Load Admin Panel</h2>
          <p className="text-red-700 dark:text-red-300 mb-4">{error}</p>
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
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-slate-900 dark:via-blue-900/20 dark:to-slate-900 overflow-hidden flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: !isMobile ? 0 : (sidebarOpen ? 0 : -100), opacity: !isMobile ? 1 : (sidebarOpen ? 1 : 0) }}
        transition={{ duration: 0.3 }}
        className={`${!isMobile ? 'static' : 'fixed'} left-0 top-0 h-screen ${isMobile ? 'w-64 sm:w-72' : 'w-72'} bg-white dark:bg-slate-800/50 backdrop-blur-lg border-r border-gray-200 dark:border-slate-700/50 ${isMobile ? 'z-40' : 'z-0'} overflow-y-auto`}
      >
        <div className="p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">AD</span>
            </div>
            <div className="min-w-0">
              <h2 className="text-gray-900 dark:text-white font-bold text-lg truncate">Admin Panel</h2>
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
                  onClick={() => {
                    setActiveTab(item.id as AdminTab);
                    if (isMobile) setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700/50 hover:text-gray-900 dark:hover:text-white border border-transparent'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium truncate">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 flex-shrink-0"
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700/50 space-y-2">
            <button
              onClick={() => {
                handleLogout();
                if (isMobile) setSidebarOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Mobile overlay when sidebar is open */}
      {sidebarOpen && isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${isMobile ? (sidebarOpen ? 'ml-64 sm:ml-72' : 'ml-0') : ''}`}>
        {/* Top Navigation Bar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-30 bg-white dark:bg-slate-800/50 backdrop-blur-lg border-b border-gray-200 dark:border-slate-700/50 px-4 sm:px-6 py-3 shadow-sm dark:shadow-none"
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex-shrink-0"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden lg:flex items-center bg-gray-100 dark:bg-slate-700/30 rounded-lg px-4 py-2 border border-gray-300 dark:border-slate-600/50 min-w-0">
                <Search className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent ml-3 outline-none text-gray-900 dark:text-white placeholder-gray-500 w-40 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4 ml-auto">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50 transition-colors text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex-shrink-0">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray-200 dark:border-slate-700/50">
                <div className="text-right hidden sm:block">
                  <p className="text-gray-900 dark:text-white text-sm font-medium truncate">{user?.email?.split('@')[0]}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Administrator</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {user?.email?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && <AdminDashboard key="dashboard" onNavigate={setActiveTab} />}
            {activeTab === 'users' && <AdminUsers key="users" />}
            {activeTab === 'analytics' && <AdminAnalytics key="analytics" />}
            {activeTab === 'content' && <AdminContent key="content" />}
            {activeTab === 'activities' && <AdminActivity key="activities" />}
            {activeTab === 'settings' && <AdminSettings key="settings" />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Admin;

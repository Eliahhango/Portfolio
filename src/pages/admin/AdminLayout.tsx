import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart2,
  Bell,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Settings,
  Users,
  X,
} from 'lucide-react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminFetch } from '../../lib/adminApi';
import type { ContactListResponse } from '../../types/admin';

const navigationSections = [
  {
    label: 'MAIN',
    items: [
      { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
      { label: 'Visitors', to: '/admin/visitors', icon: BarChart2 },
    ],
  },
  {
    label: 'CONTENT',
    items: [
      { label: 'Messages', to: '/admin/messages', icon: Mail, showUnread: true },
      { label: 'Newsletter', to: '/admin/newsletter', icon: Users },
      { label: 'Blog Posts', to: '/admin/blog', icon: FileText },
      { label: 'Services', to: '/admin/services', icon: Briefcase },
    ],
  },
  {
    label: 'SYSTEM',
    items: [{ label: 'Settings', to: '/admin/settings', icon: Settings }],
  },
];

const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  messages: 'Messages',
  newsletter: 'Newsletter',
  blog: 'Blog Posts',
  visitors: 'Visitor Analytics',
  services: 'Services',
  settings: 'Settings',
};

const getDisplayName = (name?: string | null, email?: string | null) => {
  if (name && name.trim()) {
    return name.trim();
  }

  if (email) {
    return email.split('@')[0];
  }

  return 'Admin User';
};

const getInitials = (name: string) => {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
};

const formatClock = () => {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
};

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminProfile, getFirebaseToken, logout, user } = useAdminAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [clock, setClock] = useState(formatClock());

  const currentSection = location.pathname.split('/')[2] || 'dashboard';
  const pageTitle = pageTitles[currentSection] || 'Admin';
  const adminEmail = user?.email || adminProfile?.email || 'admin@elitechwiz.site';
  const adminName = getDisplayName(adminProfile?.name, adminEmail);
  const adminInitials = getInitials(adminName);
  const desktopSidebarWidth = isCollapsed ? 'md:pl-24' : 'md:pl-72';
  const closeSidebar = () => setIsSidebarOpen(false);
  const hideWhenCollapsed = isCollapsed ? 'md:hidden' : '';

  useEffect(() => {
    const updateClock = () => {
      setClock(formatClock());
    };

    updateClock();
    const intervalId = window.setInterval(updateClock, 60000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadUnreadCount = async () => {
      try {
        const token = await getFirebaseToken();

        if (!token) {
          return;
        }

        const data = await adminFetch<ContactListResponse>('/api/contact?status=new&page=1&limit=1', token);

        if (isActive) {
          setUnreadCount(data.unreadCount);
        }
      } catch {
        if (isActive) {
          setUnreadCount(0);
        }
      }
    };

    void loadUnreadCount();
    const intervalId = window.setInterval(() => {
      void loadUnreadCount();
    }, 60000);

    return () => {
      isActive = false;
      window.clearInterval(intervalId);
    };
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const breadcrumbItems = useMemo(() => ['Admin', pageTitle], [pageTitle]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div
        className={`fixed inset-0 z-40 bg-slate-950/55 transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={closeSidebar}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-[#0f172a] text-slate-100 transition-transform duration-300 ease-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${isCollapsed ? 'md:w-24' : 'md:w-72'}`}
      >
        <div className={`flex items-center border-b border-white/10 px-4 py-5 ${isCollapsed ? 'md:justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-black text-white shadow-lg shadow-blue-500/20">
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative z-10"
              >
                EW
              </motion.span>
              <motion.span
                initial={{ x: '-150%', opacity: 0 }}
                animate={{ x: '220%', opacity: [0, 0.65, 0] }}
                transition={{ duration: 1.1, delay: 0.25, ease: 'easeOut' }}
                className="absolute inset-y-0 left-0 w-6 rotate-12 bg-white/35 blur-md"
              />
            </div>

            <div className={`min-w-0 ${hideWhenCollapsed}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">EliTechWiz</p>
              <h1 className="mt-1 text-lg font-bold text-white">Admin Console</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:border-blue-400/40 hover:text-white md:inline-flex"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={closeSidebar}
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 md:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navigationSections.map((section) => (
            <div key={section.label}>
              <p className={`mt-3 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ${hideWhenCollapsed}`}>
                {section.label}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={closeSidebar}
                      title={item.label}
                      className={({ isActive }) => [
                        'group flex items-center gap-3 rounded-2xl border-l-4 px-3 py-3 text-sm font-medium transition',
                        isCollapsed ? 'md:justify-center md:px-0' : '',
                        isActive
                          ? 'border-blue-400 bg-blue-500/10 text-blue-300'
                          : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white',
                      ].join(' ')}
                    >
                      <div className="relative shrink-0">
                        <Icon className="h-5 w-5" />
                        {item.showUnread && unreadCount > 0 && (
                          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-[#0f172a]" />
                        )}
                      </div>
                      <span className={hideWhenCollapsed}>{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <div className={`rounded-3xl border border-white/10 bg-white/5 p-3 ${isCollapsed ? 'md:px-2' : ''}`}>
            <div className={`flex items-center gap-3 ${isCollapsed ? 'md:justify-center' : ''}`}>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15 text-sm font-bold text-blue-200">
                {adminInitials}
              </div>
              <div className={`min-w-0 ${hideWhenCollapsed}`}>
                <p className="truncate text-sm font-semibold text-white">{adminName}</p>
                <p className="truncate text-xs text-slate-400">{adminEmail}</p>
              </div>
            </div>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 inline-flex items-center gap-2 text-xs font-semibold text-blue-300 transition hover:text-blue-200 ${hideWhenCollapsed}`}
            >
              View Portfolio
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className={`mt-3 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white ${isCollapsed ? 'md:justify-center md:px-0' : ''}`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className={hideWhenCollapsed}>Logout</span>
          </button>
        </div>
      </aside>

      <div className={`min-h-screen transition-[padding] duration-300 ${desktopSidebarWidth}`}>
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="inline-flex rounded-2xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm md:hidden"
                aria-label="Open sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={item}>
                      {index > 0 && <span className="text-slate-300">/</span>}
                      <span>{item}</span>
                    </React.Fragment>
                  ))}
                </div>
                <h2 className="mt-2 truncate text-2xl font-bold tracking-tight text-slate-900">{pageTitle}</h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/admin/messages')}
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
                aria-label="Unread messages"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 inline-flex min-w-[1.2rem] items-center justify-center rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>

              <div className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm lg:inline-flex">
                {clock}
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600 sm:inline-flex"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

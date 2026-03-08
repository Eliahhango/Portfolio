import React, { useState } from 'react';
import {
  BarChart2,
  Briefcase,
  ChevronLeft,
  ChevronRight,
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

const navigationItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Messages', to: '/admin/messages', icon: Mail },
  { label: 'Newsletter', to: '/admin/newsletter', icon: Users },
  { label: 'Blog Posts', to: '/admin/blog', icon: FileText },
  { label: 'Visitors', to: '/admin/visitors', icon: BarChart2 },
  { label: 'Services', to: '/admin/services', icon: Briefcase },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
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

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminProfile, logout, user } = useAdminAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const currentSection = location.pathname.split('/')[2] || 'dashboard';
  const pageTitle = pageTitles[currentSection] || 'Admin';
  const adminEmail = user?.email || adminProfile?.email || 'admin@elitechwiz.site';
  const desktopSidebarWidth = isCollapsed ? 'md:pl-20' : 'md:pl-64';
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div
        className={`fixed inset-0 z-40 bg-slate-950/55 transition-opacity duration-300 md:hidden ${isSidebarOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={closeSidebar}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#0f172a] text-slate-100 transition-transform duration-300 ease-out md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${isCollapsed ? 'md:w-20' : 'md:w-64'}`}
      >
        <div className={`flex items-center border-b border-white/10 px-4 py-5 ${isCollapsed ? 'md:justify-center' : 'justify-between'}`}>
          <div className={`min-w-0 ${isCollapsed ? 'md:hidden' : 'block'}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">ElitechWiz</p>
            <h1 className="mt-1 text-lg font-bold text-white">Admin Console</h1>
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

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigationItems.map((item) => {
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
                <Icon className="h-5 w-5 shrink-0" />
                <span className={isCollapsed ? 'md:hidden' : 'block'}>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white ${isCollapsed ? 'md:justify-center md:px-0' : ''}`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className={isCollapsed ? 'md:hidden' : 'block'}>Logout</span>
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
                <h2 className="truncate text-2xl font-bold tracking-tight text-slate-900">{pageTitle}</h2>
                <p className="mt-1 truncate text-sm text-slate-500">
                  Signed in as <span className="font-medium text-slate-700">{adminEmail}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600 sm:inline-flex"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

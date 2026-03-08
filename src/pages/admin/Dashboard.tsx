import React, { useEffect, useState } from 'react';
import { BarChart3, Eye, FileText, Mail, PlusCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminFetch } from '../../lib/adminApi';
import type { BlogPostRecord, ContactListResponse, ContactMessage, VisitorStatsResponse } from '../../types/admin';
import StatusBadge from '../../components/admin/StatusBadge';

interface DashboardStats {
  totalVisitors: number;
  newMessages: number;
  newsletterSubscribers: number;
  blogPosts: number;
}

const formatDate = (value: string) => {
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const Dashboard: React.FC = () => {
  const { getFirebaseToken } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalVisitors: 0,
    newMessages: 0,
    newsletterSubscribers: 0,
    blogPosts: 0,
  });
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [visitorChartData, setVisitorChartData] = useState<VisitorStatsResponse['dailyStats']>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      setIsLoading(true);
      setError('');

      try {
        const token = await getFirebaseToken();

        if (!token) {
          throw new Error('Your session has expired. Please sign in again.');
        }

        const [
          visitorTotals,
          messageData,
          subscriberCount,
          blogPosts,
          visitorWeekStats,
        ] = await Promise.all([
          adminFetch<VisitorStatsResponse>('/api/visitors/stats', token),
          adminFetch<ContactListResponse>('/api/contact?status=new&page=1&limit=5', token),
          adminFetch<{ count: number }>('/api/newsletter/subscribers/count', token),
          adminFetch<BlogPostRecord[]>('/api/blog/admin/all', token),
          adminFetch<VisitorStatsResponse>('/api/visitors/stats?days=7', token),
        ]);

        setStats({
          totalVisitors: visitorTotals.totalVisitors,
          newMessages: messageData.unreadCount,
          newsletterSubscribers: subscriberCount.count,
          blogPosts: blogPosts.length,
        });
        setRecentMessages(messageData.messages.slice(0, 5));
        setVisitorChartData(visitorWeekStats.dailyStats);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load the dashboard.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  const statCards = [
    {
      label: 'Total Visitors',
      value: stats.totalVisitors,
      icon: Eye,
      iconClassName: 'bg-sky-100 text-sky-600',
    },
    {
      label: 'New Messages',
      value: stats.newMessages,
      icon: Mail,
      iconClassName: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Newsletter Subscribers',
      value: stats.newsletterSubscribers,
      icon: Users,
      iconClassName: 'bg-emerald-100 text-emerald-600',
    },
    {
      label: 'Blog Posts',
      value: stats.blogPosts,
      icon: FileText,
      iconClassName: 'bg-amber-100 text-amber-600',
    },
  ];

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="space-y-3 animate-pulse">
          <div className="h-8 w-56 rounded-full bg-slate-200" />
          <div className="h-4 w-80 rounded-full bg-slate-100" />
          <div className="grid gap-4 pt-6 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-32 rounded-3xl bg-slate-100" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <article key={card.label} className="rounded-3xl bg-white p-5 shadow-md ring-1 ring-slate-200/70">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{card.label}</p>
                  <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">{card.value.toLocaleString()}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconClassName}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <article className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Recent Messages</h3>
              <p className="mt-1 text-sm text-slate-500">Latest unread conversations from the contact form.</p>
            </div>
            <Link to="/admin/messages" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              View all
            </Link>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  <th className="pb-3 pr-4">Name</th>
                  <th className="pb-3 pr-4">Subject</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentMessages.length > 0 ? (
                  recentMessages.map((message) => (
                    <tr key={message._id}>
                      <td className="py-4 pr-4 text-sm font-semibold text-slate-900">{message.name}</td>
                      <td className="py-4 pr-4 text-sm text-slate-600">{message.subject}</td>
                      <td className="py-4 pr-4 text-sm text-slate-500">{formatDate(message.createdAt)}</td>
                      <td className="py-4">
                        <StatusBadge status={message.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-sm text-slate-500">
                      No recent messages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <PlusCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Quick Actions</h3>
              <p className="mt-1 text-sm text-slate-500">Jump directly into the main admin workflows.</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              to="/admin/blog"
              className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <span>New Blog Post</span>
              <FileText className="h-4 w-4" />
            </Link>
            <Link
              to="/admin/messages"
              className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <span>View All Messages</span>
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </article>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Visitor Activity</h3>
            <p className="mt-1 text-sm text-slate-500">Daily traffic over the last seven days.</p>
          </div>
        </div>

        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={visitorChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip
                cursor={{ fill: '#eff6ff' }}
                contentStyle={{
                  borderRadius: '16px',
                  border: '1px solid #dbeafe',
                  boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
                }}
              />
              <Bar dataKey="count" fill="#3b82f6" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

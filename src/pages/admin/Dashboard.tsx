import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Eye,
  FileText,
  Mail,
  MailOpen,
  Users,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import useCountUp from '../../hooks/useCountUp';
import { adminFetch } from '../../lib/adminApi';
import type {
  BlogPostRecord,
  ContactListResponse,
  ContactMessage,
  NewsletterSubscriberResponse,
  VisitorPoint,
  VisitorStatsResponse,
} from '../../types/admin';
import StatusBadge from '../../components/admin/StatusBadge';

type ChartRange = 7 | 30;
type TrendTone = 'positive' | 'negative' | 'neutral';

interface DashboardStats {
  totalVisitors: number;
  newMessages: number;
  newsletterSubscribers: number;
  blogPosts: number;
}

interface TrendSummary {
  text: string;
  tone: TrendTone;
}

const chartRanges: ChartRange[] = [7, 30];

const formatDate = (value: string) => {
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatChartDate = (value: string) => {
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
};

const getGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return 'morning';
  }

  if (currentHour < 18) {
    return 'afternoon';
  }

  return 'evening';
};

const getInitials = (name: string) => {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');

  return initials || 'NA';
};

const avatarTones = [
  'bg-sky-100 text-sky-700',
  'bg-blue-100 text-blue-700',
  'bg-violet-100 text-violet-700',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
];

const getAvatarTone = (name: string) => {
  const code = name.trim().charCodeAt(0) || 0;
  return avatarTones[code % avatarTones.length];
};

const createTrend = (current: number, previous: number): TrendSummary => {
  const deltaPercent =
    previous === 0
      ? current === 0
        ? 0
        : 100
      : Math.round(((current - previous) / previous) * 100);

  if (deltaPercent > 0) {
    return {
      text: `+${deltaPercent}% this week`,
      tone: 'positive',
    };
  }

  if (deltaPercent < 0) {
    return {
      text: `${deltaPercent}% this week`,
      tone: 'negative',
    };
  }

  return {
    text: '0% this week',
    tone: 'neutral',
  };
};

const toneClassNames: Record<TrendTone, string> = {
  positive: 'bg-emerald-50 text-emerald-700',
  negative: 'bg-rose-50 text-rose-700',
  neutral: 'bg-slate-100 text-slate-600',
};

const countItemsInWindow = <T,>(
  items: T[],
  getDate: (item: T) => string | undefined,
  days: number,
  offsetDays = 0,
) => {
  const now = Date.now();
  const dayInMs = 24 * 60 * 60 * 1000;
  const windowEnd = now - offsetDays * dayInMs;
  const windowStart = windowEnd - days * dayInMs;

  return items.reduce((count, item) => {
    const rawDate = getDate(item);

    if (!rawDate) {
      return count;
    }

    const dateValue = new Date(rawDate).getTime();

    if (Number.isNaN(dateValue)) {
      return count;
    }

    return dateValue >= windowStart && dateValue < windowEnd ? count + 1 : count;
  }, 0);
};

const sumPointsInWindow = (points: VisitorPoint[], days: number, offsetDays = 0) => {
  const now = Date.now();
  const dayInMs = 24 * 60 * 60 * 1000;
  const windowEnd = now - offsetDays * dayInMs;
  const windowStart = windowEnd - days * dayInMs;

  return points.reduce((total, point) => {
    const dateValue = new Date(point.date).getTime();

    if (Number.isNaN(dateValue)) {
      return total;
    }

    return dateValue >= windowStart && dateValue < windowEnd ? total + point.count : total;
  }, 0);
};

const CountUpNumber: React.FC<{ value: number }> = ({ value }) => {
  const animatedValue = useCountUp(value);
  return <>{animatedValue.toLocaleString()}</>;
};

const Dashboard: React.FC = () => {
  const { adminProfile, getFirebaseToken, user } = useAdminAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalVisitors: 0,
    newMessages: 0,
    newsletterSubscribers: 0,
    blogPosts: 0,
  });
  const [chartRange, setChartRange] = useState<ChartRange>(7);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [newMessagePool, setNewMessagePool] = useState<ContactMessage[]>([]);
  const [confirmedSubscribers, setConfirmedSubscribers] = useState<NewsletterSubscriberResponse['subscribers']>([]);
  const [blogRecords, setBlogRecords] = useState<BlogPostRecord[]>([]);
  const [visitorChartData, setVisitorChartData] = useState<Record<ChartRange, VisitorPoint[]>>({
    7: [],
    30: [],
  });
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
          recentMessageData,
          unreadMessageData,
          subscriberCount,
          confirmedSubscriberData,
          blogPosts,
          visitorWeekStats,
          visitorMonthStats,
        ] = await Promise.all([
          adminFetch<VisitorStatsResponse>('/api/visitors/stats', token),
          adminFetch<ContactListResponse>('/api/contact?page=1&limit=5', token),
          adminFetch<ContactListResponse>('/api/contact?status=new&page=1&limit=100', token),
          adminFetch<{ count: number }>('/api/newsletter/subscribers/count', token),
          adminFetch<NewsletterSubscriberResponse>('/api/newsletter/subscribers?confirmed=true&page=1&limit=100', token),
          adminFetch<BlogPostRecord[]>('/api/blog/admin/all', token),
          adminFetch<VisitorStatsResponse>('/api/visitors/stats?days=7', token),
          adminFetch<VisitorStatsResponse>('/api/visitors/stats?days=30', token),
        ]);

        setStats({
          totalVisitors: visitorTotals.totalVisitors,
          newMessages: unreadMessageData.unreadCount,
          newsletterSubscribers: subscriberCount.count,
          blogPosts: blogPosts.length,
        });
        setRecentMessages(recentMessageData.messages.slice(0, 5));
        setNewMessagePool(unreadMessageData.messages);
        setConfirmedSubscribers(confirmedSubscriberData.subscribers);
        setBlogRecords(blogPosts);
        setVisitorChartData({
          7: visitorWeekStats.dailyStats,
          30: visitorMonthStats.dailyStats,
        });
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load the dashboard.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadDashboard();
  }, [getFirebaseToken]);

  const activeChartData = visitorChartData[chartRange];
  const averageVisitors = useMemo(() => {
    if (!activeChartData.length) {
      return 0;
    }

    const total = activeChartData.reduce((sum, point) => sum + point.count, 0);
    return Math.round(total / activeChartData.length);
  }, [activeChartData]);

  const visitorTrendSource = visitorChartData[30].length > 0 ? visitorChartData[30] : visitorChartData[7];

  const statCards = useMemo(() => {
    const visitorTrend = createTrend(
      sumPointsInWindow(visitorTrendSource, 7, 0),
      sumPointsInWindow(visitorTrendSource, 7, 7),
    );

    const messageTrend = createTrend(
      countItemsInWindow(newMessagePool, (message) => message.createdAt, 7, 0),
      countItemsInWindow(newMessagePool, (message) => message.createdAt, 7, 7),
    );

    const subscriberTrend = createTrend(
      countItemsInWindow(
        confirmedSubscribers,
        (subscriber) => subscriber.confirmedAt || subscriber.createdAt,
        7,
        0,
      ),
      countItemsInWindow(
        confirmedSubscribers,
        (subscriber) => subscriber.confirmedAt || subscriber.createdAt,
        7,
        7,
      ),
    );

    const blogTrend = createTrend(
      countItemsInWindow(blogRecords, (post) => post.createdAt, 7, 0),
      countItemsInWindow(blogRecords, (post) => post.createdAt, 7, 7),
    );

    return [
      {
        label: 'Total Visitors',
        value: stats.totalVisitors,
        icon: Eye,
        iconClassName: 'bg-sky-100 text-sky-600',
        borderClassName: 'border-sky-500',
        trend: visitorTrend,
      },
      {
        label: 'New Messages',
        value: stats.newMessages,
        icon: Mail,
        iconClassName: 'bg-blue-100 text-blue-600',
        borderClassName: 'border-blue-500',
        trend: messageTrend,
      },
      {
        label: 'Newsletter Subscribers',
        value: stats.newsletterSubscribers,
        icon: Users,
        iconClassName: 'bg-emerald-100 text-emerald-600',
        borderClassName: 'border-emerald-500',
        trend: subscriberTrend,
      },
      {
        label: 'Blog Posts',
        value: stats.blogPosts,
        icon: FileText,
        iconClassName: 'bg-amber-100 text-amber-600',
        borderClassName: 'border-amber-500',
        trend: blogTrend,
      },
    ];
  }, [blogRecords, confirmedSubscribers, newMessagePool, stats, visitorTrendSource]);

  const quickActions = [
    {
      to: '/admin/blog',
      label: 'New Blog Post',
      description: 'Draft and publish your next article.',
      icon: FileText,
      iconClassName: 'bg-amber-100 text-amber-600',
    },
    {
      to: '/admin/messages',
      label: 'View All Messages',
      description: 'Review inbox activity and follow up.',
      icon: Mail,
      iconClassName: 'bg-blue-100 text-blue-600',
    },
    {
      to: '/admin/newsletter',
      label: 'View Subscribers',
      description: 'Manage confirmed newsletter contacts.',
      icon: Users,
      iconClassName: 'bg-emerald-100 text-emerald-600',
    },
    {
      to: '/admin/visitors',
      label: 'See Visitor Reports',
      description: 'Open deeper traffic and device analytics.',
      icon: BarChart3,
      iconClassName: 'bg-sky-100 text-sky-600',
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-3 animate-pulse">
            <div className="h-8 w-64 rounded-full bg-slate-200" />
            <div className="h-4 w-80 rounded-full bg-slate-100" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-40 animate-pulse rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/70" />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="h-96 animate-pulse rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/70" />
          <div className="h-96 animate-pulse rounded-3xl bg-white shadow-sm ring-1 ring-slate-200/70" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm dark:border-blue-500/10 dark:from-blue-950/20 dark:to-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-600">Admin Overview</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Good {getGreeting()}, Admin 👋
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Here's what's happening with your portfolio today.
            </p>
          </div>

          <div className="inline-flex items-center rounded-2xl border border-blue-100 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300">
            Signed in as <span className="ml-2 font-semibold text-slate-900 dark:text-white">{adminProfile?.name || user?.email || adminProfile?.email || 'Admin'}</span>
          </div>
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.label}
              className={`rounded-3xl border-t-4 bg-white p-5 shadow-md ring-1 ring-slate-200/70 transition-all hover:shadow-lg hover:shadow-blue-500/10 ${card.borderClassName}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">{card.label}</p>
                  <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                    <CountUpNumber value={card.value} />
                  </p>
                  <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneClassNames[card.trend.tone]}`}>
                    {card.trend.text}
                  </span>
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
              <p className="mt-1 text-sm text-slate-500">Latest conversations coming in through the contact form.</p>
            </div>
            <Link to="/admin/messages" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              View all
            </Link>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  <th className="pb-3 pr-4">Sender</th>
                  <th className="pb-3 pr-4">Subject</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentMessages.length > 0 ? (
                  recentMessages.map((message) => (
                    <tr
                      key={message._id}
                      className="cursor-pointer transition hover:bg-slate-50"
                      onClick={() => navigate('/admin/messages')}
                    >
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${getAvatarTone(message.name)}`}>
                            {getInitials(message.name)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{message.name}</p>
                            <p className="text-xs text-slate-500">{message.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4 text-sm text-slate-600">{message.subject}</td>
                      <td className="py-4 pr-4 text-sm text-slate-500">{formatDate(message.createdAt)}</td>
                      <td className="py-4">
                        <StatusBadge status={message.status} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-12">
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                          <MailOpen className="h-6 w-6" />
                        </div>
                        <p className="mt-4 text-base font-semibold text-slate-700">Inbox is empty</p>
                        <p className="mt-1 text-sm text-slate-500">New contact messages will appear here.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Quick Actions</h3>
            <p className="mt-1 text-sm text-slate-500">Jump into the workflows you use most.</p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.to}
                  to={action.to}
                  className="group rounded-3xl border border-slate-200 bg-slate-50/80 p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${action.iconClassName}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-500" />
                  </div>
                  <h4 className="mt-4 text-sm font-semibold text-slate-900">{action.label}</h4>
                  <p className="mt-1 text-sm text-slate-500">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </article>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Visitor Activity</h3>
            <p className="mt-1 text-sm text-slate-500">Monitor daily traffic patterns across your portfolio.</p>
          </div>
          <Link to="/admin/visitors" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            View Full Report
          </Link>
        </div>

        <div className="mt-5 inline-flex rounded-full bg-slate-100 p-1">
          {chartRanges.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setChartRange(range)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                chartRange === range ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-white hover:text-blue-600'
              }`}
            >
              Last {range} days
            </button>
          ))}
        </div>

        <div className="mt-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activeChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="date"
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={formatChartDate}
                tickLine={false}
                axisLine={false}
              />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip
                cursor={{ fill: '#eff6ff' }}
                content={({ active, payload, label }) => {
                  if (!active || !payload?.length) {
                    return null;
                  }

                  return (
                    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                        {typeof label === 'string' ? formatDate(label) : ''}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        {Number(payload[0]?.value || 0).toLocaleString()} visitors
                      </p>
                    </div>
                  );
                }}
              />
              {averageVisitors > 0 && (
                <ReferenceLine
                  y={averageVisitors}
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                />
              )}
              <Bar dataKey="count" fill="#3b82f6" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

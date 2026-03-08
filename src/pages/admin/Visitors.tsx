import React, { useEffect, useState } from 'react';
import { Activity, Clock3, Eye, Globe, Loader2 } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminFetch } from '../../lib/adminApi';
import type { VisitorAnalyticsResponse, VisitorRecord } from '../../types/admin';

const ranges = [7, 30, 90];

const formatDuration = (seconds?: number) => {
  if (!seconds) {
    return '0s';
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);

  if (!minutes) {
    return `${remainingSeconds}s`;
  }

  return `${minutes}m ${remainingSeconds}s`;
};

const Visitors: React.FC = () => {
  const { getFirebaseToken } = useAdminAuth();
  const [days, setDays] = useState(30);
  const [analytics, setAnalytics] = useState<VisitorAnalyticsResponse | null>(null);
  const [recentVisitors, setRecentVisitors] = useState<VisitorRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadVisitors = async () => {
      setIsLoading(true);
      setError('');

      try {
        const token = await getFirebaseToken();

        if (!token) {
          throw new Error('Your session has expired. Please sign in again.');
        }

        const [analyticsData, recentVisitorData] = await Promise.all([
          adminFetch<VisitorAnalyticsResponse>(`/api/visitors/analytics?days=${days}`, token),
          adminFetch<VisitorRecord[]>('/api/visitors/recent?limit=10', token),
        ]);

        setAnalytics(analyticsData);
        setRecentVisitors(recentVisitorData);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load visitor analytics.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadVisitors();
  }, [days]);

  const summaryCards = [
    {
      label: 'Total Visits',
      value: analytics?.totalVisits.toLocaleString() || '0',
      icon: Eye,
      iconClassName: 'bg-sky-100 text-sky-600',
    },
    {
      label: 'Unique Visitors',
      value: analytics?.totalUnique.toLocaleString() || '0',
      icon: Globe,
      iconClassName: 'bg-emerald-100 text-emerald-600',
    },
    {
      label: 'Avg Session Duration',
      value: formatDuration(analytics?.avgDuration),
      icon: Clock3,
      iconClassName: 'bg-amber-100 text-amber-600',
    },
    {
      label: 'Top Page',
      value: analytics?.topPages[0]?.path || 'N/A',
      icon: Activity,
      iconClassName: 'bg-blue-100 text-blue-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Visitor Analytics</h1>
          <p className="mt-2 text-sm text-slate-600">Traffic trends, top pages, and recent visitor sessions.</p>
        </div>

        <div className="flex flex-wrap gap-2 rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-200">
          {ranges.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setDays(range)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${days === range ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Last {range} days
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <article key={card.label} className="rounded-3xl bg-white p-5 shadow-md ring-1 ring-slate-200/70">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">{card.label}</p>
                  <p className="mt-3 break-all text-3xl font-bold tracking-tight text-slate-900">{card.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconClassName}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <article className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
          <h2 className="text-xl font-bold text-slate-900">Daily Visitors</h2>
          <p className="mt-1 text-sm text-slate-500">Traffic trend for the selected date range.</p>

          <div className="mt-6 h-80">
            {isLoading ? (
              <div className="flex h-full items-center justify-center text-slate-500">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading chart...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics?.dailyStats || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '16px',
                      border: '1px solid #dbeafe',
                      boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
                    }}
                  />
                  <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
          <h2 className="text-xl font-bold text-slate-900">Top Pages</h2>
          <p className="mt-1 text-sm text-slate-500">Most-visited paths in the selected range.</p>

          <div className="mt-6 h-80">
            {isLoading ? (
              <div className="flex h-full items-center justify-center text-slate-500">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading chart...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics?.topPages || []} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <YAxis type="category" dataKey="path" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} width={110} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '16px',
                      border: '1px solid #dbeafe',
                      boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
                    }}
                  />
                  <Bar dataKey="count" fill="#38bdf8" radius={[0, 10, 10, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <article className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
          <h2 className="text-xl font-bold text-slate-900">Recent Visitors</h2>
          <p className="mt-1 text-sm text-slate-500">Last 10 recorded visits with device and page details.</p>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  <th className="pb-3 pr-4">IP</th>
                  <th className="pb-3 pr-4">Country</th>
                  <th className="pb-3 pr-4">Browser</th>
                  <th className="pb-3 pr-4">Device</th>
                  <th className="pb-3 pr-4">Page</th>
                  <th className="pb-3 pr-4">Duration</th>
                  <th className="pb-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-sm text-slate-500">
                      Loading visitor sessions...
                    </td>
                  </tr>
                ) : recentVisitors.length > 0 ? (
                  recentVisitors.map((visitor) => (
                    <tr key={visitor._id}>
                      <td className="py-4 pr-4 text-sm font-medium text-slate-900">{visitor.ip}</td>
                      <td className="py-4 pr-4 text-sm text-slate-600">{visitor.country || 'Unknown'}</td>
                      <td className="py-4 pr-4 text-sm text-slate-600">{visitor.browser || 'Unknown'}</td>
                      <td className="py-4 pr-4 text-sm text-slate-600">{visitor.device || 'Unknown'}</td>
                      <td className="py-4 pr-4 text-sm text-slate-600">{visitor.path}</td>
                      <td className="py-4 pr-4 text-sm text-slate-600">{formatDuration(visitor.duration)}</td>
                      <td className="py-4 text-sm text-slate-500">
                        {new Date(visitor.visitedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-sm text-slate-500">
                      No visitor sessions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
          <h2 className="text-xl font-bold text-slate-900">Device Breakdown</h2>
          <p className="mt-1 text-sm text-slate-500">Traffic split by device family.</p>

          <div className="mt-6 h-64">
            {isLoading ? (
              <div className="flex h-full items-center justify-center text-slate-500">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Loading device data...
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Mobile', count: analytics?.deviceBreakdown.mobile || 0 },
                    { name: 'Desktop', count: analytics?.deviceBreakdown.desktop || 0 },
                    { name: 'Tablet', count: analytics?.deviceBreakdown.tablet || 0 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '16px',
                      border: '1px solid #dbeafe',
                      boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="count" fill="#0ea5e9" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </article>
      </section>
    </div>
  );
};

export default Visitors;

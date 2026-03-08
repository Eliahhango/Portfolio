import React, { useEffect, useState } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminFetch } from '../../lib/adminApi';
import type { NewsletterSubscriber, NewsletterSubscriberResponse } from '../../types/admin';

type SubscriberFilter = 'all' | 'confirmed' | 'pending';

const filters: Array<{ label: string; value: SubscriberFilter }> = [
  { label: 'All', value: 'all' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Pending', value: 'pending' },
];

const Newsletter: React.FC = () => {
  const { getFirebaseToken } = useAdminAuth();
  const [filter, setFilter] = useState<SubscriberFilter>('all');
  const [page, setPage] = useState(1);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [pagination, setPagination] = useState<NewsletterSubscriberResponse['pagination']>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadSubscribers = async (nextFilter = filter, nextPage = page) => {
    setIsLoading(true);
    setError('');

    try {
      const token = await getFirebaseToken();

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      const query = new URLSearchParams({
        page: String(nextPage),
        limit: '20',
      });

      if (nextFilter === 'confirmed') {
        query.set('confirmed', 'true');
      } else if (nextFilter === 'pending') {
        query.set('confirmed', 'false');
      }

      const data = await adminFetch<NewsletterSubscriberResponse>(`/api/newsletter/subscribers?${query.toString()}`, token);
      setSubscribers(data.subscribers);
      setConfirmedCount(data.confirmedCount);
      setPagination(data.pagination);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load subscribers.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadSubscribers(filter, page);
  }, [filter, page]);

  const deleteSubscriber = async (subscriberId: string) => {
    const confirmed = window.confirm('Delete this subscriber?');

    if (!confirmed) {
      return;
    }

    setError('');

    try {
      const token = await getFirebaseToken();

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      await adminFetch<{ message: string }>(`/api/newsletter/subscribers/${subscriberId}`, token, {
        method: 'DELETE',
      });

      await loadSubscribers(filter, page);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete subscriber.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Newsletter</h1>
          <p className="mt-2 text-sm text-slate-600">Manage subscribers collected from the public newsletter section.</p>
        </div>
        <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200/70">
          <p className="text-sm text-slate-500">Confirmed subscribers</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{confirmedCount.toLocaleString()}</p>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                setFilter(item.value);
                setPage(1);
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === item.value ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Subscribed</th>
                <th className="pb-3 pr-4">Confirmed At</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-sm text-slate-500">
                    <Loader2 className="mx-auto mb-2 h-5 w-5 animate-spin" />
                    Loading subscribers...
                  </td>
                </tr>
              ) : subscribers.length > 0 ? (
                subscribers.map((subscriber) => (
                  <tr key={subscriber._id}>
                    <td className="py-4 pr-4 text-sm font-semibold text-slate-900">{subscriber.email}</td>
                    <td className="py-4 pr-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${subscriber.confirmed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {subscriber.confirmed ? 'Confirmed' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-sm text-slate-600">{new Date(subscriber.createdAt).toLocaleString()}</td>
                    <td className="py-4 pr-4 text-sm text-slate-600">
                      {subscriber.confirmedAt ? new Date(subscriber.confirmedAt).toLocaleString() : 'Not confirmed yet'}
                    </td>
                    <td className="py-4">
                      <button
                        type="button"
                        onClick={() => void deleteSubscriber(subscriber._id)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-sm text-slate-500">
                    No subscribers found for this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            Page {pagination.page} of {Math.max(pagination.pages, 1)}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(current - 1, 1))}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page >= pagination.pages}
              onClick={() => setPage((current) => Math.min(current + 1, pagination.pages))}
              className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;

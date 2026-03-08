import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2, Trash2, X } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminFetch } from '../../lib/adminApi';
import type { ContactListResponse, ContactMessage, ContactStatus } from '../../types/admin';
import StatusBadge from '../../components/admin/StatusBadge';

const filters: Array<{ label: string; value: 'all' | ContactStatus }> = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Read', value: 'read' },
  { label: 'Replied', value: 'replied' },
  { label: 'Archived', value: 'archived' },
];

const formatDate = (value: string) => {
  return new Date(value).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

const Messages: React.FC = () => {
  const { getFirebaseToken } = useAdminAuth();
  const [filter, setFilter] = useState<'all' | ContactStatus>('all');
  const [page, setPage] = useState(1);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pagination, setPagination] = useState<ContactListResponse['pagination']>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 1,
  });
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [statusDraft, setStatusDraft] = useState<ContactStatus>('new');
  const [notesDraft, setNotesDraft] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPanelLoading, setIsPanelLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [error, setError] = useState('');

  const loadMessages = async (nextFilter = filter, nextPage = page) => {
    setIsLoading(true);
    setError('');

    try {
      const token = await getFirebaseToken();

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      const query = new URLSearchParams({
        page: String(nextPage),
        limit: '10',
      });

      if (nextFilter !== 'all') {
        query.set('status', nextFilter);
      }

      const data = await adminFetch<ContactListResponse>(`/api/contact?${query.toString()}`, token);

      setMessages(data.messages);
      setUnreadCount(data.unreadCount);
      setPagination(data.pagination);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load messages.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadMessages(filter, page);
  }, [filter, page]);

  const openMessage = async (messageId: string) => {
    setIsPanelLoading(true);
    setError('');

    try {
      const token = await getFirebaseToken();

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      const data = await adminFetch<ContactMessage>(`/api/contact/${messageId}`, token);
      setSelectedMessage(data);
      setStatusDraft(data.status);
      setNotesDraft(data.notes ?? '');
      await loadMessages(filter, page);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load message details.');
    } finally {
      setIsPanelLoading(false);
    }
  };

  const updateMessage = async (nextStatus = statusDraft) => {
    if (!selectedMessage) {
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const token = await getFirebaseToken();

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      const data = await adminFetch<{ contactMessage: ContactMessage }>(
        `/api/contact/${selectedMessage._id}/status`,
        token,
        {
          method: 'PATCH',
          body: JSON.stringify({
            status: nextStatus,
            notes: notesDraft,
          }),
        },
      );

      setSelectedMessage(data.contactMessage);
      setStatusDraft(data.contactMessage.status);
      setNotesDraft(data.contactMessage.notes ?? '');
      await loadMessages(filter, page);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Failed to update the message.');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteMessage = async () => {
    if (!selectedMessage) {
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const token = await getFirebaseToken();

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      await adminFetch<{ message: string }>(`/api/contact/${selectedMessage._id}`, token, {
        method: 'DELETE',
      });

      setSelectedMessage(null);
      setIsDeleteModalOpen(false);
      await loadMessages(filter, page);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete the message.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
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
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === item.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item.label}
              {item.value === 'new' && unreadCount > 0 && (
                <span className={`rounded-full px-2 py-0.5 text-xs ${filter === item.value ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'}`}>
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                <th className="pb-3 pr-4">Sender</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Subject</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-sm text-slate-500">
                    Loading messages...
                  </td>
                </tr>
              ) : messages.length > 0 ? (
                messages.map((message) => (
                  <tr
                    key={message._id}
                    className="cursor-pointer transition hover:bg-slate-50"
                    onClick={() => void openMessage(message._id)}
                  >
                    <td className="py-4 pr-4 text-sm font-semibold text-slate-900">{message.name}</td>
                    <td className="py-4 pr-4 text-sm text-slate-600">{message.email}</td>
                    <td className="py-4 pr-4 text-sm text-slate-600">{message.subject}</td>
                    <td className="py-4 pr-4 text-sm text-slate-500">{formatDate(message.createdAt)}</td>
                    <td className="py-4">
                      <StatusBadge status={message.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-sm text-slate-500">
                    No messages found for this filter.
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
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((current) => Math.max(current - 1, 1))}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              type="button"
              disabled={page >= pagination.pages}
              onClick={() => setPage((current) => Math.min(current + 1, pagination.pages))}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <div
        className={`fixed inset-0 z-40 bg-slate-950/45 transition-opacity duration-300 ${selectedMessage ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setSelectedMessage(null)}
      />

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-white shadow-2xl transition-transform duration-300 ${selectedMessage ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-blue-600">Message Details</p>
            <h2 className="mt-1 text-xl font-bold text-slate-900">{selectedMessage?.subject || 'Contact message'}</h2>
          </div>
          <button
            type="button"
            onClick={() => setSelectedMessage(null)}
            className="rounded-2xl border border-slate-200 p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
            aria-label="Close message panel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {isPanelLoading ? (
            <div className="flex h-full items-center justify-center text-slate-500">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Loading message...
            </div>
          ) : selectedMessage ? (
            <div className="space-y-6">
              <div className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Sender</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{selectedMessage.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{selectedMessage.email}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Received</p>
                  <p className="mt-2 text-sm text-slate-900">{formatDate(selectedMessage.createdAt)}</p>
                  <div className="mt-3">
                    <StatusBadge status={selectedMessage.status} />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">Message</p>
                <div className="mt-3 rounded-3xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm">
                  {selectedMessage.message}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Status</span>
                  <select
                    value={statusDraft}
                    onChange={(event) => setStatusDraft(event.target.value as ContactStatus)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Internal Notes</span>
                  <textarea
                    value={notesDraft}
                    onChange={(event) => setNotesDraft(event.target.value)}
                    rows={5}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
                    placeholder="Add notes for the team..."
                  />
                </label>
              </div>
            </div>
          ) : null}
        </div>

        <div className="border-t border-slate-200 px-6 py-5">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!selectedMessage || isSaving}
              onClick={() => void updateMessage()}
              className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Save Changes
            </button>
            <button
              type="button"
              disabled={!selectedMessage || isSaving}
              onClick={() => {
                setStatusDraft('replied');
                void updateMessage('replied');
              }}
              className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Mark as Replied
            </button>
            <button
              type="button"
              disabled={!selectedMessage || isSaving}
              onClick={() => {
                setStatusDraft('archived');
                void updateMessage('archived');
              }}
              className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Archive
            </button>
            <button
              type="button"
              disabled={!selectedMessage || isSaving}
              onClick={() => setIsDeleteModalOpen(true)}
              className="ml-auto inline-flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        </div>
      </aside>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/55 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900">Delete message?</h3>
            <p className="mt-2 text-sm text-slate-600">
              This action is permanent and cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void deleteMessage()}
                className="rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;

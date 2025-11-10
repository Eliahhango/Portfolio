import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
  notes?: string;
}

const MessagesManager: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'read' | 'replied' | 'archived'>('all');
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || '';
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchMessages();
  }, [statusFilter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const params = statusFilter !== 'all' ? `?status=${statusFilter}` : '';
      const response = await fetch(`${apiUrl}/api/contact${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setMessages(data.messages || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/contact/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, notes }),
      });
      if (response.ok) {
        fetchMessages();
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
        }
        setNotes('');
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const response = await fetch(`${apiUrl}/api/contact/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        fetchMessages();
        if (selectedMessage?._id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const openMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    setNotes(message.notes || '');
    // Mark as read if new
    if (message.status === 'new') {
      await updateStatus(message._id, 'read');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      case 'read': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'replied': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'archived': return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Messages List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Contact Messages
            {unreadCount > 0 && (
              <span className="ml-2 px-2 py-1 bg-blue-500 text-white text-sm rounded-full">
                {unreadCount} new
              </span>
            )}
          </h2>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-slate-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
          >
            <option value="all">All Messages</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-slate-600 dark:text-gray-400">No messages found</div>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => openMessage(message)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedMessage?._id === message._id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-blue-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-slate-900 dark:text-white">{message.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${getStatusColor(message.status)}`}>
                        {message.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-gray-400 mb-1">{message.email}</p>
                    <p className="font-medium text-slate-800 dark:text-gray-200">{message.subject}</p>
                    <p className="text-sm text-slate-600 dark:text-gray-400 mt-2 line-clamp-2">
                      {message.message}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-gray-500 ml-4">
                    {new Date(message.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail */}
      <div className="lg:col-span-1">
        {selectedMessage ? (
          <div className="bg-white dark:bg-gray-950 p-6 rounded-lg border border-slate-200 dark:border-gray-800 sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Message Details</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-slate-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-gray-400">Name</label>
                <p className="text-slate-900 dark:text-white">{selectedMessage.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-gray-400">Email</label>
                <p className="text-slate-900 dark:text-white">{selectedMessage.email}</p>
              </div>
              {selectedMessage.phone && (
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-gray-400">Phone</label>
                  <p className="text-slate-900 dark:text-white">{selectedMessage.phone}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-gray-400">Subject</label>
                <p className="text-slate-900 dark:text-white">{selectedMessage.subject}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-gray-400">Message</label>
                <p className="text-slate-900 dark:text-white whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-gray-400 mb-2 block">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-slate-900 dark:text-white"
                  placeholder="Add internal notes..."
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(selectedMessage._id, 'read')}
                  className="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                >
                  Mark Read
                </button>
                <button
                  onClick={() => updateStatus(selectedMessage._id, 'replied')}
                  className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                >
                  Mark Replied
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(selectedMessage._id, 'archived')}
                  className="flex-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                >
                  Archive
                </button>
                <button
                  onClick={() => deleteMessage(selectedMessage._id)}
                  className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-950 p-6 rounded-lg border border-slate-200 dark:border-gray-800 text-center text-slate-600 dark:text-gray-400">
            Select a message to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesManager;


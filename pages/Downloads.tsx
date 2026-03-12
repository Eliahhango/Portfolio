import React, { useState } from 'react';
import SEO from '../components/SEO';

const resources = [
  { title: 'Security Checklist (TXT)', path: '/resources/security-checklist.txt' }
];

const Downloads: React.FC = () => {
  const [email, setEmail] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      // Reuse newsletter subscribe as a simple gate
      const res = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Please try again');
      setUnlocked(true);
      setMessage('Downloads unlocked! A confirmation email has also been sent.');
    } catch (err: any) {
      setMessage(err.message || 'Failed to unlock.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-24 pb-16">
      <SEO title="Downloads | EliTechWiz" description="Free resources and checklists." canonical="https://www.elitechwiz.site/downloads" url="https://www.elitechwiz.site/downloads" />
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Free Resources</h1>
        {!unlocked ? (
          <form onSubmit={handleUnlock} className="mt-6 flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
            <button disabled={loading} className="px-6 py-3 bg-blue-600 text-white rounded-lg disabled:bg-blue-400">
              {loading ? 'Unlocking...' : 'Unlock'}
            </button>
          </form>
        ) : (
          <div className="mt-6 space-y-3">
            {resources.map((r) => (
              <a key={r.path} href={r.path} className="block p-4 rounded-lg border border-slate-200 dark:border-white/10 hover:border-blue-400">
                {r.title}
              </a>
            ))}
          </div>
        )}
        {message && <p className="mt-3 text-slate-600 dark:text-gray-300">{message}</p>}
      </div>
    </section>
  );
};

export default Downloads;



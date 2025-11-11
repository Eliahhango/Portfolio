import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AdminLoginProps {
  onLogin: (token: string, admin: any) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Use relative URL for single deployment, or VITE_API_URL if set
      const cfg = (import.meta.env.VITE_API_URL || '').trim();
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const payload = isRegister ? { email, password, name } : { email, password };
      const join = (base: string) => (base ? base.replace(/\/+$/, '') : '') + endpoint;
      const bases = Array.from(new Set([
        cfg,
        typeof window !== 'undefined' ? window.location.origin : '',
        '' // relative, same-origin
      ])).filter(Boolean);

      let response: Response | null = null;
      let lastErr: string | undefined;
      for (const base of bases) {
        try {
          response = await fetch(join(base), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (response.ok) break;
          // collect textual message for better diagnostics
          const ct = response.headers.get('content-type') || '';
          const txt = ct.includes('application/json') ? JSON.stringify(await response.json()) : await response.text();
          lastErr = `HTTP ${response.status} from ${join(base)}: ${txt?.slice(0, 200)}`;
        } catch (e: any) {
          lastErr = `Network error to ${join(base)}: ${e?.message || e}`;
        }
      }
      if (!response) throw new Error('No response from server');

      if (!response.ok) {
        // Read safely using a clone so we don't consume the original stream twice
        const clone = response.clone();
        let msg = '';
        try {
          const ct = clone.headers.get('content-type') || '';
          msg = ct.includes('application/json')
            ? (await clone.json())?.message || ''
            : await clone.text();
        } catch {}
        throw new Error(msg || lastErr || (isRegister ? 'Registration failed' : 'Login failed'));
      }

      // Success path
      const data = await response.json();
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('admin', JSON.stringify(data.admin));
      onLogin(data.token, data.admin);
    } catch (err: any) {
      setError(err.message || (isRegister ? 'Failed to register' : 'Failed to login'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-gray-950 rounded-lg shadow-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-2 text-slate-900 dark:text-white">
          {isRegister ? 'Initialize Admin' : 'Admin Dashboard'}
        </h1>
        <p className="text-center text-slate-600 dark:text-gray-400 mb-8">
          {isRegister ? 'Create the first (main) admin. This can be done only once.' : 'Sign in to manage your portfolio'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isRegister}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Jane Doe"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@elitechwiz.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (isRegister ? 'Creating...' : 'Signing in...') : (isRegister ? 'Create Main Admin' : 'Sign In')}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-slate-600 dark:text-gray-400">
          {isRegister ? (
            <button className="underline" onClick={() => setIsRegister(false)}>
              Back to Sign In
            </button>
          ) : (
            <button className="underline" onClick={() => setIsRegister(true)}>
              First time? Initialize main admin
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;


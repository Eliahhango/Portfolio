import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, ExternalLink, Loader2, LockKeyhole, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, isConfigured, missingConfig, configurationError, login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isBusy = isSubmitting || (isLoading && !isAuthenticated);
  const showSetupChecklist = !isConfigured;

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f172a] px-6 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_38%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),_transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.88),rgba(15,23,42,0.96))]" />

      <div className={`relative grid w-full gap-6 ${showSetupChecklist ? 'max-w-6xl lg:grid-cols-[1.1fr_0.9fr]' : 'max-w-md'} `}>
        {showSetupChecklist && (
          <div className="rounded-3xl border border-amber-300/20 bg-white/10 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.55)] backdrop-blur-2xl">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-500/10 text-amber-300">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Admin setup required</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  The admin dashboard is installed, but the frontend Firebase environment is not configured yet.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/45 p-5">
              <p className="text-sm font-semibold text-white">Missing frontend variables</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {missingConfig.map((item) => (
                  <span key={item} className="rounded-full border border-amber-300/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-5">
                <p className="font-semibold text-white">1. Frontend `.env`</p>
                <p className="mt-2">Fill in the Firebase web app keys in the root `.env` file.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-5">
                <p className="font-semibold text-white">2. Backend `server/.env`</p>
                <p className="mt-2">Add `FIREBASE_SERVICE_ACCOUNT_JSON` or `GOOGLE_APPLICATION_CREDENTIALS`.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-5">
                <p className="font-semibold text-white">3. Firebase Auth + Firestore</p>
                <p className="mt-2">Create an email/password admin user and add their profile in the `admins` collection.</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              <span>Detailed setup steps are in `ADMIN_DASHBOARD_SETUP.md`.</span>
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-white/15 bg-white/10 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.55)] backdrop-blur-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/25 bg-blue-500/10 text-blue-300">
            <LockKeyhole className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-3xl font-bold tracking-tight text-white">ElitechWiz Admin</h1>
          <p className="mt-2 text-sm text-slate-300">Secure access for portfolio administrators.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Email</span>
            <div className="flex items-center rounded-2xl border border-white/10 bg-slate-950/55 px-4">
              <Mail className="h-4 w-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                autoComplete="email"
                className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-slate-500"
                placeholder="admin@elitechwiz.site"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-200">Password</span>
            <div className="flex items-center rounded-2xl border border-white/10 bg-slate-950/55 px-4">
              <LockKeyhole className="h-4 w-4 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-slate-500"
                placeholder="Enter your password"
              />
            </div>
          </label>

          {(error || configurationError) && (
            <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error || configurationError}
            </div>
          )}

          <button
            type="submit"
            disabled={isBusy || !isConfigured}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/25 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isBusy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              isConfigured ? 'Sign In' : 'Finish Setup First'
            )}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-xs text-slate-400">
          <span>Firebase Auth + Firestore admin verification</span>
          <a
            href="https://console.firebase.google.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-blue-300 transition hover:text-blue-200"
          >
            Firebase Console
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminLogin;

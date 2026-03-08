import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../constants';
import { buildApiUrl } from '../utils/api';

const benefits = ['Weekly security tips', 'No spam, ever', 'Unsubscribe anytime'];

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [confirmUrl, setConfirmUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const subscriberAvatars = useMemo(() => TESTIMONIALS_DATA.slice(0, 4), []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(false);
    setMessage('');
    setConfirmUrl('');
    setLoading(true);

    try {
      const response = await fetch(buildApiUrl('/api/newsletter/subscribe'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed');
      }

      setSubmitted(true);
      setMessage('Check your email to confirm subscription.');
      if (data.confirmUrl) {
        setConfirmUrl(data.confirmUrl);
      }
      setEmail('');
    } catch (submitError: unknown) {
      const errorMessage = submitError instanceof Error ? submitError.message : 'Subscription failed. Try again.';
      setSubmitted(true);
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 text-white dark:bg-slate-950">
      <motion.div
        aria-hidden="true"
        className="absolute -left-16 top-8 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl"
        animate={{ x: [0, 24, 0], y: [0, 14, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-8 bottom-0 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl"
        animate={{ x: [0, -18, 0], y: [0, -24, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-blue-300">Newsletter</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
            Stay in the Loop
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Security insights, software notes, and practical lessons from active client work, sent with restraint.
          </p>

          <div className="mt-8 flex flex-col items-center gap-5">
            <div className="flex items-center">
              <div className="flex -space-x-3">
                {subscriberAvatars.map((person) => (
                  <img
                    key={person.name}
                    src={person.avatarUrl}
                    alt={person.name}
                    className="h-10 w-10 rounded-full border-2 border-slate-900 object-cover dark:border-slate-950"
                  />
                ))}
              </div>
              <p className="ml-4 text-sm font-semibold text-slate-200">Join 500+ subscribers</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-300">
              {benefits.map((benefit) => (
                <span key={benefit} className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>{benefit}</span>
                </span>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-2xl">
            <div className="flex flex-col gap-3 rounded-[2rem] border border-white/20 bg-white/10 px-4 py-4 backdrop-blur-sm sm:flex-row sm:items-center sm:gap-2">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                required
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none sm:text-base"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-600 hover:to-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Submitting...' : 'Subscribe'}
              </button>
            </div>

            {submitted && (
              <div className={`mt-4 text-sm ${message.toLowerCase().includes('failed') ? 'text-rose-300' : 'text-emerald-300'}`}>
                <p>{message}</p>
                {confirmUrl && (
                  <p className="mt-1">
                    Dev quick-confirm:{' '}
                    <a className="underline" href={confirmUrl} target="_blank" rel="noreferrer">
                      Open link
                    </a>
                  </p>
                )}
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;

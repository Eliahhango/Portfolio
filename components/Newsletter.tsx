import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MailIcon } from '../constants';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [confirmUrl, setConfirmUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(false);
    setMessage('');
    setConfirmUrl('');
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Subscription failed');
      setSubmitted(true);
      setMessage('Check your email to confirm subscription.');
      if (data.confirmUrl) setConfirmUrl(data.confirmUrl); // handy for testing
      setEmail('');
    } catch (err: any) {
      setSubmitted(true);
      setMessage(err.message || 'Subscription failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 py-12 sm:py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <MailIcon className="w-12 h-12 text-yellow-400" />
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Stay Updated with Latest Security Insights
          </h3>
          <p className="text-blue-100 dark:text-blue-200 mb-8 text-sm sm:text-base">
            Get expert cybersecurity tips, software development insights, and exclusive content delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 disabled:cursor-not-allowed text-blue-900 font-semibold rounded-lg transition-colors duration-300 whitespace-nowrap text-sm sm:text-base"
              >
                {loading ? 'Submitting...' : (submitted ? 'Subscribed!' : 'Subscribe')}
              </button>
            </div>
            {submitted && (
              <div className="mt-3 text-yellow-300 text-sm">
                <p>{message}</p>
                {confirmUrl && (
                  <p className="mt-1">
                    Dev quick-confirm: <a className="underline" href={confirmUrl} target="_blank" rel="noreferrer">Open link</a>
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


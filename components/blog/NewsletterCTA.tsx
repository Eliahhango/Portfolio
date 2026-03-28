import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../../firebase.js';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const NewsletterCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail) {
        throw new Error('Email is required');
      }
      const apiUrl = String(import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');
      if (apiUrl) {
        const response = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: normalizedEmail }),
        });
        if (!response.ok) {
          throw new Error('Subscription failed');
        }
      } else {
        await setDoc(doc(db, 'newsletter_subscribers', normalizedEmail), {
          email: normalizedEmail,
          source: 'website',
          createdAt: serverTimestamp(),
        }, { merge: true });
      }

      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.section
      className="relative py-20 px-6 lg:px-8 overflow-hidden bg-slate-50 rounded-2xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Background elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, 0.05) 25%, rgba(0, 0, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.05) 75%, rgba(0, 0, 0, 0.05) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, 0.05) 25%, rgba(0, 0, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.05) 75%, rgba(0, 0, 0, 0.05) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Gradient glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-gradient-to-l from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl opacity-40" />

      {/* Content */}
      <div className="relative max-w-2xl mx-auto text-center">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Never Miss an<br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Insight
            </span>
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed">
            Get practical insights on cybersecurity, software architecture, and digital innovation delivered directly to your inbox. No spam, just valuable content.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 mt-8"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-6 py-3 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-colors duration-200"
            disabled={status === 'loading'}
          />

          <motion.button
            type="submit"
            disabled={status === 'loading'}
            whileHover={{ scale: status === 'loading' || status === 'success' ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 rounded-xl font-semibold whitespace-nowrap shadow-lg transition-all duration-300 ${
              status === 'success'
                ? 'bg-green-600 text-white border-0'
                : status === 'error'
                  ? 'bg-red-600 text-white border-0'
                  : 'bg-blue-600 text-white border-0 hover:bg-blue-700'
            }`}
          >
            {status === 'loading' && (
              <span className="flex items-center gap-2">
                <motion.div
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Subscribing...
              </span>
            )}
            {status === 'success' && 'Subscribed!'}
            {status === 'error' && 'Try again'}
            {!['loading', 'success', 'error'].includes(status) && 'Subscribe Now'}
          </motion.button>
        </motion.form>

        {/* Privacy note */}
        <motion.p
          variants={itemVariants}
          className="text-xs text-slate-500 mt-4"
        >
          We respect your privacy. Unsubscribe anytime with one click.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default NewsletterCTA;

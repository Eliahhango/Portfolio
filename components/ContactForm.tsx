import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Send } from 'lucide-react';

const subjectOptions = ['Project Inquiry', 'Consultation', 'Partnership', 'Other'];

const confettiDots = [
  { top: '10%', left: '18%', color: 'bg-blue-400', delay: 0 },
  { top: '18%', right: '20%', color: 'bg-cyan-400', delay: 0.08 },
  { bottom: '22%', left: '14%', color: 'bg-emerald-400', delay: 0.12 },
  { bottom: '14%', right: '16%', color: 'bg-amber-400', delay: 0.18 },
  { top: '48%', left: '8%', color: 'bg-violet-400', delay: 0.22 },
  { top: '44%', right: '10%', color: 'bg-sky-400', delay: 0.28 },
];

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+255',
    phone: '',
    subject: 'Project Inquiry',
    message: '',
  });
  const [focusedField, setFocusedField] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

  const messageCount = useMemo(() => formData.message.length, [formData.message]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const tokenInput = document.querySelector('input[name="cf-turnstile-response"]') as HTMLInputElement | null;
      const turnstileToken = tokenInput?.value || '';

      if (!turnstileToken) {
        throw new Error('Please complete the CAPTCHA verification.');
      }

      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: formData.phone.trim() ? `${formData.countryCode} ${formData.phone.trim()}` : '',
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        countryCode: '+255',
        phone: '',
        subject: 'Project Inquiry',
        message: '',
      });

      const container = document.getElementById('cf-turnstile-container');
      if (container) {
        container.innerHTML = `<div class="cf-turnstile" data-sitekey="${siteKey}" data-theme="auto"></div>`;
      }

      window.setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (submitError: unknown) {
      const message = submitError instanceof Error ? submitError.message : 'Failed to send message. Please try again.';
      setError(message);
      console.error('Contact form error:', submitError);
    } finally {
      setLoading(false);
    }
  };

  const getFieldState = (fieldName: keyof typeof formData) => {
    return focusedField === fieldName || Boolean(formData[fieldName]);
  };

  const fieldClassName =
    'peer w-full rounded-2xl border border-slate-200 bg-white px-4 pb-3 pt-6 text-sm text-slate-900 outline-none transition focus:border-blue-300 dark:border-white/10 dark:bg-slate-950/40 dark:text-white';

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-black/20 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">Contact Form</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Send Me a Message</h3>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.28 }}
            className="relative mt-8 overflow-hidden rounded-[2rem] border border-emerald-200 bg-emerald-50 px-6 py-10 text-center dark:border-emerald-500/20 dark:bg-emerald-500/10"
          >
            {confettiDots.map((dot, index) => (
              <motion.span
                key={index}
                className={`absolute h-3 w-3 rounded-full ${dot.color}`}
                style={dot}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: [0, 1, 0.7], scale: [0.4, 1, 0.9], y: [0, -10, 4] }}
                transition={{ duration: 1.4, delay: dot.delay, repeat: Infinity, repeatType: 'mirror' }}
              />
            ))}

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.25 }}
              className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-emerald-500 shadow-lg"
            >
              <CheckCircle2 className="h-10 w-10" />
            </motion.div>
            <h4 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">Message Sent</h4>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-200">
              Thank you. Your message has been sent successfully and I will get back to you soon.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-8 space-y-4"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
              >
                {error}
              </motion.div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField('')}
                  required
                  placeholder=" "
                  className={fieldClassName}
                />
                <label
                  htmlFor="name"
                  className={`pointer-events-none absolute left-4 transition-all ${
                    getFieldState('name')
                      ? 'top-2 text-xs font-semibold text-blue-500'
                      : 'top-1/2 -translate-y-1/2 text-sm text-slate-400'
                  }`}
                >
                  Your Name *
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  required
                  placeholder=" "
                  className={fieldClassName}
                />
                <label
                  htmlFor="email"
                  className={`pointer-events-none absolute left-4 transition-all ${
                    getFieldState('email')
                      ? 'top-2 text-xs font-semibold text-blue-500'
                      : 'top-1/2 -translate-y-1/2 text-sm text-slate-400'
                  }`}
                >
                  Email Address *
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[150px_1fr]">
              <div className="relative">
                <select
                  id="countryCode"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('countryCode')}
                  onBlur={() => setFocusedField('')}
                  className={fieldClassName}
                >
                  <option value="+255">🇹🇿 +255</option>
                </select>
                <label
                  htmlFor="countryCode"
                  className={`pointer-events-none absolute left-4 transition-all ${
                    getFieldState('countryCode')
                      ? 'top-2 text-xs font-semibold text-blue-500'
                      : 'top-1/2 -translate-y-1/2 text-sm text-slate-400'
                  }`}
                >
                  Code
                </label>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField('')}
                  placeholder=" "
                  className={fieldClassName}
                />
                <label
                  htmlFor="phone"
                  className={`pointer-events-none absolute left-4 transition-all ${
                    getFieldState('phone')
                      ? 'top-2 text-xs font-semibold text-blue-500'
                      : 'top-1/2 -translate-y-1/2 text-sm text-slate-400'
                  }`}
                >
                  Phone Number
                </label>
              </div>
            </div>

            <div className="relative">
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                onFocus={() => setFocusedField('subject')}
                onBlur={() => setFocusedField('')}
                className={fieldClassName}
              >
                {subjectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <label
                htmlFor="subject"
                className={`pointer-events-none absolute left-4 transition-all ${
                  getFieldState('subject')
                    ? 'top-2 text-xs font-semibold text-blue-500'
                    : 'top-1/2 -translate-y-1/2 text-sm text-slate-400'
                }`}
              >
                Subject *
              </label>
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField('')}
                required
                rows={7}
                maxLength={5000}
                placeholder=" "
                className={`${fieldClassName} resize-none`}
              />
              <label
                htmlFor="message"
                className={`pointer-events-none absolute left-4 transition-all ${
                  getFieldState('message')
                    ? 'top-2 text-xs font-semibold text-blue-500'
                    : 'top-6 text-sm text-slate-400'
                }`}
              >
                Message *
              </label>
              <span className="absolute bottom-3 right-4 text-xs font-medium text-slate-400">
                {messageCount} / 5000
              </span>
            </div>

            <div id="cf-turnstile-container" className="pt-2">
              <div className="cf-turnstile" data-sitekey={siteKey} data-theme="auto"></div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              <span>{loading ? 'Sending...' : 'Send Message'}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;

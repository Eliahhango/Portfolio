import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MailIcon, PhoneIcon } from '../constants';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      // Reset the token by reloading the widget container
      const container = document.getElementById('cf-turnstile-container');
      if (container) {
        container.innerHTML = `<div class="cf-turnstile" data-sitekey="${siteKey}" data-theme="auto"></div>`;
      }
      
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to send message. Please try again.');
      console.error('Contact form error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-100 dark:bg-gray-950 rounded-lg p-6 sm:p-8 md:p-10">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Send Me a Message</h3>
      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-100 dark:bg-green-900/30 border border-green-400 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg mb-6"
        >
          <p className="font-semibold">Thank you! Your message has been sent successfully. I'll get back to you soon! 🎉</p>
        </motion.div>
      )}
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6"
        >
          <p className="font-semibold">{error}</p>
        </motion.div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="john@example.com"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="+255 688 164 510"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Project Inquiry"
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
            placeholder="Tell me about your project or inquiry..."
          />
        </div>
        <div id="cf-turnstile-container" className="mt-2">
          <div className="cf-turnstile" data-sitekey={siteKey} data-theme="auto"></div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:transform-none"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;


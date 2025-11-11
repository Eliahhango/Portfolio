import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ConfirmSubscription: React.FC = () => {
  const { token = '' } = useParams();
  const [status, setStatus] = useState<'loading'|'success'|'error'>('loading');
  const [message, setMessage] = useState('Confirming subscription...');

  useEffect(() => {
    const run = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${apiUrl}/api/newsletter/confirm`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Confirmation failed');
        setStatus('success');
        setMessage('Subscription confirmed! 🎉');
      } catch (err: any) {
        setStatus('error');
        setMessage(err.message || 'Failed to confirm subscription.');
      }
    };
    run();
  }, [token]);

  return (
    <section className="pt-24 pb-16">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Newsletter</h1>
        <p className={`mt-4 ${status === 'error' ? 'text-red-600' : 'text-slate-700 dark:text-gray-300'}`}>{message}</p>
      </div>
    </section>
  );
};

export default ConfirmSubscription;



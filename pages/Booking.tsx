import React from 'react';
import SEO from '../components/SEO';

const Booking: React.FC = () => {
  const url = import.meta.env.VITE_BOOKING_URL || 'https://calendly.com/your-calendly-username/intro-call';
  return (
    <section className="pt-24 pb-16">
      <SEO title="Book a Call | EliTechWiz" description="Schedule a consultation or intro call." canonical="https://www.elitechwiz.site/booking" url="https://www.elitechwiz.site/booking" />
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Book a Call</h1>
        <p className="mt-2 text-slate-600 dark:text-gray-400">Pick a time that works for you.</p>
        <div className="mt-6 rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden">
          <iframe title="Booking" src={url} className="w-full h-[900px] bg-white dark:bg-black" />
        </div>
      </div>
    </section>
  );
};

export default Booking;



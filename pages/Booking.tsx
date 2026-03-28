import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Mail, MessageCircle, PhoneCall, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

const bookingOptions = [
  {
    title: 'Book Intro Call',
    description: 'Use your preferred channel to schedule a 30-minute discovery session.',
    icon: CalendarDays,
    actionLabel: 'Email to Book',
    href: 'mailto:contact@elitechwiz.com?subject=Booking%20Request',
  },
  {
    title: 'WhatsApp Consultation',
    description: 'Fast response for project scope, timeline, and technical questions.',
    icon: MessageCircle,
    actionLabel: 'Open WhatsApp',
    href: 'https://wa.me/255742631101',
  },
  {
    title: 'Direct Phone Booking',
    description: 'Speak directly for urgent requests and incident-response inquiries.',
    icon: PhoneCall,
    actionLabel: 'Call Now',
    href: 'tel:+255688164510',
  },
];

const Booking: React.FC = () => {
  return (
    <section className="pt-24 pb-20">
      <SEO
        title="Book a Session | EliTechWiz"
        description="Book a consultation for cybersecurity, engineering, and design projects."
        canonical="https://www.elitechwiz.site/booking"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-blue-50 via-white to-slate-100 p-8 shadow-sm backdrop-blur-xl dark:border-slate-700/60 dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-900/60 md:p-12"
      >
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/60 bg-blue-100/60 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
            <CalendarDays className="h-4 w-4" />
            Booking
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">Schedule a Consultation</h1>
          <p className="mt-4 text-base text-slate-700 dark:text-gray-300 md:text-lg">
            Let us map your goals, risk profile, and architecture requirements in a focused call.
          </p>
        </div>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {bookingOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.a
              key={option.title}
              href={option.href}
              target={option.href.startsWith('http') ? '_blank' : undefined}
              rel={option.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/70"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{option.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-gray-300">{option.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                {option.actionLabel}
                <ArrowRight className="h-4 w-4" />
              </span>
            </motion.a>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200/80 bg-white/80 p-6 backdrop-blur-lg dark:border-slate-700/60 dark:bg-slate-900/65">
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 h-5 w-5 text-blue-500" />
          <p className="text-sm leading-6 text-slate-600 dark:text-gray-300">
            For enterprise engagements, include your preferred timeline, budget range, and primary objectives in the initial email for faster planning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Booking;

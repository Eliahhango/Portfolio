import React from 'react';
import { motion } from 'framer-motion';
import { Check, ExternalLink } from 'lucide-react';
import SectionHeader from './SectionHeader';

const JOURNEY_DATA = [
  {
    year: '2020 - Present',
    role: 'CEO & Lead Architect',
    company: 'EliTechWiz Innovations',
    responsibilities: [
      'Direct end-to-end delivery for secure platforms, internal tooling, and high-visibility client builds.',
      'Set technical architecture standards across frontend, backend, and infrastructure decisions.',
      'Lead product strategy, delivery planning, and quality control from concept through launch.',
    ],
  },
  {
    year: '2018 - 2020',
    role: 'Senior Security Consultant',
    company: 'CyberSafe Corp',
    responsibilities: [
      'Ran penetration tests and red-team assessments for enterprise environments with strict compliance requirements.',
      'Produced remediation plans and worked directly with engineering teams to close critical findings.',
      'Advised leadership on security posture, risk prioritization, and incident readiness.',
    ],
  },
  {
    year: '2015 - 2018',
    role: 'Full-Stack Developer',
    company: 'DevSolutions Ltd.',
    responsibilities: [
      'Built and maintained scalable web applications with a focus on resilient backend services.',
      'Translated product requirements into responsive interfaces and reliable API integrations.',
      'Improved release velocity by standardizing reusable components and development workflows.',
    ],
  },
];

type JourneyEntry = (typeof JOURNEY_DATA)[number];

const TimelineCard: React.FC<{ item: JourneyEntry }> = ({ item }) => (
  <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-800/60">
    <span className="inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-300">
      {item.year}
    </span>
    <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">{item.role}</h3>
    <div className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-300">
      <span>{item.company}</span>
      <ExternalLink className="h-3.5 w-3.5 text-blue-500" />
    </div>

    <ul className="mt-5 space-y-3">
      {item.responsibilities.map((responsibility) => (
        <li key={responsibility} className="flex items-start gap-3 text-sm leading-7 text-slate-600 dark:text-slate-200">
          <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
            <Check className="h-3.5 w-3.5" />
          </span>
          <span>{responsibility}</span>
        </li>
      ))}
    </ul>
  </article>
);

const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-12 sm:py-16 md:py-20">
      <SectionHeader
        tag="Experience"
        title="My Journey"
        subtitle="A timeline of leadership, security work, and product delivery across the roles that shaped how I build today."
        variant="timeline"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-slate-200 dark:bg-white/10 lg:left-1/2 lg:-translate-x-1/2" />

          <div className="space-y-10">
            {JOURNEY_DATA.map((item, index) => {
              const isRightAligned = index % 2 === 1;

              return (
                <motion.div
                  key={`${item.company}-${item.year}`}
                  initial={{ opacity: 0, x: isRightAligned ? 48 : -48 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="relative grid gap-6 pl-14 lg:grid-cols-[1fr_auto_1fr] lg:gap-10 lg:pl-0"
                >
                  <div className="lg:hidden">
                    <TimelineCard item={item} />
                  </div>

                  <div className={`${isRightAligned ? 'hidden lg:block' : 'hidden lg:block lg:pr-12'}`}>
                    {!isRightAligned && <TimelineCard item={item} />}
                  </div>

                  <div className="absolute left-5 top-6 -translate-x-1/2 lg:static lg:translate-x-0">
                    <div className="relative flex h-10 w-10 items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-blue-500/15 animate-ping" />
                      <span className="relative h-4 w-4 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-900" />
                    </div>
                  </div>

                  <div className={`${isRightAligned ? 'hidden lg:block lg:pl-12' : 'hidden lg:block'}`}>
                    {isRightAligned && <TimelineCard item={item} />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  tag?: string;
  variant?: 'default' | 'skills' | 'timeline' | 'showcase' | 'proof' | 'contact';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = 'center',
  tag,
  variant = 'default',
}) => {
  const isCentered = align === 'center';
  const variantStyles = {
    default: {
      tag: 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300',
      line: 'from-blue-500 to-cyan-400',
    },
    skills: {
      tag: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300',
      line: 'from-emerald-500 to-teal-400',
    },
    timeline: {
      tag: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300',
      line: 'from-amber-500 to-orange-400',
    },
    showcase: {
      tag: 'border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300',
      line: 'from-indigo-500 to-blue-500',
    },
    proof: {
      tag: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-300',
      line: 'from-sky-500 to-cyan-400',
    },
    contact: {
      tag: 'border-blue-200 bg-white text-blue-700 dark:border-blue-500/30 dark:bg-slate-900/70 dark:text-blue-300',
      line: 'from-blue-600 to-violet-500',
    },
  } as const;
  const theme = variantStyles[variant];

  return (
    <div className={`mb-12 ${isCentered ? 'text-center' : 'text-left'}`}>
      <div className={`flex flex-col ${isCentered ? 'items-center' : 'items-start'}`}>
        {tag && (
          <span className={`mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-bold tracking-[0.18em] uppercase ${theme.tag}`}>
            {tag}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h2>
        <motion.span
          initial={{ scaleX: 0, opacity: 0.5 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className={`mt-4 block h-0.5 rounded-full bg-gradient-to-r ${theme.line} ${
            isCentered ? 'w-12 origin-center' : 'w-16 origin-left'
          }`}
        />
        {subtitle && (
          <p
            className={`mt-3 text-base text-slate-500 dark:text-slate-400 max-w-xl ${
              isCentered ? 'mx-auto' : ''
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;

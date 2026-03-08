import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  tag?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = 'center',
  tag,
}) => {
  const isCentered = align === 'center';

  return (
    <div className={`mb-12 ${isCentered ? 'text-center' : 'text-left'}`}>
      <div className={`flex flex-col ${isCentered ? 'items-center' : 'items-start'}`}>
        {tag && (
          <span className="text-xs font-bold tracking-widest text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full inline-block mb-3 uppercase">
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
          className={`mt-4 block w-10 h-0.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 ${
            isCentered ? 'origin-center' : 'origin-left'
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

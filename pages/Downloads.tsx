import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileCode2, Shield, BookOpenText, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';

const resources = [
  {
    title: 'Firebase Setup Guide',
    description: 'Step-by-step Firebase and Firestore setup checklist for this portfolio.',
    format: 'Markdown',
    icon: FileCode2,
    url: 'https://github.com/Eliahhango/Portfolio/blob/main/FIREBASE_SETUP.md',
  },
  {
    title: 'Deployment Guide',
    description: 'Deployment notes for Vercel and production environment configuration.',
    format: 'Markdown',
    icon: Download,
    url: 'https://github.com/Eliahhango/Portfolio/blob/main/VERCEL_DEPLOYMENT.md',
  },
  {
    title: 'Security Checklist',
    description: 'Security baseline checklist for hardening app routing, auth, and content.',
    format: 'Documentation',
    icon: Shield,
    url: 'https://github.com/Eliahhango/Portfolio/blob/main/pages/utility/Security.tsx',
  },
  {
    title: 'Admin Dashboard Notes',
    description: 'Operational notes for managing content, users, and publishing workflows.',
    format: 'Documentation',
    icon: BookOpenText,
    url: 'https://github.com/Eliahhango/Portfolio/blob/main/ADMIN_DASHBOARD_README.md',
  },
];

const Downloads: React.FC = () => {
  return (
    <section className="pt-24 pb-20">
      <SEO
        title="Downloads | EliTechWiz"
        description="Download setup guides, deployment references, and project documentation."
        canonical="https://www.elitechwiz.site/downloads"
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-100 via-white to-blue-50 p-8 shadow-sm backdrop-blur-xl dark:border-slate-700/60 dark:from-slate-900/95 dark:via-slate-900/80 dark:to-slate-900/60 md:p-12"
      >
        <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">Downloads</h1>
        <p className="mt-4 max-w-3xl text-base text-slate-700 dark:text-gray-300 md:text-lg">
          Practical resources to help you deploy, secure, and maintain a professional portfolio setup on Firebase and modern frontend infrastructure.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <motion.a
              key={resource.title}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/70"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{resource.title}</h2>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
                  {resource.format}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-gray-300">{resource.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300">
                Open resource
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
};

export default Downloads;

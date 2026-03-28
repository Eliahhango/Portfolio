import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

type CaseStudyMeta = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  cover: string;
};

const modules = import.meta.glob('../content/case-studies/**/*.mdx', { eager: true }) as Record<string, any>;

const studies: CaseStudyMeta[] = Object.entries(modules)
  .map(([path, mod]) => {
    const frontmatter = mod.frontmatter || {};
    const fallbackSlug = path.split('/').pop()?.replace(/\.mdx?$/, '') || 'case-study';
    return {
      slug: frontmatter.slug || fallbackSlug,
      title: frontmatter.title || 'Case Study',
      summary: frontmatter.summary || 'Project highlights and implementation breakdown.',
      date: frontmatter.date || new Date().toISOString(),
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      cover:
        frontmatter.cover ||
        'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const CaseStudies: React.FC = () => {
  return (
    <section className="pt-24 pb-20">
      <SEO
        title="Case Studies | EliTechWiz"
        description="Detailed case studies on cybersecurity, engineering, and product delivery outcomes."
        canonical="https://www.elitechwiz.site/case-studies"
      />

      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-700/50 bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900/90 dark:to-slate-900/60 p-8 md:p-12 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/50 bg-blue-100/60 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300">
            <ShieldCheck className="h-4 w-4" />
            Delivery Insights
          </div>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">
            Case Studies
          </h1>
          <p className="mt-4 text-base text-slate-700 dark:text-gray-300 md:text-lg">
            Real projects, clear outcomes, and technical decisions that moved security and product metrics forward.
          </p>
        </motion.div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {studies.map((study, index) => (
          <motion.article
            key={study.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white/85 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700/60 dark:bg-slate-900/70"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={study.cover}
                alt={study.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-blue-100">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-950/40 px-3 py-1 backdrop-blur-md">
                  <FileText className="h-3.5 w-3.5" />
                  Case Study
                </span>
                <span>{new Date(study.date).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{study.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-gray-300">{study.summary}</p>
              {!!study.tags.length && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <Link
                to={`/case-studies/${study.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Read full breakdown
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default CaseStudies;

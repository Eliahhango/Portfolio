import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { MDXProvider } from '@mdx-js/react';
import SEO from '../components/SEO';

const modules = import.meta.glob('../content/case-studies/**/*.mdx', { eager: true }) as Record<string, any>;

const mdxComponents = {
  h2: (props: any) => <h2 className="mt-10 text-2xl font-bold text-slate-900 dark:text-white" {...props} />,
  h3: (props: any) => <h3 className="mt-8 text-xl font-semibold text-slate-900 dark:text-white" {...props} />,
  p: (props: any) => <p className="mt-4 leading-7 text-slate-700 dark:text-gray-300" {...props} />,
  ul: (props: any) => <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700 dark:text-gray-300" {...props} />,
  li: (props: any) => <li {...props} />,
  a: (props: any) => <a className="text-blue-600 underline dark:text-blue-400" {...props} />,
};

const CaseStudyPost: React.FC = () => {
  const { slug = '' } = useParams();

  const entry = Object.entries(modules).find(([path, mod]) => {
    const fileSlug = path.split('/').pop()?.replace(/\.mdx?$/, '');
    const frontmatter = (mod as any).frontmatter || {};
    return frontmatter.slug === slug || fileSlug === slug;
  });

  if (!entry) {
    return (
      <section className="pt-24 pb-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Case Study Not Found</h1>
          <p className="mt-3 text-slate-600 dark:text-gray-300">
            The case study you requested is unavailable. Check the full case studies archive.
          </p>
          <Link
            to="/case-studies"
            className="mt-6 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </Link>
        </div>
      </section>
    );
  }

  const [, mod] = entry;
  const Study = (mod as any).default as React.ComponentType;
  const frontmatter = (mod as any).frontmatter || {};
  const pageTitle = frontmatter.title || 'Case Study';
  const pageSummary = frontmatter.summary || 'Project breakdown and implementation notes.';
  const cover =
    frontmatter.cover ||
    'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <section className="pt-24 pb-20">
      <SEO
        title={`${pageTitle} | EliTechWiz`}
        description={pageSummary}
        type="article"
        canonical={`https://www.elitechwiz.site/case-studies/${slug}`}
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/75"
      >
        <img src={cover} alt={pageTitle} className="h-64 w-full object-cover md:h-80" />
        <div className="p-6 md:p-10">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Case Studies
          </Link>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">{pageTitle}</h1>
          <p className="mt-3 text-base text-slate-600 dark:text-gray-300">{pageSummary}</p>

          {!!frontmatter.tags?.length && (
            <div className="mt-5 flex flex-wrap gap-2">
              {frontmatter.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <article className="prose prose-slate mt-8 max-w-none dark:prose-invert">
            <MDXProvider components={mdxComponents}>
              <Study />
            </MDXProvider>
          </article>
        </div>
      </motion.div>
    </section>
  );
};

export default CaseStudyPost;

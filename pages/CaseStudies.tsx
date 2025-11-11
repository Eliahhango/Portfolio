import React from 'react';
import { Link } from 'react-router-dom';

const cases = Object.entries(
  import.meta.glob('../content/case-studies/**/*.mdx', { eager: true })
) as unknown as [string, { frontmatter?: any; default: React.ComponentType }][];

type Meta = { title: string; summary?: string; date?: string; tags?: string[]; slug?: string; cover?: string };

function toSlug(filePath: string, fm?: Meta): string {
  if (fm?.slug) return fm.slug;
  const last = filePath.split('/').pop() || '';
  return last.replace(/\.mdx?$/, '');
}

const CaseStudies: React.FC = () => {
  const list = cases
    .map(([path, mod]) => {
      const fm = (mod as any).frontmatter as Meta | undefined;
      return {
        slug: toSlug(path, fm),
        title: fm?.title || toSlug(path, fm),
        summary: fm?.summary || '',
        date: fm?.date || '',
        tags: fm?.tags || [],
        cover: fm?.cover || ''
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Case Studies</h1>
        <p className="mt-2 text-slate-600 dark:text-gray-400">In-depth stories behind selected projects.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <Link key={c.slug} to={`/case-studies/${c.slug}`} className="group rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden hover:border-blue-400 dark:hover:border-blue-400 transition-colors">
              {c.cover && <img src={c.cover} alt="" className="w-full h-40 object-cover" loading="lazy" />}
              <div className="p-5">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600">{c.title}</h2>
                {c.date && <div className="mt-1 text-xs text-slate-500">{new Date(c.date).toLocaleDateString()}</div>}
                {c.summary && <p className="mt-2 text-sm text-slate-600 dark:text-gray-400">{c.summary}</p>}
                {!!c.tags?.length && (
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {c.tags.map((t) => <span key={t} className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-white/10">{t}</span>)}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;



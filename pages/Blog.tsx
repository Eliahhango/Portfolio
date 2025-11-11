import React from 'react';
import { Link } from 'react-router-dom';

// Import all MDX files under content/blog at build-time
const posts = Object.entries(
  import.meta.glob('../content/blog/**/*.mdx', { eager: true })
) as unknown as [string, { frontmatter?: any; default: React.ComponentType }][];

type PostMeta = {
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  slug?: string;
};

function toSlug(filePath: string, fm?: PostMeta): string {
  if (fm?.slug) return fm.slug;
  const last = filePath.split('/').pop() || '';
  return last.replace(/\.mdx?$/, '');
}

const Blog: React.FC = () => {
  const list = posts
    .map(([path, mod]) => {
      const fm = (mod as any).frontmatter as PostMeta | undefined;
      return {
        slug: toSlug(path, fm),
        title: fm?.title || toSlug(path, fm),
        description: fm?.description || '',
        date: fm?.date || '',
        tags: fm?.tags || []
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <section id="blog" className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Blog</h1>
        <p className="mt-2 text-slate-600 dark:text-gray-400">Articles on security, software, and design.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {list.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="group rounded-xl border border-slate-200 dark:border-white/10 p-5 hover:border-blue-400 dark:hover:border-blue-400 transition-colors"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600">{p.title}</h2>
              {p.date && <div className="mt-1 text-xs text-slate-500">{new Date(p.date).toLocaleDateString()}</div>}
              {p.description && <p className="mt-2 text-sm text-slate-600 dark:text-gray-400">{p.description}</p>}
              {!!p.tags?.length && (
                <div className="mt-3 flex gap-2 flex-wrap">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;



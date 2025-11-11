import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import SEO from '../components/SEO';

const modules = import.meta.glob('../content/blog/**/*.mdx', { eager: true }) as any;

const components = {
  h2: (props: any) => <h2 className="mt-8 text-2xl font-bold" {...props} />,
  p: (props: any) => <p className="mt-4 leading-7 text-slate-700 dark:text-gray-300" {...props} />,
  a: (props: any) => <a className="text-blue-600 underline" {...props} />
};

const BlogPost: React.FC = () => {
  const { slug = '' } = useParams();

  const entry = Object.entries(modules).find(([path, mod]) => {
    const fileSlug = path.split('/').pop()?.replace(/\.mdx?$/, '');
    const fm = (mod as any).frontmatter;
    return fileSlug === slug || fm?.slug === slug;
  });

  if (!entry) {
    return (
      <section className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <Link to="/blog" className="text-blue-600 underline mt-2 inline-block">Back to blog</Link>
        </div>
      </section>
    );
  }

  const [, mod] = entry;
  const Post = (mod as any).default as React.ComponentType;
  const fm = (mod as any).frontmatter || {};

  return (
    <section className="pt-24 pb-16">
      <SEO
        title={fm.title}
        description={fm.description}
        type="article"
        canonical={`https://www.elitechwiz.site/blog/${slug}`}
        url={`https://www.elitechwiz.site/blog/${slug}`}
      />
      <div className="max-w-3xl mx-auto px-4">
        <Link to="/blog" className="text-blue-600 underline">← Back</Link>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">{fm.title}</h1>
        {fm.date && <div className="mt-2 text-sm text-slate-500">{new Date(fm.date).toLocaleDateString()}</div>}
        {!!fm.tags?.length && (
          <div className="mt-3 flex gap-2 flex-wrap">
            {fm.tags.map((t: string) => (
              <span key={t} className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-white/10">{t}</span>
            ))}
          </div>
        )}
        <div className="prose dark:prose-invert mt-8 max-w-none">
          <MDXProvider components={components}>
            <Post />
          </MDXProvider>
        </div>
      </div>
    </section>
  );
};

export default BlogPost;



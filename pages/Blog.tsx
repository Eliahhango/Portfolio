import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type ApiPost = { _id: string; title: string; slug: string; description?: string; tags?: string[]; createdAt?: string; cover?: string };

const Blog: React.FC = () => {
  const [list, setList] = useState<ApiPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${apiUrl}/api/blog`);
        if (res.ok) {
          const data = await res.json();
          setList(data);
          setLoaded(true);
        } else {
          setLoaded(true);
        }
      } catch {
        setLoaded(true);
      }
    };
    fetchPosts();
  }, []);

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
              {p.createdAt && <div className="mt-1 text-xs text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</div>}
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
          {!loaded && <div>Loading...</div>}
          {loaded && list.length === 0 && (
            <div className="text-slate-600 dark:text-gray-400">No posts yet.</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;



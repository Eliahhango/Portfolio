import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock3, FileText, Search } from 'lucide-react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import type { PublicBlogPost } from '../types';
import { buildApiUrl } from '../utils/api';

const tagColorMap: Record<string, { badge: string; surface: string }> = {
  security: {
    badge: 'bg-rose-500/15 text-rose-200 border border-rose-400/20',
    surface: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-200',
  },
  design: {
    badge: 'bg-fuchsia-500/15 text-fuchsia-200 border border-fuchsia-400/20',
    surface: 'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-200',
  },
  software: {
    badge: 'bg-emerald-500/15 text-emerald-200 border border-emerald-400/20',
    surface: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200',
  },
  default: {
    badge: 'bg-blue-500/15 text-blue-100 border border-blue-400/20',
    surface: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-200',
  },
};

const gradientMap: Record<string, string> = {
  security: 'from-rose-500 via-red-500 to-orange-400',
  design: 'from-fuchsia-500 via-violet-500 to-purple-400',
  software: 'from-emerald-500 via-green-500 to-teal-400',
  default: 'from-blue-600 via-sky-500 to-cyan-400',
};

const resolveTagKey = (tag?: string) => {
  if (!tag) {
    return 'default';
  }

  const normalized = tag.trim().toLowerCase();

  if (normalized.includes('security')) {
    return 'security';
  }

  if (normalized.includes('design')) {
    return 'design';
  }

  if (normalized.includes('software')) {
    return 'software';
  }

  return 'default';
};

const readTimeFromContentLength = (contentLength: number, readTimeMinutes?: number) => {
  if (typeof readTimeMinutes === 'number' && Number.isFinite(readTimeMinutes)) {
    return Math.max(1, readTimeMinutes);
  }

  return Math.max(1, Math.ceil(contentLength / 200));
};

const SearchBar: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-2xl items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-[0_25px_80px_rgba(15,23,42,0.35)] backdrop-blur-2xl">
      <Search className="h-5 w-5 shrink-0 text-slate-300" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search articles by title, description, or tag..."
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400 sm:text-base"
        aria-label="Search blog articles"
      />
    </div>
  );
};

const BlogSkeletonCard: React.FC = () => {
  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-800/60">
      <div className="h-48 animate-pulse bg-slate-200 dark:bg-slate-700/70" />
      <div className="space-y-4 p-6">
        <div className="h-4 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700/70" />
        <div className="h-6 w-4/5 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700/70" />
        <div className="h-4 w-full animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700/70" />
        <div className="h-4 w-2/3 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700/70" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700/70" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700/70" />
        </div>
      </div>
    </div>
  );
};

const EmptyState: React.FC<{ hasSearch: boolean }> = ({ hasSearch }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-slate-300 bg-white/70 px-6 py-20 text-center backdrop-blur dark:border-white/10 dark:bg-slate-900/40">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500/15 to-cyan-400/15 text-blue-500 dark:text-cyan-300">
        <FileText className="h-10 w-10" />
      </div>
      <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        {hasSearch ? 'No matching articles found.' : 'No articles yet. Check back soon!'}
      </h2>
      <p className="mt-3 max-w-md text-sm leading-7 text-slate-500 dark:text-slate-400">
        {hasSearch
          ? 'Try a different keyword, title, or tag to find the article you are looking for.'
          : 'Fresh insights on cybersecurity, software engineering, and design will appear here soon.'}
      </p>
    </div>
  );
};

const Blog: React.FC = () => {
  const [list, setList] = useState<PublicBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/blog'));

        if (response.ok) {
          const data = (await response.json()) as PublicBlogPost[];
          setList(data);
        }
      } catch {
        setList([]);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return list;
    }

    return list.filter((post) => {
      const searchable = [
        post.title,
        post.description || '',
        post.tags.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [list, query]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <SEO
        title="The Blog | EliTechWiz"
        description="Articles and insights on cybersecurity, software engineering, and digital product design."
        canonical="https://www.elitechwiz.site/blog"
        url="https://www.elitechwiz.site/blog"
      />
      <ScrollProgress />
      <Header activeSection="" />

      <main className="relative overflow-hidden">
        <section className="relative overflow-hidden bg-[#0f172a] px-4 pb-16 pt-32 sm:px-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_38%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),_transparent_32%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.88),rgba(15,23,42,0.96))]" />

          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-blue-200">
              Blog
            </span>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              The Blog
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Insights on cybersecurity, software architecture, and product design. Search the latest articles and find the topics that matter most.
            </p>
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </section>

        <section className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 4 }, (_, index) => (
                <BlogSkeletonCard key={index} />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => {
                const primaryTag = post.tags[0] || 'Insights';
                const tagKey = resolveTagKey(primaryTag);
                const tagClasses = tagColorMap[tagKey];
                const gradientClasses = gradientMap[tagKey];
                const readTime = readTimeFromContentLength(post.contentLength, post.readTimeMinutes);

                return (
                  <article
                    key={post.slug}
                    className="group overflow-hidden rounded-[1.4rem] transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden rounded-t-[1.4rem]">
                      {post.cover ? (
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className={`h-full w-full bg-gradient-to-br ${gradientClasses}`}>
                          <div className="flex h-full items-end bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.28),transparent_40%)] p-6">
                            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">
                              {primaryTag}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-slate-950/10 to-transparent" />
                      <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${tagClasses.badge}`}>
                        {primaryTag}
                      </span>
                    </div>

                    <div className="rounded-b-[1.4rem] border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 group-hover:border-blue-200 dark:border-white/10 dark:bg-slate-800/60 dark:group-hover:border-cyan-400/30">
                      <Link to={`/blog/${post.slug}`} className="block">
                        <h2 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-300">
                          {post.title}
                        </h2>
                      </Link>

                      {post.createdAt && (
                        <div className="mt-3 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                      )}

                      {post.description && (
                        <p
                          className="mt-4 line-clamp-2 text-sm leading-7 text-slate-600 dark:text-slate-300"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {post.description}
                        </p>
                      )}

                      {post.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.map((tag) => {
                            const color = tagColorMap[resolveTagKey(tag)] || tagColorMap.default;

                            return (
                              <span
                                key={tag}
                                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${color.surface}`}
                              >
                                {tag}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-4 dark:border-white/10">
                        <div className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                          <Clock3 className="h-3.5 w-3.5" />
                          <span>{readTime} min read</span>
                        </div>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-cyan-500 dark:text-cyan-300 dark:hover:text-cyan-200"
                        >
                          Read Article
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <EmptyState hasSearch={query.trim().length > 0} />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

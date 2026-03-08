import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock3,
  Copy,
  ListTree,
  Share2,
} from 'lucide-react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import { LinkedInIcon, TwitterIcon } from '../constants';
import type { PublicBlogPost } from '../types';
import { buildApiUrl } from '../utils/api';
import { defaultAboutContent } from '../utils/siteContent';

const modules = import.meta.glob('../content/blog/**/*.mdx', { eager: true }) as Record<string, any>;

interface ApiBlogPostDetail {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  content: string;
  tags: string[];
  cover?: string;
  createdAt?: string;
}

interface TocItem {
  id: string;
  title: string;
}

const author = {
  name: 'EliTechWiz',
  avatar: defaultAboutContent.imageUrl,
  bio: 'Cybersecurity strategist and software architect sharing field notes on secure systems, engineering, and digital product design.',
};

const tagStyles: Record<string, string> = {
  security: 'bg-rose-500/15 text-rose-200 border border-rose-400/20',
  design: 'bg-fuchsia-500/15 text-fuchsia-200 border border-fuchsia-400/20',
  software: 'bg-emerald-500/15 text-emerald-200 border border-emerald-400/20',
  default: 'bg-blue-500/15 text-blue-100 border border-blue-400/20',
};

const relatedCardGradients: Record<string, string> = {
  security: 'from-rose-500 via-red-500 to-orange-400',
  design: 'from-fuchsia-500 via-violet-500 to-purple-400',
  software: 'from-emerald-500 via-green-500 to-teal-400',
  default: 'from-blue-600 via-sky-500 to-cyan-400',
};

const normalizeTag = (tag?: string) => {
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

const extractPlainText = (value: unknown): string => {
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map((item) => extractPlainText(item)).join('');
  }

  if (React.isValidElement(value)) {
    return extractPlainText((value.props as { children?: React.ReactNode }).children);
  }

  return '';
};

const cleanHeadingText = (rawHeading: string) => {
  return rawHeading
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_>#]/g, '')
    .replace(/<[^>]+>/g, '')
    .trim();
};

const slugifyHeading = (value: string) => {
  return cleanHeadingText(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const extractHeadingsFromMarkdown = (content: string): TocItem[] => {
  const matches = Array.from(content.matchAll(/^##\s+(.+)$/gm));

  return matches
    .map((match) => cleanHeadingText(match[1]))
    .filter(Boolean)
    .map((title) => ({
      id: slugifyHeading(title),
      title,
    }));
};

const calculateReadTime = (content: string) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const markdownComponents = {
  h2: ({ children, ...props }: any) => {
    const title = extractPlainText(children);
    const id = slugifyHeading(title);

    return (
      <h2
        id={id}
        className="scroll-mt-28 mt-14 text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: any) => {
    const title = extractPlainText(children);
    const id = slugifyHeading(title);

    return (
      <h3
        id={id}
        className="scroll-mt-28 mt-10 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white"
        {...props}
      >
        {children}
      </h3>
    );
  },
  p: (props: any) => <p className="mt-6 text-base leading-8 text-slate-700 dark:text-slate-300" {...props} />,
  a: (props: any) => (
    <a
      className="font-semibold text-blue-600 underline decoration-blue-300 underline-offset-4 transition hover:text-cyan-500 dark:text-cyan-300 dark:decoration-cyan-500/50"
      {...props}
    />
  ),
  ul: (props: any) => <ul className="mt-6 list-disc space-y-3 pl-6 text-slate-700 dark:text-slate-300" {...props} />,
  ol: (props: any) => <ol className="mt-6 list-decimal space-y-3 pl-6 text-slate-700 dark:text-slate-300" {...props} />,
  li: (props: any) => <li className="leading-8" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="mt-8 rounded-2xl border-l-4 border-blue-500 bg-blue-50/80 px-6 py-5 text-slate-700 shadow-sm dark:border-cyan-400 dark:bg-white/5 dark:text-slate-200"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre
      className="mt-8 overflow-x-auto rounded-2xl bg-slate-950 px-5 py-4 text-sm text-slate-100 shadow-xl shadow-slate-900/20"
      {...props}
    />
  ),
  code: ({ inline, className, ...props }: any) =>
    inline ? (
      <code
        className="rounded-md bg-slate-100 px-1.5 py-1 text-[0.9em] text-blue-700 dark:bg-white/10 dark:text-cyan-200"
        {...props}
      />
    ) : (
      <code className={className} {...props} />
    ),
  img: (props: any) => (
    <img
      className="mt-8 w-full rounded-2xl border border-slate-200 object-cover shadow-sm dark:border-white/10"
      {...props}
    />
  ),
  hr: (props: any) => <hr className="my-10 border-slate-200 dark:border-white/10" {...props} />,
  strong: (props: any) => <strong className="font-semibold text-slate-900 dark:text-white" {...props} />,
};

const BlogPost: React.FC = () => {
  const { slug = '' } = useParams();
  const [apiPost, setApiPost] = useState<ApiBlogPostDetail | null>(null);
  const [allPosts, setAllPosts] = useState<PublicBlogPost[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');

  useEffect(() => {
    let isActive = true;

    const fetchData = async () => {
      try {
        const [postResult, listResult] = await Promise.allSettled([
          fetch(buildApiUrl(`/api/blog/${slug}`)),
          fetch(buildApiUrl('/api/blog')),
        ]);

        if (!isActive) {
          return;
        }

        if (postResult.status === 'fulfilled' && postResult.value.ok) {
          const data = (await postResult.value.json()) as ApiBlogPostDetail;
          setApiPost(data);
        } else {
          setApiPost(null);
        }

        if (listResult.status === 'fulfilled' && listResult.value.ok) {
          const data = (await listResult.value.json()) as PublicBlogPost[];
          setAllPosts(data);
        } else {
          setAllPosts([]);
        }
      } catch {
        if (isActive) {
          setApiPost(null);
          setAllPosts([]);
        }
      } finally {
        if (isActive) {
          setLoaded(true);
        }
      }
    };

    void fetchData();

    return () => {
      isActive = false;
    };
  }, [slug]);

  useEffect(() => {
    setCopyState('idle');
  }, [slug]);

  const entry = Object.entries(modules).find(([path, mod]) => {
    const fileSlug = path.split('/').pop()?.replace(/\.mdx?$/, '');
    const fm = (mod as any).frontmatter;
    return fileSlug === slug || fm?.slug === slug;
  });

  const articleUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }

    return `https://www.elitechwiz.site/blog/${slug}`;
  }, [slug]);

  const tableOfContents = useMemo(() => {
    return apiPost ? extractHeadingsFromMarkdown(apiPost.content) : [];
  }, [apiPost]);

  const relatedPosts = useMemo(() => {
    if (!apiPost) {
      return [];
    }

    return allPosts
      .filter((post) => post.slug !== apiPost.slug && post.tags.some((tag) => apiPost.tags.includes(tag)))
      .slice(0, 3);
  }, [allPosts, apiPost]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1800);
    } catch {
      setCopyState('idle');
    }
  };

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!apiPost && !entry && loaded) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <SEO
          title="Post Not Found | EliTechWiz"
          description="The article you are looking for could not be found."
          canonical={`https://www.elitechwiz.site/blog/${slug}`}
          url={`https://www.elitechwiz.site/blog/${slug}`}
        />
        <ScrollProgress />
        <Header activeSection="" />
        <section className="px-4 pb-20 pt-32 sm:px-6">
          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm dark:border-white/10 dark:bg-slate-900/50">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Post not found</h1>
            <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
              The article you requested is unavailable or has been removed.
            </p>
            <Link
              to="/blog"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (apiPost) {
    const primaryTag = apiPost.tags[0] || 'Article';
    const tagStyle = tagStyles[normalizeTag(primaryTag)];
    const readTime = calculateReadTime(apiPost.content);
    const publishedDate = apiPost.createdAt
      ? new Date(apiPost.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : 'Recently published';

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <SEO
          title={apiPost.title}
          description={apiPost.description}
          image={apiPost.cover}
          type="article"
          canonical={`https://www.elitechwiz.site/blog/${slug}`}
          url={`https://www.elitechwiz.site/blog/${slug}`}
        />
        <ScrollProgress />
        <Header activeSection="" />

        <main>
          <section className="relative overflow-hidden bg-[#0f172a] px-4 pb-14 pt-32 sm:px-6 lg:px-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.22),_transparent_38%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),_transparent_32%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.88),rgba(15,23,42,0.96))]" />

            <div className="relative mx-auto max-w-6xl">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-200 transition hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>

              <div className="mt-8 max-w-4xl">
                <span className={`inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] ${tagStyle}`}>
                  {primaryTag}
                </span>

                <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl">
                  {apiPost.title}
                </h1>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="h-11 w-11 rounded-full border border-white/15 object-cover"
                    />
                    <div>
                      <p className="font-semibold text-white">{author.name}</p>
                      <p className="text-xs text-slate-400">Author</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{publishedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock3 className="h-4 w-4" />
                    <span>{readTime} min read</span>
                  </div>
                </div>

                {apiPost.cover && (
                  <img
                    src={apiPost.cover}
                    alt={apiPost.title}
                    className="mt-10 h-64 w-full rounded-2xl object-cover shadow-2xl shadow-slate-950/30 sm:h-80"
                  />
                )}
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px]">
              <article className="min-w-0">
                <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-sm dark:border-white/10 dark:bg-slate-900/50 sm:px-10">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={markdownComponents}
                  >
                    {apiPost.content}
                  </ReactMarkdown>
                </div>
              </article>

              <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/50">
                  <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    <ListTree className="h-4 w-4" />
                    Table of Contents
                  </div>
                  {tableOfContents.length > 0 ? (
                    <nav className="mt-5 space-y-3">
                      {tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="block text-sm leading-6 text-slate-600 transition hover:text-blue-600 dark:text-slate-300 dark:hover:text-cyan-300"
                        >
                          {item.title}
                        </a>
                      ))}
                    </nav>
                  ) : (
                    <p className="mt-5 text-sm leading-7 text-slate-500 dark:text-slate-400">
                      This article does not include section headings yet.
                    </p>
                  )}
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/50">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    About the Author
                  </p>
                  <div className="mt-5 flex items-center gap-4">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="h-14 w-14 rounded-2xl object-cover ring-2 ring-blue-500/20"
                    />
                    <div>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white">{author.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Cybersecurity & software architecture</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {author.bio}
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/50">
                  <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                    <Share2 className="h-4 w-4" />
                    Share Article
                  </div>
                  <div className="mt-5 grid gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        openShareWindow(
                          `https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(apiPost.title)}`,
                        )
                      }
                      className="inline-flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 dark:border-white/10 dark:text-slate-200 dark:hover:border-cyan-400/30 dark:hover:text-cyan-300"
                    >
                      <span className="inline-flex items-center gap-2">
                        <TwitterIcon className="h-4 w-4" />
                        Twitter
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        openShareWindow(
                          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`,
                        )
                      }
                      className="inline-flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 dark:border-white/10 dark:text-slate-200 dark:hover:border-cyan-400/30 dark:hover:text-cyan-300"
                    >
                      <span className="inline-flex items-center gap-2">
                        <LinkedInIcon className="h-4 w-4" />
                        LinkedIn
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleCopyLink()}
                      className="inline-flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 dark:border-white/10 dark:text-slate-200 dark:hover:border-cyan-400/30 dark:hover:text-cyan-300"
                    >
                      <span className="inline-flex items-center gap-2">
                        {copyState === 'copied' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copyState === 'copied' ? 'Copied' : 'Copy Link'}
                      </span>
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {relatedPosts.length > 0 && (
            <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">Related Posts</p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Keep Reading
                  </h2>
                </div>
                <Link
                  to="/blog"
                  className="text-sm font-semibold text-blue-600 transition hover:text-cyan-500 dark:text-cyan-300 dark:hover:text-cyan-200"
                >
                  View all articles
                </Link>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {relatedPosts.map((post) => {
                  const primaryTagKey = normalizeTag(post.tags[0]);
                  const gradient = relatedCardGradients[primaryTagKey];

                  return (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      className="group overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 dark:border-white/10 dark:bg-slate-900/50 dark:hover:border-cyan-400/30"
                    >
                      {post.cover ? (
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className={`h-40 w-full bg-gradient-to-br ${gradient}`} />
                      )}
                      <div className="p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">
                          {post.tags[0] || 'Article'}
                        </p>
                        <h3 className="mt-3 text-lg font-bold text-slate-900 transition group-hover:text-blue-600 dark:text-white dark:group-hover:text-cyan-300">
                          {post.title}
                        </h3>
                        {post.description && (
                          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                            {post.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    );
  }

  const [, mod] = entry!;
  const Post = (mod as any).default as React.ComponentType;
  const fm = (mod as any).frontmatter || {};

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <SEO
        title={fm.title}
        description={fm.description}
        type="article"
        canonical={`https://www.elitechwiz.site/blog/${slug}`}
        url={`https://www.elitechwiz.site/blog/${slug}`}
      />
      <ScrollProgress />
      <Header activeSection="" />
      <section className="px-4 pb-20 pt-32 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white px-6 py-10 shadow-sm dark:border-white/10 dark:bg-slate-900/50 sm:px-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-cyan-500 dark:text-cyan-300 dark:hover:text-cyan-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 dark:text-white">{fm.title}</h1>
          {fm.date && (
            <div className="mt-4 flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
              <Calendar className="h-4 w-4" />
              <span>{new Date(fm.date).toLocaleDateString()}</span>
            </div>
          )}
          {!!fm.tags?.length && (
            <div className="mt-5 flex flex-wrap gap-2">
              {fm.tags.map((tag: string) => (
                <span
                  key={tag}
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${tagStyles[normalizeTag(tag)]}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="mt-10">
            <MDXProvider components={markdownComponents}>
              <Post />
            </MDXProvider>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogPost;

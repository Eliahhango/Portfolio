import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  FileText,
  Loader2,
  Pencil,
  PlusCircle,
  Trash2,
  X,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Toast, { type ToastState } from '../../components/admin/Toast';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminFetch, createSlug } from '../../lib/adminApi';
import type { BlogPostRecord } from '../../types/admin';

interface BlogEditorState {
  id?: string;
  title: string;
  slug: string;
  description: string;
  cover: string;
  tagDraft: string;
  tags: string[];
  content: string;
  published: boolean;
}

type SaveAction = 'draft' | 'publish' | null;
type SaveState = 'saved' | 'unsaved';

const emptyEditorState: BlogEditorState = {
  title: '',
  slug: '',
  description: '',
  cover: '',
  tagDraft: '',
  tags: [],
  content: '',
  published: false,
};

const formatDate = (value: string) => {
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const normalizeTag = (value: string) => {
  return value.trim().replace(/^#/, '').replace(/\s+/g, '-').toLowerCase();
};

const mergeTags = (tags: string[], draft = '') => {
  const merged = [...tags];

  draft
    .split(',')
    .map(normalizeTag)
    .filter(Boolean)
    .forEach((tag) => {
      if (!merged.includes(tag)) {
        merged.push(tag);
      }
    });

  return merged;
};

const getEditorStateFromPost = (post: BlogPostRecord): BlogEditorState => ({
  id: post._id,
  title: post.title,
  slug: post.slug,
  description: post.description || '',
  cover: post.cover || '',
  tagDraft: '',
  tags: post.tags,
  content: post.content || '',
  published: post.published,
});

const BlogManager: React.FC = () => {
  const { getFirebaseToken } = useAdminAuth();
  const contentTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [posts, setPosts] = useState<BlogPostRecord[]>([]);
  const [editor, setEditor] = useState<BlogEditorState>(emptyEditorState);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isSlugDirty, setIsSlugDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveAction, setSaveAction] = useState<SaveAction>(null);
  const [saveState, setSaveState] = useState<SaveState>('saved');
  const [error, setError] = useState('');
  const [toast, setToast] = useState<ToastState | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPostRecord | null>(null);

  const wordCount = useMemo(() => {
    return editor.content.trim() ? editor.content.trim().split(/\s+/).filter(Boolean).length : 0;
  }, [editor.content]);

  const estimatedReadTime = wordCount > 0 ? Math.max(1, Math.ceil(wordCount / 200)) : 0;

  const updateEditorState = (updater: (current: BlogEditorState) => BlogEditorState) => {
    setEditor((current) => updater(current));
    setSaveState('unsaved');
  };

  const showToast = (message: string, variant: ToastState['variant']) => {
    setToast({ message, variant });
  };

  const loadPosts = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = await getFirebaseToken();

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      const data = await adminFetch<BlogPostRecord[]>('/api/blog/admin/all', token);
      setPosts(data);
    } catch (loadError) {
      const message = loadError instanceof Error ? loadError.message : 'Failed to load blog posts.';
      setError(message);
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPosts();
  }, [getFirebaseToken]);

  const openNewEditor = () => {
    setEditor(emptyEditorState);
    setIsSlugDirty(false);
    setSaveState('saved');
    setIsEditorOpen(true);
    setError('');
  };

  const openEditEditor = (post: BlogPostRecord) => {
    setEditor(getEditorStateFromPost(post));
    setIsSlugDirty(true);
    setSaveState('saved');
    setIsEditorOpen(true);
    setError('');
  };

  const closeEditor = () => {
    setEditor(emptyEditorState);
    setIsSlugDirty(false);
    setSaveAction(null);
    setSaveState('saved');
    setIsEditorOpen(false);
  };

  const addTagFromDraft = () => {
    const nextTags = mergeTags(editor.tags, editor.tagDraft);

    if (nextTags.length === editor.tags.length && !editor.tagDraft.trim()) {
      return;
    }

    updateEditorState((current) => ({
      ...current,
      tags: nextTags,
      tagDraft: '',
    }));
  };

  const removeTag = (tagToRemove: string) => {
    updateEditorState((current) => ({
      ...current,
      tags: current.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addTagFromDraft();
    }
  };

  const updateContent = (nextContent: string) => {
    updateEditorState((current) => ({
      ...current,
      content: nextContent,
    }));
  };

  const insertMarkdown = (prefix: string, suffix = '', placeholder = '') => {
    const textarea = contentTextareaRef.current;
    const start = textarea?.selectionStart ?? editor.content.length;
    const end = textarea?.selectionEnd ?? editor.content.length;
    const selectedText = editor.content.slice(start, end);
    const fallbackText = placeholder || selectedText || '';
    const insertedText = `${prefix}${selectedText || fallbackText}${suffix}`;
    const nextContent = `${editor.content.slice(0, start)}${insertedText}${editor.content.slice(end)}`;

    updateContent(nextContent);

    requestAnimationFrame(() => {
      if (!textarea) {
        return;
      }

      textarea.focus();
      const selectionStart = start + prefix.length;
      const selectionEnd = selectionStart + (selectedText || fallbackText).length;
      textarea.setSelectionRange(selectionStart, selectionEnd);
    });
  };

  const prefixSelectedLines = (prefix: string, placeholder: string) => {
    const textarea = contentTextareaRef.current;
    const start = textarea?.selectionStart ?? editor.content.length;
    const end = textarea?.selectionEnd ?? editor.content.length;
    const selectedText = editor.content.slice(start, end) || placeholder;
    const nextBlock = selectedText
      .split('\n')
      .map((line) => `${prefix}${line}`)
      .join('\n');
    const nextContent = `${editor.content.slice(0, start)}${nextBlock}${editor.content.slice(end)}`;

    updateContent(nextContent);

    requestAnimationFrame(() => {
      if (!textarea) {
        return;
      }

      textarea.focus();
      textarea.setSelectionRange(start, start + nextBlock.length);
    });
  };

  const savePost = async (shouldPublish: boolean) => {
    setIsSaving(true);
    setSaveAction(shouldPublish ? 'publish' : 'draft');
    setError('');

    try {
      const token = await getFirebaseToken();

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      const finalTags = mergeTags(editor.tags, editor.tagDraft);

      if (!editor.title.trim() || !editor.content.trim()) {
        throw new Error('Title and content are required.');
      }

      const payload = {
        title: editor.title.trim(),
        slug: (editor.slug || createSlug(editor.title)).trim(),
        description: editor.description.trim(),
        cover: editor.cover.trim(),
        tags: finalTags,
        content: editor.content.trim(),
        published: shouldPublish,
      };

      const savedPost = editor.id
        ? await adminFetch<BlogPostRecord>(`/api/blog/${editor.id}`, token, {
            method: 'PUT',
            body: JSON.stringify(payload),
          })
        : await adminFetch<BlogPostRecord>('/api/blog', token, {
            method: 'POST',
            body: JSON.stringify(payload),
          });

      setEditor(getEditorStateFromPost(savedPost));
      setIsSlugDirty(true);
      setSaveState('saved');
      showToast(savedPost.published ? 'Blog post published successfully.' : 'Draft saved successfully.', 'success');
      await loadPosts();
    } catch (saveError) {
      const message = saveError instanceof Error ? saveError.message : 'Failed to save the post.';
      setError(message);
      showToast(message, 'error');
    } finally {
      setIsSaving(false);
      setSaveAction(null);
    }
  };

  const deletePost = async () => {
    if (!deleteTarget) {
      return;
    }

    setError('');

    try {
      const token = await getFirebaseToken();

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      await adminFetch<{ message: string }>(`/api/blog/${deleteTarget._id}`, token, {
        method: 'DELETE',
      });

      if (editor.id === deleteTarget._id) {
        closeEditor();
      }

      setDeleteTarget(null);
      showToast('Blog post deleted.', 'success');
      await loadPosts();
    } catch (deleteError) {
      const message = deleteError instanceof Error ? deleteError.message : 'Failed to delete the post.';
      setError(message);
      showToast(message, 'error');
    }
  };

  const statusPillClassName = editor.published
    ? 'bg-emerald-100 text-emerald-700'
    : 'bg-amber-100 text-amber-700';

  const markdownTools = [
    {
      label: 'B',
      title: 'Bold',
      onClick: () => insertMarkdown('**', '**', 'bold text'),
    },
    {
      label: 'I',
      title: 'Italic',
      onClick: () => insertMarkdown('*', '*', 'italic text'),
    },
    {
      label: '#',
      title: 'Heading',
      onClick: () => prefixSelectedLines('## ', 'Heading'),
    },
    {
      label: '`',
      title: 'Code',
      onClick: () => insertMarkdown('`', '`', 'code'),
    },
    {
      label: 'Link',
      title: 'Link',
      onClick: () => insertMarkdown('[', '](https://example.com)', 'link text'),
    },
    {
      label: '>',
      title: 'Quote',
      onClick: () => prefixSelectedLines('> ', 'Quoted text'),
    },
  ];

  if (isEditorOpen) {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <button
              type="button"
              onClick={closeEditor}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to posts
            </button>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {editor.id ? 'Edit Blog Post' : 'Create Blog Post'}
              </h1>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  saveState === 'saved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}
              >
                {saveState === 'saved' ? 'Saved' : 'Unsaved changes'}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-500">Write, preview, and publish without leaving the editor.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => void savePost(false)}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving && saveAction === 'draft' ? 'Saving Draft...' : 'Save Draft'}
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => void savePost(true)}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-700 hover:to-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving && saveAction === 'publish' ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Title</span>
                <input
                  type="text"
                  value={editor.title}
                  onChange={(event) => {
                    const nextTitle = event.target.value;
                    updateEditorState((current) => ({
                      ...current,
                      title: nextTitle,
                      slug: isSlugDirty ? current.slug : createSlug(nextTitle),
                    }));
                  }}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
                  placeholder="Post title"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Slug</span>
                <input
                  type="text"
                  value={editor.slug}
                  onChange={(event) => {
                    setIsSlugDirty(true);
                    updateEditorState((current) => ({
                      ...current,
                      slug: createSlug(event.target.value),
                    }));
                  }}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
                  placeholder="post-slug"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Description</span>
                <textarea
                  value={editor.description}
                  onChange={(event) =>
                    updateEditorState((current) => ({ ...current, description: event.target.value }))
                  }
                  rows={3}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
                  placeholder="Short summary for previews and SEO."
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Cover Image URL</span>
                <input
                  type="url"
                  value={editor.cover}
                  onChange={(event) =>
                    updateEditorState((current) => ({ ...current, cover: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
                  placeholder="https://images.example.com/post-cover.jpg"
                />
                {editor.cover.trim() && (
                  <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <img
                      src={editor.cover}
                      alt="Cover preview"
                      className="h-40 w-full object-cover"
                    />
                  </div>
                )}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Tags</span>
                <input
                  type="text"
                  value={editor.tagDraft}
                  onChange={(event) =>
                    updateEditorState((current) => ({ ...current, tagDraft: event.target.value }))
                  }
                  onKeyDown={handleTagKeyDown}
                  onBlur={addTagFromDraft}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
                  placeholder="Type a tag and press Enter"
                />
                {editor.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {editor.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="rounded-full text-blue-500 transition hover:text-blue-700"
                          aria-label={`Remove ${tag}`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </label>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="block text-sm font-semibold text-slate-700">Content (Markdown)</span>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusPillClassName}`}>
                    {editor.published ? 'Published' : 'Draft'}
                  </span>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <div className="sticky top-0 z-10 flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 px-3 py-3">
                    {markdownTools.map((tool) => (
                      <button
                        key={tool.title}
                        type="button"
                        onClick={tool.onClick}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
                        aria-label={tool.title}
                        title={tool.title}
                      >
                        {tool.label}
                      </button>
                    ))}
                  </div>
                  <textarea
                    ref={contentTextareaRef}
                    value={editor.content}
                    onChange={(event) => updateContent(event.target.value)}
                    rows={18}
                    className="w-full resize-y border-0 px-4 py-4 font-mono text-sm text-slate-700 outline-none"
                    placeholder="# Start writing..."
                  />
                </div>

                <p className="mt-3 text-xs font-medium text-slate-500">
                  {wordCount.toLocaleString()} words • {estimatedReadTime} min read
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70 lg:sticky lg:top-6 lg:self-start">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Live Preview</h2>
                <p className="mt-1 text-sm text-slate-500">See exactly how the article will read before you publish it.</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusPillClassName}`}>
                {editor.published ? 'Published' : 'Draft'}
              </span>
            </div>

            <div className="mt-6 space-y-5">
              {editor.cover.trim() && (
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                  <img src={editor.cover} alt="Post cover preview" className="h-56 w-full object-cover" />
                </div>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">/{editor.slug || 'new-post'}</p>
                <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                  {editor.title || 'Untitled Post'}
                </h3>
                {editor.description && <p className="mt-3 text-sm leading-6 text-slate-600">{editor.description}</p>}
              </div>

              {editor.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {editor.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <article className="prose prose-slate max-w-none rounded-3xl border border-slate-200 bg-slate-50 p-5">
                {editor.content.trim() ? (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{editor.content}</ReactMarkdown>
                ) : (
                  <p className="text-sm text-slate-500">Markdown preview will render here once content is added.</p>
                )}
              </article>
            </div>
          </section>
        </div>

        <Toast toast={toast} onClose={() => setToast(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Blog Posts</h1>
          <p className="mt-2 text-sm text-slate-600">Manage your published content and drafts from one workspace.</p>
        </div>
        <button
          type="button"
          onClick={openNewEditor}
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <PlusCircle className="h-4 w-4" />
          New Post
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-slate-500">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Loading blog posts...
          </div>
        ) : posts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  <th className="pb-3 pr-4">Title</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Tags</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.map((post) => (
                  <tr key={post._id}>
                    <td className="py-4 pr-4">
                      <p className="text-sm font-semibold text-slate-900">{post.title}</p>
                      <p className="mt-1 text-xs text-slate-500">/{post.slug}</p>
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${post.published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.length > 0 ? (
                          post.tags.map((tag) => (
                            <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-slate-400">No tags</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-sm text-slate-500">{formatDate(post.updatedAt)}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditEditor(post)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                          aria-label={`Edit ${post.title}`}
                          title="Edit post"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(post)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-200 text-rose-600 transition hover:bg-rose-50"
                          aria-label={`Delete ${post.title}`}
                          title="Delete post"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <FileText className="h-7 w-7" />
            </div>
            <h2 className="mt-5 text-xl font-bold text-slate-900">No posts yet</h2>
            <p className="mt-2 text-sm text-slate-500">Create your first post and start publishing from the admin dashboard.</p>
            <button
              type="button"
              onClick={openNewEditor}
              className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <PlusCircle className="h-4 w-4" />
              Create your first post
            </button>
          </div>
        )}
      </section>

      {deleteTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/55 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900">Delete blog post?</h3>
            <p className="mt-2 text-sm text-slate-600">
              This will permanently remove <span className="font-semibold text-slate-800">{deleteTarget.title}</span>.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void deletePost()}
                className="rounded-2xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
};

export default BlogManager;

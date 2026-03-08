import React, { useEffect, useState } from 'react';
import { ArrowLeft, FilePenLine, Loader2, PlusCircle, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminFetch, createSlug } from '../../lib/adminApi';
import type { BlogPostRecord } from '../../types/admin';

interface BlogEditorState {
  id?: string;
  title: string;
  slug: string;
  description: string;
  tagsInput: string;
  content: string;
  published: boolean;
}

const emptyEditorState: BlogEditorState = {
  title: '',
  slug: '',
  description: '',
  tagsInput: '',
  content: '',
  published: false,
};

const BlogManager: React.FC = () => {
  const { getFirebaseToken } = useAdminAuth();
  const [posts, setPosts] = useState<BlogPostRecord[]>([]);
  const [editor, setEditor] = useState<BlogEditorState>(emptyEditorState);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isSlugDirty, setIsSlugDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const parsedTags = editor.tagsInput
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);

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
      setError(loadError instanceof Error ? loadError.message : 'Failed to load blog posts.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPosts();
  }, []);

  const openNewEditor = () => {
    setEditor(emptyEditorState);
    setIsSlugDirty(false);
    setIsEditorOpen(true);
    setError('');
  };

  const openEditEditor = (post: BlogPostRecord) => {
    setEditor({
      id: post._id,
      title: post.title,
      slug: post.slug,
      description: post.description || '',
      tagsInput: post.tags.join(', '),
      content: post.content || '',
      published: post.published,
    });
    setIsSlugDirty(true);
    setIsEditorOpen(true);
    setError('');
  };

  const closeEditor = () => {
    setEditor(emptyEditorState);
    setIsSlugDirty(false);
    setIsEditorOpen(false);
  };

  const savePost = async (shouldPublish: boolean) => {
    setIsSaving(true);
    setError('');

    try {
      const token = await getFirebaseToken();

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      if (!editor.title.trim() || !editor.content.trim()) {
        throw new Error('Title and content are required.');
      }

      const payload = {
        title: editor.title.trim(),
        slug: (editor.slug || createSlug(editor.title)).trim(),
        description: editor.description.trim(),
        tags: parsedTags,
        content: editor.content.trim(),
        published: shouldPublish,
      };

      if (editor.id) {
        await adminFetch<BlogPostRecord>(`/api/blog/${editor.id}`, token, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetch<BlogPostRecord>('/api/blog', token, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }

      closeEditor();
      await loadPosts();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Failed to save the post.');
    } finally {
      setIsSaving(false);
    }
  };

  const deletePost = async (postId: string) => {
    const confirmed = window.confirm('Delete this blog post? This action cannot be undone.');

    if (!confirmed) {
      return;
    }

    setError('');

    try {
      const token = await getFirebaseToken();

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      await adminFetch<{ message: string }>(`/api/blog/${postId}`, token, {
        method: 'DELETE',
      });

      await loadPosts();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete the post.');
    }
  };

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
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              {editor.id ? 'Edit Blog Post' : 'Create Blog Post'}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={isSaving}
              onClick={() => void savePost(false)}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? 'Saving...' : 'Save as Draft'}
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => void savePost(true)}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Title</span>
                <input
                  type="text"
                  value={editor.title}
                  onChange={(event) => {
                    const nextTitle = event.target.value;
                    setEditor((current) => ({
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
                    setEditor((current) => ({
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
                  onChange={(event) => setEditor((current) => ({ ...current, description: event.target.value }))}
                  rows={3}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
                  placeholder="Short summary for previews and SEO."
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Tags</span>
                <input
                  type="text"
                  value={editor.tagsInput}
                  onChange={(event) => setEditor((current) => ({ ...current, tagsInput: event.target.value }))}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
                  placeholder="security, react, backend"
                />
                {parsedTags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {parsedTags.map((tag) => (
                      <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </label>

              <label className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Published</p>
                  <p className="text-xs text-slate-500">Toggle post visibility for the public site.</p>
                </div>
                <input
                  type="checkbox"
                  checked={editor.published}
                  onChange={(event) => setEditor((current) => ({ ...current, published: event.target.checked }))}
                  className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Content (Markdown)</span>
                <textarea
                  value={editor.content}
                  onChange={(event) => setEditor((current) => ({ ...current, content: event.target.value }))}
                  rows={18}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 font-mono text-sm text-slate-700 outline-none transition focus:border-blue-300"
                  placeholder="# Start writing..."
                />
              </label>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Preview</h2>
                <p className="mt-1 text-sm text-slate-500">Live markdown preview of the blog post.</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${editor.published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {editor.published ? 'Published' : 'Draft'}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-3xl font-bold tracking-tight text-slate-900">
                  {editor.title || 'Untitled Post'}
                </h3>
                {editor.description && <p className="mt-3 text-sm leading-6 text-slate-600">{editor.description}</p>}
              </div>

              {parsedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {parsedTags.map((tag) => (
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
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Blog Posts</h1>
          <p className="mt-2 text-sm text-slate-600">Manage published posts and drafts from one place.</p>
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
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  <th className="pb-3 pr-4">Title</th>
                  <th className="pb-3 pr-4">Tags</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Created</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <tr key={post._id}>
                      <td className="py-4 pr-4">
                        <p className="text-sm font-semibold text-slate-900">{post.title}</p>
                        <p className="mt-1 text-xs text-slate-500">/{post.slug}</p>
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
                      <td className="py-4 pr-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${post.published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-4 pr-4 text-sm text-slate-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEditEditor(post)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
                          >
                            <FilePenLine className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => void deletePost(post._id)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-rose-200 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-sm text-slate-500">
                      No blog posts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogManager;

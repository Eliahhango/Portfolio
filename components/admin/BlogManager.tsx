import React, { useEffect, useState } from 'react';

type Post = {
  _id?: string;
  title: string;
  slug: string;
  description?: string;
  content: string;
  tags: string[];
  cover?: string;
  published: boolean;
};

const emptyPost: Post = { title: '', slug: '', description: '', content: '', tags: [], cover: '', published: false };

const BlogManager: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post>(emptyPost);
  const [loading, setLoading] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
  const apiUrl = import.meta.env.VITE_API_URL || '';

  const load = async () => {
    const res = await fetch(`${apiUrl}/api/blog?published=false`);
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    setLoading(true);
    const method = editing._id ? 'PUT' : 'POST';
    const url = editing._id ? `${apiUrl}/api/blog/${editing._id}` : `${apiUrl}/api/blog`;
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(editing)
    }).then(async (r) => {
      if (!r.ok) throw new Error((await r.json()).message || 'Save failed');
      setEditing(emptyPost);
      await load();
    }).catch((e) => alert(e.message)).finally(() => setLoading(false));
  };

  const del = async (id?: string) => {
    if (!id) return;
    if (!confirm('Delete this post?')) return;
    await fetch(`${apiUrl}/api/blog/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    await load();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white dark:bg-gray-950 p-6 rounded-lg shadow border border-slate-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Posts</h3>
        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.slug} className="p-4 rounded border border-slate-200 dark:border-white/10 flex justify-between items-center">
              <div>
                <div className="font-bold">{p.title} {p.published ? <span className="text-green-600 text-xs">published</span> : <span className="text-yellow-600 text-xs">draft</span>}</div>
                <div className="text-xs text-slate-500">{p.slug}</div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded bg-slate-100 dark:bg-gray-900" onClick={() => setEditing(p)}>Edit</button>
                <button className="px-3 py-1 rounded bg-red-600 text-white" onClick={() => del(p._id)}>Delete</button>
              </div>
            </div>
          ))}
          {posts.length === 0 && <div className="text-slate-500">No posts yet.</div>}
        </div>
      </div>
      <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow border border-slate-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">{editing._id ? 'Edit Post' : 'New Post'}</h3>
        <div className="space-y-3">
          <input className="w-full px-3 py-2 rounded border bg-transparent" placeholder="Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
          <input className="w-full px-3 py-2 rounded border bg-transparent" placeholder="slug-example" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
          <input className="w-full px-3 py-2 rounded border bg-transparent" placeholder="Short description" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          <input className="w-full px-3 py-2 rounded border bg-transparent" placeholder="Cover image URL" value={editing.cover} onChange={(e) => setEditing({ ...editing, cover: e.target.value })} />
          <textarea className="w-full px-3 py-2 rounded border bg-transparent min-h-[160px]" placeholder="Write markdown content..." value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} />
          <input className="w-full px-3 py-2 rounded border bg-transparent" placeholder="tags: comma,separated" value={editing.tags.join(',')} onChange={(e) => setEditing({ ...editing, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} /> Published</label>
          <div className="flex gap-2">
            <button disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white disabled:bg-blue-400" onClick={save}>{loading ? 'Saving...' : 'Save'}</button>
            <button className="px-4 py-2 rounded bg-slate-100 dark:bg-gray-900" onClick={() => setEditing(emptyPost)}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogManager;



import React, { useEffect, useState } from 'react';
import { FilePenLine, Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminFetch } from '../../lib/adminApi';
import type { ServiceRecord } from '../../types/admin';

type ServiceCategory = ServiceRecord['category'];

interface ServiceEditorState {
  id?: string;
  title: string;
  description: string;
  category: ServiceCategory;
  featuresInput: string;
  isActive: boolean;
  order: number;
  pricingStartingAt: string;
  pricingCurrency: string;
}

const categoryLabels: Record<ServiceCategory, string> = {
  cybersecurity: 'Cybersecurity',
  development: 'Development',
  design: 'Design',
  consulting: 'Consulting',
};

const emptyEditorState: ServiceEditorState = {
  title: '',
  description: '',
  category: 'cybersecurity',
  featuresInput: '',
  isActive: true,
  order: 0,
  pricingStartingAt: '',
  pricingCurrency: 'USD',
};

const Services: React.FC = () => {
  const { getFirebaseToken } = useAdminAuth();
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [editor, setEditor] = useState<ServiceEditorState>(emptyEditorState);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const parsedFeatures = editor.featuresInput
    .split('\n')
    .map((feature) => feature.trim())
    .filter(Boolean);

  const loadServices = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = await getFirebaseToken();

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      const data = await adminFetch<ServiceRecord[]>('/api/services/admin/all', token);
      setServices(data);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load services.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadServices();
  }, []);

  const openNewEditor = () => {
    setEditor(emptyEditorState);
    setIsEditorOpen(true);
    setError('');
  };

  const openEditEditor = (service: ServiceRecord) => {
    setEditor({
      id: service._id,
      title: service.title,
      description: service.description,
      category: service.category,
      featuresInput: service.features.join('\n'),
      isActive: service.isActive,
      order: service.order,
      pricingStartingAt: service.pricing?.startingAt != null ? String(service.pricing.startingAt) : '',
      pricingCurrency: service.pricing?.currency || 'USD',
    });
    setIsEditorOpen(true);
    setError('');
  };

  const closeEditor = () => {
    setEditor(emptyEditorState);
    setIsEditorOpen(false);
  };

  const saveService = async () => {
    setIsSaving(true);
    setError('');

    try {
      const token = await getFirebaseToken();

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      if (!editor.title.trim() || !editor.description.trim()) {
        throw new Error('Title and description are required.');
      }

      const payload = {
        title: editor.title.trim(),
        description: editor.description.trim(),
        category: editor.category,
        features: parsedFeatures,
        isActive: editor.isActive,
        order: Number.isFinite(editor.order) ? editor.order : 0,
        pricing: editor.pricingStartingAt
          ? {
              startingAt: Number(editor.pricingStartingAt),
              currency: editor.pricingCurrency.trim() || 'USD',
            }
          : undefined,
      };

      if (editor.id) {
        await adminFetch<ServiceRecord>(`/api/services/${editor.id}`, token, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        await adminFetch<ServiceRecord>('/api/services', token, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }

      closeEditor();
      await loadServices();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Failed to save the service.');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteService = async (serviceId: string) => {
    const confirmed = window.confirm('Delete this service? This action cannot be undone.');

    if (!confirmed) {
      return;
    }

    setError('');

    try {
      const token = await getFirebaseToken();

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      await adminFetch<{ message: string }>(`/api/services/${serviceId}`, token, {
        method: 'DELETE',
      });

      await loadServices();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Failed to delete the service.');
    }
  };

  if (isEditorOpen) {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {editor.id ? 'Edit Service' : 'Create Service'}
            </h1>
            <p className="mt-2 text-sm text-slate-600">Changes here feed the public expertise section.</p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={closeEditor}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => void saveService()}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? 'Saving...' : 'Save Service'}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
          <div className="grid gap-5 lg:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Title</span>
              <input
                type="text"
                value={editor.title}
                onChange={(event) => setEditor((current) => ({ ...current, title: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
                placeholder="Penetration Testing"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Category</span>
              <select
                value={editor.category}
                onChange={(event) => setEditor((current) => ({ ...current, category: event.target.value as ServiceCategory }))}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
              >
                {Object.entries(categoryLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block lg:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Description</span>
              <textarea
                value={editor.description}
                onChange={(event) => setEditor((current) => ({ ...current, description: event.target.value }))}
                rows={4}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
                placeholder="Describe the service and what it delivers."
              />
            </label>

            <label className="block lg:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Features</span>
              <textarea
                value={editor.featuresInput}
                onChange={(event) => setEditor((current) => ({ ...current, featuresInput: event.target.value }))}
                rows={6}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
                placeholder={'Write one feature per line.\nThreat modeling\nManual exploitation\nPost-assessment remediation'}
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Display Order</span>
              <input
                type="number"
                value={editor.order}
                onChange={(event) => setEditor((current) => ({ ...current, order: Number(event.target.value) }))}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Starting Price</span>
              <input
                type="number"
                min="0"
                value={editor.pricingStartingAt}
                onChange={(event) => setEditor((current) => ({ ...current, pricingStartingAt: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
                placeholder="500"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Currency</span>
              <input
                type="text"
                value={editor.pricingCurrency}
                onChange={(event) => setEditor((current) => ({ ...current, pricingCurrency: event.target.value.toUpperCase() }))}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300"
                placeholder="USD"
              />
            </label>

            <label className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 lg:col-span-2">
              <div>
                <p className="text-sm font-semibold text-slate-700">Visible on public site</p>
                <p className="text-xs text-slate-500">Inactive services stay in admin but disappear from the public expertise section.</p>
              </div>
              <input
                type="checkbox"
                checked={editor.isActive}
                onChange={(event) => setEditor((current) => ({ ...current, isActive: event.target.checked }))}
                className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
            </label>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Services</h1>
          <p className="mt-2 text-sm text-slate-600">Manage the service catalog shown in the public expertise section.</p>
        </div>
        <button
          type="button"
          onClick={openNewEditor}
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <PlusCircle className="h-4 w-4" />
          New Service
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
            Loading services...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                  <th className="pb-3 pr-4">Title</th>
                  <th className="pb-3 pr-4">Category</th>
                  <th className="pb-3 pr-4">Order</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.length > 0 ? (
                  services.map((service) => (
                    <tr key={service._id}>
                      <td className="py-4 pr-4">
                        <p className="text-sm font-semibold text-slate-900">{service.title}</p>
                        <p className="mt-1 max-w-xl text-xs text-slate-500">{service.description}</p>
                      </td>
                      <td className="py-4 pr-4 text-sm text-slate-600">{categoryLabels[service.category]}</td>
                      <td className="py-4 pr-4 text-sm text-slate-600">{service.order}</td>
                      <td className="py-4 pr-4">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${service.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                          {service.isActive ? 'Active' : 'Hidden'}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openEditEditor(service)}
                            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
                          >
                            <FilePenLine className="h-4 w-4" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => void deleteService(service._id)}
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
                      No services found yet.
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

export default Services;

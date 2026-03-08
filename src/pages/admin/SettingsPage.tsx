import React, { useEffect, useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { adminFetch } from '../../lib/adminApi';
import type { ContentItemRecord } from '../../types/admin';
import {
  defaultAboutContent,
  defaultContactContent,
  defaultHeroContent,
} from '../../../utils/siteContent';

interface SettingsState {
  heroTitle: string;
  heroRoles: string;
  heroDescription: string;
  heroPrimaryCtaLabel: string;
  heroGithubUrl: string;
  aboutImageUrl: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  aboutParagraph3: string;
  aboutQuote: string;
  contactIntro: string;
  contactEmail: string;
  contactPhone: string;
  contactWhatsapp: string;
  contactGithubLabel: string;
  contactGithubUrl: string;
  contactYoutubeLabel: string;
  contactYoutubeUrl: string;
}

const defaultSettingsState: SettingsState = {
  heroTitle: defaultHeroContent.title,
  heroRoles: defaultHeroContent.roles.join(', '),
  heroDescription: defaultHeroContent.description,
  heroPrimaryCtaLabel: defaultHeroContent.primaryCtaLabel,
  heroGithubUrl: defaultHeroContent.githubUrl,
  aboutImageUrl: defaultAboutContent.imageUrl,
  aboutParagraph1: defaultAboutContent.paragraphs[0],
  aboutParagraph2: defaultAboutContent.paragraphs[1],
  aboutParagraph3: defaultAboutContent.paragraphs[2],
  aboutQuote: defaultAboutContent.quote,
  contactIntro: defaultContactContent.intro,
  contactEmail: defaultContactContent.email,
  contactPhone: defaultContactContent.phone,
  contactWhatsapp: defaultContactContent.whatsapp,
  contactGithubLabel: defaultContactContent.githubLabel,
  contactGithubUrl: defaultContactContent.githubUrl,
  contactYoutubeLabel: defaultContactContent.youtubeLabel,
  contactYoutubeUrl: defaultContactContent.youtubeUrl,
};

const SettingsPage: React.FC = () => {
  const { getFirebaseToken } = useAdminAuth();
  const [settings, setSettings] = useState<SettingsState>(defaultSettingsState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const loadSettings = async () => {
    setIsLoading(true);
    setError('');

    try {
      const token = await getFirebaseToken();

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      const data = await adminFetch<ContentItemRecord[]>('/api/content/admin/all', token);
      const valueMap = data.reduce<Record<string, ContentItemRecord['value']>>((accumulator, item) => {
        accumulator[item.key] = item.value;
        return accumulator;
      }, {});

      setSettings({
        heroTitle: typeof valueMap['hero-title'] === 'string' ? valueMap['hero-title'] : defaultSettingsState.heroTitle,
        heroRoles: Array.isArray(valueMap['hero-roles']) ? valueMap['hero-roles'].join(', ') : defaultSettingsState.heroRoles,
        heroDescription: typeof valueMap['hero-description'] === 'string' ? valueMap['hero-description'] : defaultSettingsState.heroDescription,
        heroPrimaryCtaLabel: typeof valueMap['hero-primary-cta-label'] === 'string' ? valueMap['hero-primary-cta-label'] : defaultSettingsState.heroPrimaryCtaLabel,
        heroGithubUrl: typeof valueMap['hero-github-url'] === 'string' ? valueMap['hero-github-url'] : defaultSettingsState.heroGithubUrl,
        aboutImageUrl: typeof valueMap['about-image-url'] === 'string' ? valueMap['about-image-url'] : defaultSettingsState.aboutImageUrl,
        aboutParagraph1: typeof valueMap['about-paragraph-1'] === 'string' ? valueMap['about-paragraph-1'] : defaultSettingsState.aboutParagraph1,
        aboutParagraph2: typeof valueMap['about-paragraph-2'] === 'string' ? valueMap['about-paragraph-2'] : defaultSettingsState.aboutParagraph2,
        aboutParagraph3: typeof valueMap['about-paragraph-3'] === 'string' ? valueMap['about-paragraph-3'] : defaultSettingsState.aboutParagraph3,
        aboutQuote: typeof valueMap['about-quote'] === 'string' ? valueMap['about-quote'] : defaultSettingsState.aboutQuote,
        contactIntro: typeof valueMap['contact-intro'] === 'string' ? valueMap['contact-intro'] : defaultSettingsState.contactIntro,
        contactEmail: typeof valueMap['contact-email'] === 'string' ? valueMap['contact-email'] : defaultSettingsState.contactEmail,
        contactPhone: typeof valueMap['contact-phone'] === 'string' ? valueMap['contact-phone'] : defaultSettingsState.contactPhone,
        contactWhatsapp: typeof valueMap['contact-whatsapp'] === 'string' ? valueMap['contact-whatsapp'] : defaultSettingsState.contactWhatsapp,
        contactGithubLabel: typeof valueMap['contact-github-label'] === 'string' ? valueMap['contact-github-label'] : defaultSettingsState.contactGithubLabel,
        contactGithubUrl: typeof valueMap['contact-github-url'] === 'string' ? valueMap['contact-github-url'] : defaultSettingsState.contactGithubUrl,
        contactYoutubeLabel: typeof valueMap['contact-youtube-label'] === 'string' ? valueMap['contact-youtube-label'] : defaultSettingsState.contactYoutubeLabel,
        contactYoutubeUrl: typeof valueMap['contact-youtube-url'] === 'string' ? valueMap['contact-youtube-url'] : defaultSettingsState.contactYoutubeUrl,
      });
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load site settings.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadSettings();
  }, []);

  const saveSettings = async () => {
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = await getFirebaseToken();

      if (!token) {
        throw new Error('Your session has expired. Please sign in again.');
      }

      await adminFetch<ContentItemRecord[]>('/api/content/admin/bulk', token, {
        method: 'PUT',
        body: JSON.stringify({
          items: [
            { key: 'hero-title', section: 'hero', type: 'text', value: settings.heroTitle.trim() },
            { key: 'hero-roles', section: 'hero', type: 'json', value: settings.heroRoles.split(',').map((item) => item.trim()).filter(Boolean) },
            { key: 'hero-description', section: 'hero', type: 'text', value: settings.heroDescription.trim() },
            { key: 'hero-primary-cta-label', section: 'hero', type: 'text', value: settings.heroPrimaryCtaLabel.trim() },
            { key: 'hero-github-url', section: 'hero', type: 'text', value: settings.heroGithubUrl.trim() },
            { key: 'about-image-url', section: 'about', type: 'text', value: settings.aboutImageUrl.trim() },
            { key: 'about-paragraph-1', section: 'about', type: 'text', value: settings.aboutParagraph1.trim() },
            { key: 'about-paragraph-2', section: 'about', type: 'text', value: settings.aboutParagraph2.trim() },
            { key: 'about-paragraph-3', section: 'about', type: 'text', value: settings.aboutParagraph3.trim() },
            { key: 'about-quote', section: 'about', type: 'text', value: settings.aboutQuote.trim() },
            { key: 'contact-intro', section: 'contact', type: 'text', value: settings.contactIntro.trim() },
            { key: 'contact-email', section: 'contact', type: 'text', value: settings.contactEmail.trim() },
            { key: 'contact-phone', section: 'contact', type: 'text', value: settings.contactPhone.trim() },
            { key: 'contact-whatsapp', section: 'contact', type: 'text', value: settings.contactWhatsapp.trim() },
            { key: 'contact-github-label', section: 'contact', type: 'text', value: settings.contactGithubLabel.trim() },
            { key: 'contact-github-url', section: 'contact', type: 'text', value: settings.contactGithubUrl.trim() },
            { key: 'contact-youtube-label', section: 'contact', type: 'text', value: settings.contactYoutubeLabel.trim() },
            { key: 'contact-youtube-url', section: 'contact', type: 'text', value: settings.contactYoutubeUrl.trim() },
          ],
        }),
      });

      setSuccess('Site settings saved successfully.');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = <Key extends keyof SettingsState>(key: Key, value: SettingsState[Key]) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="rounded-3xl bg-white p-10 shadow-md ring-1 ring-slate-200/70">
        <div className="flex items-center justify-center py-12 text-slate-500">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Loading site settings...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
          <p className="mt-2 text-sm text-slate-600">Control the public hero, about, and contact sections from the admin dashboard.</p>
        </div>
        <button
          type="button"
          disabled={isSaving}
          onClick={() => void saveSettings()}
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </div>
      )}

      <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
        <h2 className="text-xl font-bold text-slate-900">Hero Section</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Title</span>
            <input type="text" value={settings.heroTitle} onChange={(event) => updateField('heroTitle', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Typewriter Roles</span>
            <input type="text" value={settings.heroRoles} onChange={(event) => updateField('heroRoles', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" placeholder="Role 1, Role 2, Role 3" />
          </label>
          <label className="block lg:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Description</span>
            <textarea value={settings.heroDescription} onChange={(event) => updateField('heroDescription', event.target.value)} rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Primary CTA Label</span>
            <input type="text" value={settings.heroPrimaryCtaLabel} onChange={(event) => updateField('heroPrimaryCtaLabel', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">GitHub URL</span>
            <input type="url" value={settings.heroGithubUrl} onChange={(event) => updateField('heroGithubUrl', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
        <h2 className="text-xl font-bold text-slate-900">About Section</h2>
        <div className="mt-5 grid gap-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Profile Image URL</span>
            <input type="url" value={settings.aboutImageUrl} onChange={(event) => updateField('aboutImageUrl', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Paragraph 1</span>
            <textarea value={settings.aboutParagraph1} onChange={(event) => updateField('aboutParagraph1', event.target.value)} rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Paragraph 2</span>
            <textarea value={settings.aboutParagraph2} onChange={(event) => updateField('aboutParagraph2', event.target.value)} rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Paragraph 3</span>
            <textarea value={settings.aboutParagraph3} onChange={(event) => updateField('aboutParagraph3', event.target.value)} rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Closing Quote</span>
            <input type="text" value={settings.aboutQuote} onChange={(event) => updateField('aboutQuote', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-200/70">
        <h2 className="text-xl font-bold text-slate-900">Contact Section</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <label className="block lg:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Intro Text</span>
            <textarea value={settings.contactIntro} onChange={(event) => updateField('contactIntro', event.target.value)} rows={3} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
            <input type="email" value={settings.contactEmail} onChange={(event) => updateField('contactEmail', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Phone</span>
            <input type="text" value={settings.contactPhone} onChange={(event) => updateField('contactPhone', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">WhatsApp</span>
            <input type="text" value={settings.contactWhatsapp} onChange={(event) => updateField('contactWhatsapp', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">GitHub Label</span>
            <input type="text" value={settings.contactGithubLabel} onChange={(event) => updateField('contactGithubLabel', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">GitHub URL</span>
            <input type="url" value={settings.contactGithubUrl} onChange={(event) => updateField('contactGithubUrl', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">YouTube Label</span>
            <input type="text" value={settings.contactYoutubeLabel} onChange={(event) => updateField('contactYoutubeLabel', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">YouTube URL</span>
            <input type="url" value={settings.contactYoutubeUrl} onChange={(event) => updateField('contactYoutubeUrl', event.target.value)} className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-300" />
          </label>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;

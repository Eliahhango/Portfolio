import React from 'react';
import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { GithubIcon, YoutubeIcon } from '../constants';
import ContactForm from './ContactForm';
import SectionHeader from './SectionHeader';
import { usePublicSiteContent } from '../contexts/PublicSiteContentContext';
import { toTelHref, toWhatsAppHref } from '../utils/siteContent';

const Contact: React.FC = () => {
  const { contactContent } = usePublicSiteContent();

  return (
    <section id="contact" className="relative overflow-hidden py-12 sm:py-16 md:py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.16) 1px, transparent 0)',
          backgroundSize: '26px 26px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          tag="Contact"
          title="Let’s Build Something Secure"
          subtitle={contactContent.intro}
        />

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-800/60">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-500">Email</p>
                  <a
                    href={`mailto:${contactContent.email}`}
                    className="mt-2 block text-lg font-semibold text-slate-900 transition hover:text-blue-600 dark:text-white dark:hover:text-blue-300"
                  >
                    {contactContent.email}
                  </a>
                  <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-300">
                    Best for project details, scope discussions, and documentation-heavy requests.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-800/60">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Phone</p>
                    <a
                      href={toTelHref(contactContent.phone)}
                      className="mt-2 block text-base font-semibold text-slate-900 transition hover:text-blue-600 dark:text-white dark:hover:text-blue-300"
                    >
                      {contactContent.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">WhatsApp</p>
                    <a
                      href={toWhatsAppHref(contactContent.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-base font-semibold text-slate-900 transition hover:text-blue-600 dark:text-white dark:hover:text-blue-300"
                    >
                      {contactContent.whatsapp}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-800/60">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Location</p>
                  <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/60">
                    <p className="text-base font-semibold text-slate-900 dark:text-white">Dar es Salaam, Tanzania</p>
                    <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-300">
                      Available for remote work, hybrid collaboration, and selected on-site consulting.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-800/60">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Response Time</p>
                  <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">Usually responds within 24 hours</p>
                  <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-300">
                    Clear briefs get faster replies. If you already know your budget and timeline, include both.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {contactContent.githubUrl && (
                <a
                  href={contactContent.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:text-blue-300"
                >
                  <GithubIcon className="h-4 w-4" />
                  {contactContent.githubLabel}
                </a>
              )}
              {contactContent.youtubeUrl && (
                <a
                  href={contactContent.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-blue-200 hover:text-blue-600 dark:border-white/10 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:text-blue-300"
                >
                  <YoutubeIcon className="h-4 w-4" />
                  {contactContent.youtubeLabel}
                </a>
              )}
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;

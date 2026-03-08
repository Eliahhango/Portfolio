import React, { useMemo } from 'react';
import { MailIcon, GithubIcon, PhoneIcon, WhatsappIcon, YoutubeIcon } from '../constants';
import ContactForm from './ContactForm';
import { usePublicSiteContent } from '../contexts/PublicSiteContentContext';
import { toTelHref, toWhatsAppHref } from '../utils/siteContent';

const Contact: React.FC = () => {
  const { contactContent } = usePublicSiteContent();

  const contactInfo = useMemo(
    () =>
      [
        {
          Icon: MailIcon,
          label: 'Email',
          value: contactContent.email,
          href: `mailto:${contactContent.email}`,
        },
        {
          Icon: PhoneIcon,
          label: 'Phone',
          value: contactContent.phone,
          href: toTelHref(contactContent.phone),
        },
        {
          Icon: WhatsappIcon,
          label: 'WhatsApp',
          value: contactContent.whatsapp,
          href: toWhatsAppHref(contactContent.whatsapp),
        },
        {
          Icon: GithubIcon,
          label: 'GitHub',
          value: contactContent.githubLabel,
          href: contactContent.githubUrl,
        },
        {
          Icon: YoutubeIcon,
          label: 'YouTube',
          value: contactContent.youtubeLabel,
          href: contactContent.youtubeUrl,
        },
      ].filter((item) => item.value && item.href),
    [contactContent],
  );

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-4 px-4">Get In Touch</h2>
      <div className="w-20 h-1 bg-blue-500 mx-auto mb-8 sm:mb-12"></div>
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        <p className="text-sm sm:text-base text-slate-500 dark:text-gray-300 mb-8 sm:mb-12">
          {contactContent.intro}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12">
          {contactInfo.map(({ Icon, label, value, href }) => {
            const isExternalLink = href.startsWith('http');

            return (
              <a
                key={label}
                href={href}
                target={isExternalLink ? '_blank' : undefined}
                rel={isExternalLink ? 'noopener noreferrer' : undefined}
                className="group bg-slate-100 dark:bg-slate-800/50 dark:border-slate-700/50 p-4 sm:p-6 rounded-lg flex items-center space-x-3 sm:space-x-4 transition-all duration-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 dark:hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 border border-slate-200 dark:border-slate-700/50 hover:border-blue-500 transform hover:-translate-y-1"
              >
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white text-left truncate">{label}</h4>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-300 text-left break-words">{value}</p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;

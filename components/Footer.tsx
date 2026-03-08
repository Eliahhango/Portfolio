import React, { useMemo } from 'react';
import { MapPin, ShieldCheck } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FacebookIcon,
  GithubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  TwitterIcon,
  WhatsappIcon,
  YoutubeIcon,
} from '../constants';
import { useOptionalPublicSiteContent } from '../contexts/PublicSiteContentContext';
import { defaultContactContent, toTelHref, toWhatsAppHref } from '../utils/siteContent';
import { handleSectionClick } from '../utils/scrollUtils';

interface FooterProps {
  onPrivacyClick?: () => void;
  onDocsClick?: () => void;
  onTermsClick?: () => void;
  onSecurityClick?: () => void;
  onCookieClick?: () => void;
  onDnsmpiClick?: () => void;
  onCommunityClick?: () => void;
  onStatusClick?: () => void;
}

const NAVIGATION_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', to: '/blog' },
  { name: 'Contact', href: '#contact' },
];

const LEGAL_LINKS = [
  { name: 'Privacy Policy', to: '/privacy' },
  { name: 'Terms of Service', to: '/terms' },
  { name: 'Security', to: '/security' },
  { name: 'Cookie Policy', to: '/cookies' },
  { name: 'Do Not Sell My Info', to: '/dnsmpi' },
];

const Footer: React.FC<FooterProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const publicContent = useOptionalPublicSiteContent();
  const contactContent = publicContent?.contactContent || defaultContactContent;

  const socialLinks = useMemo(
    () =>
      [
        { Icon: GithubIcon, href: contactContent.githubUrl, label: 'GitHub' },
        { Icon: YoutubeIcon, href: contactContent.youtubeUrl, label: 'YouTube' },
        { Icon: LinkedInIcon, href: '#', label: 'LinkedIn' },
        { Icon: TwitterIcon, href: '#', label: 'Twitter' },
        { Icon: FacebookIcon, href: '#', label: 'Facebook' },
      ].filter((item) => item.href && item.href !== '#'),
    [contactContent.githubUrl, contactContent.youtubeUrl],
  );

  const onSectionClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSectionClick(event, href, navigate, location.pathname);
  };

  return (
    <footer className="relative z-10 bg-slate-900 py-16 text-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/15 text-blue-400">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xl font-black tracking-tight">
                  <span className="font-black text-blue-400">Eli</span>
                  <span className="font-black tracking-tight">TechWiz</span>
                </p>
              </div>
            </div>

            <p className="max-w-xs text-sm leading-7 text-slate-300">
              Secure digital systems, modern software delivery,
              <br />
              and design-led experiences built with intention.
            </p>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-400 transition-all hover:bg-blue-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-200">Navigation</h3>
            <ul className="mt-5 space-y-3">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.name}>
                  {'href' in link ? (
                    <a
                      href={link.href}
                      onClick={(event) => onSectionClick(event, link.href)}
                      className="text-sm text-slate-300 transition-colors hover:text-blue-400"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.to} className="text-sm text-slate-300 transition-colors hover:text-blue-400">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-200">Legal</h3>
            <ul className="mt-5 space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.name}>
                  <Link to={link.to} className="text-sm text-slate-300 transition-colors hover:text-blue-400">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.22em] text-slate-200">Get In Touch</h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <MailIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                <a href={`mailto:${contactContent.email}`} className="transition-colors hover:text-blue-400">
                  {contactContent.email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <PhoneIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                <a href={toTelHref(contactContent.phone)} className="transition-colors hover:text-blue-400">
                  {contactContent.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <WhatsappIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                <a href={toWhatsAppHref(contactContent.whatsapp)} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-blue-400">
                  {contactContent.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-300">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-400" />
                <span>Dar es Salaam, Tanzania</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-slate-400 dark:border-white/10 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2026 EliTechWiz. All rights reserved.</p>
          <p>Built with Love By EliTechWiz❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useEffect, useMemo } from 'react';
import { useOptionalPublicSiteContent } from '../contexts/PublicSiteContentContext';
import { defaultContactContent } from '../utils/siteContent';

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  canonical?: string;
  type?: 'website' | 'article';
};

const DEFAULTS = {
  title: 'EliTechWiz | Cybersecurity Expert & Software Architect',
  description: 'Secure, innovative software and design. Cybersecurity, full-stack engineering, and architecture with impact.',
  image: 'https://files.catbox.moe/qgbtyt.png',
  url: 'https://www.elitechwiz.site/',
};

const SEO: React.FC<SEOProps> = ({ title, description, image, url, canonical, type = 'website' }) => {
  const publicContent = useOptionalPublicSiteContent();
  const resolvedTitle = title || DEFAULTS.title;
  const resolvedDescription = description || publicContent?.heroContent.description || DEFAULTS.description;
  const resolvedImage = image || publicContent?.aboutContent.imageUrl || DEFAULTS.image;
  const resolvedUrl = url || DEFAULTS.url;
  const contactEmail = publicContent?.contactContent.email || defaultContactContent.email;
  const contactPhone = publicContent?.contactContent.phone || defaultContactContent.phone;
  const sameAs = useMemo(
    () =>
      [
        publicContent?.contactContent.githubUrl || defaultContactContent.githubUrl,
        publicContent?.contactContent.youtubeUrl || defaultContactContent.youtubeUrl,
      ].filter(Boolean),
    [publicContent?.contactContent.githubUrl, publicContent?.contactContent.youtubeUrl],
  );
  const personDescription = publicContent?.aboutContent.paragraphs[0] || resolvedDescription;

  useEffect(() => {
    document.title = resolvedTitle;

    const ensureMeta = (attr: [string, string], content: string) => {
      const [key, value] = attr;
      let el = document.head.querySelector(`meta[${key}="${value}"]`) as HTMLMetaElement | null;

      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(key, value);
        document.head.appendChild(el);
      }

      el.setAttribute('content', content);
    };

    const ensureLink = (rel: string, href: string) => {
      let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;

      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }

      el.setAttribute('href', href);
    };

    ensureMeta(['name', 'description'], resolvedDescription);
    ensureLink('canonical', canonical || resolvedUrl);
    ensureMeta(['property', 'og:type'], type);
    ensureMeta(['property', 'og:title'], resolvedTitle);
    ensureMeta(['property', 'og:description'], resolvedDescription);
    ensureMeta(['property', 'og:image'], resolvedImage);
    ensureMeta(['property', 'og:url'], resolvedUrl);
    ensureMeta(['name', 'twitter:card'], 'summary_large_image');
    ensureMeta(['name', 'twitter:title'], resolvedTitle);
    ensureMeta(['name', 'twitter:description'], resolvedDescription);
    ensureMeta(['name', 'twitter:image'], resolvedImage);

    const addSchema = (id: string, schema: object) => {
      let script = document.getElementById(id) as HTMLScriptElement | null;

      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        document.head.appendChild(script);
      }

      script.text = JSON.stringify(schema);
    };

    addSchema('app-schema', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'EliTechWiz',
      url: 'https://www.elitechwiz.site',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.elitechwiz.site/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    });

    addSchema('person-schema', {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'EliTechWiz',
      url: 'https://www.elitechwiz.site',
      image: resolvedImage,
      jobTitle: 'Cybersecurity Expert & Software Architect',
      description: personDescription,
      email: contactEmail,
      telephone: contactPhone.replace(/[^\d+]/g, ''),
      sameAs,
      knowsAbout: [
        'Cybersecurity',
        'Software Development',
        'UI/UX Design',
        'Ethical Hacking',
        'Software Architecture',
        'Web Development',
      ],
      alumniOf: {
        '@type': 'Organization',
        name: 'Software Development & Cybersecurity',
      },
    });
  }, [
    canonical,
    contactEmail,
    contactPhone,
    personDescription,
    resolvedDescription,
    resolvedImage,
    resolvedTitle,
    resolvedUrl,
    sameAs,
    type,
  ]);

  return null;
};

export default SEO;

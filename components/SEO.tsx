import React, { useEffect } from 'react';

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
  description:
    'Secure, innovative software and design. Cybersecurity, full‑stack engineering, and architecture with impact.',
  image: 'https://files.catbox.moe/qgbtyt.png',
  url: 'https://www.elitechwiz.site/'
};

const SEO: React.FC<SEOProps> = ({ title = DEFAULTS.title, description = DEFAULTS.description, image = DEFAULTS.image, url = DEFAULTS.url, canonical, type = 'website' }) => {
  useEffect(() => {
    document.title = title;
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
    ensureMeta(['name', 'description'], description);
    ensureLink('canonical', canonical || url);
    ensureMeta(['property', 'og:type'], type);
    ensureMeta(['property', 'og:title'], title);
    ensureMeta(['property', 'og:description'], description);
    ensureMeta(['property', 'og:image'], image);
    ensureMeta(['property', 'og:url'], url);
    ensureMeta(['name', 'twitter:card'], 'summary_large_image');
    ensureMeta(['name', 'twitter:title'], title);
    ensureMeta(['name', 'twitter:description'], description);
    ensureMeta(['name', 'twitter:image'], image);
    // JSON-LD
    const scriptId = 'app-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      document.head.appendChild(script);
    }
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'EliTechWiz',
      url: 'https://www.elitechwiz.site',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.elitechwiz.site/?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    });
  }, [title, description, image, url, canonical, type]);
  return null;
};

export default SEO;



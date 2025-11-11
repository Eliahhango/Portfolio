import React from 'react';
import { Helmet } from 'react-helmet-async';

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

const SEO: React.FC<SEOProps> = ({
  title = DEFAULTS.title,
  description = DEFAULTS.description,
  image = DEFAULTS.image,
  url = DEFAULTS.url,
  canonical,
  type = 'website'
}) => {
  const canonicalUrl = canonical || url;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD basic Site */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'EliTechWiz',
          url: 'https://www.elitechwiz.site',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://www.elitechwiz.site/?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;



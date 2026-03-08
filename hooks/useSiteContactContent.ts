import { useEffect, useState } from 'react';
import { useOptionalPublicSiteContent } from '../contexts/PublicSiteContentContext';
import {
  defaultContactContent,
  fetchContentSection,
  mapContactContent,
  type ContactContent,
} from '../utils/siteContent';

export const useSiteContactContent = () => {
  const publicContent = useOptionalPublicSiteContent();
  const [contactContent, setContactContent] = useState<ContactContent>(
    publicContent?.contactContent || defaultContactContent,
  );

  useEffect(() => {
    if (publicContent?.contactContent) {
      setContactContent(publicContent.contactContent);
      return;
    }

    let isActive = true;

    const loadContactContent = async () => {
      const items = await fetchContentSection('contact').catch(() => []);

      if (!isActive || items.length === 0) {
        return;
      }

      setContactContent(mapContactContent(items));
    };

    void loadContactContent();

    return () => {
      isActive = false;
    };
  }, [publicContent?.contactContent]);

  return contactContent;
};

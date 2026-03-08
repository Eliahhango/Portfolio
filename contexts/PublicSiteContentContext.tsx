import React, { createContext, useContext, useEffect, useState } from 'react';
import type { PublicService } from '../types';
import {
  defaultAboutContent,
  defaultContactContent,
  defaultHeroContent,
  fetchContentSection,
  fetchPublicServices,
  mapAboutContent,
  mapContactContent,
  mapHeroContent,
  type AboutContent,
  type ContactContent,
  type HeroContent,
} from '../utils/siteContent';

interface PublicSiteContentValue {
  heroContent: HeroContent;
  aboutContent: AboutContent;
  contactContent: ContactContent;
  services: PublicService[];
}

const PublicSiteContentContext = createContext<PublicSiteContentValue | null>(null);

export const PublicSiteContentProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAboutContent);
  const [contactContent, setContactContent] = useState<ContactContent>(defaultContactContent);
  const [services, setServices] = useState<PublicService[]>([]);

  useEffect(() => {
    let isActive = true;

    const loadContent = async () => {
      const [heroItems, aboutItems, contactItems, publicServices] = await Promise.all([
        fetchContentSection('hero').catch(() => []),
        fetchContentSection('about').catch(() => []),
        fetchContentSection('contact').catch(() => []),
        fetchPublicServices().catch(() => []),
      ]);

      if (!isActive) {
        return;
      }

      if (heroItems.length > 0) {
        setHeroContent(mapHeroContent(heroItems));
      }

      if (aboutItems.length > 0) {
        setAboutContent(mapAboutContent(aboutItems));
      }

      if (contactItems.length > 0) {
        setContactContent(mapContactContent(contactItems));
      }

      setServices(publicServices);
    };

    void loadContent();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <PublicSiteContentContext.Provider
      value={{
        heroContent,
        aboutContent,
        contactContent,
        services,
      }}
    >
      {children}
    </PublicSiteContentContext.Provider>
  );
};

export const usePublicSiteContent = () => {
  const context = useContext(PublicSiteContentContext);

  if (!context) {
    throw new Error('usePublicSiteContent must be used inside PublicSiteContentProvider');
  }

  return context;
};

export const useOptionalPublicSiteContent = () => {
  return useContext(PublicSiteContentContext);
};

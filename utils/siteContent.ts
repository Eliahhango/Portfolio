import type { PublicService, SiteContentRecord } from '../types';
import { buildApiUrl } from './api';

export interface HeroContent {
  title: string;
  roles: string[];
  description: string;
  primaryCtaLabel: string;
  githubUrl: string;
}

export interface AboutContent {
  imageUrl: string;
  paragraphs: string[];
  quote: string;
}

export interface ContactContent {
  intro: string;
  email: string;
  phone: string;
  whatsapp: string;
  githubLabel: string;
  githubUrl: string;
  youtubeLabel: string;
  youtubeUrl: string;
}

export const defaultHeroContent: HeroContent = {
  title: 'I Am EliTechWiz',
  roles: ['Cybersecurity Expert', 'Software Architect', 'Creative Designer', 'Visionary Hacker'],
  description: 'Merging technology, design, and strategy to build secure, innovative, and impactful digital experiences.',
  primaryCtaLabel: "Let's Innovate Together",
  githubUrl: 'https://github.com/Eliahhango',
};

export const defaultAboutContent: AboutContent = {
  imageUrl: 'https://files.catbox.moe/qgbtyt.png',
  paragraphs: [
    'I am EliTechWiz, a visionary technologist, hacker, and creative mind, driven by innovation and the pursuit of digital excellence. My expertise spans cybersecurity, software development, UI/UX design, graphics and architectural design, and more.',
    'With a passion for turning complex problems into elegant solutions, I merge technology, design, and strategy to create impactful digital experiences. As a CEO and creator, I thrive on building projects that push boundaries, challenge norms, and leave a lasting impression in the tech world.',
    "Whether I'm securing digital spaces, designing intuitive interfaces, or crafting visually stunning creations, my goal is to transform ideas into reality with precision, creativity, and a relentless drive for excellence.",
  ],
  quote: "Let's innovate, design, and dominate the digital future together.",
};

export const defaultContactContent: ContactContent = {
  intro: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out to me through any of the platforms below.",
  email: 'contact@elitechwiz.com',
  phone: '+255 688 164 510',
  whatsapp: '+255 742 631 101',
  githubLabel: 'Eliahhango',
  githubUrl: 'https://github.com/Eliahhango',
  youtubeLabel: '@eliahhango',
  youtubeUrl: 'https://youtube.com/@eliahhango',
};

const readString = (value: unknown, fallback: string) => {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
};

const readStringArray = (value: unknown, fallback: string[]) => {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const normalized = value.filter((item): item is string => typeof item === 'string').map((item) => item.trim()).filter(Boolean);
  return normalized.length > 0 ? normalized : fallback;
};

const toMap = (items: SiteContentRecord[]) => {
  return items.reduce<Record<string, SiteContentRecord['value']>>((accumulator, item) => {
    accumulator[item.key] = item.value;
    return accumulator;
  }, {});
};

export const mapHeroContent = (items: SiteContentRecord[]) => {
  const contentMap = toMap(items);

  return {
    title: readString(contentMap['hero-title'], defaultHeroContent.title),
    roles: readStringArray(contentMap['hero-roles'], defaultHeroContent.roles),
    description: readString(contentMap['hero-description'], defaultHeroContent.description),
    primaryCtaLabel: readString(contentMap['hero-primary-cta-label'], defaultHeroContent.primaryCtaLabel),
    githubUrl: readString(contentMap['hero-github-url'], defaultHeroContent.githubUrl),
  } satisfies HeroContent;
};

export const mapAboutContent = (items: SiteContentRecord[]) => {
  const contentMap = toMap(items);

  return {
    imageUrl: readString(contentMap['about-image-url'], defaultAboutContent.imageUrl),
    paragraphs: [
      readString(contentMap['about-paragraph-1'], defaultAboutContent.paragraphs[0]),
      readString(contentMap['about-paragraph-2'], defaultAboutContent.paragraphs[1]),
      readString(contentMap['about-paragraph-3'], defaultAboutContent.paragraphs[2]),
    ],
    quote: readString(contentMap['about-quote'], defaultAboutContent.quote),
  } satisfies AboutContent;
};

export const mapContactContent = (items: SiteContentRecord[]) => {
  const contentMap = toMap(items);

  return {
    intro: readString(contentMap['contact-intro'], defaultContactContent.intro),
    email: readString(contentMap['contact-email'], defaultContactContent.email),
    phone: readString(contentMap['contact-phone'], defaultContactContent.phone),
    whatsapp: readString(contentMap['contact-whatsapp'], defaultContactContent.whatsapp),
    githubLabel: readString(contentMap['contact-github-label'], defaultContactContent.githubLabel),
    githubUrl: readString(contentMap['contact-github-url'], defaultContactContent.githubUrl),
    youtubeLabel: readString(contentMap['contact-youtube-label'], defaultContactContent.youtubeLabel),
    youtubeUrl: readString(contentMap['contact-youtube-url'], defaultContactContent.youtubeUrl),
  } satisfies ContactContent;
};

export const fetchContentSection = async (section: string): Promise<SiteContentRecord[]> => {
  const response = await fetch(buildApiUrl(`/api/content/section/${section}`));

  if (!response.ok) {
    throw new Error(`Failed to load ${section} content.`);
  }

  return response.json() as Promise<SiteContentRecord[]>;
};

export const fetchPublicServices = async () => {
  const response = await fetch(buildApiUrl('/api/services'));

  if (!response.ok) {
    throw new Error('Failed to load services.');
  }

  return response.json() as Promise<PublicService[]>;
};

export const toTelHref = (phone: string) => {
  const normalized = phone.replace(/[^\d+]/g, '');
  return `tel:${normalized}`;
};

export const toWhatsAppHref = (phone: string) => {
  const normalized = phone.replace(/\D/g, '');
  return `https://wa.me/${normalized}`;
};

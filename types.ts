// FIX: Define the Project and Stat interfaces used throughout the application.
export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  caseStudySlug?: string; // Optional slug to a detailed case study page
}

export interface Stat {
  value: number;
  label: string;
}

export interface PublicService {
  _id: string;
  title: string;
  description: string;
  category: 'cybersecurity' | 'development' | 'design' | 'consulting';
  features: string[];
  pricing?: {
    startingAt?: number;
    currency?: string;
  };
  isActive: boolean;
  order: number;
}

export interface SiteContentRecord {
  _id?: string;
  key: string;
  value: string | string[] | Record<string, unknown>;
  type: 'text' | 'html' | 'json';
  section: string;
  updatedBy?: string;
}

export interface PublicBlogPost {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  tags: string[];
  createdAt?: string;
  cover?: string;
  contentLength: number;
  readTimeMinutes: number;
}

// FIX: Add the Message interface for the chatbot component.
export interface Message {
  sender: 'user' | 'ai';
  text: string;
}

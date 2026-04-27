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

// FIX: Add the Message interface for the chatbot component.
export interface Message {
  sender: 'user' | 'ai';
  text: string;
}

// FIX: Define the Project and Stat interfaces used throughout the application.
export interface Project {
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export interface Stat {
  value: number;
  label: string;
}

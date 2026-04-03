export type Discipline = 'CIVIL' | 'WEB' | 'CYBER';

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  metrics?: { label: string; value: string }[];
}

export interface TechRow {
  id: string;
  tech: string;
  useCase: string;
}

export interface TechDetail {
  id: string;
  name: string;
  philosophy: string;
  process: { step: string; description: string }[];
  metrics: { label: string; value: string }[];
}

export interface ThreatModel {
  id: string;
  title: string;
  description: string;
  mitigation: string;
}

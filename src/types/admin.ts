export type ContactStatus = 'new' | 'read' | 'replied' | 'archived';

export interface AdminProfile {
  id: string;
  uid?: string;
  email: string;
  name?: string | null;
  role?: string;
  isActive?: boolean;
  photoURL?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: ContactStatus;
  notes?: string;
  repliedAt?: string;
  repliedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactListResponse {
  messages: ContactMessage[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  unreadCount: number;
}

export interface BlogPostRecord {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  tags: string[];
  cover?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VisitorPoint {
  date: string;
  count: number;
}

export interface TopPage {
  path: string;
  count: number;
}

export interface VisitorRecord {
  _id: string;
  ip: string;
  country?: string;
  browser?: string;
  device?: string;
  path: string;
  duration?: number;
  visitedAt: string;
}

export interface VisitorStatsResponse {
  totalVisitors: number;
  uniqueVisitors: number;
  avgDuration: number;
  topPage: string | null;
  dailyStats: VisitorPoint[];
}

export interface VisitorAnalyticsResponse {
  dailyStats: VisitorPoint[];
  topPages: TopPage[];
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  totalUnique: number;
  avgDuration: number;
  totalVisits: number;
}

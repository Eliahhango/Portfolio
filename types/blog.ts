export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description?: string;
  excerpt?: string;
  image: string;
  categories?: string[];
  tags?: string[];
  createdAt?: string;
  cover?: string;
  content?: string;
  author?: string;
  featured?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

export interface BlogFilter {
  category: string | null;
  searchQuery: string;
  sortBy: 'newest' | 'oldest' | 'popular';
}

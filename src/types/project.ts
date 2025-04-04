export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: string;
  image?: string;
  github?: string;
  live?: string;
  featured: boolean;
  date?: string;
}
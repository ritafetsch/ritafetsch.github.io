// src/lib/utils.ts

/**
 * Combines class names with proper handling of conditional classes
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));
}

/**
 * Generates a unique ID for new projects
 */
export function generateProjectId(projects: { id: number }[]): number {
  const maxId = projects.reduce((max, project) => Math.max(max, project.id), 0);
  return maxId + 1;
}

/**
 * Creates a new project object with default values
 */
export function createNewProject(id: number) {
  return {
    id,
    title: "New Project",
    description: "Project description here",
    longDescription: "Detailed project description goes here...",
    tags: [] as string[],
    category: "Other",
    image: "",
    github: "",
    live: "",
    featured: false,
    date: new Date().toISOString()
  };
}

/**
 * Groups projects by category
 */
export function groupProjectsByCategory(projects: {
  category?: string;
  [key: string]: any;
}[]): Record<string, any[]> {
  return projects.reduce((acc, project) => {
    const category = project.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(project);
    return acc;
  }, {} as Record<string, any[]>);
}

/**
 * Sorts projects by date, newest first
 */
export function sortProjectsByDate(projects: { date?: string }[]): any[] {
  return [...projects].sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date(0);
    const dateB = b.date ? new Date(b.date) : new Date(0);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Gets unique tags from all projects
 */
export function getUniqueTags(projects: { tags?: string[] }[]): string[] {
  const tags = projects.flatMap(project => project.tags || []);
  return [...new Set(tags)];
}

/**
 * Filters projects by search term
 */
export function filterProjectsBySearch(projects: { 
  title: string; 
  description: string; 
  tags?: string[];
  category?: string;
}[], searchTerm: string): any[] {
  if (!searchTerm.trim()) return projects;
  
  const lowercasedSearch = searchTerm.toLowerCase();
  
  return projects.filter(project => {
    const titleMatch = project.title.toLowerCase().includes(lowercasedSearch);
    const descriptionMatch = project.description.toLowerCase().includes(lowercasedSearch);
    const tagsMatch = project.tags?.some(tag => tag.toLowerCase().includes(lowercasedSearch));
    const categoryMatch = project.category?.toLowerCase().includes(lowercasedSearch);
    
    return titleMatch || descriptionMatch || tagsMatch || categoryMatch;
  });
}

/**
 * Truncate text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
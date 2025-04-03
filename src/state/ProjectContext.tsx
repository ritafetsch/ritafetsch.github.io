import React, { createContext, useContext, useState } from 'react';
import { Project, projects as initialProjects } from '../data/ProjectData';

interface ProjectContextType {
  projects: Project[];
  activeCategory: string;
  showFilters: boolean;
  selectedProjectId: string | null;
  filteredProjects: Project[];
  setProjects: (projects: Project[]) => void;
  setActiveCategory: (category: string) => void;
  setShowFilters: (show: boolean) => void;
  selectProject: (id: string | null) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Derived state - filtered projects based on category
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Function to select a project and scroll to top
  const selectProject = (id: string | null) => {
    setSelectedProjectId(id);
    if (id) window.scrollTo(0, 0);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      activeCategory,
      showFilters,
      selectedProjectId,
      filteredProjects,
      setProjects,
      setActiveCategory,
      setShowFilters,
      selectProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook to use the project context
export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
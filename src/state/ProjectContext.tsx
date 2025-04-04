import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as initialProjects } from '../data/ProjectData';
import { Project } from '../types/project';
import { useLocalStorage } from '../hooks/useLocalStorage';

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
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Use localStorage to persist project data
  const [savedProjects, setSavedProjects] = useLocalStorage<Project[]>('portfolio-projects', initialProjects);
  const [projects, setProjects] = useState<Project[]>(savedProjects);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Update localStorage when projects change
  useEffect(() => {
    setSavedProjects(projects);
  }, [projects, setSavedProjects]);

  // Derived state - filtered projects based on category
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Function to select a project and scroll to top
  const selectProject = (id: string | null) => {
    setSelectedProjectId(id);
    if (id) window.scrollTo(0, 0);
  };

  // Function to add a new project
  const addProject = (project: Project) => {
    setProjects(prev => [...prev, project]);
  };

  // Function to update an existing project
  const updateProject = (project: Project) => {
    setProjects(prev => 
      prev.map(p => p.id === project.id ? project : p)
    );
  };

  // Function to delete a project
  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
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
      selectProject,
      addProject,
      updateProject,
      deleteProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Custom hook to use the project context
export const useProjects = (): ProjectContextType => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
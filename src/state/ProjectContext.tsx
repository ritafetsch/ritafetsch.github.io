import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as initialProjects, DATA_VERSION } from '../data/ProjectData';
import { Project } from '../types/project';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const navigate = useNavigate();
  const location = useLocation();
  


  // Add version tracking
  const [savedVersion, setSavedVersion] = useLocalStorage<string>('portfolio-data-version', '');
  const [savedProjects, setSavedProjects] = useLocalStorage<Project[]>('portfolio-projects', initialProjects);
  
  // Use localStorage to persist project data
  const [projects, setProjects] = useState<Project[]>(() => {
    // If version doesn't match, use the initial data from code
    if (!savedVersion || savedVersion !== DATA_VERSION) {
      console.log('Data version mismatch, using updated project data');
      setSavedVersion(DATA_VERSION);
      setSavedProjects(initialProjects);
      return initialProjects;
    }
    return savedProjects;
  });


  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Check for project ID in URL on initial load and URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const projectId = searchParams.get('project');
    
    // If URL has a project ID, set it as selected
    if (projectId && projects.some(p => p.id === projectId)) {
      setSelectedProjectId(projectId);
    } else if (!projectId && selectedProjectId) {
      // If URL doesn't have a project ID but we have one selected, clear it
      setSelectedProjectId(null);
    }
  }, [location.search, projects, selectedProjectId]);

  // Update localStorage when projects change
  useEffect(() => {
    setSavedProjects(projects);
  }, [projects, setSavedProjects]);

  // Derived state - filtered projects based on category
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Function to select a project and update URL
  const selectProject = (id: string | null) => {
    if (id) {
      // Add project ID to URL
      navigate(`?project=${id}`);
      window.scrollTo(0, 0);
    } else {
      // Remove project ID from URL
      navigate('/');
    }
    
    // Also update the state
    setSelectedProjectId(id);
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
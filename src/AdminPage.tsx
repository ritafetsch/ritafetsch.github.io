import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, Settings, Moon, Sun, Search } from 'lucide-react';
import { Card, CardContent } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { Modal } from './components/ui/Modal';
import ProjectForm from './ProjectForm';
import { Project, projects as initialProjects } from './data/ProjectData';
import { v4 as uuidv4 } from 'uuid';

// Theme context
interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

// Theme provider component
export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Check for user's preferred theme on mount
  useEffect(() => {
    try {
      // Check local storage first
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Fall back to system preference
        setIsDarkMode(true);
      }
    } catch (error) {
      console.error('Error accessing theme preference:', error);
    }
  }, []);

  // Update document when theme changes
  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
const useTheme = () => useContext(ThemeContext);

// Helper for filtering projects
const filterProjectsBySearch = (projects: Project[], searchTerm: string): Project[] => {
  if (!searchTerm.trim()) return projects;
  
  const term = searchTerm.toLowerCase();
  return projects.filter(project => 
    project.title.toLowerCase().includes(term) || 
    project.description.toLowerCase().includes(term) ||
    project.tags.some(tag => tag.toLowerCase().includes(term))
  );
};

// Helper for creating a new project
const createNewProject = (): Project => ({
  id: uuidv4(),
  title: "New Project",
  description: "Project description",
  longDescription: "",
  tags: ["Tag 1", "Tag 2"],
  category: "Other",
  image: "",
  github: "",
  live: "",
  featured: false,
  date: new Date().toISOString()
});

const AdminPage: React.FC = () => {
  // State for projects
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  
  // Search functionality
  const [searchTerm, setSearchTerm] = useState<string>('');
  const filteredProjects = filterProjectsBySearch(projects, searchTerm);
  
  // Theme toggle
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  // Load projects from localStorage on initial load
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem('portfolio-projects');
      if (savedProjects) {
        const parsed = JSON.parse(savedProjects);
        if (Array.isArray(parsed)) {
          setProjects(parsed);
        } else {
          console.error('Saved projects is not an array:', parsed);
          localStorage.removeItem('portfolio-projects');
        }
      }
    } catch (error) {
      console.error('Error loading projects from localStorage:', error);
      localStorage.removeItem('portfolio-projects');
    }
  }, []);
  
  // Save projects to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('portfolio-projects', JSON.stringify(projects));
    } catch (error) {
      console.error('Error saving projects to localStorage:', error);
    }
  }, [projects]);
  
  // Handle adding a new project
  const handleAddProject = () => {
    // Create a new project with a unique ID
    const newProject = createNewProject();
    setSelectedProject(newProject);
    setIsFormOpen(true);
  };
  
  // Handle editing an existing project
  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };
  
  // Handle saving a project (new or edited)
  const handleSaveProject = (project: Project) => {
    try {
      if (project.id && projects.some(p => p.id === project.id)) {
        // Update existing project
        setProjects(prevProjects => 
          prevProjects.map(p => p.id === project.id ? project : p)
        );
      } else {
        // Add new project
        setProjects(prevProjects => [...prevProjects, project]);
      }
      
      setIsFormOpen(false);
      setSelectedProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('There was an error saving your project. Please try again.');
    }
  };
  
  // Handle deleting a project
  const handleDeleteProject = (id: string) => {
    try {
      if (window.confirm('Are you sure you want to delete this project?')) {
        setProjects(prevProjects => prevProjects.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('There was an error deleting your project. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold">Portfolio Admin</h1>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Settings"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <h2 className="text-2xl font-bold">Manage Projects</h2>
          
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            
            <Button onClick={handleAddProject} className="flex items-center whitespace-nowrap">
              <Plus size={18} className="mr-2" />
              Add Project
            </Button>
          </div>
        </div>
        
        {/* Projects list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full flex flex-col hover:shadow-md transition-shadow cursor-pointer">
                <div className="h-40 bg-gray-100 dark:bg-gray-700 relative">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500">
                      <FileText size={40} className="text-white opacity-50" />
                    </div>
                  )}
                  
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 text-xs font-medium rounded">
                      Featured
                    </div>
                  )}
                </div>
                
                <CardContent className="flex-grow flex flex-col p-4">
                  <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-auto flex gap-2">
                    <Button
                      onClick={() => handleEditProject(project)}
                      className="flex-1"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteProject(project.id)}
                      variant="outline"
                      className="bg-white text-red-600 border border-red-200 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              {searchTerm ? (
                <>
                  <p>No projects match your search "{searchTerm}"</p>
                  <Button 
                    onClick={() => setSearchTerm('')} 
                    variant="outline" 
                    className="mt-4"
                  >
                    Clear Search
                  </Button>
                </>
              ) : (
                <>
                  <p>No projects yet. Get started by adding your first project!</p>
                  <Button onClick={handleAddProject} className="mt-4">
                    <Plus size={18} className="mr-2" />
                    Add Project
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </main>
      
      {/* Project Form Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedProject(null);
        }}
        title={selectedProject?.id ? "Edit Project" : "Add New Project"}
      >
        <ProjectForm
          project={selectedProject}
          onSave={handleSaveProject}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedProject(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default AdminPage;
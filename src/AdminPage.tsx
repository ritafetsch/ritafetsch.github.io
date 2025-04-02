import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, Settings, Moon, Sun, Search } from 'lucide-react';
// Inline UI components
const Card = ({ children, className, ...props }) => (
  <div className={`rounded-lg border bg-white text-black shadow-sm ${className || ''}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={`p-6 ${className || ''}`} {...props}>
    {children}
  </div>
);

const Button = ({ children, className, ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-white hover:bg-neutral-800 transition ${className || ''}`}
    {...props}
  >
    {children}
  </button>
);

// Simple Modal component
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleBackdropClick}>
      <div className="fixed inset-0 bg-black/50" />
      <div className={`relative z-10 bg-white rounded-lg shadow-xl overflow-hidden max-w-${size === 'lg' ? '2xl' : 'lg'}`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">×</button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
import ProjectForm from './ProjectForm';
import { Project, projects as initialProjects } from './data/projects';
import { createNewProject, filterProjectsBySearch } from './utils';
// Since we haven't set up a proper ThemeContext yet, we'll use a simple mock
// Replace this with actual implementation when ThemeContext is available
const useTheme = () => ({ 
  isDarkMode: false, 
  toggleDarkMode: () => console.log('Toggle dark mode') 
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
    const savedProjects = localStorage.getItem('portfolio-projects');
    if (savedProjects) {
      try {
        setProjects(JSON.parse(savedProjects));
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    }
  }, []);
  
  // Save projects to localStorage when they change
  useEffect(() => {
    localStorage.setItem('portfolio-projects', JSON.stringify(projects));
  }, [projects]);
  
  // Handle adding a new project
  const handleAddProject = () => {
    // Create a new project with a unique ID
    const newProject = createNewProject(projects.length + 1);
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
  };
  
  // Handle deleting a project
  const handleDeleteProject = (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(prevProjects => prevProjects.filter(p => p.id !== id));
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
        size="lg"
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
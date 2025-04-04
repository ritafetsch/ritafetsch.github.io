import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, FileText, Settings, Moon, Sun, Search } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import ProjectForm from '../../components/project/ProjectForm';
import { Project } from '../../types/project';
import { v4 as uuidv4 } from 'uuid';
import { useProjects } from '../../state/ProjectContext';
import { useTheme } from '../../state/ThemeContext';

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
  // Get projects from context
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  
  // Search functionality
  const [searchTerm, setSearchTerm] = useState<string>('');
  const filteredProjects = !searchTerm.trim() 
    ? projects 
    : projects.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
  
  // Theme toggle
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  // Handle adding a new project
  const handleAddProject = () => {
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
        updateProject(project);
      } else {
        // Add new project
        addProject(project);
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
        deleteProject(id);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('There was an error deleting your project. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-bold dark:text-white">Portfolio Admin</h1>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
              </button>
              
              <button
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Settings"
              >
                <Settings size={20} className="dark:text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <h2 className="text-2xl font-bold dark:text-white">Manage Projects</h2>
          
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
              <Card className="h-full flex flex-col hover:shadow-md transition-shadow cursor-pointer dark:bg-gray-800">
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
                  <h3 className="font-semibold text-lg mb-1 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full dark:text-gray-300">
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
                      className="bg-white text-red-600 border border-red-200 hover:bg-red-50 dark:bg-gray-700 dark:border-red-800 dark:text-red-400 dark:hover:bg-gray-600"
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          {filteredProjects.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
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
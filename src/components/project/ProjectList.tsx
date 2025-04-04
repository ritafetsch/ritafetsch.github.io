import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Button } from '../ui/Button';
import ProjectCard from './ProjectCard';
import { useProjects } from '../../state/ProjectContext';

interface ProjectListProps {
  showFilters?: boolean;
  showFeaturedOnly?: boolean;
  maxProjects?: number;
  title?: string;
  description?: string;
}

const ProjectList: React.FC<ProjectListProps> = ({
  showFilters = true,
  showFeaturedOnly = false,
  maxProjects,
  title = "Projects",
  description,
}) => {
  const { 
    projects, 
    activeCategory, 
    showFilters: showMobileFilters, 
    filteredProjects,
    setActiveCategory, 
    setShowFilters, 
    selectProject 
  } = useProjects();
  
  // Apply featured filter if needed
  let displayProjects = [...filteredProjects];
  
  if (showFeaturedOnly) {
    displayProjects = displayProjects.filter(project => project.featured);
  }
  
  // Apply max limit if needed
  if (maxProjects) {
    displayProjects = displayProjects.slice(0, maxProjects);
  }

  // Get unique categories from projects
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  return (
    <div>
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {description && <p className="text-gray-600 max-w-2xl mx-auto dark:text-gray-300">{description}</p>}
        </div>
      )}
      
      {showFilters && (
        <div className="mb-8 flex justify-center md:justify-between items-center flex-wrap gap-4">
          <div className="hidden md:flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1 rounded-full ${
                  activeCategory === category
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-white text-black border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="md:hidden">
            <Button
              onClick={() => setShowFilters(!showMobileFilters)}
              className="flex items-center bg-white text-black border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              <Filter size={16} className="mr-2" />
              {showMobileFilters ? "Hide Filters" : "Filter Projects"}
            </Button>
          </div>
          
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            {displayProjects.length} project{displayProjects.length !== 1 ? 's' : ''}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ''}
          </div>
        </div>
      )}
      
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden mb-8 overflow-hidden"
          >
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium dark:text-white">Filter by Category</h3>
                <button onClick={() => setShowFilters(false)} className="text-gray-500 dark:text-gray-400">
                  <X size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setShowFilters(false);
                    }}
                    className={`px-4 py-1 rounded-full ${
                      activeCategory === category
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-white text-black border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Project grid with simple fade transition */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayProjects.map((project, index) => (
          <div 
            key={project.id} 
            className="project-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ProjectCard 
              project={project} 
              onClick={selectProject}
            />
          </div>
        ))}
      </div>
      
      {displayProjects.length === 0 && (
        <div className="col-span-3 text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No projects found in this category.</p>
          <Button onClick={() => setActiveCategory("All")} className="mt-4">
            Show All Projects
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
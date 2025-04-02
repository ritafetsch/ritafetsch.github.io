import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Button } from './components/ui/Button';
import ProjectCard from './ProjectCard';
import { Project, projectCategories } from './data/ProjectData';

interface ProjectListProps {
  projects: Project[];
  onProjectClick?: (projectId: number) => void;
  showFilters?: boolean;
  showFeaturedOnly?: boolean;
  maxProjects?: number;
  title?: string;
  description?: string;
}

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onProjectClick,
  showFilters = true,
  showFeaturedOnly = false,
  maxProjects,
  title = "Projects",
  description,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  
  let filteredProjects = projects;
  
  if (showFeaturedOnly) {
    filteredProjects = filteredProjects.filter(project => project.featured);
  }
  
  if (activeCategory !== "All") {
    filteredProjects = filteredProjects.filter(project => project.category === activeCategory);
  }
  
  if (maxProjects) {
    filteredProjects = filteredProjects.slice(0, maxProjects);
  }

  return (
    <div>
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
        </div>
      )}
      
      {showFilters && (
        <div className="mb-8 flex justify-center md:justify-between items-center flex-wrap gap-4">
          <div className="hidden md:flex flex-wrap gap-2">
            {["All", ...projectCategories.filter(c => c !== "All")].map(category => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "default" : "outline"}
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="md:hidden">
            <Button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              variant="outline"
            >
              <Filter size={16} className="mr-2" />
              {showMobileFilters ? "Hide Filters" : "Filter Projects"}
            </Button>
          </div>
          
          <div className="flex items-center text-gray-500">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ''}
          </div>
        </div>
      )}
      
      <AnimatePresence>
        {showMobileFilters && (
          <div className="md:hidden mb-8 overflow-hidden">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filter by Category</h3>
                  <button onClick={() => setShowMobileFilters(false)}>
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["All", ...projectCategories.filter(c => c !== "All")].map(category => (
                    <Button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setShowMobileFilters(false);
                      }}
                      variant={activeCategory === category ? "default" : "outline"}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div layout>
          <AnimatePresence>
            {filteredProjects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={onProjectClick}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="col-span-3 text-center py-12">
          <p className="text-gray-500">No projects found in this category.</p>
          <Button onClick={() => setActiveCategory("All")} className="mt-4">
            Show All Projects
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectList;

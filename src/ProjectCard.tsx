import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, ExternalLink } from 'lucide-react';
import { Button } from './components/ui/Button';
import { Card, CardContent } from './components/ui/Card';
import { Project } from './data/ProjectData'; // Updated import path

interface ProjectCardProps {
  project: Project;
  onClick?: (id: string) => void; // Updated to string for UUID
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  return (
    <motion.div
      style={{ height: '100%' }}
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card 
        className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick && onClick(project.id)}
      >
        <div className="relative h-48 overflow-hidden bg-gray-100">
          {project.image ? (
            <div className="absolute inset-0 bg-cover bg-center" style={{ 
              backgroundImage: `url(${project.image})`,
              filter: isHovered ? 'brightness(0.7)' : 'brightness(1)'
            }} />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500" />
          )}
          
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center gap-4">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Prevent card click
                >
                  <Button className="bg-black/80 hover:bg-black">
                    <GithubIcon size={18} className="mr-2" /> 
                    Github
                  </Button>
                </a>
              )}
              
              {project.live && (
                <a 
                  href={project.live} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Prevent card click
                >
                  <Button className="bg-black/80 hover:bg-black">
                    <ExternalLink size={18} className="mr-2" /> 
                    Demo
                  </Button>
                </a>
              )}
            </div>
          )}
        </div>
        
        <CardContent className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-3">{project.description}</p>
          
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.slice(0, 3).map((tag, idx) => (
                <span 
                  key={idx} 
                  className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
            
            {project.featured && (
              <div className="mt-2">
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                  Featured
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
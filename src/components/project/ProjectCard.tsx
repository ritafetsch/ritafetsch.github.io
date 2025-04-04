import React, { useState } from 'react';
import { GithubIcon, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
  onClick?: (id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  return (
    <div className="h-full">
      <Card 
        className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick && onClick(project.id)}
      >
        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
          {project.image ? (
            <div className="absolute inset-0 bg-cover bg-center" style={{ 
              backgroundImage: `url(${project.image})`,
              filter: isHovered ? 'brightness(0.7)' : 'brightness(1)',
              transition: 'filter 0.5s ease' // Slowed down transition
            }} />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500" />
          )}
          
          {isHovered && (
            <div className="absolute inset-0 flex items-center justify-center gap-4 transition-opacity duration-300">
              {project.github && (
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // Prevent card click
                >
                  <Button className="bg-black/80 hover:bg-black dark:bg-white/90 dark:text-black dark:hover:bg-white">
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
                  <Button className="bg-black/80 hover:bg-black dark:bg-white/90 dark:text-black dark:hover:bg-white">
                    <ExternalLink size={18} className="mr-2" /> 
                    Demo
                  </Button>
                </a>
              )}
            </div>
          )}
        </div>
        
        <CardContent className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2 dark:text-white">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-3">{project.description}</p>
          
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tags.slice(0, 3).map((tag, idx) => (
                <span 
                  key={idx} 
                  className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
            
            {project.featured && (
              <div className="mt-2">
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Featured
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectCard;
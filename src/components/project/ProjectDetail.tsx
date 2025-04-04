import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink, GithubIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Project } from '../../types/project';
import { useProjects } from '../../state/ProjectContext';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const { projects } = useProjects();
  
  // Get related projects (excluding current project)
  const relatedProjects = projects
    .filter(p => p.id !== project.id)
    .slice(0, 3);
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto py-12 px-6">
        <button 
          onClick={onBack}
          className="inline-flex items-center text-gray-600 hover:text-black mb-8"
        >
          <ChevronRight size={16} className="mr-2 rotate-180" />
          Back to Projects
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="inline-block px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mb-8">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button className="flex items-center">
                    <GithubIcon size={18} className="mr-2" /> 
                    View on GitHub
                  </Button>
                </a>
              )}
              
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="flex items-center">
                    <ExternalLink size={18} className="mr-2" /> 
                    Live Demo
                  </Button>
                </a>
              )}
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg overflow-hidden mb-12 aspect-video">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
            )}
          </div>

          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
              <div className="prose max-w-none">
                <p>{project.longDescription || "No detailed description available."}</p>
              </div>
            </CardContent>
          </Card>

          {relatedProjects.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Other Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {relatedProjects.map(relatedProject => (
                  <Card 
                    key={relatedProject.id} 
                    className="overflow-hidden cursor-pointer transition-all hover:shadow-md" 
                    onClick={() => {
                      window.scrollTo(0, 0);
                      onBack();
                    }}
                  >
                    <div className="h-40 bg-gray-100">
                      {relatedProject.image ? (
                        <img 
                          src={relatedProject.image} 
                          alt={relatedProject.title} 
                          className="w-full h-full object-cover object-center"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500" />
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-1">{relatedProject.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{relatedProject.description}</p>
                      <Button 
                        className="w-full"
                        onClick={() => onBack()}
                      >
                        View Project
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;
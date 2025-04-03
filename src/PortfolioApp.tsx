import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { ExternalLink, Mail, ChevronRight, Filter, X } from 'lucide-react';
import { Project, projectCategories } from './data/ProjectData';
import { GithubIcon, LinkedinIcon } from "lucide-react";
import ProjectCard from './ProjectCard';
import { ProjectProvider, useProjects } from './state/ProjectContext';

// Navigation items type
interface NavItem {
  name: string;
  href: string;
}

// Navigation items
const navItems: NavItem[] = [
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" }
];

// Project Detail Component
interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const { projects } = useProjects();
  
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
                <Button 
                  variant="outline" 
                  className="flex items-center"
                >
                  <GithubIcon size={18} className="mr-2" /> 
                  View on GitHub
                </Button>
              </a>
            )}
              
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="outline"
                    className="flex items-center"
                  >
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

          <h2 className="text-2xl font-semibold mb-4">Other Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {projects
              .filter(p => p.id !== project.id)
              .slice(0, 3)
              .map(relatedProject => (
                <Card 
                  key={relatedProject.id} 
                  className="overflow-hidden cursor-pointer" 
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
                      variant="default"
                      className="w-full"
                      onClick={() => onBack()}
                    >
                      View Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Main Portfolio Content Component
const PortfolioContent: React.FC = () => {
  const { 
    projects, 
    activeCategory, 
    showFilters, 
    selectedProjectId,
    filteredProjects,
    setActiveCategory, 
    setShowFilters, 
    selectProject 
  } = useProjects();

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-sm border-b z-10">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#" className="text-xl font-bold">Rita Fetsch</a>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-gray-600 hover:text-black transition-colors"
                aria-label={`Navigate to ${item.name} section`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
      
      {selectedProject ? (
        <ProjectDetail project={selectedProject} onBack={() => selectProject(null)} />
      ) : (
        <>
          {/* Hero Section */}
          <section className="py-20 px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center md:text-left md:flex items-center gap-8">
                <div className="md:w-2/3">
                  <h1 className="text-5xl font-bold mb-4">Hi, I'm Rita Fetsch</h1>
                  <p className="text-xl text-gray-600 mb-6">
                    Software Engineer based in London, passionate about building clean, impactful web applications.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a href="#projects" aria-label="View my work">
                    <Button 
                      variant="default" 
                      className="flex items-center gap-2"
                    >
                      View My Work <ChevronRight size={16} />
                    </Button>
                  </a>
                  <a href="#contact" aria-label="Get in touch">
                    <Button 
                      variant="outline"
                    >
                      Get In Touch
                    </Button>
                  </a>
                </div>
                </div>
                <div className="hidden md:block md:w-1/3">
                  <div className="aspect-square bg-gray-100 rounded-full overflow-hidden">
                    {/* Placeholder for profile image */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                  </div>
                </div>
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* Projects Section */}
          <section id="projects" className="py-16 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Projects</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  A selection of my recent work. Each project is unique and showcases different skills and technologies.
                </p>
              </div>
              
              {/* Category Filters */}
              <div className="mb-8 flex justify-center md:justify-between items-center flex-wrap gap-4">
              <div className="hidden md:flex flex-wrap gap-2">
                {projectCategories.map(category => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    onClick={() => setActiveCategory(category)}
                    aria-label={`Filter by ${category} category`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
                
                {/* Mobile Filter Button */}
                <div className="md:hidden">
                  <Button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center bg-white text-black border border-gray-300 hover:bg-gray-100"
                    aria-label={showFilters ? "Hide filters" : "Show filters"}
                  >
                    <Filter size={16} className="mr-2" />
                    {showFilters ? "Hide Filters" : "Filter Projects"}
                  </Button>
                </div>
              </div>
              
              {/* Mobile Filters */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="md:hidden mb-8 overflow-hidden">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium">Filter by Category</h3>
                        <button onClick={() => setShowFilters(false)} aria-label="Close filters">
                          <X size={18} className="text-gray-500" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {projectCategories.map(category => (
                          <Button
                            key={category}
                            onClick={() => {
                              setActiveCategory(category);
                              setShowFilters(false);
                            }}
                            className={`px-4 py-1 rounded-full ${
                              activeCategory === category
                                ? "bg-black text-white"
                                : "bg-white text-black border border-gray-200 hover:bg-gray-100"
                            }`}
                            aria-label={`Filter by ${category} category`}
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Project Grid */}
              <motion.div layout>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {filteredProjects.map(project => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onClick={selectProject}
                    />
                  ))}
                </AnimatePresence>
                
                {filteredProjects.length === 0 && (
                  <div className="col-span-3 text-center py-12">
                    <p className="text-gray-500">No projects found in this category.</p>
                  </div>
                )}
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* About Section */}
          <section id="about" className="py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
                <div className="prose max-w-none">
                  <p>
                    I'm a Canadian living in London and a recent graduate with my Bachelor's in Computer Science. 
                    I love computers, I love people, and I love what I do. I switched career paths a few years back 
                    when someone much wiser than me called me out for constantly being distracted by all my computer projects.
                  </p>
                  <p>
                    In my free time I enjoy indulging in the latest culprit of my curious mind. I love to build things, 
                    and I love to take them apart. I am very involved in the community, participating in several different 
                    areas of sports as well as the arts, never struggling for a lack of fascination with life.
                  </p>
                  <p>
                    The thing that excites me most about being a developer is the incredible potential of modern technology 
                    to make a positive change. For me it is a privilege to be one such mechanic scrummaging around in that tool box. 
                    I hope to be able to work with you in future and join forces in being that vessel for change.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>
          
          {/* Contact Section */}
          <section id="contact" className="py-16 px-6 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
              
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-sm w-full md:w-auto">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Mail className="mt-1 text-gray-600" size={20} />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <a href="mailto:ritafetsch1@gmail.com" className="text-blue-600 hover:underline">
                          ritafetsch1@gmail.com
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <LinkedinIcon className="mt-1 text-gray-600" size={20} />
                      <div>
                        <h3 className="font-medium">LinkedIn</h3>
                        <a href="https://linkedin.com/in/rita-fetsch" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          linkedin.com/in/rita-fetsch
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <GithubIcon className="mt-1 text-gray-600" size={20} />
                      <div>
                        <h3 className="font-medium">GitHub</h3>
                        <a href="https://github.com/ritafetsch" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          github.com/ritafetsch
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Footer */}
          <footer className="py-8 px-6 border-t">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 mb-4 md:mb-0">
                © {new Date().getFullYear()} Rita Fetsch. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a href="https://github.com/ritafetsch" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <GithubIcon className="text-gray-600 hover:text-black transition-colors" />
                </a>
                <a href="https://linkedin.com/in/rita-fetsch" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedinIcon className="text-gray-600 hover:text-black transition-colors" />
                </a>
                <a href="mailto:ritafetsch1@gmail.com" aria-label="Email">
                  <Mail className="text-gray-600 hover:text-black transition-colors" />
                </a>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

// Main Portfolio App Component
const PortfolioApp: React.FC = () => {
  return (
    <ProjectProvider>
      <PortfolioContent />
    </ProjectProvider>
  );
};

export default PortfolioApp;
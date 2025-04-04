import React from 'react';
import { ProjectProvider, useProjects } from './state/ProjectContext';
import { ThemeProvider } from './state/ThemeContext';

// Sections
import NavSection from './components/sections/portfolio/NavSection';
import HeroSection from './components/sections/portfolio/HeroSection';
import ProjectsSection from './components/sections/portfolio/ProjectsSection';
import AboutSection from './components/sections/portfolio/AboutSection';
import ContactSection from './components/sections/portfolio/ContactSection';
import FooterSection from './components/sections/portfolio/FooterSection';

// Project Components
import ProjectDetail from './components/project/ProjectDetail';

// Main Portfolio Content Component
const PortfolioContent: React.FC = () => {
  const { selectedProjectId, projects, selectProject } = useProjects();
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <NavSection />
      
      {selectedProject ? (
        <ProjectDetail 
          project={selectedProject} 
          onBack={() => selectProject(null)} 
        />
      ) : (
        <>
          <HeroSection />
          <ProjectsSection />
          <AboutSection />
          <ContactSection />
          <FooterSection />
        </>
      )}
    </div>
  );
};

// Main Portfolio App Component
const PortfolioApp: React.FC = () => {
  return (
    <ThemeProvider>
      <ProjectProvider>
        <PortfolioContent />
      </ProjectProvider>
    </ThemeProvider>
  );
};

export default PortfolioApp;
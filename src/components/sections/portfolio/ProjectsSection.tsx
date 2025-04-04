import React from 'react';
import ProjectList from '../../project/ProjectList';

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <ProjectList 
          title="Projects"
          description="A selection of my recent work. Each project is unique and showcases different skills and technologies."
          showFilters={true}
        />
      </div>
    </section>
  );
};

export default ProjectsSection;
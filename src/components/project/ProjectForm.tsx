import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { X, Save } from 'lucide-react';
import { Project } from '../../types/project';
import { v4 as uuidv4 } from 'uuid';

interface ProjectFormProps {
  project?: Project | null;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

interface FormData {
  title: string;
  description: string;
  longDescription: string;
  tags: string;
  category: string;
  image: string;
  github: string;
  live: string;
  featured: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project = null, onSave, onCancel }) => {
  // Initialize form with existing project data or defaults
  const [formData, setFormData] = useState<FormData>({
    title: project?.title || '',
    description: project?.description || '',
    longDescription: project?.longDescription || '',
    tags: project?.tags?.join(', ') || '',
    category: project?.category || 'Other',
    image: project?.image || '',
    github: project?.github || '',
    live: project?.live || '',
    featured: project?.featured || false,
  });

  // Available categories
  const categories: string[] = [
    'Full Stack',
    'Web App',
    'Mobile',
    'Game',
    'API',
    'Application',
    'Data Science',
    'Other'
  ];

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Process tags from comma-separated string to array
    const tags = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
    
    // Prepare data for saving
    const projectData: Project = {
      id: project?.id || uuidv4(), // Use existing ID or generate a new UUID
      ...formData,
      tags,
      date: new Date().toISOString() // Update the date
    };
    
    onSave(projectData);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto dark:bg-gray-800 dark:text-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onCancel}
            className="rounded-full h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={18} />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          {/* Short Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Short Description *
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          {/* Long Description */}
          <div>
            <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Detailed Description
            </label>
            <textarea
              id="longDescription"
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="React, JavaScript, CSS, etc."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          {/* Image URL */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Image URL
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          {/* GitHub URL */}
          <div>
            <label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              GitHub URL
            </label>
            <input
              type="text"
              id="github"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          {/* Live Demo URL */}
          <div>
            <label htmlFor="live" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Live Demo URL
            </label>
            <input
              type="text"
              id="live"
              name="live"
              value={formData.live}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          
          {/* Featured */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Featured Project (appears at the top)
            </label>
          </div>
          
          {/* Form Actions */}
          <div className="pt-5 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="bg-white text-black border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex items-center"
            >
              <Save size={18} className="mr-2" />
              Save Project
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;
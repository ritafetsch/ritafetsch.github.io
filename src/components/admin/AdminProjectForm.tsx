import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Project } from '../../types/project';
import { projectCategories } from '../../data/ProjectData';

interface AdminProjectFormProps {
  project: Project | null;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const AdminProjectForm: React.FC<AdminProjectFormProps> = ({
  project,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    longDescription: project?.longDescription || '',
    tags: project?.tags.join(', ') || '',
    category: project?.category || 'Other',
    image: project?.image || '',
    github: project?.github || '',
    live: project?.live || '',
    featured: project?.featured || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData: Project = {
      id: project?.id || crypto.randomUUID(),
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      date: new Date().toISOString()
    };

    onSave(projectData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Short Description *
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
        />
      </div>

      <div>
        <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Long Description
        </label>
        <textarea
          id="longDescription"
          name="longDescription"
          rows={4}
          value={formData.longDescription}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Category *
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
        >
          {projectCategories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="React, TypeScript, Tailwind"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Image URL
        </label>
        <input
          type="text"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
        />
      </div>

      <div>
        <label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          GitHub URL
        </label>
        <input
          type="text"
          id="github"
          name="github"
          value={formData.github}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
        />
      </div>

      <div>
        <label htmlFor="live" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Live Demo URL
        </label>
        <input
          type="text"
          id="live"
          name="live"
          value={formData.live}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="featured"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-200">
          Featured Project
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex items-center"
        >
          <X size={16} className="mr-2" />
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex items-center"
        >
          <Save size={16} className="mr-2" />
          Save Project
        </Button>
      </div>
    </form>
  );
};

export default AdminProjectForm;
import React from 'react';
import { Button } from '../ui/Button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Project } from '../../types/project';

interface AdminProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const AdminProjectList: React.FC<AdminProjectListProps> = ({ 
  projects, 
  onEdit, 
  onDelete, 
  onAdd 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Projects</h2>
        <Button onClick={onAdd} className="flex items-center">
          <Plus size={18} className="mr-2" />
          Add Project
        </Button>
      </div>
      
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                Title
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Category
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Featured
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {projects.map(project => (
              <tr key={project.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                  {project.title}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {project.category}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {project.featured ? 'Yes' : 'No'}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(project)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Pencil size={16} className="mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(project.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProjectList;
import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Pencil, Trash2, FileText } from 'lucide-react';
import { Project } from '../../types/project';

interface AdminProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const AdminProjectCard: React.FC<AdminProjectCardProps> = ({ 
  project, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <div className="relative">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <FileText className="h-12 w-12 text-gray-400" />
          </div>
        )}
        {project.featured && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 text-xs font-medium rounded">
            Featured
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2 mt-auto">
          <Button
            onClick={() => onEdit(project)}
            variant="outline"
            className="flex-1"
          >
            <Pencil size={16} className="mr-2" />
            Edit
          </Button>
          <Button
            onClick={() => onDelete(project.id)}
            variant="outline"
            className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10"
          >
            <Trash2 size={16} className="mr-2" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminProjectCard;
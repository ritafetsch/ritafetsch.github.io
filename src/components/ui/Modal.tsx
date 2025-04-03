import React from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  if (!isOpen) return null;

  // Map size to appropriate max-width class
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden ${sizeClasses[size]} w-full`}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
            <h2 className="text-xl font-semibold dark:text-white">{title}</h2>
            <button 
              onClick={onClose} 
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export { Modal };
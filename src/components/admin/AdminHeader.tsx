import React from 'react';
import { Settings, Moon, Sun, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../state/ThemeContext';

const AdminHeader: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Portfolio Admin
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun size={20} className="text-gray-400 hover:text-gray-500" />
              ) : (
                <Moon size={20} className="text-gray-400 hover:text-gray-500" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label="Settings"
            >
              <Settings size={20} className="text-gray-400 hover:text-gray-500" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10"
              aria-label="Log out"
              onClick={() => {/* TODO: Add logout functionality */}}
            >
              <LogOut size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
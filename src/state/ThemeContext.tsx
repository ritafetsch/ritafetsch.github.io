import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Use a ref to track if this is the initial render
  const [initialized, setInitialized] = useState(false);
  const [savedTheme, setSavedTheme] = useLocalStorage<string>('theme', '');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Initialize theme based on saved preference or system preference
  useEffect(() => {
    if (initialized) return;
    
    const initTheme = () => {
      // First check saved preference
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else {
        // Otherwise check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          setIsDarkMode(true);
          setSavedTheme('dark');
        } else {
          setIsDarkMode(false);
          setSavedTheme('light');
        }
      }
    };
    
    initTheme();
    setInitialized(true);
  }, [savedTheme, setSavedTheme, initialized]);

  // Update document when theme changes
  useEffect(() => {
    if (!initialized) return;
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      setSavedTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setSavedTheme('light');
    }
  }, [isDarkMode, setSavedTheme, initialized]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
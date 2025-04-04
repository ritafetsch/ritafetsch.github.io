import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../../../state/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

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

const NavSection: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating to a section
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-10 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b" 
        : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#" className="text-xl font-bold dark:text-white">Rita Fetsch</a>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              aria-label={`Navigate to ${item.name} section`}
            >
              {item.name}
            </a>
          ))}
          
          {/* Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} />}
          </button>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X size={20} className="text-gray-900 dark:text-gray-100" />
            ) : (
              <Menu size={20} className="text-gray-900 dark:text-gray-100" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
          >
            <div className="px-6 py-4 space-y-3">
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white py-2"
                  onClick={handleNavClick}
                >
                  {item.name}
                </a>
              ))}
              
              <div className="pt-2 pb-1 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => {
                    toggleDarkMode();
                    handleNavClick();
                  }}
                  className="flex items-center gap-2 py-2 text-gray-600 dark:text-gray-300"
                >
                  {isDarkMode ? (
                    <>
                      <Sun size={18} />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={18} />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavSection;
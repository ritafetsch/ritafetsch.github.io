import React from 'react';
import { Mail, GithubIcon, Linkedin } from 'lucide-react';

const FooterSection: React.FC = () => {
  return (
    <footer className="py-8 px-6 border-t dark:border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
          © {new Date().getFullYear()} Rita Fetsch. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a 
            href="https://github.com/ritafetsch" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <GithubIcon />
          </a>
          <a 
            href="https://linkedin.com/in/rita-fetsch" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <Linkedin />
          </a>
          <a 
            href="mailto:ritafetsch1@gmail.com" 
            aria-label="Email"
            className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            <Mail />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
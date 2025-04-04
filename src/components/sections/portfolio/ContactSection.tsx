import React from 'react';
import { Mail, LinkedinIcon, GithubIcon } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">Get In Touch</h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm w-full md:w-auto">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Mail className="mt-1 text-gray-600 dark:text-gray-400" size={20} />
                <div>
                  <h3 className="font-medium dark:text-white">Email</h3>
                  <a href="mailto:ritafetsch1@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    ritafetsch1@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <LinkedinIcon className="mt-1 text-gray-600 dark:text-gray-400" size={20} />
                <div>
                  <h3 className="font-medium dark:text-white">LinkedIn</h3>
                  <a 
                    href="https://linkedin.com/in/rita-fetsch" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    linkedin.com/in/rita-fetsch
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <GithubIcon className="mt-1 text-gray-600 dark:text-gray-400" size={20} />
                <div>
                  <h3 className="font-medium dark:text-white">GitHub</h3>
                  <a 
                    href="https://github.com/ritafetsch" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    github.com/ritafetsch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
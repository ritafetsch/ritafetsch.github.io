import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '../../ui/Button';

const HeroSection: React.FC = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center md:text-left md:flex items-center gap-8">
            <div className="md:w-2/3">
              <h1 className="text-5xl font-bold mb-4 dark:text-white">Hi, I'm Rita Fetsch</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                Software Engineer based in London, passionate about building clean, impactful web applications.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a href="#projects" aria-label="View my work">
                  <Button className="flex items-center gap-2">
                    View My Work <ChevronRight size={16} />
                  </Button>
                </a>
                <a href="#contact" aria-label="Get in touch">
                  <Button variant="outline">
                    Get In Touch
                  </Button>
                </a>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3">
              <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                {/* Profile Image */}
                <img 
                  src="/images/profile_pic/rita.jpg" 
                  alt="Rita Fetsch"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop
                    // Fallback to gradient if image fails to load
                    target.style.display = 'none';
                    target.parentElement!.classList.add('bg-gradient-to-br', 'from-blue-400', 'to-purple-500');
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
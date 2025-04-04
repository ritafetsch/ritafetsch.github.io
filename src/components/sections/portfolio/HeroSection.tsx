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
              <div className="mx-auto flex items-center justify-center">
                <div
                  style={{
                    width: "288px",
                    height: "288px",
                    position: "relative",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "50%",
                    overflow: "hidden"
                  }}
                >
                  <img
                    src="/images/profile_pic/rita.jpg"
                    alt="Rita Fetsch"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center 15%", 
                    }}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.style.display = 'none';
                      target.parentElement!.style.background = 'linear-gradient(to bottom right, #60a5fa, #8b5cf6)';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
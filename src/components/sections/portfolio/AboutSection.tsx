import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 px-6 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">About Me</h2>
          <div className="prose max-w-none dark:text-gray-300">
            <p>
              I'm a Canadian living in London and a recent graduate with my Bachelor's in Computer Science. 
              I love computers, I love people, and I love what I do. I switched career paths a few years back 
              when someone much wiser than me called me out for constantly being distracted by all my computer projects.
            </p>
            <p>
              In my free time I enjoy indulging in the latest culprit of my curious mind. I love to build things, 
              and I love to take them apart. I am very involved in the community, participating in several different 
              areas of sports as well as the arts, never struggling for a lack of fascination with life.
            </p>
            <p>
              The thing that excites me most about being a developer is the incredible potential of modern technology 
              to make a positive change. For me it is a privilege to be one such mechanic scrummaging around in that tool box. 
              I hope to be able to work with you in future and join forces in being that vessel for change.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
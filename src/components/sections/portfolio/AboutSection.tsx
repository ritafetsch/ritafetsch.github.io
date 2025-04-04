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
              I'm a Canadian software engineer based in London with a First-Class Honours degree in Computer Science from the University of London. 
              My journey into tech began when someone wiser than me pointed out I was constantly distracted by computer projects – 
              turns out they were right about where my passion truly lay. Most recently, I worked as a Software Engineer at The Signalling Company, 
              where I rapidly progressed from intern to managing critical certification software in a fast-paced startup environment.
            </p>
            <p>
              I balance technical precision with genuine curiosity, whether I'm overhauling testing platforms, automating complex workflows, or managing CI/CD pipelines. 
              Outside of coding, you'll find me exploring London's arts scene, participating in various sports, or tinkering with my latest side project. 
            </p>
            <p>
              What drives me most about software development is its potential to create meaningful impact at scale. 
              I view myself as a pragmatic problem-solver with the technical toolkit to bring ideas to life – 
              and I'm always looking for new challenges where my blend of engineering skill and human-centered approach can make a difference.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
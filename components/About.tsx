import React from 'react';
import { motion } from 'framer-motion';
import Stats from './Stats';

const About: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-4 px-4">About Me</h2>
      <div className="w-20 h-1 bg-blue-500 mx-auto mb-8 sm:mb-12"></div>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 sm:gap-12 px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/3"
        >
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto">
            <img src="https://files.catbox.moe/qgbtyt.png" alt="EliTechWiz" className="rounded-full w-full h-full object-cover shadow-lg border-4 border-blue-500/50" loading="lazy" width="256" height="256" />
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="md:w-2/3 text-center md:text-left"
        >
          <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 mb-4">
            I am EliTechWiz, a visionary technologist, hacker, and creative mind, driven by innovation and the pursuit of digital excellence. My expertise spans cybersecurity, software development, UI/UX design, graphics and architectural design, and more.
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 mb-4">
            With a passion for turning complex problems into elegant solutions, I merge technology, design, and strategy to create impactful digital experiences. As a CEO and creator, I thrive on building projects that push boundaries, challenge norms, and leave a lasting impression in the tech world.
          </p>
          <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 mb-4">
            Whether I'm securing digital spaces, designing intuitive interfaces, or crafting visually stunning creations, my goal is to transform ideas into reality with precision, creativity, and a relentless drive for excellence.
          </p>
           <p className="text-sm sm:text-base text-slate-500 dark:text-gray-300 font-semibold italic">
            Let’s innovate, design, and dominate the digital future together.
          </p>
        </motion.div>
      </div>
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-4">My Achievements</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-8 sm:mb-12"></div>
          <Stats />
        </div>
      </section>
    </section>
  );
};

export default About;

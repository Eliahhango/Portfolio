import React from 'react';
import { motion } from 'framer-motion';
import Stats from './Stats';
import { usePublicSiteContent } from '../contexts/PublicSiteContentContext';
import SectionHeader from './SectionHeader';

const About: React.FC = () => {
  const { aboutContent } = usePublicSiteContent();

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20">
      <SectionHeader tag="About Me" title="Who I Am" />
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 sm:gap-12 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/3"
        >
          <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto">
            <img
              src={aboutContent.imageUrl}
              alt="EliTechWiz"
              className="rounded-full w-full h-full object-cover shadow-lg border-4 border-blue-500/50"
              loading="lazy"
              width="256"
              height="256"
            />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="md:w-2/3 text-center md:text-left"
        >
          {aboutContent.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-sm sm:text-base text-slate-600 dark:text-gray-300 mb-4">
              {paragraph}
            </p>
          ))}
          <p className="text-sm sm:text-base text-slate-500 dark:text-gray-300 font-semibold italic">
            {aboutContent.quote}
          </p>
        </motion.div>
      </div>
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeader title="My Achievements" />
          <Stats />
        </div>
      </section>
    </section>
  );
};

export default About;

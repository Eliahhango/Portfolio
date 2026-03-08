import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Typewriter from './Typewriter';
import { usePublicSiteContent } from '../contexts/PublicSiteContentContext';
import { scrollToSection } from '../utils/scrollUtils';

const Hero: React.FC = () => {
  const { heroContent, aboutContent } = usePublicSiteContent();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const miniStats = [
    { value: '10+', label: 'Years' },
    { value: '50+', label: 'Projects' },
    { value: '100+', label: 'Clients' },
  ];

  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToSection('contact');
  };

  const handleProjectsClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToSection('projects');
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28 sm:pt-32 lg:pt-24"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8"
      >
        <div className="text-center lg:text-left">
          <motion.div
            variants={itemVariants}
            className="inline-flex rounded-full border border-emerald-400/25 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/5 backdrop-blur dark:border-emerald-400/20 dark:bg-white/5 dark:text-slate-200"
          >
            <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
            </span>
            <span>Available for Projects</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-8 text-5xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
          >
            <span className="block">I Build</span>
            <span className="mt-3 block min-h-[1.1em]">
              <Typewriter
                words={heroContent.roles}
                className="bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400 bg-clip-text font-black text-transparent"
                cursorClassName="text-cyan-400"
              />
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 lg:mx-0 lg:text-lg"
          >
            {heroContent.description}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start"
          >
            <a
              href="#contact"
              onClick={handleContactClick}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-400 sm:w-auto"
            >
              Hire Me
            </a>
            <a
              href="#projects"
              onClick={handleProjectsClick}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-white/70 px-8 py-4 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 dark:border-white/20 dark:bg-white/5 dark:text-slate-100 dark:hover:border-cyan-400/40 dark:hover:text-cyan-300 sm:w-auto"
            >
              View Projects
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            {miniStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-full border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
              >
                <span className="text-lg font-bold text-blue-500">{stat.value}</span>
                <span className="ml-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mx-auto w-full max-w-md lg:max-w-xl">
          <img
            src={aboutContent.imageUrl}
            alt="EliTechWiz"
            className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-slate-200 dark:ring-white/10"
            loading="eager"
          />
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        aria-label="Scroll to next section"
        onClick={() => scrollToSection('about')}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-slate-200/80 bg-white/70 p-3 text-slate-600 backdrop-blur transition hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-cyan-400/40 dark:hover:text-cyan-300"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
};

export default Hero;

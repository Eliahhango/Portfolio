import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { logError } from '../utils/errorHandler.js';
import ProjectModal from '../components/ProjectModal';
import type { Project } from '../types';

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsQuery = query(
          collection(db, 'projects'),
          where('published', '==', true)
        );
        const snapshot = await getDocs(projectsQuery);
        const projectsData: Project[] = snapshot.docs.map((doc) => ({
          title: doc.data().title || 'Untitled',
          description: doc.data().description || '',
          longDescription: doc.data().longDescription || '',
          imageUrl: doc.data().image || 'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg',
          tags: doc.data().tags || [],
          repoUrl: doc.data().githubUrl || undefined,
          liveUrl: doc.data().liveUrl || undefined,
          caseStudySlug: doc.data().caseStudySlug || undefined,
        }));
        setProjects(projectsData);
        setLoading(false);
      } catch (error) {
        logError('ProjectsPage.fetchProjects', error);
        // Show empty state gracefully on error
        setProjects([]);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Get unique tags from all projects
  const allTags = Array.from(
    new Set(projects.flatMap(p => p.tags))
  );

  // Filter projects based on active tag
  const filteredProjects = activeFilter
    ? projects.filter(p => p.tags.includes(activeFilter))
    : projects;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 sm:py-16 md:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Page Header */}
          <motion.div variants={itemVariants} className="text-center space-y-3 sm:space-y-4 pt-4 sm:pt-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
              Portfolio
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-gray-300">
              Explore our latest projects and case studies
            </p>
          </motion.div>

          {/* Filter Tags */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2 sm:px-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(null)}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-full font-medium transition-all ${
                activeFilter === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              All Projects
            </motion.button>
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(tag)}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-full font-medium transition-all ${
                  activeFilter === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-gray-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          {loading ? (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
            >
              {[1, 2, 3, 4].map((index) => (
                <motion.div key={index} variants={itemVariants} className="rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-700 h-96 animate-pulse" />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ translateY: -8 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer"
                >
                  <div className="rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-slate-200 dark:bg-slate-700">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <p className="text-white text-sm font-semibold p-4">Click to learn more</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 dark:text-gray-300 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div variants={itemVariants} className="text-center py-12">
              <p className="text-lg text-slate-600 dark:text-gray-300">
                No projects found for this category. Try a different filter.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </motion.div>
  );
};

export default ProjectsPage;

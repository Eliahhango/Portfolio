
import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../types';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
    return (
        <motion.div
            layoutId={`card-${project.title}`}
            onClick={onClick}
            className="group cursor-pointer bg-white dark:bg-slate-800/50 dark:border-slate-700/50 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-blue-600/30 dark:hover:shadow-2xl dark:hover:border-blue-500/50 transition-all duration-300 border border-slate-200 dark:border-slate-700/50"
        >
            <div className="relative overflow-hidden h-48">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">View Details</p>
                </div>
            </div>
            <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                <p className="text-slate-600 dark:text-gray-300 text-xs sm:text-sm mb-4 min-h-[2.5rem]">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-300 dark:border dark:border-blue-500/30 text-xs font-semibold px-2 sm:px-2.5 py-1 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
                {project.caseStudySlug && (
                    <div className="mt-4">
                        <Link
                            to={`/case-studies/${project.caseStudySlug}`}
                            className="inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Read case study →
                        </Link>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectCard;
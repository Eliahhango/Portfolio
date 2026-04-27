import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../types';
import { GithubIcon, ExternalLinkIcon } from '../constants';

interface ProjectModalProps {
    project: Project;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-2xl max-w-2xl w-full relative border border-slate-200 dark:border-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <p className="text-slate-600 dark:text-gray-400 mb-6">
                        {project.longDescription || project.description}
                    </p>
                    <div className="flex items-center justify-end space-x-4">
                        {project.repoUrl && project.repoUrl !== '#' && (
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                                <GithubIcon className="w-6 h-6" /> GitHub
                            </a>
                        )}
                        {project.liveUrl && project.liveUrl !== '#' && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                                <ExternalLinkIcon className="w-6 h-6" /> Live Demo
                            </a>
                        )}
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/75 transition-colors"
                    aria-label="Close modal"
                >
                    &times;
                </button>
            </motion.div>
        </div>
    );
};

export default ProjectModal;
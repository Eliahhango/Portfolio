import React from 'react';
import { PROJECTS_DATA } from '../constants';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectsProps {
    onProjectClick: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectClick }) => {
    return (
        <section id="projects" className="py-12 sm:py-16 md:py-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-4 px-4">Portfolio</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto mb-8 sm:mb-12"></div>
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6">
                {PROJECTS_DATA.map((project, index) => (
                    <ProjectCard 
                        key={index} 
                        project={project} 
                        onClick={() => onProjectClick(project)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Projects;
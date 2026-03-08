import React from 'react';
import { PROJECTS_DATA } from '../constants';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';
import SectionHeader from './SectionHeader';

interface ProjectsProps {
    onProjectClick: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectClick }) => {
    return (
        <section id="projects" className="py-12 sm:py-16 md:py-20">
            <SectionHeader tag="Portfolio" title="Featured Work" />
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

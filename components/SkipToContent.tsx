import React from 'react';
import { scrollToSection } from '../utils/scrollUtils';

const SkipToContent: React.FC = () => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        scrollToSection('home', 80);
    };

    return (
        <a
            href="#home"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            onClick={handleClick}
        >
            Skip to main content
        </a>
    );
};

export default SkipToContent;

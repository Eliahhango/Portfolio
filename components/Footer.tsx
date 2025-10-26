import React from 'react';
import { GithubIcon, YoutubeIcon } from '../constants';

interface FooterProps {
  onPrivacyClick: () => void;
  onDocsClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onPrivacyClick, onDocsClick }) => {
  return (
    <footer className="bg-slate-100 dark:bg-gray-900/50 py-8 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
        <p className="text-slate-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} EliTechWiz. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <button onClick={onPrivacyClick} className="text-slate-500 dark:text-gray-400 hover:text-blue-500 text-sm transition-colors">Privacy Policy</button>
          <button onClick={onDocsClick} className="text-slate-500 dark:text-gray-400 hover:text-blue-500 text-sm transition-colors">Documentation</button>
          <a href="https://github.com/Eliahhango" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GithubIcon className="w-6 h-6 text-slate-500 dark:text-gray-400 hover:text-blue-500 transition-colors" />
          </a>
          <a href="https://youtube.com/@eliahhango" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <YoutubeIcon className="w-6 h-6 text-slate-500 dark:text-gray-400 hover:text-blue-500 transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

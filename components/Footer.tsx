import React from 'react';
import { GithubIcon, YoutubeIcon } from '../constants';

interface FooterProps {
  onPrivacyClick: () => void;
  onDocsClick: () => void;
  onTermsClick: () => void;
  onSecurityClick: () => void;
  onCookieClick: () => void;
  onDnsmpiClick: () => void;
  onCommunityClick: () => void;
}

const FOOTER_LINKS_DATA = [
    { name: "Terms", type: 'modal', action: 'onTermsClick' as keyof FooterProps },
    { name: "Privacy", type: 'modal', action: 'onPrivacyClick' as keyof FooterProps },
    { name: "Security", type: 'modal', action: 'onSecurityClick' as keyof FooterProps },
    { name: "Status", type: 'link', href: '#' },
    { name: "Community", type: 'modal', action: 'onCommunityClick' as keyof FooterProps },
    { name: "Docs", type: 'modal', action: 'onDocsClick' as keyof FooterProps },
    { name: "Contact", type: 'link', href: '#contact' },
    { name: "Manage cookies", type: 'modal', action: 'onCookieClick' as keyof FooterProps },
    { name: "Do not share my personal information", type: 'modal', action: 'onDnsmpiClick' as keyof FooterProps }
];

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <footer className="bg-slate-100 dark:bg-black py-8 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 mb-6">
          <p className="text-slate-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} EliTechWiz. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a href="https://github.com/Eliahhango" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GithubIcon className="w-6 h-6 text-slate-500 dark:text-gray-400 hover:text-blue-500 transition-colors" />
            </a>
            <a href="https://youtube.com/@eliahhango" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <YoutubeIcon className="w-6 h-6 text-slate-500 dark:text-gray-400 hover:text-blue-500 transition-colors" />
            </a>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-gray-700 pt-6 flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
            {FOOTER_LINKS_DATA.map(link => {
                if (link.type === 'modal' && link.action) {
                    return (
                        <button 
                            key={link.name} 
                            onClick={props[link.action]}
                            className="text-slate-500 dark:text-gray-400 hover:text-blue-500 text-sm transition-colors text-left"
                        >
                            {link.name}
                        </button>
                    )
                }
                if (link.type === 'link' && link.href) {
                     return (
                         <a 
                            key={link.name} 
                            href={link.href}
                            className="text-slate-500 dark:text-gray-400 hover:text-blue-500 text-sm transition-colors text-left"
                        >
                            {link.name}
                        </a>
                    )
                }
                return null;
            })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
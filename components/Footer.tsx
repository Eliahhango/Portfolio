import React from 'react';
import { GithubIcon, YoutubeIcon, LinkedInIcon, TwitterIcon, FacebookIcon, MailIcon, PhoneIcon } from '../constants';

interface FooterProps {
  onPrivacyClick: () => void;
  onDocsClick: () => void;
  onTermsClick: () => void;
  onSecurityClick: () => void;
  onCookieClick: () => void;
  onDnsmpiClick: () => void;
  onCommunityClick: () => void;
  onStatusClick: () => void;
}

const FOOTER_LINKS_DATA = [
    { name: "Terms", type: 'modal', action: 'onTermsClick' as keyof FooterProps },
    { name: "Privacy", type: 'modal', action: 'onPrivacyClick' as keyof FooterProps },
    { name: "Security", type: 'modal', action: 'onSecurityClick' as keyof FooterProps },
    { name: "Status", type: 'modal', action: 'onStatusClick' as keyof FooterProps },
    { name: "Community", type: 'modal', action: 'onCommunityClick' as keyof FooterProps },
    { name: "Docs", type: 'modal', action: 'onDocsClick' as keyof FooterProps },
    { name: "Contact", type: 'link', href: '#contact' },
    { name: "Manage cookies", type: 'modal', action: 'onCookieClick' as keyof FooterProps },
    { name: "Do not share my personal information", type: 'modal', action: 'onDnsmpiClick' as keyof FooterProps }
];

const Footer: React.FC<FooterProps> = (props) => {
  const socialLinks = [
    { Icon: GithubIcon, href: 'https://github.com/Eliahhango', label: 'GitHub' },
    { Icon: YoutubeIcon, href: 'https://youtube.com/@eliahhango', label: 'YouTube' },
    { Icon: LinkedInIcon, href: '#', label: 'LinkedIn' },
    { Icon: TwitterIcon, href: '#', label: 'Twitter' },
    { Icon: FacebookIcon, href: '#', label: 'Facebook' },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-black py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              <span className="text-blue-500">Eli</span>TechWiz
            </h3>
            <p className="text-sm text-slate-600 dark:text-gray-400 mb-4">
              Cybersecurity Expert, Software Architect & Creative Designer. Building secure, innovative digital experiences.
            </p>
            <div className="flex items-center space-x-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-gray-800 text-slate-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-slate-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#expertise" className="text-sm text-slate-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  Expertise
                </a>
              </li>
              <li>
                <a href="#projects" className="text-sm text-slate-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-slate-600 dark:text-gray-400 hover:text-blue-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-slate-600 dark:text-gray-400">
                <MailIcon className="w-4 h-4 text-blue-500" />
                <a href="mailto:contact@elitechwiz.com" className="hover:text-blue-500 transition-colors">
                  contact@elitechwiz.com
                </a>
              </li>
              <li className="flex items-center space-x-2 text-sm text-slate-600 dark:text-gray-400">
                <PhoneIcon className="w-4 h-4 text-blue-500" />
                <a href="tel:+255688164510" className="hover:text-blue-500 transition-colors">
                  +255 688 164 510
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-gray-700 pt-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 sm:gap-x-6 gap-y-2">
              {FOOTER_LINKS_DATA.map(link => {
                if (link.type === 'modal' && link.action) {
                  return (
                    <button 
                      key={link.name} 
                      onClick={props[link.action]}
                      className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
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
                      className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      {link.name}
                    </a>
                  )
                }
                return null;
              })}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-400 text-center sm:text-left">
              &copy; {new Date().getFullYear()} EliTechWiz. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
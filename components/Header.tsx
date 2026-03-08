import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShieldCheck, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GithubIcon, MailIcon, YoutubeIcon, NAV_LINKS } from '../constants';
import { useOptionalPublicSiteContent } from '../contexts/PublicSiteContentContext';
import { defaultContactContent } from '../utils/siteContent';
import { handleSectionClick } from '../utils/scrollUtils';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  activeSection: string;
}

const overlayVariants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
};

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const publicContent = useOptionalPublicSiteContent();
  const contactContent = publicContent?.contactContent || defaultContactContent;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const onSectionClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    handleSectionClick(event, href, navigate, location.pathname, closeMenu);
  };

  const mobileSocialLinks = useMemo(
    () =>
      [
        { Icon: GithubIcon, href: contactContent.githubUrl, label: 'GitHub' },
        { Icon: YoutubeIcon, href: contactContent.youtubeUrl, label: 'YouTube' },
        { Icon: MailIcon, href: `mailto:${contactContent.email}`, label: 'Email' },
      ].filter((item) => item.href),
    [contactContent.email, contactContent.githubUrl, contactContent.youtubeUrl],
  );

  const isRouteActive = (href: string) => {
    if (href === '/') {
      return location.pathname === href;
    }

    return location.pathname === href || location.pathname.startsWith(`${href}/`);
  };

  const isSectionActive = (href: string) => {
    const sectionId = href.substring(1);
    if (sectionId === 'skills') {
      return activeSection === 'skills' || activeSection === 'expertise';
    }

    return activeSection === sectionId;
  };

  const desktopLinkClassName = (isActive: boolean) =>
    `inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white'
    }`;

  const mobileLinkClassName = (isActive: boolean) =>
    `text-2xl font-bold transition-colors ${
      isActive ? 'text-blue-400' : 'text-white hover:text-blue-300'
    }`;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'border-b border-slate-200/70 bg-slate-50/80 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/85'
          : 'bg-transparent'
      }`}
      style={{ willChange: 'background-color, backdrop-filter, border-color' }}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a
            href="#home"
            onClick={(event) => onSectionClick(event, '#home')}
            className="group inline-flex items-center gap-3 rounded-2xl px-1 py-1 text-slate-900 transition-all dark:text-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/12 text-blue-500 transition-all duration-300 group-hover:bg-blue-500/18 group-hover:shadow-[0_0_18px_rgba(59,130,246,0.28)]">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-xl font-black tracking-tight sm:text-2xl group-hover:text-blue-600 dark:group-hover:text-blue-400">
                EliTechWiz
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 sm:block">
                Security + Product Engineering
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => {
              const isSection = link.href.startsWith('#');
              const isActive = isSection ? isSectionActive(link.href) : isRouteActive(link.href);
              const className = desktopLinkClassName(isActive);

              return isSection ? (
                <a
                  key={link.name}
                  href={link.href}
                  className={className}
                  onClick={(event) => onSectionClick(event, link.href)}
                >
                  {link.name}
                </a>
              ) : (
                <Link key={link.name} to={link.href} className={className}>
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={(event) => onSectionClick(event, '#contact')}
              className="hidden rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 sm:inline-flex"
            >
              Hire Me
            </a>
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200/70 bg-white/80 text-slate-900 transition-colors hover:border-blue-400 hover:text-blue-600 dark:border-white/10 dark:bg-slate-900/70 dark:text-white dark:hover:border-blue-500/50 dark:hover:text-blue-400 md:hidden"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 z-50 bg-slate-950/95 md:hidden"
          >
            <div className="relative flex min-h-screen flex-col px-6 pb-10 pt-6">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <ShieldCheck className="h-4 w-4 text-blue-400" />
                  <span>Navigation</span>
                </div>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-colors hover:border-blue-500/40 hover:text-blue-300"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <motion.div
                variants={overlayVariants}
                className="flex flex-1 flex-col items-center justify-center gap-6 text-center"
              >
                {NAV_LINKS.map((link) => {
                  const isSection = link.href.startsWith('#');
                  const isActive = isSection ? isSectionActive(link.href) : isRouteActive(link.href);
                  const className = mobileLinkClassName(isActive);

                  return isSection ? (
                    <motion.a
                      key={link.name}
                      variants={mobileItemVariants}
                      href={link.href}
                      onClick={(event) => onSectionClick(event, link.href)}
                      className={className}
                    >
                      {link.name}
                    </motion.a>
                  ) : (
                    <motion.div key={link.name} variants={mobileItemVariants}>
                      <Link to={link.href} onClick={closeMenu} className={className}>
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.a
                  variants={mobileItemVariants}
                  href="#contact"
                  onClick={(event) => onSectionClick(event, '#contact')}
                  className="mt-4 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700"
                >
                  Hire Me
                </motion.a>
              </motion.div>

              <motion.div
                variants={mobileItemVariants}
                className="flex items-center justify-center gap-4"
              >
                {mobileSocialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    aria-label={label}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-all hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-300"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

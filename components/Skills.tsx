import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { EXPERTISE_DATA } from '../constants';
import { usePublicSiteContent } from '../contexts/PublicSiteContentContext';
import type { PublicService } from '../types';
import SectionHeader from './SectionHeader';

type IconProps = React.SVGProps<SVGSVGElement>;
type ServiceCategory = PublicService['category'];

interface SkillCardItem {
  id: string;
  name: string;
  Icon: React.FC<IconProps>;
}

interface SkillCategory {
  category: ServiceCategory;
  title: string;
  description: string;
  Icon: React.FC<IconProps>;
  headerClassName: string;
  iconShellClassName: string;
  iconClassName: string;
  itemShellClassName: string;
  itemIconShellClassName: string;
  itemIconClassName: string;
  itemChevronClassName: string;
  skills: SkillCardItem[];
}

const TECH_STACK = [
  'React',
  'TypeScript',
  'Node.js',
  'Firebase',
  'MongoDB',
  'Python',
  'Figma',
  'Tailwind CSS',
  'Express',
  'PostgreSQL',
  'Next.js',
  'Framer Motion',
];

const ShieldIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const CodeIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const PaletteIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="3"></circle>
    <path d="M6.5 12.5c0 .6.4 1.1 1 1.4-1.1.8-1.5 2.3-1.5 3.6v.3c0 1.7 2.2 3.2 5 3.2s5-1.5 5-3.2v-.3c0-1.3-.4-2.8-1.5-3.6.6-.3 1-.8 1-1.4 0-1.4-1.6-2.5-3.5-2.5S10 11.1 10 12.5z"></path>
  </svg>
);

const BriefcaseIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const categoryMeta: Record<
  ServiceCategory,
  Omit<SkillCategory, 'category' | 'skills'>
> = {
  cybersecurity: {
    title: 'Cybersecurity & Hacking',
    description: 'Threat defense, ethical testing, and resilient security workflows.',
    Icon: ShieldIcon,
    headerClassName: 'border-blue-200/70 bg-gradient-to-br from-blue-500/15 via-white to-cyan-500/10 dark:border-blue-500/20 dark:from-blue-500/20 dark:via-slate-900 dark:to-cyan-500/10',
    iconShellClassName: 'bg-blue-500/15 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300',
    iconClassName: 'text-blue-500 dark:text-blue-300',
    itemShellClassName: 'bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-white/10 hover:border-blue-400/50 hover:bg-blue-50 dark:hover:bg-blue-500/10',
    itemIconShellClassName: 'bg-blue-500/10 group-hover:bg-blue-500/20',
    itemIconClassName: 'text-blue-500',
    itemChevronClassName: 'text-blue-400',
  },
  development: {
    title: 'Software Development',
    description: 'Modern apps, scalable APIs, and reliable product engineering.',
    Icon: CodeIcon,
    headerClassName: 'border-violet-200/70 bg-gradient-to-br from-violet-500/15 via-white to-indigo-500/10 dark:border-violet-500/20 dark:from-violet-500/20 dark:via-slate-900 dark:to-indigo-500/10',
    iconShellClassName: 'bg-violet-500/15 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300',
    iconClassName: 'text-violet-500 dark:text-violet-300',
    itemShellClassName: 'bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-white/10 hover:border-violet-400/50 hover:bg-violet-50 dark:hover:bg-violet-500/10',
    itemIconShellClassName: 'bg-violet-500/10 group-hover:bg-violet-500/20',
    itemIconClassName: 'text-violet-500',
    itemChevronClassName: 'text-violet-400',
  },
  design: {
    title: 'Design & Architecture',
    description: 'Human-centered interfaces and systems shaped for clarity.',
    Icon: PaletteIcon,
    headerClassName: 'border-emerald-200/70 bg-gradient-to-br from-emerald-500/15 via-white to-teal-500/10 dark:border-emerald-500/20 dark:from-emerald-500/20 dark:via-slate-900 dark:to-teal-500/10',
    iconShellClassName: 'bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-300',
    iconClassName: 'text-emerald-500 dark:text-emerald-300',
    itemShellClassName: 'bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-white/10 hover:border-emerald-400/50 hover:bg-emerald-50 dark:hover:bg-emerald-500/10',
    itemIconShellClassName: 'bg-emerald-500/10 group-hover:bg-emerald-500/20',
    itemIconClassName: 'text-emerald-500',
    itemChevronClassName: 'text-emerald-400',
  },
  consulting: {
    title: 'Strategy & Consulting',
    description: 'Technical planning, audits, and execution guidance that scales.',
    Icon: BriefcaseIcon,
    headerClassName: 'border-sky-200/70 bg-gradient-to-br from-sky-500/15 via-white to-cyan-500/10 dark:border-sky-500/20 dark:from-sky-500/20 dark:via-slate-900 dark:to-cyan-500/10',
    iconShellClassName: 'bg-sky-500/15 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300',
    iconClassName: 'text-sky-500 dark:text-sky-300',
    itemShellClassName: 'bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-white/10 hover:border-sky-400/50 hover:bg-sky-50 dark:hover:bg-sky-500/10',
    itemIconShellClassName: 'bg-sky-500/10 group-hover:bg-sky-500/20',
    itemIconClassName: 'text-sky-500',
    itemChevronClassName: 'text-sky-400',
  },
};

const fallbackCategoryMap: Record<string, ServiceCategory> = {
  'Cybersecurity & Hacking': 'cybersecurity',
  'Software Development': 'development',
  'Design & Architecture': 'design',
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: 'easeOut' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.08,
      duration: 0.38,
      ease: 'easeOut',
    },
  }),
};

const Expertise: React.FC = () => {
  const { services } = usePublicSiteContent();

  const groupedServices = useMemo(() => {
    return services.reduce<Record<ServiceCategory, PublicService[]>>(
      (accumulator, service) => {
        accumulator[service.category].push(service);
        return accumulator;
      },
      {
        cybersecurity: [],
        development: [],
        design: [],
        consulting: [],
      },
    );
  }, [services]);

  const categories = useMemo<SkillCategory[]>(() => {
    if (services.length > 0) {
      return (Object.keys(categoryMeta) as ServiceCategory[])
        .map((category) => ({
          category,
          ...categoryMeta[category],
          skills: groupedServices[category].map((service) => ({
            id: service._id,
            name: service.title,
            Icon: categoryMeta[category].Icon,
          })),
        }))
        .filter((category) => category.skills.length > 0);
    }

    return EXPERTISE_DATA.map((category) => {
      const mappedCategory = fallbackCategoryMap[category.title];
      const meta = categoryMeta[mappedCategory];

      return {
        category: mappedCategory,
        ...meta,
        skills: category.skills.map((skill) => ({
          id: `${category.title}-${skill.name}`,
          name: skill.name,
          Icon: skill.Icon,
        })),
      };
    });
  }, [groupedServices, services.length]);

  return (
    <section id="skills" className="relative py-12 sm:py-16 md:py-20">
      <div id="expertise" className="absolute -top-24" aria-hidden="true"></div>
      <SectionHeader
        tag="Expertise"
        title="What I Do Best"
        subtitle="Focused areas of work spanning secure systems, full-stack delivery, and experience-led product design."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-3"
      >
        {categories.map((category) => (
          <motion.div
            key={category.category}
            variants={columnVariants}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-800/50"
          >
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10">
                <category.Icon className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{category.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{category.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.id}
                  custom={skillIndex}
                  variants={itemVariants}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 transition-all hover:border-blue-200 hover:bg-blue-50 dark:border-white/10 dark:bg-slate-800/50 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10"
                >
                  <skill.Icon className="h-5 w-5 shrink-0 text-blue-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-gray-200">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6">
        <div className="rounded-[28px] border border-slate-200/80 bg-white/70 p-5 shadow-lg shadow-slate-200/50 backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/40 dark:shadow-slate-950/30">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-blue-500">Tech Stack Logos</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Core tools and platforms I regularly ship with.</p>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto pb-2">
            <div className="flex min-w-max items-center gap-3">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;

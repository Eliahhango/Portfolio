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

interface SkillCategoryMeta {
  title: string;
  description: string;
  Icon: React.FC<IconProps>;
  tone: {
    border: string;
    iconShell: string;
    icon: string;
    chip: string;
  };
}

interface SkillCategory extends SkillCategoryMeta {
  category: ServiceCategory;
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

const categoryMeta: Record<ServiceCategory, SkillCategoryMeta> = {
  cybersecurity: {
    title: 'Cybersecurity & Hacking',
    description: 'Threat defense, ethical testing, and resilient security workflows.',
    Icon: ShieldIcon,
    tone: {
      border: 'border-blue-200/80 dark:border-blue-500/30',
      iconShell: 'bg-blue-500/10 dark:bg-blue-500/20',
      icon: 'text-blue-600 dark:text-blue-300',
      chip: 'text-blue-700 dark:text-blue-200',
    },
  },
  development: {
    title: 'Software Development',
    description: 'Modern apps, scalable APIs, and reliable product engineering.',
    Icon: CodeIcon,
    tone: {
      border: 'border-violet-200/80 dark:border-violet-500/30',
      iconShell: 'bg-violet-500/10 dark:bg-violet-500/20',
      icon: 'text-violet-600 dark:text-violet-300',
      chip: 'text-violet-700 dark:text-violet-200',
    },
  },
  design: {
    title: 'Design & Architecture',
    description: 'Human-centered interfaces and systems shaped for clarity.',
    Icon: PaletteIcon,
    tone: {
      border: 'border-emerald-200/80 dark:border-emerald-500/30',
      iconShell: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      icon: 'text-emerald-600 dark:text-emerald-300',
      chip: 'text-emerald-700 dark:text-emerald-200',
    },
  },
  consulting: {
    title: 'Strategy & Consulting',
    description: 'Technical planning, audits, and execution guidance that scales.',
    Icon: BriefcaseIcon,
    tone: {
      border: 'border-cyan-200/80 dark:border-cyan-500/30',
      iconShell: 'bg-cyan-500/10 dark:bg-cyan-500/20',
      icon: 'text-cyan-600 dark:text-cyan-300',
      chip: 'text-cyan-700 dark:text-cyan-200',
    },
  },
};

const fallbackCategoryMap: Record<string, ServiceCategory> = {
  'Cybersecurity & Hacking': 'cybersecurity',
  'Software Development': 'development',
  'Design & Architecture': 'design',
  'Strategy & Consulting': 'consulting',
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.06,
      duration: 0.3,
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

    return EXPERTISE_DATA
      .map((category) => {
        const mappedCategory = fallbackCategoryMap[category.title];

        if (!mappedCategory) {
          return null;
        }

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
      })
      .filter((value): value is SkillCategory => value !== null);
  }, [groupedServices, services.length]);

  return (
    <section id="skills" className="relative py-12 sm:py-16 md:py-20">
      <div id="expertise" className="absolute -top-24" aria-hidden="true"></div>
      <SectionHeader
        tag="Expertise"
        title="What I Do Best"
        subtitle="Focused areas of work spanning secure systems, full-stack delivery, and experience-led product design."
        variant="skills"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 sm:px-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {categories.map((category) => (
          <motion.article
            key={category.category}
            variants={columnVariants}
            className={`rounded-3xl border bg-white/90 p-6 shadow-sm backdrop-blur-sm dark:bg-slate-900/60 ${category.tone.border}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{category.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-300">{category.description}</p>
              </div>
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${category.tone.iconShell}`}>
                <category.Icon className={`h-5 w-5 ${category.tone.icon}`} />
              </span>
            </div>

            <ul className="mt-6 space-y-2.5">
              {category.skills.map((skill, skillIndex) => (
                <motion.li
                  key={skill.id}
                  custom={skillIndex}
                  variants={itemVariants}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-2.5 transition-all hover:border-slate-300 hover:bg-white dark:border-white/10 dark:bg-slate-800/70 dark:hover:border-white/20 dark:hover:bg-slate-800/90"
                >
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${category.tone.iconShell}`}>
                    <skill.Icon className={`h-4 w-4 ${category.tone.icon}`} />
                  </span>
                  <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200">{skill.name}</span>
                  <ChevronRight className={`h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100 ${category.tone.chip}`} />
                </motion.li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>

      <div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/55">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Core Stack</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-slate-200/80 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-slate-800/70 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;

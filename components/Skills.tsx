import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { EXPERTISE_DATA } from '../constants';
import { usePublicSiteContent } from '../contexts/PublicSiteContentContext';
import type { PublicService } from '../types';
import SectionHeader from './SectionHeader';

type IconProps = React.SVGProps<SVGSVGElement>;
type ServiceCategory = PublicService['category'];

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

const categoryMeta: Record<ServiceCategory, { title: string; Icon: React.FC<IconProps> }> = {
  cybersecurity: { title: 'Cybersecurity & Hacking', Icon: ShieldIcon },
  development: { title: 'Software Development', Icon: CodeIcon },
  design: { title: 'Design & Architecture', Icon: PaletteIcon },
  consulting: { title: 'Strategy & Consulting', Icon: BriefcaseIcon },
};

const Expertise: React.FC = () => {
  const { services } = usePublicSiteContent();

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

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

  const dynamicCategories = useMemo(
    () =>
      (Object.keys(categoryMeta) as ServiceCategory[])
        .map((category) => ({
          category,
          title: categoryMeta[category].title,
          Icon: categoryMeta[category].Icon,
          services: groupedServices[category],
        }))
        .filter((entry) => entry.services.length > 0),
    [groupedServices],
  );

  return (
    <section id="expertise" className="py-12 sm:py-16 md:py-20">
      <SectionHeader tag="Expertise" title="What I Do Best" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-6 max-w-7xl mx-auto">
        {dynamicCategories.length > 0
          ? dynamicCategories.map((category) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-100 dark:bg-slate-800/40 dark:border-slate-700/50 p-4 sm:p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700/50 dark:shadow-slate-900/50"
              >
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 text-center">{category.title}</h3>
                <div className="space-y-3 sm:space-y-4">
                  {category.services.map((service, serviceIndex) => (
                    <motion.div
                      key={service._id}
                      custom={serviceIndex}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.8 }}
                      className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white dark:bg-slate-700/30 dark:border dark:border-slate-600/30 rounded-md transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:border-blue-500/50 dark:hover:shadow-blue-500/10 hover:shadow-sm"
                    >
                      <category.Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0 mt-1" />
                      <div className="min-w-0">
                        <span className="block text-sm sm:text-base font-semibold text-slate-700 dark:text-gray-200">{service.title}</span>
                        <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-gray-400">{service.description}</p>
                        {service.features.length > 0 && (
                          <p className="mt-2 text-xs text-slate-400 dark:text-gray-500">
                            {service.features.slice(0, 3).join(' • ')}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))
          : EXPERTISE_DATA.map((category) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-100 dark:bg-slate-800/40 dark:border-slate-700/50 p-4 sm:p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700/50 dark:shadow-slate-900/50"
              >
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-4 sm:mb-6 text-center">{category.title}</h3>
                <div className="space-y-3 sm:space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      custom={skillIndex}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.8 }}
                      className="group flex items-center gap-3 sm:gap-4 p-2 sm:p-3 bg-white dark:bg-slate-700/30 dark:border dark:border-slate-600/30 rounded-md transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:border-blue-500/50 dark:hover:shadow-blue-500/10 hover:shadow-sm"
                    >
                      <skill.Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0" />
                      <span className="text-sm sm:text-base font-semibold text-slate-700 dark:text-gray-200">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
      </div>
    </section>
  );
};

export default Expertise;

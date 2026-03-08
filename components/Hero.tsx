import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Typewriter from './Typewriter';
import { scrollToSection } from '../utils/scrollUtils';
import { usePublicSiteContent } from '../contexts/PublicSiteContentContext';

const Hero: React.FC = () => {
    const { heroContent, aboutContent } = usePublicSiteContent();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.12,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 28 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    };

    const floatingBadges = [
        { label: 'Cybersecurity', className: '-left-5 top-8 lg:-left-10' },
        { label: 'Full Stack', className: '-right-4 top-1/4 lg:-right-10' },
        { label: 'UI/UX', className: 'left-6 -bottom-4 lg:left-10' },
    ];

    const miniStats = [
        { value: '10+', label: 'Years' },
        { value: '50+', label: 'Projects' },
        { value: '100+', label: 'Clients' },
    ];

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        scrollToSection('contact');
    };

    const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        scrollToSection('projects');
    };

    return (
        <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-24">
            <div className="absolute inset-0 -z-30 bg-slate-50 dark:bg-slate-950" />
            <motion.div
                aria-hidden="true"
                className="absolute inset-0 -z-20 opacity-90 dark:opacity-70"
                style={{
                    backgroundImage: [
                        'radial-gradient(circle at 14% 18%, rgba(59,130,246,0.22), transparent 34%)',
                        'radial-gradient(circle at 86% 82%, rgba(34,211,238,0.18), transparent 34%)',
                        'linear-gradient(135deg, rgba(15,23,42,0.02), rgba(59,130,246,0.04), rgba(6,182,212,0.03))',
                    ].join(','),
                }}
                animate={{
                    backgroundPosition: [
                        '0% 0%, 100% 100%, 50% 50%',
                        '4% 6%, 96% 94%, 52% 48%',
                        '0% 0%, 100% 100%, 50% 50%',
                    ],
                }}
                transition={{ duration: 16, ease: 'easeInOut', repeat: Infinity }}
            />
            <motion.div
                aria-hidden="true"
                className="absolute -left-24 top-0 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.22)_0%,rgba(96,165,250,0.08)_40%,transparent_72%)] blur-3xl"
                animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity }}
            />
            <motion.div
                aria-hidden="true"
                className="absolute -bottom-24 right-0 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.2)_0%,rgba(34,211,238,0.08)_38%,transparent_70%)] blur-3xl"
                animate={{ x: [0, -24, 0], y: [0, -18, 0] }}
                transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
            />
            <div className="absolute inset-0 -z-10 bg-white/30 dark:bg-slate-950/55" />

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8"
            >
                <div className="text-center lg:text-left">
                    <motion.div variants={itemVariants} className="inline-flex rounded-full border border-emerald-400/25 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/5 backdrop-blur dark:border-emerald-400/20 dark:bg-white/5 dark:text-slate-200">
                        <span className="mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        </span>
                        <span>🔐 Available for Projects</span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="mt-8 text-5xl font-black tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
                    >
                        <span className="block">I Build</span>
                        <span className="mt-3 block min-h-[1.1em]">
                            <Typewriter
                                words={heroContent.roles}
                                className="bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400 bg-clip-text text-transparent font-black"
                                cursorClassName="text-cyan-400"
                            />
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 lg:mx-0 lg:text-lg"
                    >
                        {heroContent.description}
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start"
                    >
                        <a
                            href="#contact"
                            onClick={handleContactClick}
                            className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-cyan-400 sm:w-auto"
                        >
                            Hire Me
                        </a>
                        <a
                            href="#projects"
                            onClick={handleProjectsClick}
                            className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 bg-white/70 px-8 py-4 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600 dark:border-white/20 dark:bg-white/5 dark:text-slate-100 dark:hover:border-cyan-400/40 dark:hover:text-cyan-300 sm:w-auto"
                        >
                            View Projects
                        </a>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
                    >
                        {miniStats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-full border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
                            >
                                <span className="text-lg font-bold text-blue-500">{stat.value}</span>
                                <span className="ml-2 text-sm font-medium text-slate-600 dark:text-slate-300">{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    variants={itemVariants}
                    className="relative mx-auto w-full max-w-md lg:max-w-xl"
                >
                    <div className="relative rounded-[2rem] border border-white/40 bg-white/30 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur dark:border-white/10 dark:bg-white/5">
                        <div className="relative overflow-hidden rounded-3xl ring-4 ring-blue-500/30 shadow-2xl shadow-blue-500/20">
                            <img
                                src={aboutContent.imageUrl}
                                alt="EliTechWiz profile"
                                className="aspect-[4/5] w-full object-cover"
                                loading="eager"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
                        </div>
                    </div>

                    {floatingBadges.map((badge, index) => (
                        <motion.div
                            key={badge.label}
                            initial={{ opacity: 0, y: 18, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.55, delay: 0.5 + index * 0.14 }}
                            className={`absolute ${badge.className} rounded-2xl border border-white/40 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 shadow-xl shadow-slate-900/10 backdrop-blur dark:border-white/10 dark:bg-slate-900/75 dark:text-slate-100`}
                        >
                            {badge.label}
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

            <motion.button
                type="button"
                aria-label="Scroll to next section"
                onClick={() => scrollToSection('about')}
                className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full border border-slate-200/80 bg-white/70 p-3 text-slate-600 backdrop-blur transition hover:border-blue-300 hover:text-blue-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-cyan-400/40 dark:hover:text-cyan-300"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
                <ChevronDown className="h-5 w-5" />
            </motion.button>
        </section>
    );
};

export default Hero;

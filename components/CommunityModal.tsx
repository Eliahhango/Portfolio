import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon, YoutubeIcon, MailIcon } from '../constants';

interface ModalProps {
    onClose: () => void;
}

const CommunityModal: React.FC<ModalProps> = ({ onClose }) => {
    const communityLinks = [
        {
            name: 'GitHub',
            description: 'View my open-source projects, contribute, and collaborate',
            icon: GithubIcon,
            href: 'https://github.com/Eliahhango',
            color: 'bg-slate-800 hover:bg-slate-900'
        },
        {
            name: 'YouTube',
            description: 'Watch tutorials, project walkthroughs, and tech content',
            icon: YoutubeIcon,
            href: 'https://youtube.com/@eliahhango',
            color: 'bg-red-600 hover:bg-red-700'
        },
        {
            name: 'Email Newsletter',
            description: 'Stay updated with latest projects, tips, and insights',
            icon: MailIcon,
            href: '#newsletter',
            color: 'bg-blue-600 hover:bg-blue-700'
        }
    ];

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4" onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl max-w-3xl w-full relative border border-slate-200 dark:border-gray-800 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/75 transition-colors z-10"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>

                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Join Our Community</h1>
                        <p className="text-slate-600 dark:text-gray-400 mb-8">
                            Connect with fellow developers, cybersecurity enthusiasts, and creative minds. Let's build something amazing together!
                        </p>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Connect With Us</h2>
                            <div className="space-y-4">
                                {communityLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        target={link.href.startsWith('#') ? undefined : '_blank'}
                                        rel={link.href.startsWith('#') ? undefined : 'noopener noreferrer'}
                                        onClick={link.href.startsWith('#') ? onClose : undefined}
                                        className={`flex items-center gap-4 p-4 ${link.color} text-white rounded-lg transition-all transform hover:scale-105 shadow-lg`}
                                    >
                                        <link.icon className="w-8 h-8 flex-shrink-0" />
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg">{link.name}</h3>
                                            <p className="text-sm text-white/90">{link.description}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">What We Do</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg">
                                    <h3 className="font-semibold text-slate-800 dark:text-gray-200 mb-2">Open Source</h3>
                                    <p className="text-sm text-slate-600 dark:text-gray-400">
                                        Contribute to open-source projects, share code, and collaborate with developers worldwide.
                                    </p>
                                </div>
                                <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg">
                                    <h3 className="font-semibold text-slate-800 dark:text-gray-200 mb-2">Learning</h3>
                                    <p className="text-sm text-slate-600 dark:text-gray-400">
                                        Share knowledge through tutorials, blog posts, and educational content.
                                    </p>
                                </div>
                                <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg">
                                    <h3 className="font-semibold text-slate-800 dark:text-gray-200 mb-2">Networking</h3>
                                    <p className="text-sm text-slate-600 dark:text-gray-400">
                                        Connect with professionals in cybersecurity, software development, and design.
                                    </p>
                                </div>
                                <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg">
                                    <h3 className="font-semibold text-slate-800 dark:text-gray-200 mb-2">Innovation</h3>
                                    <p className="text-sm text-slate-600 dark:text-gray-400">
                                        Work together on innovative projects and push the boundaries of technology.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Get Involved</h2>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Star and fork projects on GitHub</li>
                                <li>Submit issues and pull requests</li>
                                <li>Share your own projects and get feedback</li>
                                <li>Subscribe to our newsletter for updates</li>
                                <li>Watch and subscribe to our YouTube channel</li>
                                <li>Engage with content and share your thoughts</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Community Guidelines</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                We believe in fostering a positive, inclusive, and respectful community. Please:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Be respectful and kind to all community members</li>
                                <li>Share constructive feedback and helpful insights</li>
                                <li>Respect intellectual property and give credit where due</li>
                                <li>Follow platform-specific community guidelines</li>
                                <li>Report any inappropriate behavior or content</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Contact</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Have questions or want to collaborate? Reach out:
                            </p>
                            <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
                                    <strong>Email:</strong> <a href="mailto:contact@elitechwiz.com" className="text-blue-500 hover:underline">contact@elitechwiz.com</a>
                                </p>
                                <p className="text-slate-700 dark:text-gray-300">
                                    <strong>GitHub:</strong> <a href="https://github.com/Eliahhango" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">@Eliahhango</a>
                                </p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default CommunityModal;

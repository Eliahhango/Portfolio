import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GithubIcon, ExternalLinkIcon } from '../constants';

interface ModalProps {
    onClose: () => void;
}

const DocumentationModal: React.FC<ModalProps> = ({ onClose }) => {
    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4" onClick={onClose}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl max-w-4xl w-full relative border border-slate-200 dark:border-gray-800 p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
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
                        <h1 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Documentation</h1>
                        
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">About This Portfolio</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                This is a modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. It showcases professional work, skills, and experience in cybersecurity, software development, and design.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Technology Stack</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg">
                                    <h3 className="font-semibold text-slate-800 dark:text-gray-200 mb-2">Frontend</h3>
                                    <ul className="text-sm text-slate-600 dark:text-gray-400 space-y-1">
                                        <li>• React 19.2.0</li>
                                        <li>• TypeScript 5.8.2</li>
                                        <li>• Tailwind CSS</li>
                                        <li>• Framer Motion</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg">
                                    <h3 className="font-semibold text-slate-800 dark:text-gray-200 mb-2">Build Tools</h3>
                                    <ul className="text-sm text-slate-600 dark:text-gray-400 space-y-1">
                                        <li>• Vite 6.2.0</li>
                                        <li>• ESBuild</li>
                                        <li>• PostCSS</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Getting Started</h2>
                            
                            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">Prerequisites</h3>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Before you begin, ensure you have the following installed:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Node.js (v18 or higher)</li>
                                <li>npm or yarn package manager</li>
                                <li>Git</li>
                            </ul>

                            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">Installation</h3>
                            <div className="bg-slate-900 dark:bg-black p-4 rounded-lg mb-4 overflow-x-auto">
                                <pre className="text-green-400 text-sm">
                                    <code>{`# Clone the repository
git clone https://github.com/Eliahhango/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview`}</code>
                                </pre>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Project Structure</h2>
                            <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
                                <pre className="text-sm text-slate-700 dark:text-gray-300 overflow-x-auto">
                                    <code>{`Portfolio/
├── components/          # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   └── ...
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── package.json         # Dependencies and scripts
└── constants.tsx        # Constants and data`}</code>
                                </pre>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Key Features</h2>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li><strong>Responsive Design:</strong> Fully responsive layout that works on all devices</li>
                                <li><strong>Dark Mode:</strong> Built-in dark/light theme toggle with system preference detection</li>
                                <li><strong>Animations:</strong> Smooth animations using Framer Motion</li>
                                <li><strong>AI Chatbot:</strong> Interactive AI assistant powered by Google Gemini</li>
                                <li><strong>Performance:</strong> Optimized for fast loading and smooth interactions</li>
                                <li><strong>Accessibility:</strong> WCAG compliant with proper ARIA labels</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Configuration</h2>
                            
                            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">Environment Variables</h3>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Create a <code className="bg-slate-200 dark:bg-gray-800 px-2 py-1 rounded">.env</code> file in the root directory:
                            </p>
                            <div className="bg-slate-900 dark:bg-black p-4 rounded-lg mb-4 overflow-x-auto">
                                <pre className="text-green-400 text-sm">
                                    <code>{`# Google Gemini API Key (for chatbot)
GEMINI_API_KEY=your_api_key_here`}</code>
                                </pre>
                            </div>

                            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">Customization</h3>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                Most content can be customized in <code className="bg-slate-200 dark:bg-gray-800 px-2 py-1 rounded">constants.tsx</code>:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Navigation links</li>
                                <li>Projects and portfolio items</li>
                                <li>Skills and expertise</li>
                                <li>Testimonials</li>
                                <li>Contact information</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Deployment</h2>
                            
                            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">Vercel (Recommended)</h3>
                            <ol className="list-decimal pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Push your code to GitHub</li>
                                <li>Import your repository in Vercel</li>
                                <li>Add environment variables in Vercel dashboard</li>
                                <li>Deploy automatically on every push</li>
                            </ol>

                            <h3 className="text-xl font-semibold mt-4 mb-2 text-slate-800 dark:text-gray-200">Other Platforms</h3>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                This is a static site and can be deployed to:
                            </p>
                            <ul className="list-disc pl-6 mb-4 text-slate-600 dark:text-gray-400 space-y-2">
                                <li>Netlify</li>
                                <li>GitHub Pages</li>
                                <li>Cloudflare Pages</li>
                                <li>Any static hosting service</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Resources</h2>
                            <div className="space-y-3">
                                <a 
                                    href="https://github.com/Eliahhango/Portfolio" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-gray-800 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <GithubIcon className="w-5 h-5 text-slate-700 dark:text-gray-300" />
                                    <span className="text-slate-700 dark:text-gray-300">View Source Code on GitHub</span>
                                    <ExternalLinkIcon className="w-4 h-4 ml-auto text-slate-500 dark:text-gray-400" />
                                </a>
                                <a 
                                    href="https://react.dev" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-gray-800 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <span className="text-slate-700 dark:text-gray-300">React Documentation</span>
                                    <ExternalLinkIcon className="w-4 h-4 ml-auto text-slate-500 dark:text-gray-400" />
                                </a>
                                <a 
                                    href="https://tailwindcss.com" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-3 bg-slate-100 dark:bg-gray-800 rounded-lg hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <span className="text-slate-700 dark:text-gray-300">Tailwind CSS Documentation</span>
                                    <ExternalLinkIcon className="w-4 h-4 ml-auto text-slate-500 dark:text-gray-400" />
                                </a>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mt-6 mb-4 text-slate-900 dark:text-white">Support</h2>
                            <p className="mb-4 text-slate-600 dark:text-gray-400 leading-relaxed">
                                If you have questions or need help, feel free to reach out:
                            </p>
                            <div className="bg-slate-100 dark:bg-gray-900 p-4 rounded-lg mb-4">
                                <p className="text-slate-700 dark:text-gray-300 mb-2">
                                    <strong>Email:</strong> <a href="mailto:contact@elitechwiz.com" className="text-blue-500 hover:underline">contact@elitechwiz.com</a>
                                </p>
                                <p className="text-slate-700 dark:text-gray-300">
                                    <strong>GitHub Issues:</strong> <a href="https://github.com/Eliahhango/Portfolio/issues" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Report an issue</a>
                                </p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DocumentationModal;

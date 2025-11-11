// FIX: Create content for the file to define constants used across the application.
import React from 'react';
import type { Project, Stat } from './types';

// --- ICONS ---
type IconProps = React.SVGProps<SVGSVGElement>;

export const GithubIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export const MailIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

export const WhatsappIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.6,14.2l-1.5-0.7c-0.2-0.1-0.5,0-0.7,0.2l-0.6,0.7c-1.2-0.6-2.2-1.6-2.8-2.8l0.7-0.6c0.2-0.2,0.2-0.5,0.2-0.7 l-0.7-1.5c-0.1-0.3-0.4-0.4-0.7-0.4l-1.6,0C8.1,7.2,7.9,7.3,7.7,7.6C7.3,8,7,8.8,7.3,9.7c0.4,1.2,1.2,2.4,2.2,3.5 c1.1,1.1,2.3,1.8,3.5,2.2c0.9,0.3,1.7,0,2.1-0.4c0.2-0.2,0.4-0.4,0.4-0.7l0-1.6C17.1,14.6,16.9,14.3,16.6,14.2z M12,2 C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10c5.5,0,10-4.5,10-10C22,6.5,17.5,2,12,2z M12,20c-4.4,0-8-3.6-8-8s3.6-8,8-8s8,3.6,8,8 S16.4,20,12,20z"/>
    </svg>
);

export const YoutubeIcon: React.FC<IconProps> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 11.75a29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

// FIX: Add ChatIcon component to resolve import error in ChatbotIcon.tsx.
export const ChatIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

export const ExternalLinkIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);

export const LinkedInIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.568-.9 1.955-1.85 4.026-1.85 4.304 0 5.099 2.833 5.099 6.516v6.225h-.001zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

export const TwitterIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
);

export const FacebookIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
);

const CodeIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);

const ShieldIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

const PaletteIcon: React.FC<IconProps> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"></circle><path d="M6.5 12.5c0 .6.4 1.1 1 1.4-1.1.8-1.5 2.3-1.5 3.6v.3c0 1.7 2.2 3.2 5 3.2s5-1.5 5-3.2v-.3c0-1.3-.4-2.8-1.5-3.6.6-.3 1-.8 1-1.4 0-1.4-1.6-2.5-3.5-2.5S10 11.1 10 12.5z"></path></svg>
);

// --- NAVIGATION ---
export const NAV_LINKS = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Journey', href: '#journey' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
];

// --- STATS ---
export const STATS_DATA: Stat[] = [
    { value: 10, label: 'Years of Experience' },
    { value: 50, label: 'Projects Completed' },
    { value: 100, label: 'Happy Clients' },
];

// --- EXPERTISE ---
export const EXPERTISE_DATA = [
    {
        title: 'Cybersecurity & Hacking',
        skills: [
            { name: 'Penetration Testing', Icon: ShieldIcon },
            { name: 'Network Security', Icon: ShieldIcon },
            { name: 'Ethical Hacking', Icon: ShieldIcon },
        ],
    },
    {
        title: 'Software Development',
        skills: [
            { name: 'React & TypeScript', Icon: CodeIcon },
            { name: 'Node.js & Express', Icon: CodeIcon },
            { name: 'Python & Django', Icon: CodeIcon },
        ],
    },
    {
        title: 'Design & Architecture',
        skills: [
            { name: 'UI/UX Design', Icon: PaletteIcon },
            { name: 'System Architecture', Icon: PaletteIcon },
            { name: 'Graphic Design', Icon: PaletteIcon },
        ],
    },
];

// --- PROJECTS ---
export const PROJECTS_DATA: Project[] = [
    {
        title: 'SecureAuth Platform',
        description: 'A multi-factor authentication system for enterprise applications.',
        longDescription: 'Developed a comprehensive multi-factor authentication (MFA) platform providing robust security layers for enterprise-level applications. Features include TOTP, SMS, and biometric authentication methods, along with detailed audit logs and an administrative dashboard for user management.',
        imageUrl: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['Cybersecurity', 'React', 'Node.js', 'MFA'],
        repoUrl: 'https://github.com/Eliahhango',
        liveUrl: '#',
        caseStudySlug: 'secureauth-platform',
    },
    {
        title: 'DataViz Dashboard',
        description: 'An interactive data visualization tool for business intelligence.',
        longDescription: 'A powerful and intuitive data visualization dashboard that allows users to connect various data sources, create custom charts and graphs, and gain actionable insights. Built with D3.js and React for a highly interactive and responsive user experience.',
        imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['Data Science', 'React', 'D3.js', 'BI'],
        repoUrl: 'https://github.com/Eliahhango',
        liveUrl: '#',
        caseStudySlug: 'dataviz-dashboard',
    },
    {
        title: 'E-commerce Redesign',
        description: 'A complete UI/UX overhaul for a major online retailer.',
        longDescription: 'Led the complete redesign of a high-traffic e-commerce website, focusing on improving user experience and conversion rates. The project involved extensive user research, wireframing, prototyping in Figma, and implementing the new design with a modern frontend stack.',
        imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['UI/UX', 'Figma', 'Next.js', 'E-commerce'],
        repoUrl: 'https://github.com/Eliahhango',
        liveUrl: '#',
    },
    {
        title: 'Architectural Visualization',
        description: '3D modeling and rendering of a modern residential complex.',
        longDescription: 'Created a high-fidelity 3D visualization for a proposed residential complex using AutoCAD, Revit, and 3ds Max. The project included detailed architectural models, realistic texturing, and photorealistic renderings for marketing and client presentations.',
        imageUrl: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['Civil Engineering', 'AutoCAD', 'Revit', '3D Modeling'],
        repoUrl: 'https://github.com/Eliahhango',
        liveUrl: '#',
    },
    {
        title: 'Network Intrusion Detection',
        description: 'A custom Snort-based IDS for a corporate network.',
        longDescription: 'Designed and deployed a network intrusion detection system (IDS) using Snort to monitor and analyze traffic for a medium-sized enterprise. Developed custom rulesets to detect specific threats and integrated the system with a logging and alerting dashboard.',
        imageUrl: 'https://images.pexels.com/photos/5380649/pexels-photo-5380649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['Cybersecurity', 'Networking', 'Snort', 'IDS'],
        repoUrl: 'https://github.com/Eliahhango',
        liveUrl: '#',
    },
     {
        title: 'Portfolio Website',
        description: 'This very website, built to showcase my skills.',
        longDescription: 'A fully responsive, modern portfolio website built from scratch using React, TypeScript, and Tailwind CSS. Features include a dark/light mode toggle, smooth animations with Framer Motion, and a clean, professional design.',
        imageUrl: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        tags: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion'],
        repoUrl: 'https://github.com/Eliahhango',
        liveUrl: '#',
    },
];

// --- TESTIMONIALS ---
export const TESTIMONIALS_DATA = [
    {
        quote: "EliTechWiz's development skill is exceptional. The project was delivered on time and exceeded our expectations in every way. A true professional.",
        name: 'sirtheprogrammer',
        company: 'Lead Developer @ codeskytz',
        avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=160',
    },
    {
        quote: "When it comes to cybersecurity, there's no one I trust more. EliTechWiz identified critical vulnerabilities that others missed. Absolutely essential for any serious company.",
        name: 'Mrcyber',
        company: 'Security Analyst',
        avatarUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=160',
    },
    {
        quote: "The user interface they designed was not only beautiful but also incredibly intuitive. Our user engagement has skyrocketed since the redesign. Fantastic work!",
        name: 'Maria',
        company: 'UX Director at Creative Minds',
        avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=160',
    },
    {
        quote: "An absolute genius in problem-solving. No matter how complex the bug, Fixation finds a way to solve it efficiently. A reliable and brilliant developer.",
        name: 'Fixation',
        company: 'Senior Engineer',
        avatarUrl: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=160',
    },
    {
        quote: "EliTechWiz has a hacker's mindset with an architect's precision. Their ability to think outside the box is a huge asset to any project.",
        name: 'Eliot Anderson',
        company: 'Cybersecurity Strategist',
        avatarUrl: 'https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=160',
    },
    {
        quote: "Incredibly creative and strategic. The architectural designs provided were both innovative and practical. A pleasure to collaborate with.",
        name: 'fazo',
        company: 'Lead Architect at Urban Designs',
        avatarUrl: 'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=160',
    },
    {
        quote: "Working with EliTechWiz was a game-changer. The UI/UX design they delivered was intuitive and aesthetically pleasing, significantly boosting user engagement.",
        name: 'Emily Johnson',
        company: 'Product Manager at Creative Solutions',
        avatarUrl: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=160',
    },
    {
        quote: "The software solution delivered was beyond our expectations. It's scalable, efficient, and beautifully designed. Highly recommended!",
        name: 'John Smith',
        company: 'CTO of Innovate Inc.',
        avatarUrl: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=160',
    },
    {
        quote: "EliTechWiz transformed our security posture. Their expertise is unmatched, and their approach is both professional and innovative.",
        name: 'Jane Doe',
        company: 'CEO of TechCorp',
        avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=160',
    },
];

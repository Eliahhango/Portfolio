import React from 'react';
import { MailIcon, GithubIcon, PhoneIcon, WhatsappIcon, YoutubeIcon } from '../constants';
import ContactForm from './ContactForm';

const CONTACT_INFO = [
    {
        Icon: MailIcon,
        label: "Email",
        value: "contact@elitechwiz.com",
        href: "mailto:contact@elitechwiz.com",
    },
    {
        Icon: PhoneIcon,
        label: "Phone",
        value: "+255 688 164 510",
        href: "tel:+255688164510",
    },
    {
        Icon: WhatsappIcon,
        label: "WhatsApp",
        value: "+255 742 631 101",
        href: "https://wa.me/255742631101",
    },
    {
        Icon: GithubIcon,
        label: "GitHub",
        value: "Eliahhango",
        href: "https://github.com/Eliahhango",
    },
    {
        Icon: YoutubeIcon,
        label: "YouTube",
        value: "@eliahhango",
        href: "https://youtube.com/@eliahhango",
    },
];

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 dark:text-white mb-4 px-4">Get In Touch</h2>
      <div className="w-20 h-1 bg-blue-500 mx-auto mb-8 sm:mb-12"></div>
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        <p className="text-sm sm:text-base text-slate-500 dark:text-gray-300 mb-8 sm:mb-12">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out to me through any of the platforms below.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12">
            {CONTACT_INFO.map(({ Icon, label, value, href }) => (
                <a 
                    key={label}
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group bg-slate-100 dark:bg-slate-800/50 dark:border-slate-700/50 p-4 sm:p-6 rounded-lg flex items-center space-x-3 sm:space-x-4 transition-all duration-300 hover:bg-slate-200 dark:hover:bg-slate-700/50 dark:hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20 border border-slate-200 dark:border-slate-700/50 hover:border-blue-500 transform hover:-translate-y-1"
                >
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                    <div className="min-w-0">
                        <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-white text-left truncate">{label}</h4>
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-gray-300 text-left break-words">{value}</p>
                    </div>
                </a>
            ))}
        </div>
        
        {/* Contact Form */}
        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
import React from 'react';
import { MailIcon, GithubIcon, PhoneIcon, WhatsappIcon, YoutubeIcon } from '../constants';

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
    <section id="contact" className="py-20">
      <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-4">Get In Touch</h2>
      <div className="w-20 h-1 bg-blue-500 mx-auto mb-12"></div>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-slate-500 dark:text-gray-400 mb-12">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out to me through any of the platforms below.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CONTACT_INFO.map(({ Icon, label, value, href }) => (
                <a 
                    key={label}
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="group bg-slate-100 dark:bg-gray-950 p-6 rounded-lg flex items-center space-x-4 transition-all duration-300 hover:bg-slate-200 dark:hover:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/10 border border-slate-200 dark:border-gray-900 hover:border-blue-500 transform hover:-translate-y-1"
                >
                    <Icon className="w-8 h-8 text-blue-500 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                        <h4 className="font-semibold text-slate-800 dark:text-white text-left">{label}</h4>
                        <p className="text-sm text-slate-500 dark:text-gray-400 text-left">{value}</p>
                    </div>
                </a>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatIcon } from '../constants';

interface ChatbotIconProps {
    onClick: () => void;
    isOpen: boolean;
}

const ChatbotIcon: React.FC<ChatbotIconProps> = ({ onClick, isOpen }) => {
    return (
        <motion.button
            onClick={onClick}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
            className="w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center focus:outline-none z-50 hover:bg-blue-600 transition-colors"
            aria-label="Toggle Chat"
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={isOpen ? 'close' : 'chat'}
                    initial={{ rotate: -30, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 30, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {isOpen ? (
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    ) : (
                       <ChatIcon />
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
};

export default ChatbotIcon;

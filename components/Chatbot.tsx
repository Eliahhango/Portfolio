import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import type { Chat } from '@google/genai';
import type { Message } from '../types';
import { PROJECTS_DATA, EXPERTISE_DATA } from '../constants';

// Define SendIcon directly inside the component to avoid import issues.
const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

interface ChatbotProps {
    onClose: () => void;
}

// Sanitize user input to prevent sensitive information leakage
const sanitizeInput = (input: string): string => {
    // Remove potential API keys, tokens, or sensitive patterns
    const sensitivePatterns = [
        /api[_-]?key\s*[:=]\s*[\w-]+/gi,
        /token\s*[:=]\s*[\w-]+/gi,
        /password\s*[:=]\s*[\w-]+/gi,
        /secret\s*[:=]\s*[\w-]+/gi,
        /[a-zA-Z0-9]{32,}/g, // Long alphanumeric strings that might be keys
    ];
    
    let sanitized = input;
    sensitivePatterns.forEach(pattern => {
        sanitized = sanitized.replace(pattern, '[redacted]');
    });
    
    return sanitized.trim();
};

// Create comprehensive system instruction with strict rules
const createSystemInstruction = (): string => {
    const services = EXPERTISE_DATA.map(exp => exp.title).join(', ');
    const projects = PROJECTS_DATA.map(proj => proj.title).join(', ');
    
    return `You are WizBot, the official AI assistant for EliTechWiz's professional portfolio website. Your role is to provide helpful information about EliTechWiz's services and website content.

STRICT RULES - YOU MUST FOLLOW THESE:
1. ONLY discuss topics related to:
   - EliTechWiz's professional services (${services})
   - Projects and portfolio items (${projects})
   - Website features and sections
   - How to contact EliTechWiz (email: contact@elitechwiz.com, phone: +255 688 164 510)
   - General information about cybersecurity, software development, and design (as it relates to services)

2. NEVER discuss or reveal:
   - API keys, tokens, passwords, or any authentication credentials
   - Internal system configurations or technical implementation details
   - Source code, file structures, or repository details
   - Environment variables or configuration files
   - Any sensitive or private information
   - Personal information beyond what's publicly available on the website

3. If asked about topics outside your scope:
   - Politely redirect: "I can help you with information about EliTechWiz's services, projects, or how to get in touch. Is there something specific about cybersecurity, software development, or design services I can help with?"
   - Never make up information or speculate

4. Always be:
   - Professional, friendly, and concise
   - Helpful but within your defined scope
   - Clear about what you can and cannot discuss

5. Contact information (use when relevant):
   - Email: contact@elitechwiz.com
   - Phone: +255 688 164 510
   - WhatsApp: +255 742 631 101
   - GitHub: github.com/Eliahhango
   - YouTube: youtube.com/@eliahhango

Remember: You are a customer service assistant, not a technical support agent. Keep responses focused on services, portfolio, and general inquiries.`;
};

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: "Hello! I'm WizBot, EliTechWiz's AI assistant. I can help you learn about our cybersecurity, software development, and design services. How can I assist you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isConfigured, setIsConfigured] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            // Get API key - Vite replaces process.env.API_KEY at build time via define in vite.config.ts
            const apiKey = (
                (typeof process !== 'undefined' && (process.env.API_KEY || process.env.GEMINI_API_KEY)) ||
                import.meta.env.VITE_GEMINI_API_KEY ||
                ''
            ) as string;

            if (!apiKey || apiKey === '') {
                // Don't show error to users - just log for developers
                console.warn("GEMINI_API_KEY not configured. Chatbot will operate in limited mode.");
                setIsConfigured(false);
                // Set a friendly message instead of error
                setMessages([{
                    sender: 'ai',
                    text: "Hello! I'm WizBot. I'm currently experiencing some technical difficulties, but you can still reach out to EliTechWiz directly at contact@elitechwiz.com or +255 688 164 510. How can I help you?"
                }]);
                return;
            }

            setIsConfigured(true);
            const ai = new GoogleGenAI({ apiKey });
            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: createSystemInstruction(),
                },
            });
        } catch (e) {
            // Log error for developers, but show friendly message to users
            console.error("Chatbot initialization error:", e);
            setIsConfigured(false);
            setMessages([{
                sender: 'ai',
                text: "Hello! I'm WizBot. I'm currently experiencing some technical difficulties, but you can still reach out to EliTechWiz directly at contact@elitechwiz.com or +255 688 164 510. How can I help you?"
            }]);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        // If not configured, provide helpful response without API call
        if (!isConfigured || !chatRef.current) {
            const userMessage: Message = { sender: 'user', text: input };
            setMessages(prev => [...prev, userMessage]);
            setInput('');
            
            // Provide a helpful response based on common questions
            const lowerInput = input.toLowerCase();
            let response = "I'm currently experiencing technical difficulties. For immediate assistance, please contact EliTechWiz directly at contact@elitechwiz.com or +255 688 164 510.";
            
            if (lowerInput.includes('service') || lowerInput.includes('cybersecurity') || lowerInput.includes('development') || lowerInput.includes('design')) {
                response = "EliTechWiz offers cybersecurity consulting, software development, and UI/UX design services. For detailed information and to discuss your needs, please contact contact@elitechwiz.com or +255 688 164 510.";
            } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone')) {
                response = "You can reach EliTechWiz at:\n• Email: contact@elitechwiz.com\n• Phone: +255 688 164 510\n• WhatsApp: +255 742 631 101";
            } else if (lowerInput.includes('project') || lowerInput.includes('portfolio')) {
                response = "EliTechWiz has worked on various projects including security platforms, data visualization tools, and e-commerce solutions. Visit the Projects section on the website or contact contact@elitechwiz.com for more details.";
            }
            
            setTimeout(() => {
                setMessages(prev => [...prev, { sender: 'ai', text: response }]);
            }, 500);
            return;
        }

        // Sanitize input before sending
        const sanitizedInput = sanitizeInput(input);
        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        
        const prompt = sanitizedInput;
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            const stream = await chatRef.current.sendMessageStream({ message: prompt });
            
            setIsLoading(false);
            setMessages(prev => [...prev, { sender: 'ai', text: '' }]);

            let fullResponse = '';
            for await (const chunk of stream) {
                fullResponse += chunk.text;
                setMessages(prev => {
                    const updatedMessages = [...prev];
                    updatedMessages[updatedMessages.length - 1].text = fullResponse;
                    return updatedMessages;
                });
            }
        } catch (e: any) {
            // Log detailed error for developers
            console.error("Gemini API error:", e);
            setIsLoading(false);
            
            // Show user-friendly error message
            const errorMessage = e?.message?.toLowerCase() || '';
            if (errorMessage.includes('api key') || errorMessage.includes('authentication') || errorMessage.includes('permission')) {
                setError("I'm having trouble connecting right now. Please try again in a moment, or contact EliTechWiz directly at contact@elitechwiz.com.");
            } else if (errorMessage.includes('quota') || errorMessage.includes('limit')) {
                setError("I'm experiencing high demand right now. Please try again later or contact EliTechWiz directly at contact@elitechwiz.com.");
            } else {
                setError("I'm having trouble processing that request. Please try rephrasing your question or contact EliTechWiz directly at contact@elitechwiz.com.");
            }
        }
    };

    return (
        <div className="fixed bottom-20 right-5 z-[60]" aria-live="polite">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="w-80 sm:w-96 h-[500px] bg-slate-100 dark:bg-gray-950 rounded-lg shadow-2xl flex flex-col border border-slate-200 dark:border-gray-800"
            >
                <header className="p-4 border-b border-slate-200 dark:border-gray-800 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900 dark:text-white">AI Assistant</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800 dark:hover:text-white" aria-label="Close chat">
                        &times;
                    </button>
                </header>

                <div className="flex-1 p-4 overflow-y-auto">
                    <div className="flex flex-col gap-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-xl ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-slate-200 dark:bg-gray-800 text-slate-800 dark:text-gray-200'}`}>
                                    <p className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{__html: msg.text.replace(/\n/g, '<br />')}} />
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="max-w-[80%] p-3 rounded-xl bg-slate-200 dark:bg-gray-800 text-slate-800 dark:text-gray-200">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75"></span>
                                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="flex justify-start">
                                <div className="max-w-[80%] p-3 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                                    <p className="text-sm">{error}</p>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                <footer className="p-4 border-t border-slate-200 dark:border-gray-800">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about services, projects, or contact info..."
                            className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border border-slate-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            disabled={isLoading}
                            aria-label="Chat input"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-slate-400 dark:disabled:bg-gray-600 transition-colors"
                            disabled={isLoading || !input.trim()}
                            aria-label="Send message"
                        >
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </form>
                </footer>
            </motion.div>
        </div>
    );
};

export default Chatbot;

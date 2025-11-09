
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import type { Chat } from '@google/genai';
import type { Message } from '../types';

// Define SendIcon directly inside the component to avoid import issues.
const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);


interface ChatbotProps {
    onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: "Hello! I'm EliTechWiz's AI assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            // Guard against environments where `process` is not defined.
            const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;

            if (!apiKey) {
                throw new Error("API_KEY environment variable not set.");
            }

            const ai = new GoogleGenAI({ apiKey });
            chatRef.current = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: "You are a helpful and friendly AI assistant for the EliTechWiz portfolio website. Your name is WizBot. Keep your answers concise and informative. You can answer questions about EliTechWiz's skills (cybersecurity, software development, design), projects, and experience. Be professional but approachable.",
                },
            });
        } catch (e) {
            console.error(e);
            setError("Failed to initialize the AI model. Please check the API key.");
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        
        const prompt = input;
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
        } catch (e) {
            console.error("Gemini API error:", e);
            setIsLoading(false);
            setError("Sorry, I'm having trouble connecting. Please try again later.");
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
                                    <p className="text-sm" dangerouslySetInnerHTML={{__html: msg.text.replace(/\n/g, '<br />')}} />
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
                                <div className="max-w-[80%] p-3 rounded-xl bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300">
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
                            placeholder="Ask me anything..."
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
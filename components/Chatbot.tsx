import React, { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import type { Chat } from '@google/genai';
import type { Message, PublicService } from '../types';
import { PROJECTS_DATA, EXPERTISE_DATA } from '../constants';
import { usePublicSiteContent } from '../contexts/PublicSiteContentContext';
import type { ContactContent } from '../utils/siteContent';

const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

interface ChatbotProps {
  onClose: () => void;
}

const sanitizeInput = (input: string): string => {
  const sensitivePatterns = [
    /api[_-]?key\s*[:=]\s*[\w-]+/gi,
    /token\s*[:=]\s*[\w-]+/gi,
    /password\s*[:=]\s*[\w-]+/gi,
    /secret\s*[:=]\s*[\w-]+/gi,
    /[a-zA-Z0-9]{32,}/g,
  ];

  let sanitized = input;
  sensitivePatterns.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, '[redacted]');
  });

  return sanitized.trim();
};

const getServiceLabels = (services: PublicService[]) => {
  if (services.length > 0) {
    return services.map((service) => service.title);
  }

  return EXPERTISE_DATA.map((entry) => entry.title);
};

const createSupportMessage = (contactContent: ContactContent) => {
  return `Please contact EliTechWiz directly at ${contactContent.email} or ${contactContent.phone}.`;
};

const createSystemInstruction = (services: string[], contactContent: ContactContent): string => {
  const projects = PROJECTS_DATA.map((proj) => proj.title).join(', ');
  const serviceList = services.join(', ');

  return `You are WizBot, the official AI assistant for EliTechWiz's professional portfolio website. Your role is to provide helpful information about EliTechWiz's services and website content.

STRICT RULES - YOU MUST FOLLOW THESE:
1. ONLY discuss topics related to:
   - EliTechWiz's professional services (${serviceList})
   - Projects and portfolio items (${projects})
   - Website features and sections
   - How to contact EliTechWiz (email: ${contactContent.email}, phone: ${contactContent.phone})
   - General information about cybersecurity, software development, and design as it relates to EliTechWiz's services

2. NEVER discuss or reveal:
   - API keys, tokens, passwords, or any authentication credentials
   - Internal system configurations or technical implementation details
   - Source code, file structures, or repository details
   - Environment variables or configuration files
   - Any sensitive or private information
   - Personal information beyond what's publicly available on the website

3. If asked about topics outside your scope:
   - Politely redirect: "I can help you with information about EliTechWiz's services, projects, or how to get in touch. Is there something specific about the portfolio or services I can help with?"
   - Never make up information or speculate

4. Always be:
   - Professional, friendly, and concise
   - Helpful but within your defined scope
   - Clear about what you can and cannot discuss

5. Contact information:
   - Email: ${contactContent.email}
   - Phone: ${contactContent.phone}
   - WhatsApp: ${contactContent.whatsapp}
   - GitHub: ${contactContent.githubUrl}
   - YouTube: ${contactContent.youtubeUrl}

Remember: You are a customer service assistant, not a technical support agent. Keep responses focused on services, portfolio, and public inquiries.`;
};

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const { contactContent, services } = usePublicSiteContent();
  const serviceLabels = useMemo(() => getServiceLabels(services), [services]);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hello! I'm WizBot, EliTechWiz's AI assistant. I can help you learn about services, projects, and how to get in touch. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;

      if (!apiKey) {
        console.warn('VITE_GEMINI_API_KEY not configured. Chatbot will operate in limited mode.');
        setIsConfigured(false);
        chatRef.current = null;
        return;
      }

      const ai = new GoogleGenAI({ apiKey });
      chatRef.current = ai.chats.create({
        model: 'gemini-1.5-flash-latest',
        config: {
          systemInstruction: createSystemInstruction(serviceLabels, contactContent),
        },
      });
      setIsConfigured(true);
    } catch (initError) {
      console.error('Chatbot initialization error:', initError);
      setIsConfigured(false);
      chatRef.current = null;
    }
  }, [contactContent, serviceLabels]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (event: FormEvent) => {
    event.preventDefault();

    if (!input.trim() || isLoading) {
      return;
    }

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    const sanitizedInput = sanitizeInput(input);
    setInput('');

    if (!isConfigured || !chatRef.current) {
      setIsLoading(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: `I'm currently experiencing technical difficulties. ${createSupportMessage(contactContent)}`,
          },
        ]);
        setIsLoading(false);
      }, 500);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const stream = await chatRef.current.sendMessageStream({ message: sanitizedInput });

      setIsLoading(false);
      setMessages((prev) => [...prev, { sender: 'ai', text: '' }]);

      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk.text;
        setMessages((prev) => {
          const updatedMessages = [...prev];
          updatedMessages[updatedMessages.length - 1].text = fullResponse;
          return updatedMessages;
        });
      }
    } catch (requestError: unknown) {
      console.error('Gemini API error:', requestError);
      setIsLoading(false);
      const message = requestError instanceof Error ? requestError.message.toLowerCase() : '';

      if (message.includes('api key') || message.includes('authentication') || message.includes('permission')) {
        setError(`I'm having trouble connecting right now. ${createSupportMessage(contactContent)}`);
      } else {
        setError(`I'm having trouble processing that request. ${createSupportMessage(contactContent)}`);
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
                  <p className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
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
              onChange={(event) => setInput(event.target.value)}
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

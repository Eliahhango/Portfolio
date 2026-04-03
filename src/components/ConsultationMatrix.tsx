import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Discipline } from '../types';
import { Check, Loader2 } from 'lucide-react';

interface ConsultationMatrixProps {
  initialDiscipline: Discipline | null;
}

export default function ConsultationMatrix({ initialDiscipline }: ConsultationMatrixProps) {
  const [discipline, setDiscipline] = useState<Discipline | null>(initialDiscipline);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 md:p-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-2xl border border-black p-8 md:p-16 text-center bg-white relative z-10 shadow-2xl"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-accent flex items-center justify-center mx-auto mb-8 md:mb-12 shadow-lg">
            <Check size={32} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tighter mb-6 uppercase leading-none">Consultation<br />Initialized</h2>
          <p className="text-base md:text-lg text-muted mb-8 md:mb-12 max-w-md mx-auto">Your request has been logged into our secure engineering matrix. An architect will review your scope within 24 hours.</p>
          
          <div className="bg-surface p-6 md:p-10 text-left border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div>
                <span className="text-[10px] font-mono text-muted uppercase tracking-widest block mb-2">Reference ID</span>
                <span className="text-sm font-bold font-mono tracking-tight">REF-{Math.random().toString(36).substring(2, 7).toUpperCase()}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-muted uppercase tracking-widest block mb-2">Status</span>
                <span className="text-sm font-bold text-accent tracking-tight">QUEUED_FOR_REVIEW</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="mt-8 md:mt-12 text-[10px] font-bold uppercase tracking-[0.3em] hover:text-accent transition-colors"
          >
            Return to Terminal
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 md:pt-32 px-4 md:px-12 pb-24 flex justify-center bg-white relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
      <div className="w-full max-w-3xl relative z-10">
        <header className="mb-16 md:mb-24 text-center">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-mono text-accent uppercase tracking-[0.4em] block mb-6"
          >
            Lead Capture / Matrix
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-heading font-bold tracking-tighter uppercase leading-[0.9]"
          >
            Consultation<br />Matrix.
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-black mx-auto mt-8 md:mt-12" 
          />
        </header>

        <form onSubmit={handleSubmit} className="space-y-12 md:space-y-20">
          <div className="space-y-8">
            <h3 className="text-[10px] font-mono text-muted uppercase tracking-[0.3em] text-center">Select Primary Discipline</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['CIVIL', 'WEB', 'CYBER'] as Discipline[]).map((d, i) => (
                <motion.button
                  key={d}
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  onClick={() => setDiscipline(d)}
                  className={`h-16 md:h-20 border text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 ${discipline === d ? 'bg-black text-white border-black shadow-xl' : 'border-gray-200 text-muted hover:border-black hover:text-black'}`}
                >
                  {d}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="space-y-12 md:space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="relative group">
                <input
                  required
                  type="text"
                  placeholder="FULL NAME"
                  className="w-full bg-transparent border-b border-gray-200 py-4 md:py-6 text-sm font-bold tracking-tight focus:outline-none focus:border-accent transition-all placeholder:text-gray-300 uppercase"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-focus-within:w-full transition-all duration-500" />
              </div>
              <div className="relative group">
                <input
                  required
                  type="email"
                  placeholder="ENTERPRISE EMAIL"
                  className="w-full bg-transparent border-b border-gray-200 py-4 md:py-6 text-sm font-bold tracking-tight focus:outline-none focus:border-accent transition-all placeholder:text-gray-300 uppercase"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-focus-within:w-full transition-all duration-500" />
              </div>
            </div>
            <div className="relative group">
              <input
                required
                type="text"
                placeholder="ORGANIZATION / COMPANY"
                className="w-full bg-transparent border-b border-gray-200 py-4 md:py-6 text-sm font-bold tracking-tight focus:outline-none focus:border-accent transition-all placeholder:text-gray-300 uppercase"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-focus-within:w-full transition-all duration-500" />
            </div>
            <div className="relative group">
              <textarea
                required
                rows={4}
                placeholder="PROJECT SCOPE OVERVIEW / TECHNICAL REQUIREMENTS"
                className="w-full bg-transparent border-b border-gray-200 py-4 md:py-6 text-sm font-bold tracking-tight focus:outline-none focus:border-accent transition-all placeholder:text-gray-300 resize-none uppercase leading-relaxed"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-focus-within:w-full transition-all duration-500" />
            </div>
          </div>

          <button
            disabled={isSubmitting || !discipline}
            type="submit"
            className="w-full bg-black text-white h-20 md:h-24 text-xs font-bold uppercase tracking-[0.4em] hover:bg-accent disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-700 flex items-center justify-center gap-6 shadow-2xl hover:shadow-accent/20"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                Initializing Matrix...
              </>
            ) : (
              'Initialize Consultation Protocol'
            )}
          </button>
        </form>

        <footer className="mt-16 md:mt-24 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-muted uppercase tracking-widest">
          <span>Secure Channel Active</span>
          <span>End-to-End Encrypted</span>
        </footer>
      </div>
    </div>
  );
}

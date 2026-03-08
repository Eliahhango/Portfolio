import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastState {
  message: string;
  variant: ToastVariant;
}

interface ToastProps {
  toast: ToastState | null;
  onClose: () => void;
}

const variantConfig: Record<
  ToastVariant,
  {
    wrapperClassName: string;
    iconClassName: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
  }
> = {
  success: {
    wrapperClassName: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    iconClassName: 'bg-emerald-100 text-emerald-600',
    Icon: CheckCircle2,
    label: 'Success',
  },
  error: {
    wrapperClassName: 'border-rose-200 bg-rose-50 text-rose-900',
    iconClassName: 'bg-rose-100 text-rose-600',
    Icon: AlertCircle,
    label: 'Error',
  },
  info: {
    wrapperClassName: 'border-blue-200 bg-blue-50 text-blue-900',
    iconClassName: 'bg-blue-100 text-blue-600',
    Icon: Info,
    label: 'Info',
  },
};

const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeoutId = window.setTimeout(onClose, 4000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [onClose, toast]);

  const config = toast ? variantConfig[toast.variant] : null;

  return (
    <AnimatePresence>
      {toast && config && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className={`flex w-[min(92vw,24rem)] items-start gap-3 rounded-2xl border px-4 py-4 shadow-2xl ${config.wrapperClassName}`}>
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${config.iconClassName}`}>
              <config.Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{config.label}</p>
              <p className="mt-1 text-sm leading-6">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-1 text-current/70 transition hover:bg-black/5 hover:text-current"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;

import React from 'react';
import { Loader2 } from 'lucide-react';

interface AdminLoadingScreenProps {
  label?: string;
}

const AdminLoadingScreen: React.FC<AdminLoadingScreenProps> = ({ label = 'Loading admin console...' }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center shadow-2xl backdrop-blur-xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-blue-400/30 bg-blue-500/10">
          <Loader2 className="h-7 w-7 animate-spin text-blue-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Please wait</p>
          <p className="mt-1 text-sm text-slate-400">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoadingScreen;

import React from 'react';

interface SectionPlaceholderProps {
  title: string;
  description: string;
}

const SectionPlaceholder: React.FC<SectionPlaceholderProps> = ({ title, description }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
          <p className="text-base font-semibold text-slate-800">{title} tools will live here.</p>
          <p className="mt-2 text-sm text-slate-500">The admin shell and Firebase auth are in place, so this section is ready for the next feature pass.</p>
        </div>
      </div>
    </div>
  );
};

export default SectionPlaceholder;

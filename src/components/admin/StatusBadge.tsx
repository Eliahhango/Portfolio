import React from 'react';
import type { ContactStatus } from '../../types/admin';

const statusClasses: Record<ContactStatus, string> = {
  new: 'border border-blue-200 bg-blue-50 text-blue-700',
  read: 'border border-slate-200 bg-slate-100 text-slate-600',
  replied: 'border border-emerald-200 bg-emerald-50 text-emerald-700',
  archived: 'border border-amber-200 bg-amber-50 text-amber-700',
};

interface StatusBadgeProps {
  status: ContactStatus;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;

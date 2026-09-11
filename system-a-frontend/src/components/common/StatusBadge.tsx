import React from 'react';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const norm = (status || '').toUpperCase();

  if (norm === 'ELIGIBILITY_VERIFIED' || norm === 'APPROVED' || norm === 'VERIFIED') {
    return (
      <span className="status-badge verified">
        <CheckCircle2 size={13} />
        {norm === 'ELIGIBILITY_VERIFIED' ? 'Eligibility Verified' : norm}
      </span>
    );
  }

  if (norm === 'RECEIVED' || norm === 'SUBMITTED' || norm === 'LOCAL_ONLY') {
    return (
      <span className="status-badge received">
        <Clock size={13} />
        Received (Local)
      </span>
    );
  }

  if (norm === 'ON_HOLD' || norm === 'PENDING') {
    return (
      <span className="status-badge on-hold">
        <Clock size={13} />
        {norm.replace('_', ' ')}
      </span>
    );
  }

  return (
    <span className="status-badge received">
      {status || 'Unknown'}
    </span>
  );
};

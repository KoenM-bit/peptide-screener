import React from 'react';
import { Shield } from 'lucide-react';

interface TAPPredictionBadgeProps {
  score: number;
  affinity: number;
}

export function TAPPredictionBadge({ score }: TAPPredictionBadgeProps) {
  const isGoodScore = score >= 0.5;
  
  return (
    <div 
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium
        ${isGoodScore ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
    >
      <Shield className="w-4 h-4" />
      <span>TAP: {score.toFixed(2)}</span>
    </div>
  );
}
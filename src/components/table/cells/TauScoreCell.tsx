import React from 'react';
import { getTauScoreColor } from '../../../utils/scoreUtils';
import { formatTauScore } from '../../../utils/formatUtils';

interface TauScoreCellProps {
  score: string | number | null | undefined;
  onClick: () => void;
}

export function TauScoreCell({ score, onClick }: TauScoreCellProps) {
  const numericScore = typeof score === 'string' ? parseFloat(score) : score;
  const { background, text } = getTauScoreColor(numericScore);
  const displayValue = formatTauScore(numericScore);
  
  return (
    <button
      onClick={onClick}
      className={`w-full px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
        ${background} ${text} hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
    >
      {displayValue}
    </button>
  );
}
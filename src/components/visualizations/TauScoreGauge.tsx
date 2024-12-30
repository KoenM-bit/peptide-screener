import React from 'react';
import { calculateTauPercentage } from '../../utils/scoreUtils';
import { getTauScoreLabel } from '../../utils/labelUtils';
import { formatTauScore } from '../../utils/formatUtils';

interface TauScoreGaugeProps {
  score: number;
}

export function TauScoreGauge({ score }: TauScoreGaugeProps) {
  const percentage = calculateTauPercentage(score);
  const label = getTauScoreLabel(score);
  const displayValue = formatTauScore(score);

  if (score === null || score === undefined || isNaN(score)) {
    return (
      <div className="text-center text-gray-500">
        <h3 className="text-lg font-semibold mb-2">TAU Score</h3>
        <div>No score available</div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-2">TAU Score</h3>
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
        <div
          className="absolute h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-2xl font-bold mb-1">{displayValue}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
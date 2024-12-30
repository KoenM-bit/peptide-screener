import React from 'react';
import { BarChart2 } from 'lucide-react';
import { TauScoreGauge } from '../visualizations/TauScoreGauge';

interface ExpressionInfoProps {
  tissueSpecificity: string;
  tissueDistribution: string;
  specificityScore: string;
  tauScore: number;
}

export function ExpressionInfo({ 
  tissueSpecificity, 
  tissueDistribution, 
  specificityScore, 
  tauScore 
}: ExpressionInfoProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold">Expression Profile</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-500">Tissue Specificity</div>
            <div className="text-lg">{tissueSpecificity || 'Not specified'}</div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-500">Tissue Distribution</div>
            <div className="text-lg">{tissueDistribution || 'Not specified'}</div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-500">Specificity Score</div>
            <div className="text-lg">{specificityScore || 'Not available'}</div>
          </div>
        </div>

        <div>
          <TauScoreGauge score={tauScore} />
        </div>
      </div>
    </div>
  );
}
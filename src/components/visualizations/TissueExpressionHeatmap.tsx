import React from 'react';
import { TissueExpressionCell } from './TissueExpressionCell';
import { formatTissueName } from '../../utils/formatUtils';
import { BarChart2 } from 'lucide-react';

interface TissueExpressionHeatmapProps {
  title: string;
  data: Record<string, number>;
}

export function TissueExpressionHeatmap({ title, data }: TissueExpressionHeatmapProps) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="text-center text-gray-500">No expression data available</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <BarChart2 className="w-6 h-6 text-blue-500" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {Object.entries(data)
          .sort(([, a], [, b]) => b - a)
          .map(([tissue, value]) => (
            <TissueExpressionCell
              key={tissue}
              tissueName={formatTissueName(tissue)}
              value={value}
            />
          ))}
      </div>
    </div>
  );
}
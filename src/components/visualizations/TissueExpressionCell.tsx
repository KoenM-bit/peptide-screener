import React from 'react';
import { getColorIntensity } from '../../utils/colorUtils';

interface TissueExpressionCellProps {
  tissueName: string;
  value: number;
}

export function TissueExpressionCell({ tissueName, value }: TissueExpressionCellProps) {
  return (
    <div
      className="p-2 rounded transition-colors duration-200 hover:opacity-90"
      style={{ backgroundColor: getColorIntensity(value) }}
    >
      <div className="text-sm font-medium truncate" title={tissueName}>
        {tissueName}
      </div>
      <div className="text-sm">{value.toFixed(1)} nTPM</div>
    </div>
  );
}
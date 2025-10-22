import React from 'react';
import { PeptideBinding } from '../../types/HLATypes';
import { getBindingColor } from '../../utils/hlaUtils';

interface HLABindingChartProps {
  bindings: PeptideBinding[];
  title: string;
}

export function HLABindingChart({ bindings, title }: HLABindingChartProps) {
  if (!bindings.length) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">{title}</h4>
      <div className="space-y-1">
        {bindings.map(binding => {
          const colors = getBindingColor(binding.bindingLevel);
          return (
            <div
              key={binding.allele}
              className={`flex items-center justify-between p-2 rounded-lg ${colors.bg} ${colors.text} border ${colors.border}`}
            >
              <span className="font-medium">{binding.allele}</span>
              <span>{binding.value.toFixed(1)} nM</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    payload: Record<string, unknown>;
  }>;
  label?: string;
}

export function CancerTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload) return null;

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200 max-w-xs">
      <h4 className="font-medium text-gray-900 mb-2">{label}</h4>
      {payload.map((item, index: number) => {
        const dataset = item.dataKey.includes('tcga') ? 'TCGA' : 'Validation';
        const color = dataset === 'TCGA' ? 'rgb(59, 130, 246)' : 'rgb(234, 88, 12)';
        const samples = item.payload[dataset === 'TCGA' ? 'tcgaSamples' : 'validationSamples'];
        const stdDev = item.payload[dataset === 'TCGA' ? 'tcgaStdDev' : 'validationStdDev'];

        if (!item.value) return null;

        return (
          <div key={index} className="mb-2 last:mb-0">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="font-medium">{dataset}</span>
            </div>
            <div className="ml-5 text-sm text-gray-600">
              <div>Median: {item.value.toFixed(2)} nTPM</div>
              <div>Std Dev: ±{stdDev.toFixed(2)}</div>
              <div>Samples: {samples}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
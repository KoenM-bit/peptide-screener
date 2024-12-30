import React from 'react';
import { Activity, AlertCircle } from 'lucide-react';

interface FunctionInfoProps {
  biologicalProcess: string;
  molecularFunction: string;
  diseaseInvolvement: string;
}

export function FunctionInfo({ biologicalProcess, molecularFunction, diseaseInvolvement }: FunctionInfoProps) {
  const formatValue = (value: string) => {
    if (!value || value === 'NA') return 'Not specified';
    return value.split(';').map(item => item.trim()).join(', ');
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold">Function & Disease</h2>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-sm font-medium text-gray-500">Biological Process</div>
          <div className="text-lg">{formatValue(biologicalProcess)}</div>
        </div>

        <div>
          <div className="text-sm font-medium text-gray-500">Molecular Function</div>
          <div className="text-lg">{formatValue(molecularFunction)}</div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-gray-500">Disease Involvement</div>
            {diseaseInvolvement && diseaseInvolvement !== 'NA' && (
              <AlertCircle className="w-4 h-4 text-red-500" />
            )}
          </div>
          <div className="text-lg">{formatValue(diseaseInvolvement)}</div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Info } from 'lucide-react';

interface GeneCellProps {
  gene: string;
  description: string;
}

export function GeneCell({ gene, description }: GeneCellProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">{gene}</span>
      {description && (
        <div className="group relative">
          <Info className="w-4 h-4 text-gray-400" />
          <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg">
            {description}
          </div>
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { ProcessedBindingData } from '../../types/HLATypes';
import { HLABindingChart } from './HLABindingChart';
import { Dna } from 'lucide-react';

interface HLABindingPanelProps {
  data: ProcessedBindingData;
}

export function HLABindingPanel({ data }: HLABindingPanelProps) {
  const hasData = Object.values(data).some(arr => arr.length > 0);

  if (!hasData) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Dna className="w-6 h-6 text-blue-500" />
          <h3 className="text-lg font-semibold">HLA Binding Profile</h3>
        </div>
        <div className="text-center text-gray-500 py-4">
          No HLA binding data available for this peptide
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Dna className="w-6 h-6 text-blue-500" />
        <h3 className="text-lg font-semibold">HLA Binding Profile</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HLABindingChart 
          bindings={data.strongBinders} 
          title="Strong Binders (≤ 50 nM)" 
        />
        <HLABindingChart 
          bindings={data.moderateBinders} 
          title="Moderate Binders (≤ 500 nM)" 
        />
        <HLABindingChart 
          bindings={data.weakBinders} 
          title="Weak Binders (≤ 5000 nM)" 
        />
        <HLABindingChart 
          bindings={data.nonBinders} 
          title="Non-binders (> 5000 nM)" 
        />
      </div>
    </div>
  );
}
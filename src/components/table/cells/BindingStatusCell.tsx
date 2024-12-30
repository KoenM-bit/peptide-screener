import React from 'react';
import { processBindingData } from '../../../utils/hlaUtils';
import { HLABindingData } from '../../../types/HLATypes';

interface BindingStatusCellProps {
  bindingData: HLABindingData;
}

export function BindingStatusCell({ bindingData }: BindingStatusCellProps) {
  const processed = processBindingData(bindingData);
  
  return (
    <div className="flex flex-col gap-1 w-24">
      {processed.strongBinders.map(binder => (
        <div 
          key={binder.allele}
          className="flex-none px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800 whitespace-nowrap text-center w-full"
        >
          {binder.allele}
        </div>
      ))}
      {processed.moderateBinders.map(binder => (
        <div 
          key={binder.allele}
          className="flex-none px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 whitespace-nowrap text-center w-full"
        >
          {binder.allele}
        </div>
      ))}
      {processed.weakBinders.map(binder => (
        <div 
          key={binder.allele}
          className="flex-none px-2 py-0.5 rounded-full text-xs bg-yellow-100 text-yellow-800 whitespace-nowrap text-center w-full"
        >
          {binder.allele}
        </div>
      ))}
    </div>
  );
}
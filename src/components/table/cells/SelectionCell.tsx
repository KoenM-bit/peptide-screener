import React from 'react';
import { Check } from 'lucide-react';

interface SelectionCellProps {
  fragment: string;
  selected: boolean;
  onChange: (fragment: string, selected: boolean) => void;
}

export function SelectionCell({
  fragment,
  selected,
  onChange,
}: SelectionCellProps) {
  return (
    <button
      onClick={e => {
        e.stopPropagation();
        onChange(fragment, !selected);
      }}
      className={`w-5 h-5 rounded border transition-colors flex items-center justify-center
        ${
          selected
            ? 'bg-blue-500 border-blue-500 text-white'
            : 'border-gray-300 hover:border-blue-500'
        }`}
    >
      {selected && <Check className="w-3 h-3" />}
    </button>
  );
}

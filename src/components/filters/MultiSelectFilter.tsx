import React from 'react';
import { Check } from 'lucide-react';

interface MultiSelectFilterProps {
  label: string;
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
}

export function MultiSelectFilter({ label, options, value, onChange }: MultiSelectFilterProps) {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="max-h-40 overflow-y-auto border rounded-md divide-y">
        {options.map(option => (
          <button
            key={option}
            onClick={() => toggleOption(option)}
            className={`flex items-center w-full px-3 py-2 text-sm hover:bg-gray-50
              ${value.includes(option) ? 'bg-blue-50' : ''}`}
          >
            <div className={`w-4 h-4 border rounded mr-2 flex items-center justify-center
              ${value.includes(option) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}
            >
              {value.includes(option) && <Check className="w-3 h-3 text-white" />}
            </div>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
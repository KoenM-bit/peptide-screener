import React from 'react';
import { ChevronRight } from 'lucide-react';

interface TauScoreFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export function TauScoreFilter({ value, onChange }: TauScoreFilterProps) {
  const ranges = [
    { label: 'Low specificity', range: [0, 0.3], color: 'bg-green-500' },
    { label: 'Medium specificity', range: [0.3, 0.7], color: 'bg-yellow-500' },
    { label: 'High specificity', range: [0.7, 1], color: 'bg-red-500' },
  ];

  const handleRangeClick = (range: [number, number]) => {
    onChange(range);
  };

  const getActiveRange = () => {
    return ranges.find(r => r.range[0] === value[0] && r.range[1] === value[1]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          TAU Score Range
        </label>
        <span className="text-sm text-gray-500">
          Current: {value[0].toFixed(1)} - {value[1].toFixed(1)}
        </span>
      </div>

      <div className="space-y-2">
        {ranges.map(({ label, range, color }) => (
          <button
            key={label}
            onClick={() => handleRangeClick(range)}
            className={`flex items-center justify-between w-full p-2 rounded-lg border transition-all
              ${
                getActiveRange()?.label === label
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${color}`} />
              <span className="text-sm font-medium">{label}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>
                {range[0].toFixed(1)} - {range[1].toFixed(1)}
              </span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>

      <div className="pt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Range
        </label>
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={value[0]}
              onChange={e => onChange([parseFloat(e.target.value), value[1]])}
              className="w-full accent-blue-500"
            />
          </div>
          <div className="flex-1">
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={value[1]}
              onChange={e => onChange([value[0], parseFloat(e.target.value)])}
              className="w-full accent-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

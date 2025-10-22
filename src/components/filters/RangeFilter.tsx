import React from 'react';

interface RangeFilterProps {
  label: string;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min: number;
  max: number;
  step: number;
}

export function RangeFilter({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: RangeFilterProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}: {value[0].toFixed(1)} - {value[1].toFixed(1)}
      </label>
      <div className="flex gap-4">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={e => onChange([parseFloat(e.target.value), value[1]])}
          className="w-full"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={e => onChange([value[0], parseFloat(e.target.value)])}
          className="w-full"
        />
      </div>
    </div>
  );
}

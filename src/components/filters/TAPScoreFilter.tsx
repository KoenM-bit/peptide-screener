import React from 'react';
import { Shield } from 'lucide-react';

interface TAPScoreFilterProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function TAPScoreFilter({ value, onChange }: TAPScoreFilterProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-blue-500" />
        <span className="font-medium text-gray-700">TAP Score Filter</span>
      </div>

      <button
        onClick={() => onChange(!value)}
        className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors
          ${
            value
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'border-gray-200 text-gray-600 hover:border-gray-300'
          }`}
      >
        <span>Show TAP ≥ 0.5 only</span>
        <div
          className={`w-4 h-4 rounded border flex items-center justify-center
            ${value ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}
        >
          {value && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}

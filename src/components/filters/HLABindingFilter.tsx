import React from 'react';
import { Dna } from 'lucide-react';

interface HLABindingFilterProps {
  value: {
    bindingLevels: string[];
    alleles: string[];
  };
  availableAlleles: string[];
  onChange: (value: { bindingLevels: string[]; alleles: string[] }) => void;
}

const BINDING_LEVELS = [
  { id: 'Strong', label: 'Strong Binders (≤ 50 nM)', color: 'bg-green-100 text-green-800' },
  { id: 'Moderate', label: 'Moderate Binders (≤ 500 nM)', color: 'bg-blue-100 text-blue-800' },
  { id: 'Weak', label: 'Weak Binders (≤ 5000 nM)', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'Non-binder', label: 'Non-binders (> 5000 nM)', color: 'bg-gray-100 text-gray-800' }
];

export function HLABindingFilter({ value, availableAlleles, onChange }: HLABindingFilterProps) {
  const toggleBindingLevel = (level: string) => {
    const newLevels = value.bindingLevels.includes(level)
      ? value.bindingLevels.filter(l => l !== level)
      : [...value.bindingLevels, level];
    onChange({ ...value, bindingLevels: newLevels });
  };

  const toggleAllele = (allele: string) => {
    const newAlleles = value.alleles.includes(allele)
      ? value.alleles.filter(a => a !== allele)
      : [...value.alleles, allele];
    onChange({ ...value, alleles: newAlleles });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Dna className="w-5 h-5 text-blue-500" />
        <span className="font-medium text-gray-700">HLA Binding</span>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Binding Levels</h4>
          <div className="space-y-2">
            {BINDING_LEVELS.map(level => (
              <button
                key={level.id}
                onClick={() => toggleBindingLevel(level.id)}
                className={`w-full text-left px-3 py-2 rounded-lg border transition-colors
                  ${value.bindingLevels.includes(level.id) 
                    ? level.color + ' border-current' 
                    : 'border-gray-200 hover:border-gray-300'}`}
              >
                <span className="text-sm">{level.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">HLA Alleles</h4>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {availableAlleles.map(allele => (
              <label
                key={allele}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={value.alleles.includes(allele)}
                  onChange={() => toggleAllele(allele)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">{allele}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
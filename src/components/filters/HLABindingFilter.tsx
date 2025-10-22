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

const HLA_GROUPS = {
  'HLA-A': ['HLA-A*01:01', 'HLA-A*02:01', 'HLA-A*03:01'],
  'HLA-B': ['HLA-B*07:02', 'HLA-B*08:01', 'HLA-B*44:02'],
  'HLA-C': ['HLA-C*07:01', 'HLA-C*07:02']
};

export function HLABindingFilter({ value, onChange }: HLABindingFilterProps) {
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

  const toggleGroup = (group: string) => {
    const groupAlleles = HLA_GROUPS[group];
    const allGroupSelected = groupAlleles.every(allele => value.alleles.includes(allele));

    if (allGroupSelected) {
      // Remove all alleles from this group
      const newAlleles = value.alleles.filter(allele => !groupAlleles.includes(allele));
      onChange({ ...value, alleles: newAlleles });
    } else {
      // Add all alleles from this group
      const newAlleles = [...new Set([...value.alleles, ...groupAlleles])];
      onChange({ ...value, alleles: newAlleles });
    }
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
          <div className="space-y-4">
            {Object.entries(HLA_GROUPS).map(([group, alleles]) => (
              <div key={group} className="space-y-1">
                <button
                  onClick={() => toggleGroup(group)}
                  className="w-full text-left font-medium text-sm text-gray-700 hover:text-gray-900"
                >
                  {group}
                </button>
                <div className="pl-4 space-y-1">
                  {alleles.map(allele => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
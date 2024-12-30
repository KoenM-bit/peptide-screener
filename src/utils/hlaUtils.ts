import { HLABindingData, PeptideBinding, ProcessedBindingData } from '../types/HLATypes';

export function processBindingData(data: HLABindingData): ProcessedBindingData {
  const result = {
    strongBinders: [],
    moderateBinders: [],
    weakBinders: [],
    nonBinders: []
  };

  if (!data || Object.keys(data).length === 0) {
    return result;
  }

  const bindings = Object.entries(data).map(([allele, value]): PeptideBinding => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    return {
      allele: allele.trim(),
      value: numericValue,
      bindingLevel: getBindingLevel(numericValue)
    };
  });

  return {
    strongBinders: bindings.filter(b => b.bindingLevel === 'Strong'),
    moderateBinders: bindings.filter(b => b.bindingLevel === 'Moderate'),
    weakBinders: bindings.filter(b => b.bindingLevel === 'Weak'),
    nonBinders: bindings.filter(b => b.bindingLevel === 'Non-binder')
  };
}

export function getBindingLevel(value: number): 'Strong' | 'Moderate' | 'Weak' | 'Non-binder' {
  if (isNaN(value)) return 'Non-binder';
  if (value <= 50) return 'Strong';
  if (value <= 500) return 'Moderate';
  if (value <= 5000) return 'Weak';
  return 'Non-binder';
}

export function getBindingColor(level: string): { bg: string; text: string; border: string } {
  switch (level) {
    case 'Strong':
      return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
    case 'Moderate':
      return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' };
    case 'Weak':
      return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' };
  }
}

export function matchesBindingCriteria(
  data: HLABindingData,
  selectedLevels: string[],
  selectedAlleles: string[]
): boolean {
  // If no data, only match if no filters are selected
  if (!data || Object.keys(data).length === 0) {
    return selectedLevels.length === 0 && selectedAlleles.length === 0;
  }

  // If no filters selected, match all peptides with binding data
  if (selectedLevels.length === 0 && selectedAlleles.length === 0) {
    return true;
  }

  // Process the binding data
  const processedBindings = Object.entries(data).map(([allele, value]) => ({
    allele: allele.trim(),
    value: typeof value === 'string' ? parseFloat(value) : value,
    bindingLevel: getBindingLevel(typeof value === 'string' ? parseFloat(value) : value)
  }));

  // If both filters are active, check for matches that satisfy both conditions
  if (selectedLevels.length > 0 && selectedAlleles.length > 0) {
    return processedBindings.some(binding => 
      selectedAlleles.includes(binding.allele) && 
      selectedLevels.includes(binding.bindingLevel)
    );
  }

  // If only binding levels are selected
  if (selectedLevels.length > 0) {
    return processedBindings.some(binding => 
      selectedLevels.includes(binding.bindingLevel)
    );
  }

  // If only alleles are selected
  if (selectedAlleles.length > 0) {
    return processedBindings.some(binding => 
      selectedAlleles.includes(binding.allele)
    );
  }

  return true;
}
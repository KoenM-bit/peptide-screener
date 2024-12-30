export interface HLABindingData {
  [key: string]: string | number;
}

export interface PeptideBinding {
  allele: string;
  value: number;
  bindingLevel: 'Strong' | 'Moderate' | 'Weak' | 'Non-binder';
}

export interface ProcessedBindingData {
  strongBinders: PeptideBinding[];
  moderateBinders: PeptideBinding[];
  weakBinders: PeptideBinding[];
  nonBinders: PeptideBinding[];
}
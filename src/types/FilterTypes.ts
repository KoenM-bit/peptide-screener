export interface FilterState {
  tauScore: [number, number];
  locations: string[];
  hlaBinding: {
    bindingLevels: ('Strong' | 'Moderate' | 'Weak' | 'Non-binder')[];
    alleles: string[];
  };
  tapScore: boolean;
}

export interface FilteredStats {
  total: number;
  filtered: number;
  tauScoreRange: [number, number];
  uniqueLocations: string[];
  uniqueAlleles: string[];
}
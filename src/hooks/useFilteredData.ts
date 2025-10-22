import { useMemo } from 'react';
import { FlatPeptideData } from '../types/PeptideData';
import { FilterState, FilteredStats } from '../types/FilterTypes';
import { matchesBindingCriteria } from '../utils/hlaUtils';

export function useFilteredData(data: FlatPeptideData[], filters: FilterState) {
  return useMemo(() => {
    const hasActiveFilters =
      filters.locations.length > 0 ||
      filters.tauScore[0] > 0 ||
      filters.tauScore[1] < 1 ||
      filters.hlaBinding.bindingLevels.length > 0 ||
      filters.hlaBinding.alleles.length > 0 ||
      filters.tapScore;

    let filteredData = data;

    if (hasActiveFilters) {
      filteredData = data.filter(peptide => {
        const tauScore = parseFloat(peptide['TAU score - Tissue']);
        const location = peptide['Subcellular location'];
        const tapScore = peptide['TAP Prediction']?.pred_score ?? 0;

        // Check TAU score
        const matchesTauScore =
          !isNaN(tauScore) &&
          tauScore >= filters.tauScore[0] &&
          tauScore <= filters.tauScore[1];

        // Check location
        const matchesLocation =
          filters.locations.length === 0 ||
          filters.locations.some(loc => location?.includes(loc));

        // Check HLA binding
        const matchesBinding = matchesBindingCriteria(
          peptide['Peptide Binding'],
          filters.hlaBinding.bindingLevels,
          filters.hlaBinding.alleles
        );

        // Check TAP score
        const matchesTapScore = !filters.tapScore || tapScore >= 0.5;

        return (
          matchesTauScore &&
          matchesLocation &&
          matchesBinding &&
          matchesTapScore
        );
      });
    }

    // Calculate stats
    const validTauScores = data
      .map(d => parseFloat(d['TAU score - Tissue']))
      .filter(score => !isNaN(score));

    // Get unique alleles from all peptides
    const uniqueAlleles = Array.from(
      new Set(
        data.flatMap(d =>
          Object.keys(d['Peptide Binding'] || {}).map(allele => allele.trim())
        )
      )
    )
      .filter(Boolean)
      .sort();

    const stats: FilteredStats = {
      total: data.length,
      filtered: filteredData.length,
      tauScoreRange: [Math.min(...validTauScores), Math.max(...validTauScores)],
      uniqueLocations: Array.from(
        new Set(
          data.flatMap(d =>
            (d['Subcellular location'] || '').split(';').map(s => s.trim())
          )
        )
      )
        .filter(Boolean)
        .sort(),
      uniqueAlleles,
    };

    return { data: filteredData, stats, hasActiveFilters };
  }, [data, filters]);
}

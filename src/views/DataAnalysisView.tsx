import { useState } from 'react';
import { DataTable } from '../components/table/DataTable';
import { DetailModal } from '../components/modals/DetailModal';
import { ExportTools } from '../components/ExportTools';
import { FilterPanel } from '../components/filters/FilterPanel';
import { usePeptideData } from '../hooks/usePeptideData';
import { useFilteredData } from '../hooks/useFilteredData';
import { FilterState } from '../types/FilterTypes';
import { FlatPeptideData } from '../types/PeptideData';
import { FilterErrorBoundary } from '../components/common/SpecializedErrorBoundaries';

export function DataAnalysisView() {
  const { peptideList } = usePeptideData();
  const [selectedPeptide, setSelectedPeptide] = useState<FlatPeptideData | null>(null);
  const [selectedPeptides, setSelectedPeptides] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterState>({
    tauScore: [0, 1],
    locations: [],
    hlaBinding: {
      bindingLevels: [],
      alleles: []
    },
    tapScore: false
  });

  const { data: filteredData, stats, hasActiveFilters } = useFilteredData(peptideList, filters);

  const handleSelectionChange = (fragment: string, selected: boolean) => {
    const newSelection = new Set(selectedPeptides);
    if (selected) {
      newSelection.add(fragment);
    } else {
      newSelection.delete(fragment);
    }
    setSelectedPeptides(newSelection);
  };

  const handleSelectAll = () => {
    const newSelection = new Set(filteredData.map(p => p.fragment));
    setSelectedPeptides(newSelection);
  };

  const handleSelectNone = () => {
    setSelectedPeptides(new Set());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <div className="bg-white rounded-lg shadow-md">
        <ExportTools 
          data={filteredData}
          selectedPeptides={selectedPeptides}
          onSelectAll={handleSelectAll}
          onSelectNone={handleSelectNone}
        />
      </div>

      <FilterErrorBoundary>
        <FilterPanel
          filters={filters}
          onFilterChange={setFilters}
          uniqueLocations={stats.uniqueLocations}
          uniqueAlleles={stats.uniqueAlleles}
          totalCount={stats.total}
          filteredCount={stats.filtered}
          hasActiveFilters={hasActiveFilters}
        />
      </FilterErrorBoundary>

      <div className="bg-white rounded-lg shadow-md">
        <DataTable 
          data={filteredData} 
          onRowClick={setSelectedPeptide}
          selectedPeptides={selectedPeptides}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      {selectedPeptide && (
        <DetailModal
          peptide={selectedPeptide}
          onClose={() => setSelectedPeptide(null)}
        />
      )}
    </div>
  );
}
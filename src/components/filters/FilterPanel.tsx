import React, { useState } from 'react';
import { Filter, SlidersHorizontal, ChevronDown, ChevronUp, XCircle } from 'lucide-react';
import { TauScoreFilter } from './TauScoreFilter';
import { MultiSelectFilter } from './MultiSelectFilter';
import { HLABindingFilter } from './HLABindingFilter';
import { FilterState } from '../../types/FilterTypes';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  uniqueLocations: string[];
  uniqueAlleles: string[];
  totalCount: number;
  filteredCount: number;
  hasActiveFilters: boolean;
}

export function FilterPanel({ 
  filters, 
  onFilterChange, 
  uniqueLocations,
  uniqueAlleles,
  totalCount,
  filteredCount,
  hasActiveFilters
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const resetFilters = () => {
    onFilterChange({ 
      tauScore: [0, 1], 
      locations: [],
      hlaBinding: {
        bindingLevels: [],
        alleles: []
      }
    });
    setIsExpanded(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-4 py-3 flex items-center justify-between text-gray-700">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          <span className="font-medium">Filters</span>
          {hasActiveFilters && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
              Active
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {hasActiveFilters 
              ? `Filtered: ${filteredCount} of ${totalCount} peptides`
              : `Showing all ${totalCount} peptides`}
          </span>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <XCircle className="w-4 h-4" />
                Clear filters
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TauScoreFilter
              value={filters.tauScore}
              onChange={(value) => updateFilter('tauScore', value)}
            />

            <MultiSelectFilter
              label="Location"
              options={uniqueLocations}
              value={filters.locations}
              onChange={(value) => updateFilter('locations', value)}
            />

            <HLABindingFilter
              value={filters.hlaBinding}
              availableAlleles={uniqueAlleles}
              onChange={(value) => updateFilter('hlaBinding', value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { DataTable } from '../components/table/DataTable';
import { DetailModal } from '../components/modals/DetailModal';
import { usePeptideData } from '../hooks/usePeptideData';
import { useLikedPeptides } from '../hooks/useLikedPeptides';
import { FlatPeptideData } from '../types/PeptideData';
import { Heart, Download } from 'lucide-react';
import { exportToCsv } from '../utils/exportUtils';

export function CandidatesView() {
  const { peptideList } = usePeptideData();
  const { likedPeptides } = useLikedPeptides();
  const [selectedPeptide, setSelectedPeptide] = useState<FlatPeptideData | null>(null);

  // Filter peptide list to only show liked peptides
  const candidatePeptides = peptideList.filter(peptide => 
    likedPeptides.has(peptide.fragment)
  );

  const handleExport = () => {
    exportToCsv(candidatePeptides, 'candidate-peptides.csv');
  };

  if (candidatePeptides.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No Candidate Peptides Yet
          </h2>
          <p className="text-gray-600">
            Like peptides in the analysis view to add them to your candidates list.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            Candidate Peptides ({candidatePeptides.length})
          </h2>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg 
              hover:bg-blue-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
        <DataTable 
          data={candidatePeptides}
          onRowClick={setSelectedPeptide}
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
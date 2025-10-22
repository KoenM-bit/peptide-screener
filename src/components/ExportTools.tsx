import React from 'react';
import { Download } from 'lucide-react';
import { FlatPeptideData } from '../types/PeptideData';

interface ExportToolsProps {
  data: FlatPeptideData[];
  selectedPeptides: Set<string>;
  onSelectAll: () => void;
  onSelectNone: () => void;
}

export function ExportTools({ 
  data, 
  selectedPeptides,
  onSelectAll,
  onSelectNone 
}: ExportToolsProps) {
  const exportCSV = () => {
    const peptidesToExport = data.filter(p => selectedPeptides.has(p.fragment));
    if (peptidesToExport.length === 0) {
      alert('Please select at least one peptide to export');
      return;
    }

    // Collect dynamic binding affinity keys from the selected peptides
    const bindingKeys = Array.from(new Set(
      peptidesToExport.flatMap(p => Object.keys(p['Peptide Binding'] || {}))
    )).sort();

    const headers = [
      'Fragment',
      'Gene',
      'Gene Description',
      'Molecular Function',
      'Disease Involvement',
      'Evidence',
      'Subcellular Location',
      'TAU Score',
      'Signal Peptide',
      ...bindingKeys
    ];

    const csvData = peptidesToExport.map(row => {
      const binding = (row['Peptide Binding'] || {}) as Record<string, string | number>;
      return [
        row.fragment,
        row.Gene,
        row['Gene description'],
        row['Molecular function'],
        row['Disease involvement'],
        row.Evidence,
        row['Subcellular location'],
        row['TAU score - Tissue'],
        row['Signal Peptide Sequence'],
        ...bindingKeys.map(k => (binding[k] ?? ''))
      ];
    });

    const formatCell = (value: unknown) => {
      const s = value === null || value === undefined ? '' : String(value);
      const escaped = s.replace(/"/g, '""');
      return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
    };

    const csv = [
      headers.map(formatCell).join(','),
      ...csvData.map(row => row.map(formatCell).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected-peptides.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg 
            hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={selectedPeptides.size === 0}
        >
          <Download className="w-4 h-4" />
          Export Selected ({selectedPeptides.size})
        </button>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onSelectAll}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Select All
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={onSelectNone}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear Selection
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-500">
        {selectedPeptides.size} of {data.length} peptides selected
      </div>
    </div>
  );
}
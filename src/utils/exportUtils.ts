import { FlatPeptideData } from '../types/PeptideData';

export function exportToCsv(data: FlatPeptideData[], filename: string) {
  const headers = [
    'Fragment',
    'Gene',
    'Gene Description',
    'Evidence',
    'Subcellular Location',
    'TAU Score',
    'Signal Peptide',
    'RNA Tissue Specificity',
    'RNA Tissue Distribution',
  ];

  const csvData = data.map(row => [
    row.fragment,
    row.Gene,
    row['Gene description'],
    row.Evidence,
    row['Subcellular location'],
    row['TAU score - Tissue'],
    row['Signal Peptide Sequence'],
    row['RNA tissue specificity'],
    row['RNA tissue distribution'],
  ]);

  const csv = [
    headers.join(','),
    ...csvData.map(row =>
      row
        .map(value =>
          value ? `"${value.toString().replace(/"/g, '""')}"` : '""'
        )
        .join(',')
    ),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

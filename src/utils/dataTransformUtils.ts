import { PeptideData, FlatPeptideData } from '../types/PeptideData';

export function transformPeptideData(data: Record<string, PeptideData>): FlatPeptideData[] {
  return Object.entries(data).map(([fragment, peptideData]) => {
    // Extract nested data
    const generalInfo = peptideData['General Information'] || {};
    const peptideBinding = peptideData['Peptide Binding'] || {};
    const tissueExpression = peptideData['Tissue Expression'] || {};
    const singleCellExpression = peptideData['Single Cell Expression'] || {};

    // Flatten the structure
    return {
      fragment,
      ...generalInfo,
      'Peptide Binding': peptideBinding,
      tissueExpression,
      singleCellExpression
    };
  });
}
import { PeptideData, FlatPeptideData } from '../types/PeptideData';

export function transformPeptideData(
  data: Record<string, PeptideData>
): FlatPeptideData[] {
  return Object.entries(data).map(([fragment, peptideData]) => {
    // Extract nested data
    const generalInfo = peptideData['General Information'] || {};
    const peptideBinding = peptideData['Peptide Binding'] || {};
    const tissueExpression = peptideData['Tissue Expression'] || {};
    const singleCellExpression = peptideData['Single Cell Expression'] || {};
    const cancerExpression = peptideData['Cancer Expression'] || {};
    const tapPrediction = peptideData['TAP Prediction'] || null;

    // Flatten the structure
    return {
      fragment,
      ...generalInfo,
      'Peptide Binding': peptideBinding,
      tissueExpression,
      singleCellExpression,
      cancerExpression,
      'TAP Prediction': tapPrediction,
    };
  });
}

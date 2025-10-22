export interface TAPPrediction {
  pred_score: number;
  pred_affinity: number;
}

export interface PeptideData {
  'General Information': GeneralInformation;
  'Peptide Binding': {
    [key: string]: string | number;
  };
  'Tissue Expression': Record<string, number>;
  'Single Cell Expression': Record<string, number>;
  'Cancer Expression': Record<string, any>;
  'TAP Prediction': TAPPrediction;
}

export interface FlatPeptideData extends GeneralInformation {
  fragment: string;
  'Peptide Binding': {
    [key: string]: string | number;
  };
  tissueExpression: Record<string, number>;
  singleCellExpression: Record<string, number>;
  cancerExpression: Record<string, any>;
  'TAP Prediction': TAPPrediction;
  rowNumber?: number;
}
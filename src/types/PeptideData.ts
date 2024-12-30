export interface GeneralInformation {
  Gene: string;
  'Gene description': string;
  Evidence: string;
  'RNA tissue specificity': string;
  'RNA tissue distribution': string;
  'RNA tissue specificity score': string;
  'TAU score - Tissue': string;
  'Signal Peptide Sequence'?: string;
  'Subcellular location'?: string;
  'Subcellular main location'?: string;
}

export interface PeptideData {
  'General Information': GeneralInformation;
  'Peptide Binding': {
    [key: string]: string | number;
  };
  'Tissue Expression': Record<string, number>;
  'Single Cell Expression': Record<string, number>;
  'Cancer Expression'?: Record<string, number>; // Added Cancer Expression
}

export interface FlatPeptideData extends GeneralInformation {
  fragment: string;
  'Peptide Binding': {
    [key: string]: string | number;
  };
  tissueExpression: Record<string, number>;
  singleCellExpression: Record<string, number>;
  cancerExpression?: Record<string, number>; // Added Cancer Expression
  rowNumber?: number;
}
export interface CancerDataset {
  Median: number;
  StdDev: number;
  Samples: number;
}

export interface CancerData {
  TCGA?: CancerDataset;
  validation?: CancerDataset;
}

export interface ProcessedCancerData {
  name: string;
  tcgaMedian: number;
  tcgaStdDev: number;
  tcgaSamples: number;
  validationMedian?: number;
  validationStdDev?: number;
  validationSamples?: number;
}
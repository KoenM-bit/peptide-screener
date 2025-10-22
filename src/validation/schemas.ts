import { z } from 'zod';

// TAP Prediction schema
export const TAPPredictionSchema = z.object({
  pred_score: z.number().min(0).max(1000).finite(),
  pred_affinity: z.number().min(0).finite(),
});

// General Information schema with flexible structure but basic validation
export const GeneralInformationSchema = z.record(
  z.string(),
  z.union([z.string(), z.number(), z.undefined()])
).refine((data) => {
  // Ensure at least some basic fields exist
  return Object.keys(data).length > 0;
}, {
  message: "General Information must contain at least one field"
});

// Peptide Binding schema
export const PeptideBindingSchema = z.record(
  z.string(),
  z.union([z.string(), z.number()])
).refine((data) => {
  // Validate HLA allele naming convention if present
  const alleleRegex = /^HLA-[ABC]\*\d{2}:\d{2}$/;
  const invalidAlleles = Object.keys(data).filter(key => 
    key.startsWith('HLA-') && !alleleRegex.test(key)
  );
  return invalidAlleles.length === 0;
}, {
  message: "Invalid HLA allele format detected"
});

// Expression data schemas (allowing for numeric values)
export const ExpressionDataSchema = z.record(
  z.string(),
  z.number().finite()
);

// Cancer Expression schema (more flexible due to unknown structure)
export const CancerExpressionSchema = z.record(
  z.string(),
  z.unknown()
);

// Main PeptideData schema
export const PeptideDataSchema = z.object({
  'General Information': GeneralInformationSchema,
  'Peptide Binding': PeptideBindingSchema,
  'Tissue Expression': ExpressionDataSchema,
  'Single Cell Expression': ExpressionDataSchema,
  'Cancer Expression': CancerExpressionSchema,
  'TAP Prediction': TAPPredictionSchema,
});

// Flat peptide data schema for processed data
export const FlatPeptideDataSchema = z.object({
  fragment: z.string().min(1).max(50).regex(/^[ACDEFGHIKLMNPQRSTVWY]+$/, {
    message: "Fragment must contain only valid amino acid letters"
  }),
  'Peptide Binding': PeptideBindingSchema,
  tissueExpression: ExpressionDataSchema,
  singleCellExpression: ExpressionDataSchema,
  cancerExpression: CancerExpressionSchema,
  'TAP Prediction': TAPPredictionSchema,
  rowNumber: z.number().int().min(1).optional(),
});

// Schema for peptide file names
export const PeptideFileNameSchema = z.string().regex(/^[A-Z]+\.json$/, {
  message: "Peptide file name must contain only uppercase letters followed by .json"
});

// Schema for search/filter inputs
export const SearchInputSchema = z.string().max(100).transform((val) => {
  // Sanitize HTML/script tags
  return val.replace(/<[^>]*>/g, '').trim();
});

export const FilterInputSchema = z.object({
  fragment: SearchInputSchema.optional(),
  minTissueExpression: z.number().min(0).max(1000).optional(),
  maxTissueExpression: z.number().min(0).max(1000).optional(),
  cancerType: SearchInputSchema.optional(),
  hlaAllele: z.string().regex(/^HLA-[ABC]\*\d{2}:\d{2}$/).optional(),
});

// Export type inference
export type ValidatedPeptideData = z.infer<typeof PeptideDataSchema>;
export type ValidatedFlatPeptideData = z.infer<typeof FlatPeptideDataSchema>;
export type ValidatedTAPPrediction = z.infer<typeof TAPPredictionSchema>;
export type ValidatedSearchInput = z.infer<typeof SearchInputSchema>;
export type ValidatedFilterInput = z.infer<typeof FilterInputSchema>;
import { useState, useEffect, useCallback, useMemo } from 'react';
import { ValidatedDataLoader, ValidatedLoadResult } from '../utils/validatedDataLoader';
import { ValidatedPeptideData } from '../validation/schemas';
import { validateSearchInput, validateFilterInput, sanitizeFilters } from '../validation/validator';
import { PEPTIDE_FILES } from '../config/peptideFiles';

export interface UseValidatedPeptideDataOptions {
  enableValidation?: boolean;
  strictMode?: boolean;
  maxRetries?: number;
}

export interface UseValidatedPeptideDataReturn {
  data: Record<string, ValidatedPeptideData>;
  loading: boolean;
  error: string | null;
  validationReport: ValidatedLoadResult['validationReport'] | null;
  loadedCount: number;
  errorCount: number;
  refetch: () => Promise<void>;
  validateSearch: (input: string) => { isValid: boolean; errors: string[] };
  validateFilters: (filters: Record<string, unknown>) => { isValid: boolean; sanitized: Record<string, unknown>; errors: string[] };
  progress: { current: number; total: number; percentage: number };
}

export function useValidatedPeptideData(
  options: UseValidatedPeptideDataOptions = {}
): UseValidatedPeptideDataReturn {
  const [data, setData] = useState<Record<string, ValidatedPeptideData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationReport, setValidationReport] = useState<ValidatedLoadResult['validationReport'] | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [progress, setProgress] = useState({ current: 0, total: 0, percentage: 0 });

  // Create data loader instance
  const dataLoader = useMemo(() => {
    return new ValidatedDataLoader({
      validation: options.enableValidation ?? true,
      strictMode: options.strictMode ?? false,
    });
  }, [options.enableValidation, options.strictMode]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setProgress({ current: 0, total: PEPTIDE_FILES.length, percentage: 0 });

    try {
      // Load data with validation
      const result = await dataLoader.loadValidatedPeptideData([...PEPTIDE_FILES]);
      
      setData(result.data);
      setValidationReport(result.validationReport);
      setLoadedCount(result.loadedCount);
      setErrorCount(result.errorCount);

      // Set final progress
      setProgress({ 
        current: PEPTIDE_FILES.length, 
        total: PEPTIDE_FILES.length, 
        percentage: 100 
      });

      // Log validation summary
      console.log('📊 Validation Summary:', result.validationReport.summary);
      
      if (result.validationReport.suggestions.length > 0) {
        console.log('💡 Suggestions:', result.validationReport.suggestions);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('❌ Data loading failed:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [dataLoader]);

  // Validation helpers for user input
  const validateSearch = useCallback((input: string) => {
    const result = validateSearchInput(input);
    return {
      isValid: result.success,
      errors: result.errors || [],
    };
  }, []);

  const validateFilters = useCallback((filters: Record<string, unknown>) => {
    // First sanitize the filters
    const sanitized = sanitizeFilters(filters);
    
    // Then validate the sanitized filters
    const result = validateFilterInput(sanitized);
    
    return {
      isValid: result.success,
      sanitized: result.success ? result.data! : sanitized,
      errors: result.errors || [],
    };
  }, []);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    validationReport,
    loadedCount,
    errorCount,
    refetch: loadData,
    validateSearch,
    validateFilters,
    progress,
  };
}
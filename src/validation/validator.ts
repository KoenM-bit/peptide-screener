import { z } from 'zod';
import {
  PeptideDataSchema,
  FlatPeptideDataSchema,
  SearchInputSchema,
  FilterInputSchema,
  PeptideFileNameSchema,
  ValidatedPeptideData,
  ValidatedFlatPeptideData,
  ValidatedSearchInput,
  ValidatedFilterInput,
} from './schemas';

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: string[];
  warnings?: string[];
}

export interface ValidationStats {
  total: number;
  valid: number;
  invalid: number;
  errors: Record<string, number>;
}

/**
 * Validates peptide data against the schema
 */
export function validatePeptideData(data: unknown): ValidationResult<ValidatedPeptideData> {
  try {
    const validated = PeptideDataSchema.parse(data);
    return {
      success: true,
      data: validated,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`),
      };
    }
    return {
      success: false,
      errors: ['Unknown validation error'],
    };
  }
}

/**
 * Validates flat peptide data (processed format)
 */
export function validateFlatPeptideData(data: unknown): ValidationResult<ValidatedFlatPeptideData> {
  try {
    const validated = FlatPeptideDataSchema.parse(data);
    return {
      success: true,
      data: validated,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`),
      };
    }
    return {
      success: false,
      errors: ['Unknown validation error'],
    };
  }
}

/**
 * Sanitizes and validates search input
 */
export function validateSearchInput(input: string): ValidationResult<ValidatedSearchInput> {
  try {
    const validated = SearchInputSchema.parse(input);
    return {
      success: true,
      data: validated,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map((issue) => issue.message),
      };
    }
    return {
      success: false,
      errors: ['Invalid search input'],
    };
  }
}

/**
 * Validates filter parameters
 */
export function validateFilterInput(filters: unknown): ValidationResult<ValidatedFilterInput> {
  try {
    const validated = FilterInputSchema.parse(filters);
    return {
      success: true,
      data: validated,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`),
      };
    }
    return {
      success: false,
      errors: ['Invalid filter parameters'],
    };
  }
}

/**
 * Validates peptide file names
 */
export function validatePeptideFileName(filename: string): ValidationResult<string> {
  try {
    const validated = PeptideFileNameSchema.parse(filename);
    return {
      success: true,
      data: validated,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map((issue) => issue.message),
      };
    }
    return {
      success: false,
      errors: ['Invalid file name format'],
    };
  }
}

/**
 * Bulk validation of peptide data with statistics
 */
export function validatePeptideDataBulk(
  dataArray: Array<{ id: string; data: unknown }>
): {
  results: Array<{ id: string; result: ValidationResult<ValidatedPeptideData> }>;
  stats: ValidationStats;
} {
  const results: Array<{ id: string; result: ValidationResult<ValidatedPeptideData> }> = [];
  const stats: ValidationStats = {
    total: dataArray.length,
    valid: 0,
    invalid: 0,
    errors: {},
  };

  for (const item of dataArray) {
    const result = validatePeptideData(item.data);
    results.push({ id: item.id, result });

    if (result.success) {
      stats.valid++;
    } else {
      stats.invalid++;
      
      // Count error types
      result.errors?.forEach(error => {
        const errorType = error.split(':')[0] || 'unknown';
        stats.errors[errorType] = (stats.errors[errorType] || 0) + 1;
      });
    }
  }

  return { results, stats };
}

/**
 * Sanitizes user input to prevent XSS and injection attacks
 */
export function sanitizeUserInput(input: unknown): string {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim()
    .slice(0, 1000); // Limit length
}

/**
 * Validates and sanitizes filter object
 */
export function sanitizeFilters(filters: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(filters)) {
    const sanitizedKey = sanitizeUserInput(key);
    
    if (typeof value === 'string') {
      sanitized[sanitizedKey] = sanitizeUserInput(value);
    } else if (typeof value === 'number' && isFinite(value)) {
      sanitized[sanitizedKey] = value;
    } else if (typeof value === 'boolean') {
      sanitized[sanitizedKey] = value;
    }
    // Skip other types (objects, arrays, functions, etc.)
  }

  return sanitized;
}

/**
 * Creates a detailed error report for validation failures
 */
export function createValidationReport(
  results: Array<{ id: string; result: ValidationResult<unknown> }>
): {
  summary: string;
  details: Array<{ id: string; errors: string[] }>;
  suggestions: string[];
} {
  const failed = results.filter(r => !r.result.success);
  const errorCounts: Record<string, number> = {};

  const details = failed.map(item => ({
    id: item.id,
    errors: item.result.errors || [],
  }));

  // Count error types for suggestions
  failed.forEach(item => {
    item.result.errors?.forEach(error => {
      const errorType = error.split(':')[0] || 'unknown';
      errorCounts[errorType] = (errorCounts[errorType] || 0) + 1;
    });
  });

  const suggestions: string[] = [];
  
  if (errorCounts['General Information']) {
    suggestions.push('Check that General Information contains valid key-value pairs');
  }
  
  if (errorCounts['TAP Prediction']) {
    suggestions.push('Verify TAP Prediction scores are valid numbers within expected ranges');
  }
  
  if (errorCounts['fragment']) {
    suggestions.push('Ensure peptide fragments contain only valid amino acid letters (A-Z)');
  }

  const summary = `Validation completed: ${results.length - failed.length}/${results.length} items valid. ${failed.length} failures found.`;

  return { summary, details, suggestions };
}
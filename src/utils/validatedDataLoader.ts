import { PeptideData } from '../types/PeptideData';
import { loadJsonFile } from './fileLoader';
import { 
  validatePeptideData, 
  validatePeptideFileName, 
  ValidationResult,
  createValidationReport
} from '../validation/validator';
import { ValidatedPeptideData } from '../validation/schemas';

export interface ValidatedLoadResult {
  data: Record<string, ValidatedPeptideData>;
  validationReport: {
    summary: string;
    details: Array<{ id: string; errors: string[] }>;
    suggestions: string[];
  };
  loadedCount: number;
  errorCount: number;
}

/**
 * Enhanced data loader with validation
 */
export class ValidatedDataLoader {
  private validationEnabled = true;
  private strictMode = false;

  constructor(options?: { validation?: boolean; strictMode?: boolean }) {
    this.validationEnabled = options?.validation ?? true;
    this.strictMode = options?.strictMode ?? false;
  }

  /**
   * Load and validate a single peptide file
   */
  async loadValidatedPeptideFile(
    filename: string
  ): Promise<ValidationResult<Record<string, ValidatedPeptideData>>> {
    // First validate the filename
    const filenameValidation = validatePeptideFileName(filename);
    if (!filenameValidation.success) {
      return {
        success: false,
        errors: [`Invalid filename: ${filenameValidation.errors?.join(', ')}`],
      };
    }

    try {
      // Try multiple potential locations
      const pathsToTry = [
        `/peptides/${filename}`,
        `./peptides/${filename}`,
        `../peptides/${filename}`,
        `../../peptides/${filename}`,
        `./resources/peptides/${filename}`,
        `../resources/peptides/${filename}`,
      ];

      let rawData: unknown = null;
      let loadError: Error | null = null;

      // Try each path in order
      for (const path of pathsToTry) {
        try {
          rawData = await loadJsonFile<Record<string, PeptideData>>(path);
          break;
        } catch (error) {
          loadError = error as Error;
          continue;
        }
      }

      if (!rawData) {
        return {
          success: false,
          errors: [`Failed to load file ${filename}: ${loadError?.message}`],
        };
      }

      // Validate the loaded data if validation is enabled
      if (!this.validationEnabled) {
        return {
          success: true,
          data: rawData as Record<string, ValidatedPeptideData>,
        };
      }

      const validatedData: Record<string, ValidatedPeptideData> = {};
      const validationErrors: string[] = [];

      for (const [key, value] of Object.entries(rawData)) {
        const validationResult = validatePeptideData(value);
        
        if (validationResult.success && validationResult.data) {
          validatedData[key] = validationResult.data;
        } else {
          const errors = validationResult.errors?.join('; ') || 'Unknown error';
          validationErrors.push(`${key}: ${errors}`);
          
          // In strict mode, fail the entire load if any validation fails
          if (this.strictMode) {
            return {
              success: false,
              errors: [`Strict validation failed for ${key}: ${errors}`],
            };
          }
        }
      }

      return {
        success: true,
        data: validatedData,
        warnings: validationErrors.length > 0 ? 
          [`${validationErrors.length} items failed validation`] : undefined,
      };

    } catch (error) {
      return {
        success: false,
        errors: [`Error loading ${filename}: ${(error as Error).message}`],
      };
    }
  }

  /**
   * Load and validate multiple peptide files
   */
  async loadValidatedPeptideData(filenames: string[]): Promise<ValidatedLoadResult> {
    const allData: Record<string, ValidatedPeptideData> = {};
    const loadResults: Array<{ id: string; result: ValidationResult<unknown> }> = [];
    let loadedCount = 0;
    let errorCount = 0;

    console.log(`🔍 Loading and validating ${filenames.length} peptide files...`);

    // Load files in parallel for better performance
    const loadPromises = filenames.map(async (filename) => {
      const result = await this.loadValidatedPeptideFile(filename);
      
      if (result.success && result.data) {
        Object.assign(allData, result.data);
        loadedCount += Object.keys(result.data).length;
      } else {
        errorCount++;
        console.warn(`⚠️ Failed to load ${filename}:`, result.errors?.join(', '));
      }

      return {
        id: filename,
        result,
      };
    });

    const results = await Promise.all(loadPromises);
    loadResults.push(...results);

    // Generate validation report
    const validationReport = createValidationReport(loadResults);

    console.log(`✅ Loaded ${loadedCount} peptides from ${filenames.length - errorCount}/${filenames.length} files`);
    
    if (errorCount > 0) {
      console.warn(`⚠️ ${errorCount} files failed to load`);
    }

    return {
      data: allData,
      validationReport,
      loadedCount,
      errorCount,
    };
  }

  /**
   * Validate existing data without reloading
   */
  validateExistingData(data: Record<string, unknown>): {
    validData: Record<string, ValidatedPeptideData>;
    invalidData: Record<string, { data: unknown; errors: string[] }>;
    stats: {
      total: number;
      valid: number;
      invalid: number;
    };
  } {
    const validData: Record<string, ValidatedPeptideData> = {};
    const invalidData: Record<string, { data: unknown; errors: string[] }> = {};

    for (const [key, value] of Object.entries(data)) {
      const validationResult = validatePeptideData(value);
      
      if (validationResult.success && validationResult.data) {
        validData[key] = validationResult.data;
      } else {
        invalidData[key] = {
          data: value,
          errors: validationResult.errors || ['Unknown validation error'],
        };
      }
    }

    return {
      validData,
      invalidData,
      stats: {
        total: Object.keys(data).length,
        valid: Object.keys(validData).length,
        invalid: Object.keys(invalidData).length,
      },
    };
  }

  /**
   * Enable or disable validation
   */
  setValidation(enabled: boolean): void {
    this.validationEnabled = enabled;
  }

  /**
   * Enable or disable strict mode
   */
  setStrictMode(strict: boolean): void {
    this.strictMode = strict;
  }
}
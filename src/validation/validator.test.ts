import { describe, it, expect } from 'vitest';
import {
  validatePeptideData,
  validateSearchInput,
  validateFilterInput,
  sanitizeUserInput,
} from '../validation/validator';

describe('Data Validation System', () => {
  describe('validatePeptideData', () => {
    it('should validate correct peptide data structure', () => {
      const validData = {
        'General Information': {
          sequence: 'AAAAAAAAA',
          length: 9,
        },
        'Peptide Binding': {
          'HLA-A*02:01': 500,
          'HLA-B*07:02': 1000,
        },
        'Tissue Expression': {
          liver: 2.5,
          brain: 1.8,
        },
        'Single Cell Expression': {
          hepatocyte: 3.2,
          neuron: 1.1,
        },
        'Cancer Expression': {
          breast: { value: 1.5 },
          lung: { value: 2.0 },
        },
        'TAP Prediction': {
          pred_score: 0.85,
          pred_affinity: 125.5,
        },
      };

      const result = validatePeptideData(validData);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.errors).toBeUndefined();
    });

    it('should reject invalid peptide data', () => {
      const invalidData = {
        'General Information': {},
        'Peptide Binding': {},
        'Tissue Expression': {},
        'Single Cell Expression': {},
        'Cancer Expression': {},
        // Missing TAP Prediction
      };

      const result = validatePeptideData(invalidData);
      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);
    });

    it('should validate TAP prediction values', () => {
      const invalidTAPData = {
        'General Information': { sequence: 'TEST' },
        'Peptide Binding': {},
        'Tissue Expression': {},
        'Single Cell Expression': {},
        'Cancer Expression': {},
        'TAP Prediction': {
          pred_score: -1, // Invalid: negative
          pred_affinity: Infinity, // Invalid: not finite
        },
      };

      const result = validatePeptideData(invalidTAPData);
      expect(result.success).toBe(false);
      expect(result.errors?.some(e => e.includes('TAP Prediction'))).toBe(true);
    });
  });

  describe('validateSearchInput', () => {
    it('should validate basic peptide sequences', () => {
      const result = validateSearchInput('ALFALFA');
      expect(result.success).toBe(true);
      expect(result.data).toBe('ALFALFA');
    });

    it('should handle sequences with numbers (sanitizes but allows)', () => {
      const result = validateSearchInput('INVALID123');
      expect(result.success).toBe(true); // Schema allows this, just sanitizes HTML
      expect(result.data).toBe('INVALID123');
    });

    it('should sanitize HTML from search input', () => {
      const result = validateSearchInput('<script>alert("xss")</script>PEPTIDE');
      expect(result.success).toBe(true);
      expect(result.data).toContain('PEPTIDE');
    });

    it('should handle empty input', () => {
      const result = validateSearchInput('');
      expect(result.success).toBe(true); // Empty string is valid, just gets trimmed
      expect(result.data).toBe('');
    });
  });

  describe('validateFilterInput', () => {
    it('should validate correct filter input', () => {
      const filters = {
        fragment: 'AAA',
        minTissueExpression: 1.0,
        maxTissueExpression: 10.0,
      };

      const result = validateFilterInput(filters);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should reject invalid HLA allele format', () => {
      const filters = {
        hlaAllele: 'invalid-allele',
      };

      const result = validateFilterInput(filters);
      expect(result.success).toBe(false);
      expect(result.errors?.some(e => e.includes('hlaAllele'))).toBe(true);
    });
  });

  describe('sanitizeUserInput', () => {
    it('should remove script tags', () => {
      const input = '<script>alert("xss")</script>Hello';
      const result = sanitizeUserInput(input);
      expect(result).toBe('Hello');
    });

    it('should remove HTML tags', () => {
      const input = '<div>Hello <span>World</span></div>';
      const result = sanitizeUserInput(input);
      expect(result).toBe('Hello World');
    });

    it('should remove javascript: URLs', () => {
      const input = 'javascript:alert("xss") Hello';
      const result = sanitizeUserInput(input);
      expect(result).toContain(' Hello');
    });

    it('should limit input length', () => {
      const longInput = 'A'.repeat(2000);
      const result = sanitizeUserInput(longInput);
      expect(result.length).toBeLessThanOrEqual(1000);
    });

    it('should handle non-string input', () => {
      expect(sanitizeUserInput(null)).toBe('');
      expect(sanitizeUserInput(undefined)).toBe('');
      expect(sanitizeUserInput(123)).toBe('');
      expect(sanitizeUserInput({})).toBe('');
    });
  });
});
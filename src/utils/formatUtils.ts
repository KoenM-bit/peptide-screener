/**
 * Format a TAU score for display
 */
export function formatTauScore(
  score: number | string | null | undefined
): string {
  if (score === null || score === undefined || score === '') {
    return 'N/A';
  }

  const numericScore = typeof score === 'string' ? parseFloat(score) : score;

  if (isNaN(numericScore)) {
    return 'N/A';
  }

  return numericScore.toFixed(2);
}

/**
 * Format a tissue name for display
 */
export function formatTissueName(fieldName: string): string {
  return fieldName
    .replace('Tissue RNA - ', '')
    .replace('Single Cell Type RNA - ', '')
    .replace(' [nTPM]', '')
    .replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Format a location string for display
 */
export function formatLocation(value: string | null | undefined): string {
  if (!value || value === 'NA') return 'Unknown';
  return value
    .split(';')
    .map(loc => loc.trim())
    .join(', ');
}

/**
 * Format a semicolon-separated list for display
 */
export function formatList(value: string | null | undefined): string {
  if (!value || value === 'NA') return 'Not specified';
  return value
    .split(';')
    .map(item => item.trim())
    .join(', ');
}

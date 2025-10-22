/**
 * Calculate percentage for TAU score visualization
 */
export function calculateTauPercentage(
  score: number | string | null | undefined
): number {
  if (score === null || score === undefined || score === '') return 0;

  const numericScore = typeof score === 'string' ? parseFloat(score) : score;

  if (isNaN(numericScore)) return 0;
  return (numericScore / 1) * 100;
}

export { getTauScoreColor } from './colorUtils';

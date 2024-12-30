/**
 * Calculate color intensity for heatmap visualization
 * @param value The numeric value to convert to color intensity
 * @param maxValue The maximum value to use for scaling (default: 300)
 * @returns A CSS rgb color string with appropriate opacity
 */
export function getColorIntensity(value: number, maxValue: number = 300): string {
  const intensity = Math.min((value / maxValue) * 100, 100);
  return `rgb(66, 146, 198, ${intensity / 100})`;
}

/**
 * Get color classes for TAU score visualization
 */
export function getTauScoreColor(score: number | string | null | undefined) {
  if (score === null || score === undefined || score === '') {
    return {
      background: 'bg-gray-100',
      text: 'text-gray-700'
    };
  }

  const numericScore = typeof score === 'string' ? parseFloat(score) : score;

  if (isNaN(numericScore)) {
    return {
      background: 'bg-gray-100',
      text: 'text-gray-700'
    };
  }

  if (numericScore < 0.3) {
    return {
      background: 'bg-green-100',
      text: 'text-green-800'
    };
  }
  
  if (numericScore < 0.7) {
    return {
      background: 'bg-yellow-100',
      text: 'text-yellow-800'
    };
  }
  
  return {
    background: 'bg-red-100',
    text: 'text-red-800'
  };
}
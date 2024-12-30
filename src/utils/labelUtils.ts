/**
 * Get descriptive label for TAU score
 */
export function getTauScoreLabel(score: number): string {
  if (score === null || score === undefined || isNaN(score)) {
    return 'No score available';
  }
  
  if (score < 0.3) return 'Low tissue specificity';
  if (score < 0.7) return 'Moderate tissue specificity';
  return 'High tissue specificity';
}

/**
 * Get descriptive label for evidence level
 */
export function getEvidenceLabel(evidence: string): string {
  if (!evidence) return 'Unknown';
  
  if (evidence.toLowerCase().includes('protein')) {
    return 'Protein Level';
  }
  
  if (evidence.toLowerCase().includes('transcript')) {
    return 'Transcript Level';
  }
  
  return evidence;
}
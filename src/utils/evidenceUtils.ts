interface ColorClasses {
  background: string;
  text: string;
}

export function getEvidenceColor(evidence: string | null): ColorClasses {
  if (!evidence) {
    return {
      background: 'bg-gray-100',
      text: 'text-gray-800',
    };
  }

  if (evidence.toLowerCase().includes('protein')) {
    return {
      background: 'bg-green-100',
      text: 'text-green-800',
    };
  }

  if (evidence.toLowerCase().includes('transcript')) {
    return {
      background: 'bg-yellow-100',
      text: 'text-yellow-800',
    };
  }

  return {
    background: 'bg-gray-100',
    text: 'text-gray-800',
  };
}

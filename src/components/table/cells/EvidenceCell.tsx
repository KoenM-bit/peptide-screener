import React from 'react';
import { getEvidenceColor } from '../../../utils/evidenceUtils';

interface EvidenceCellProps {
  evidence: string;
}

export function EvidenceCell({ evidence }: EvidenceCellProps) {
  const { background, text } = getEvidenceColor(evidence);

  return (
    <div
      className={`inline-flex px-2 py-1 rounded-full text-sm ${background} ${text}`}
    >
      {evidence || 'Unknown'}
    </div>
  );
}

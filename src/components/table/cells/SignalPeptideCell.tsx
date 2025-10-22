import React from 'react';

interface SignalPeptideProps {
  signalPeptide: string;
  fragment: string;
}

export function SignalPeptideCell({
  signalPeptide,
  fragment,
}: SignalPeptideProps) {
  if (!signalPeptide) {
    return <div className="text-gray-500 italic">No signal peptide</div>;
  }

  const fragmentStart = signalPeptide.indexOf(fragment);

  if (fragmentStart === -1) {
    return (
      <div className="font-mono text-sm">
        {signalPeptide}
        <div className="text-red-500 text-xs mt-1">
          Fragment not found in sequence
        </div>
      </div>
    );
  }

  const before = signalPeptide.slice(0, fragmentStart);
  const after = signalPeptide.slice(fragmentStart + fragment.length);

  return (
    <div className="space-y-1">
      <div className="font-mono text-sm flex items-center flex-wrap gap-0.5">
        <span className="text-gray-500">{before}</span>
        <span className="bg-blue-100 text-blue-800 px-1 rounded">
          {fragment}
        </span>
        <span className="text-gray-500">{after}</span>
      </div>
      <div className="text-xs text-gray-500">
        Position: {fragmentStart + 1}-{fragmentStart + fragment.length}
      </div>
    </div>
  );
}

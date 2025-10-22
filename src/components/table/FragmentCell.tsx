import React from 'react';

interface FragmentCellProps {
  fragment: string;
}

export function FragmentCell({ fragment }: FragmentCellProps) {
  return (
    <div className="font-mono bg-gray-50 px-2 py-1 rounded">{fragment}</div>
  );
}

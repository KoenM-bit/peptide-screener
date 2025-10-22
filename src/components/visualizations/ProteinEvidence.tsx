import React from 'react';
import { CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

interface ProteinEvidenceProps {
  evidence: string;
  tissueSpecificity: string;
  tissueDistribution: string;
}

export function ProteinEvidence({
  evidence,
  tissueSpecificity,
  tissueDistribution,
}: ProteinEvidenceProps) {
  const getEvidenceIcon = () => {
    switch (evidence) {
      case 'Evidence at protein level':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'Evidence at transcript level':
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      default:
        return <HelpCircle className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-4">Protein Evidence</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          {getEvidenceIcon()}
          <span>{evidence}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded">
            <div className="text-sm text-gray-600">Tissue Specificity</div>
            <div className="font-medium">{tissueSpecificity}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <div className="text-sm text-gray-600">Distribution</div>
            <div className="font-medium">{tissueDistribution}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

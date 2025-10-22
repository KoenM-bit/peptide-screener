import React from 'react';
import { Dna, Microscope, Activity } from 'lucide-react';

interface GeneInfoProps {
  geneName: string;
  geneDescription: string;
  biologicalProcess: string;
  molecularFunction: string;
  diseaseInvolvement: string;
}

export function GeneInfo({
  geneName,
  geneDescription,
  molecularFunction,
  diseaseInvolvement,
}: GeneInfoProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Dna className="w-6 h-6 text-blue-500" />
        <h3 className="text-lg font-semibold">{geneName}</h3>
      </div>
      <div className="space-y-3">
        <p className="text-gray-700">{geneDescription}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-gray-50 rounded">
            <div className="flex items-center gap-2 mb-2">
              <Microscope className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Molecular Function</span>
            </div>
            <p className="text-sm text-gray-600">
              {molecularFunction || 'Not specified'}
            </p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Disease Involvement</span>
            </div>
            <p className="text-sm text-gray-600">
              {diseaseInvolvement || 'Not specified'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

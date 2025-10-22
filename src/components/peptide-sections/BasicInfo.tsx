import React from 'react';
import { Database } from 'lucide-react';

interface BasicInfoProps {
  fragment: string;
  gene: string;
  geneDescription: string;
  evidence: string;
  signalPeptide?: string;
}

export function BasicInfo({ 
  fragment, 
  gene, 
  geneDescription, 
  signalPeptide 
}: BasicInfoProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Database className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-bold">Basic Information</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium text-gray-500">Fragment</div>
          <div className="text-lg font-mono bg-gray-50 px-2 py-1 rounded mt-1">
            {fragment || 'N/A'}
          </div>
        </div>
        
        <div>
          <div className="text-sm font-medium text-gray-500">Gene</div>
          <div className="text-lg">{gene || 'N/A'}</div>
        </div>
        
        <div className="md:col-span-2">
          <div className="text-sm font-medium text-gray-500">Description</div>
          <div className="text-lg">{geneDescription || 'No description available'}</div>
        </div>
        
        {signalPeptide && (
          <div className="md:col-span-2">
            <div className="text-sm font-medium text-gray-500">Signal Peptide</div>
            <div className="font-mono bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
              {signalPeptide}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
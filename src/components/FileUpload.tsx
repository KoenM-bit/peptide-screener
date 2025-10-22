import React from 'react';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';
import { PeptideData } from '../types/PeptideData';

interface FileUploadProps {
  onDataLoaded: (data: PeptideData[]) => void;
}

export function FileUpload({ onDataLoaded }: FileUploadProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: results => {
          const data = results.data as PeptideData[];
          onDataLoaded(data);
        },
        header: true,
        dynamicTyping: true,
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors">
        <Upload className="w-8 h-8" />
        <span className="mt-2 text-sm">Select CSV file</span>
        <input
          type="file"
          className="hidden"
          accept=".csv"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
}

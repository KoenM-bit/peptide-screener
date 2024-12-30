import React from 'react';
import { Search } from 'lucide-react';

interface TableHeaderProps {
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export function TableHeader({ globalFilter, setGlobalFilter }: TableHeaderProps) {
  return (
    <div className="mb-4 relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={globalFilter ?? ''}
        onChange={e => setGlobalFilter(e.target.value)}
        placeholder="Search peptides..."
        className="pl-10 px-4 py-2 border rounded-lg w-full max-w-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
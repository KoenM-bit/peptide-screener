import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useTableSearch } from '../hooks/useTableSearch';
import { usePeptideData } from '../hooks/usePeptideData';
import { TableHeader } from './table/TableHeader';
import { FragmentCell } from './table/FragmentCell';
import { EvidenceCell } from './table/EvidenceCell';
import { TauScoreCell } from './table/TauScoreCell';
import { LocationCell } from './table/LocationCell';
import { DetailModal } from './modals/DetailModal';
import { Loader2 } from 'lucide-react';

export function DataTable() {
  const { globalFilter, setGlobalFilter } = useTableSearch();
  const { peptideList, loading, error } = usePeptideData();
  const [selectedPeptide, setSelectedPeptide] = useState(null);
  
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('fragment', {
      cell: info => <FragmentCell fragment={info.getValue()} />,
      header: 'Fragment',
    }),
    columnHelper.accessor('Gene', {
      cell: info => info.getValue(),
      header: 'Gene',
    }),
    columnHelper.accessor('Gene description', {
      cell: info => (
        <div className="max-w-md truncate" title={info.getValue()}>
          {info.getValue() || 'No description'}
        </div>
      ),
      header: 'Description',
    }),
    columnHelper.accessor('Evidence', {
      cell: info => <EvidenceCell evidence={info.getValue()} />,
      header: 'Evidence',
    }),
    columnHelper.accessor('Subcellular location', {
      cell: info => <LocationCell location={info.getValue()} />,
      header: 'Location',
    }),
    columnHelper.accessor('TAU score - Tissue', {
      cell: info => (
        <TauScoreCell 
          score={parseFloat(info.getValue())}
          onClick={() => setSelectedPeptide(info.row.original)}
        />
      ),
      header: 'TAU Score',
    }),
  ];

  const table = useReactTable({
    data: peptideList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="p-4">
        <TableHeader 
          globalFilter={globalFilter} 
          setGlobalFilter={setGlobalFilter} 
        />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="bg-gray-100">
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr 
                  key={row.id} 
                  className="hover:bg-gray-50"
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedPeptide && (
        <DetailModal
          peptide={selectedPeptide}
          onClose={() => setSelectedPeptide(null)}
        />
      )}
    </>
  );
}
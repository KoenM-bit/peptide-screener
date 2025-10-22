import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { TableHeader } from './TableHeader';
import { FragmentCell } from './cells/FragmentCell';
import { SignalPeptideCell } from './cells/SignalPeptideCell';
import { LocationCell } from './cells/LocationCell';
import { GeneCell } from './cells/GeneCell';
import { TauScoreCell } from './cells/TauScoreCell';
import { BindingStatusCell } from './cells/BindingStatusCell';
import { LikeCell } from './cells/LikeCell';
import { TAPPredictionBadge } from '../visualizations/TAPPredictionBadge';
import { useTableSearch } from '../../hooks/useTableSearch';
import { useLikedPeptides } from '../../hooks/useLikedPeptides';
import { FlatPeptideData } from '../../types/PeptideData';

interface DataTableProps {
  data: FlatPeptideData[];
  onRowClick: (peptide: FlatPeptideData) => void;
  selectedPeptides?: Set<string>;
  onSelectionChange?: (fragment: string, selected: boolean) => void;
}

export function DataTable({ data, onRowClick }: DataTableProps) {
  const { globalFilter, setGlobalFilter } = useTableSearch();
  const { likedPeptides, togglePeptideLike } = useLikedPeptides();
  const columnHelper = createColumnHelper<FlatPeptideData>();

  const columns = [
    columnHelper.accessor('fragment', {
      id: 'like',
      cell: info => (
        <LikeCell
          fragment={info.getValue()}
          isLiked={likedPeptides.has(info.getValue())}
          onToggleLike={togglePeptideLike}
        />
      ),
      header: '',
      size: 40,
    }),
    columnHelper.accessor('fragment', {
      id: 'fragmentDisplay',
      cell: info => <FragmentCell fragment={info.getValue()} />,
      header: 'Fragment',
      size: 120,
    }),
    columnHelper.accessor('TAP Prediction', {
      cell: info => {
        const tapData = info.getValue();
        if (!tapData) return null;
        return (
          <TAPPredictionBadge
            score={tapData.pred_score}
            affinity={tapData.pred_affinity}
          />
        );
      },
      header: 'TAP Prediction',
      size: 180,
    }),
    columnHelper.accessor('Peptide Binding', {
      id: 'bindingStatus',
      cell: info => <BindingStatusCell bindingData={info.getValue()} />,
      header: 'Binding',
      size: 100,
    }),
    columnHelper.accessor(
      row => ({ gene: row.Gene, description: row['Gene description'] }),
      {
        id: 'gene',
        cell: info => <GeneCell {...info.getValue()} />,
        header: 'Gene',
        size: 150,
      }
    ),
    columnHelper.accessor(
      row => ({
        signalPeptide: row['Signal Peptide Sequence'],
        fragment: row.fragment,
      }),
      {
        id: 'signalPeptide',
        cell: info => <SignalPeptideCell {...info.getValue()} />,
        header: 'Signal Peptide',
        size: 200,
      }
    ),
    columnHelper.accessor('Subcellular location', {
      cell: info => <LocationCell location={info.getValue()} />,
      header: 'Location',
      size: 150,
    }),
    columnHelper.accessor('TAU score - Tissue', {
      cell: info => (
        <TauScoreCell
          score={info.getValue()}
          onClick={() => onRowClick(info.row.original)}
        />
      ),
      header: 'TAU Score',
      size: 100,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
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
                  <th
                    key={header.id}
                    className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{ width: header.getSize() }}
                  >
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
                key={`row_${row.id}`}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onRowClick(row.original)}
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={`cell_${cell.id}`}
                    className="px-3 py-2 whitespace-nowrap text-sm text-gray-900"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

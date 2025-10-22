import { useState } from 'react';

export function useTableSearch() {
  const [globalFilter, setGlobalFilter] = useState('');

  return {
    globalFilter,
    setGlobalFilter,
  };
}

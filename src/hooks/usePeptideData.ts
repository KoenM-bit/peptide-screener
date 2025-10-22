import { useState, useEffect, useCallback } from 'react';
import { PeptideData } from '../types/PeptideData';
import { transformPeptideData } from '../utils/dataTransformUtils';
import { loadPeptideData } from '../utils/dataLoaderImproved';

export function usePeptideData() {
  const [data, setData] = useState<Record<string, PeptideData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<{
    loaded: number;
    total: number;
    current: string;
  } | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setProgress(null);
      
      const peptideData = await loadPeptideData((progressInfo) => {
        setProgress(progressInfo);
      });
      
      setData(peptideData);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load peptide data. Please try refreshing the page.');
    } finally {
      setLoading(false);
      setProgress(null);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Transform the nested data structure for table display
  const peptideList = transformPeptideData(data);

  return {
    data,
    peptideList,
    loading,
    error,
    progress,
    refetch: loadData
  };
}
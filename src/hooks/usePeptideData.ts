import { useState, useEffect } from 'react';
import { PeptideData, FlatPeptideData } from '../types/PeptideData';
import { transformPeptideData } from '../utils/dataTransformUtils';

export function usePeptideData() {
  const [data, setData] = useState<Record<string, PeptideData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Updated path to fetch from public folder
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError('Failed to load peptide data');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Transform the nested data structure for table display
  const peptideList = transformPeptideData(data);

  return {
    data,
    peptideList,
    loading,
    error
  };
}
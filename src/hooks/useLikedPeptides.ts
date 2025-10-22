import { useState, useEffect } from 'react';
import { getLikedPeptides, toggleLike } from '../db/storage';

export function useLikedPeptides() {
  const [likedPeptides, setLikedPeptides] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLikedPeptides = async () => {
      try {
        const likes = await getLikedPeptides();
        setLikedPeptides(likes);
      } catch (error) {
        console.error('Error loading liked peptides:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLikedPeptides();

    // Add storage event listener for cross-tab synchronization
    const handleStorageChange = async () => {
      const likes = await getLikedPeptides();
      setLikedPeptides(likes);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const togglePeptideLike = async (fragment: string) => {
    try {
      const isLiked = await toggleLike(fragment);
      setLikedPeptides(prev => {
        const next = new Set(prev);
        if (isLiked) {
          next.add(fragment);
        } else {
          next.delete(fragment);
        }
        return next;
      });
      return isLiked;
    } catch (error) {
      console.error('Error toggling peptide like:', error);
      return false;
    }
  };

  return { likedPeptides, togglePeptideLike, loading };
}

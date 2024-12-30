import React from 'react';
import { Database, Heart } from 'lucide-react';
import { useLikedPeptides } from '../../hooks/useLikedPeptides';

interface NavBarProps {
  currentView: 'analysis' | 'candidates';
  onViewChange: (view: 'analysis' | 'candidates') => void;
}

export function NavBar({ currentView, onViewChange }: NavBarProps) {
  const { likedPeptides } = useLikedPeptides();
  const likedCount = likedPeptides.size;

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-2">
            <Database className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-900">
              TEIPP peptide analyzer
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onViewChange('analysis')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${currentView === 'analysis' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Database className="w-5 h-5" />
              Analysis
            </button>
            <button
              onClick={() => onViewChange('candidates')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${currentView === 'candidates' 
                  ? 'bg-red-100 text-red-800' 
                  : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <Heart className="w-5 h-5" />
              Candidates ({likedCount})
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
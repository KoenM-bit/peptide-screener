import React, { useState, useEffect } from 'react';
import { DataAnalysisView } from './views/DataAnalysisView';
import { CandidatesView } from './views/CandidatesView';
import { LoginPage } from './components/auth/LoginPage';
import { NavBar } from './components/navigation/NavBar';
import { usePeptideData } from './hooks/usePeptideData';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'analysis' | 'candidates'>('analysis');
  const { loading, error } = usePeptideData();

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar currentView={currentView} onViewChange={setCurrentView} />
      
      <main>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">
            {error}
          </div>
        ) : (
          currentView === 'analysis' ? (
            <DataAnalysisView />
          ) : (
            <CandidatesView />
          )
        )}
      </main>
    </div>
  );
}
import React, { useState, useEffect, Suspense } from 'react';
import { LoginPage } from './components/auth/LoginPage';
import { NavBar } from './components/navigation/NavBar';
import { usePeptideData } from './hooks/usePeptideData';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { DataErrorBoundary } from './components/common/SpecializedErrorBoundaries';
import {
  LoadingProgress,
  SimpleLoader,
} from './components/common/LoadingProgress';
import {
  LazyDataAnalysisView,
  LazyCandidatesView,
} from './utils/lazyComponents';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'analysis' | 'candidates'>(
    'analysis'
  );
  const { loading, error, progress, refetch } = usePeptideData();

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
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-100">
        <NavBar currentView={currentView} onViewChange={setCurrentView} />

        <main>
          {loading ? (
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="bg-white rounded-lg shadow-md">
                <LoadingProgress
                  progress={progress || undefined}
                  message="Loading peptide database..."
                />
              </div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">{error}</div>
          ) : (
            <DataErrorBoundary onRetry={refetch}>
              <Suspense fallback={<SimpleLoader message="Loading view..." />}>
                {currentView === 'analysis' ? (
                  <LazyDataAnalysisView />
                ) : (
                  <LazyCandidatesView />
                )}
              </Suspense>
            </DataErrorBoundary>
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
}

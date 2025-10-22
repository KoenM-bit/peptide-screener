import { useState, useEffect, Suspense } from 'react';
import { LoginPage } from './components/auth/LoginPage';
import { NavBar } from './components/navigation/NavBar';
import { ValidationProvider, useValidation } from './contexts/ValidationContext';
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
import { ValidationStatus } from './components/ValidationStatus';

// Main App Content (wrapped by ValidationProvider)
function AppContent() {
  const [currentView, setCurrentView] = useState<'analysis' | 'candidates'>('analysis');
  const { loading, error, progress, refetch } = useValidation();

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar currentView={currentView} onViewChange={setCurrentView} />

      <main>
        {loading ? (
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
            <div className="bg-white rounded-lg shadow-md">
              <LoadingProgress
                progress={progress ? {
                  loaded: progress.current,
                  total: progress.total,
                  current: `Loading peptide ${progress.current} of ${progress.total}`
                } : undefined}
                message="Loading and validating peptide database..."
              />
            </div>
            <ValidationStatus compact />
          </div>
        ) : error ? (
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-center text-red-700 font-medium mb-3">
                Failed to load peptide data
              </div>
              <div className="text-center text-red-600 text-sm mb-4">
                {error}
              </div>
              <div className="text-center">
                <button
                  onClick={refetch}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Retry Loading
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Validation Status Bar */}
            <div className="max-w-7xl mx-auto px-4 py-2">
              <ValidationStatus compact />
            </div>
            
            <DataErrorBoundary onRetry={refetch}>
              <Suspense fallback={<SimpleLoader message="Loading view..." />}>
                {currentView === 'analysis' ? (
                  <LazyDataAnalysisView />
                ) : (
                  <LazyCandidatesView />
                )}
              </Suspense>
            </DataErrorBoundary>
          </>
        )}
      </main>
    </div>
  );
}

// Root App Component with Authentication and Validation Provider
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      <ValidationProvider enableValidation={true} strictMode={false}>
        <AppContent />
      </ValidationProvider>
    </ErrorBoundary>
  );
}
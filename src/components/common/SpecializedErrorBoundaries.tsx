import { ReactNode } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { Database, AlertCircle, RefreshCw } from 'lucide-react';

interface DataErrorBoundaryProps {
  children: ReactNode;
  onRetry?: () => void;
}

const DataErrorFallback = ({ onRetry }: { onRetry?: () => void }) => (
  <div className="min-h-64 flex items-center justify-center p-8">
    <div className="max-w-sm w-full text-center">
      <Database className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Data Loading Error
      </h3>
      <p className="text-gray-600 mb-4">
        Unable to load peptide data. This might be due to missing files or network issues.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retry Loading
        </button>
      )}
    </div>
  </div>
);

const FilterErrorFallback = () => (
  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
    <div className="flex items-center gap-2 text-yellow-800">
      <AlertCircle className="w-5 h-5" />
      <div>
        <h4 className="font-medium">Filter Error</h4>
        <p className="text-sm">
          The filter panel encountered an error. You can still view the data without filtering.
        </p>
      </div>
    </div>
  </div>
);

export function DataErrorBoundary({ children, onRetry }: DataErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={<DataErrorFallback onRetry={onRetry} />}
      onError={(error, errorInfo) => {
        console.error('Data loading error:', error, errorInfo);
        // Here you could add analytics or error reporting
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export function FilterErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary fallback={<FilterErrorFallback />}>
      {children}
    </ErrorBoundary>
  );
}

export function ChartErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center text-gray-500">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p>Chart failed to render</p>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
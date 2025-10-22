import { Database, Loader2 } from 'lucide-react';

interface LoadingProgressProps {
  progress?: {
    loaded: number;
    total: number;
    current: string;
  };
  message?: string;
}

export function LoadingProgress({
  progress,
  message = 'Loading...',
}: LoadingProgressProps) {
  const percentage = progress
    ? Math.round((progress.loaded / progress.total) * 100)
    : 0;

  return (
    <div className="min-h-64 flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <Database className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Loading Peptide Data
          </h3>
          <p className="text-gray-600 text-sm">{message}</p>
        </div>

        {progress && (
          <div className="space-y-3">
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Progress text */}
            <div className="text-sm text-gray-600">
              <div className="flex justify-between items-center">
                <span>
                  {progress.loaded} of {progress.total} files
                </span>
                <span>{percentage}%</span>
              </div>
              {progress.current !== 'Complete' && (
                <div className="mt-1 text-xs text-gray-500 truncate">
                  Loading: {progress.current}
                </div>
              )}
            </div>
          </div>
        )}

        {!progress && (
          <div className="flex items-center justify-center">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          </div>
        )}
      </div>
    </div>
  );
}

export function SimpleLoader({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center h-32">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-2" />
        <p className="text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  );
}

export function DataLoadingState() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <LoadingProgress message="Initializing peptide database..." />
      </div>
    </div>
  );
}

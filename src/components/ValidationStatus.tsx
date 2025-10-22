import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { useValidation } from '../contexts/ValidationContext';

interface ValidationStatusProps {
  compact?: boolean;
  showDetails?: boolean;
}

export function ValidationStatus({ compact = false, showDetails = false }: ValidationStatusProps) {
  const { 
    validationReport, 
    loadedCount, 
    errorCount, 
    loading,
    isValidationEnabled 
  } = useValidation();

  if (!isValidationEnabled) {
    return (
      <div className="flex items-center gap-2 text-yellow-600 text-sm">
        <AlertTriangle size={16} />
        <span>Validation disabled</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-blue-600 text-sm">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span>Validating data...</span>
      </div>
    );
  }

  if (!validationReport) {
    return null;
  }

  const hasErrors = errorCount > 0 || validationReport.details.length > 0;
  const totalItems = loadedCount + errorCount;

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {hasErrors ? (
          <div className="flex items-center gap-1 text-yellow-600 text-sm">
            <AlertTriangle size={16} />
            <span>{loadedCount}/{totalItems} valid</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-green-600 text-sm">
            <CheckCircle size={16} />
            <span>All valid</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-4 space-y-3">
      <div className="flex items-center gap-2">
        {hasErrors ? (
          <AlertTriangle className="text-yellow-500" size={20} />
        ) : (
          <CheckCircle className="text-green-500" size={20} />
        )}
        <h3 className="font-semibold">Data Validation Status</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Valid entries:</span>
            <span className="font-medium text-green-600">{loadedCount}</span>
          </div>
          {errorCount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Failed to load:</span>
              <span className="font-medium text-red-600">{errorCount}</span>
            </div>
          )}
          {validationReport.details.length > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Validation errors:</span>
              <span className="font-medium text-yellow-600">{validationReport.details.length}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Total processed:</span>
            <span className="font-medium">{totalItems}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Success rate:</span>
            <span className="font-medium">
              {totalItems > 0 ? Math.round((loadedCount / totalItems) * 100) : 0}%
            </span>
          </div>
        </div>
      </div>

      {showDetails && hasErrors && (
        <div className="mt-4 space-y-3">
          {validationReport.suggestions.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <div className="flex items-center gap-2 mb-2">
                <Info className="text-blue-500" size={16} />
                <span className="font-medium text-blue-700">Suggestions</span>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                {validationReport.suggestions.map((suggestion, index) => (
                  <li key={index} className="list-disc list-inside">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {validationReport.details.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="text-yellow-600" size={16} />
                <span className="font-medium text-yellow-700">
                  Validation Errors ({validationReport.details.length})
                </span>
              </div>
              <div className="max-h-32 overflow-y-auto text-sm text-yellow-700">
                {validationReport.details.slice(0, 5).map((detail, index) => (
                  <div key={index} className="mb-1">
                    <span className="font-medium">{detail.id}:</span>
                    <span className="ml-1">{detail.errors.join('; ')}</span>
                  </div>
                ))}
                {validationReport.details.length > 5 && (
                  <div className="text-yellow-600 font-medium">
                    ... and {validationReport.details.length - 5} more
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-gray-500 pt-2 border-t">
        {validationReport.summary}
      </div>
    </div>
  );
}
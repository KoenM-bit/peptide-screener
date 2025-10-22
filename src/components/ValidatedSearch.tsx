import { useState, useCallback } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { useValidation } from '../contexts/ValidationContext';

interface ValidatedSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function ValidatedSearch({ 
  onSearch, 
  placeholder = "Search peptides...", 
  className = "" 
}: ValidatedSearchProps) {
  const [query, setQuery] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { validateSearch } = useValidation();

  const handleInputChange = useCallback((value: string) => {
    setQuery(value);
    
    // Validate input in real-time
    const validation = validateSearch(value);
    setValidationErrors(validation.errors);
    
    // Only trigger search if validation passes and query has content
    if (validation.isValid && value.trim()) {
      onSearch(value.trim());
    } else if (!value.trim()) {
      onSearch(''); // Clear search when input is empty
      setValidationErrors([]);
    }
  }, [validateSearch, onSearch]);

  const hasErrors = validationErrors.length > 0;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search 
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
            hasErrors ? 'text-red-400' : 'text-gray-400'
          }`} 
          size={20} 
        />
        <input
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
            hasErrors
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          }`}
          aria-invalid={hasErrors}
          aria-describedby={hasErrors ? 'search-errors' : undefined}
        />
        {hasErrors && (
          <AlertCircle 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-400" 
            size={20} 
          />
        )}
      </div>
      
      {hasErrors && (
        <div id="search-errors" className="mt-1 text-sm text-red-600 space-y-1">
          {validationErrors.map((error, index) => (
            <div key={index} className="flex items-center gap-1">
              <AlertCircle size={12} />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}
      
      {query.length > 0 && !hasErrors && (
        <div className="mt-1 text-xs text-green-600 flex items-center gap-1">
          <span>✓ Valid search query</span>
        </div>
      )}
    </div>
  );
}
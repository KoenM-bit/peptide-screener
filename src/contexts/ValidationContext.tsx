import React, { createContext, useContext, ReactNode } from 'react';
import { useValidatedPeptideData, UseValidatedPeptideDataReturn } from '../hooks/useValidatedPeptideData';

interface ValidationContextValue extends UseValidatedPeptideDataReturn {
  isValidationEnabled: boolean;
  isStrictMode: boolean;
}

const ValidationContext = createContext<ValidationContextValue | undefined>(undefined);

interface ValidationProviderProps {
  children: ReactNode;
  enableValidation?: boolean;
  strictMode?: boolean;
}

export function ValidationProvider({ 
  children, 
  enableValidation = true, 
  strictMode = false 
}: ValidationProviderProps) {
  const validatedData = useValidatedPeptideData({
    enableValidation,
    strictMode,
  });

  const contextValue: ValidationContextValue = {
    ...validatedData,
    isValidationEnabled: enableValidation,
    isStrictMode: strictMode,
  };

  return (
    <ValidationContext.Provider value={contextValue}>
      {children}
    </ValidationContext.Provider>
  );
}

export function useValidation() {
  const context = useContext(ValidationContext);
  if (context === undefined) {
    throw new Error('useValidation must be used within a ValidationProvider');
  }
  return context;
}

// HOC for components that need validation
export function withValidation<P extends object>(
  Component: React.ComponentType<P>
) {
  return function ValidationWrappedComponent(props: P) {
    const validation = useValidation();
    return <Component {...props} validation={validation} />;
  };
}
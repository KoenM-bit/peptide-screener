import { lazy } from 'react';

/**
 * Lazy-loaded components for code splitting
 */
export const LazyDataAnalysisView = lazy(() => 
  import('../views/DataAnalysisView').then(module => ({ 
    default: module.DataAnalysisView 
  }))
);

export const LazyCandidatesView = lazy(() => 
  import('../views/CandidatesView').then(module => ({ 
    default: module.CandidatesView 
  }))
);

export const LazyDetailModal = lazy(() => 
  import('../components/modals/DetailModal').then(module => ({ 
    default: module.DetailModal 
  }))
);
// Configuration for peptide data files
export interface PeptideConfig {
  dataDirectory: string;
  fileExtension: string;
  // Add more configuration options as needed
}

export const peptideConfig: PeptideConfig = {
  dataDirectory: '/peptides',
  fileExtension: '.json'
};

// Environment-specific configurations
export const getConfig = (): PeptideConfig => {
  // Check if running in Electron environment
  const isElectron = typeof window !== 'undefined' && 
    'require' in window && 
    'process' in window;
  
  if (isElectron) {
    // Electron can use file system APIs
    return peptideConfig;
  }
  
  // Web version with pre-defined file list
  return peptideConfig;
};
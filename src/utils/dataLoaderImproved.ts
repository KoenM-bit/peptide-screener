import { PeptideData } from '../types/PeptideData';
import { loadPeptideFile } from './fileLoader';
import { PEPTIDE_FILES } from '../config/peptideFiles';

export async function debugPeptideFiles(): Promise<void> {
  try {
    const electron = window.require ? window.require('electron') : null;

    if (!electron || !electron.ipcRenderer) {
      console.log('Electron IPC not available for debugging');
      return;
    }

    // Get list of peptide files
    const fileList = await electron.ipcRenderer.invoke('list-peptide-files');
    console.log('Peptide files debug info:', fileList);

    if (fileList.success && fileList.files.length > 0) {
      // Try to read one file as a test
      const testFile = fileList.files[0];
      const fileData = await electron.ipcRenderer.invoke('read-peptide-file', testFile);
      console.log('Test file read result:', fileData);
    }
  } catch (error) {
    console.error('Error in debug function:', error);
  }
}

/**
 * Get list of peptide files to load
 * In Electron, this could potentially discover files dynamically
 * In web environment, uses the predefined list
 */
async function getPeptideFiles(): Promise<string[]> {
  // For now, use the predefined list
  // Future enhancement: In Electron, discover files dynamically using getConfig()
  return [...PEPTIDE_FILES];
}

/**
 * Load peptide data with improved error handling and progress reporting
 */
export async function loadPeptideData(
  onProgress?: (progress: { loaded: number; total: number; current: string }) => void
): Promise<Record<string, PeptideData>> {
  let allData: Record<string, PeptideData> = {};

  try {
    const peptideFiles = await getPeptideFiles();
    console.log(`Found ${peptideFiles.length} peptide files to load`);

    // Process peptides in batches to avoid overwhelming the system
    const batchSize = 25; // Reduced batch size for better performance
    const batches = [];

    for (let i = 0; i < peptideFiles.length; i += batchSize) {
      batches.push(peptideFiles.slice(i, i + batchSize));
    }

    console.log(`Processing ${batches.length} batches of peptide files`);

    let loadedCount = 0;
    const totalFiles = peptideFiles.length;

    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`Loading batch ${i+1}/${batches.length} (${batch.length} files)`);

      // Load current batch with individual file progress
      for (const filename of batch) {
        try {
          if (onProgress) {
            onProgress({ 
              loaded: loadedCount, 
              total: totalFiles, 
              current: filename.replace('.json', '') 
            });
          }

          const data = await loadPeptideFile(filename);
          if (data && Object.keys(data).length > 0) {
            allData = { ...allData, ...data };
          }
          loadedCount++;
        } catch (error) {
          console.warn(`Failed to load ${filename}:`, error);
          loadedCount++; // Still count as processed to maintain progress accuracy
        }
      }

      console.log(`Completed batch ${i+1}, ${Object.keys(allData).length} peptides loaded so far`);
    }

    const finalCount = Object.keys(allData).length;
    console.log(`Successfully loaded ${finalCount} peptides from ${loadedCount} files`);

    if (finalCount === 0) {
      console.error('No peptide data could be loaded. Check file paths and formats.');
      throw new Error('No peptide data could be loaded');
    }

    // Final progress update
    if (onProgress) {
      onProgress({ 
        loaded: totalFiles, 
        total: totalFiles, 
        current: 'Complete' 
      });
    }

    return allData;
  } catch (error) {
    console.error('Error loading peptide data:', error);
    throw new Error(`Failed to load peptide data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
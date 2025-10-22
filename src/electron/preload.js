import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Store operations
  storeGet: (key) => ipcRenderer.invoke('store-get', key),
  storeSet: (key, value) => ipcRenderer.invoke('store-set', key, value),
  
  // Peptide file operations
  listPeptideFiles: () => ipcRenderer.invoke('list-peptide-files'),
  readPeptideFile: (filename) => ipcRenderer.invoke('read-peptide-file', filename),
  
  // Platform info
  getPlatform: () => process.platform,
  isPackaged: () => process.env.NODE_ENV !== 'development'
});
import { app, BrowserWindow, ipcMain } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';
import fs from 'fs';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const store = new Store();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // In development, load from Vite dev server
  const isDevelopment = process.env.NODE_ENV === 'development' || !app.isPackaged;
  
  if (isDevelopment) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
    console.log('🚀 Development mode: Loading from Vite dev server at http://localhost:5173');
  } else {
    // In production, load from built files
    mainWindow.loadFile(join(__dirname, '../../dist/index.html'));

    // Open DevTools in production for debugging file access issues
    // mainWindow.webContents.openDevTools();

    // Log useful paths for debugging
    const resourcesPath = path.join(path.dirname(app.getAppPath()), 'resources');
    console.log('Application paths:');
    console.log('- App path:', app.getAppPath());
    console.log('- Resources path:', resourcesPath);
    console.log('- Peptides path:', path.join(resourcesPath, 'peptides'));

    // Check if the peptides directory exists
    if (fs.existsSync(path.join(resourcesPath, 'peptides'))) {
      console.log('✅ Peptides directory exists');

      // List files in the peptides directory
      try {
        const files = fs.readdirSync(path.join(resourcesPath, 'peptides'));
        console.log(`Found ${files.length} peptide files`);
        console.log('First 5 files:', files.slice(0, 5));
      } catch (err) {
        console.error('Error reading peptides directory:', err);
      }
    } else {
      console.error('❌ Peptides directory does not exist');
    }
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle data persistence
ipcMain.handle('store-get', (event, key) => {
  return store.get(key);
});

ipcMain.handle('store-set', (event, key, value) => {
  store.set(key, value);
});

// Add a debugging IPC to list peptide files
ipcMain.handle('list-peptide-files', () => {
  try {
    const resourcesPath = path.join(path.dirname(app.getAppPath()), 'resources');
    const peptidesDir = path.join(resourcesPath, 'peptides');

    if (!fs.existsSync(peptidesDir)) {
      return { success: false, error: 'Directory does not exist', path: peptidesDir };
    }

    const files = fs.readdirSync(peptidesDir);
    return {
      success: true,
      path: peptidesDir,
      count: files.length,
      files: files.slice(0, 20) // Return first 20 files for debugging
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Add a debugging IPC to read a specific peptide file
ipcMain.handle('read-peptide-file', (event, filename) => {
  try {
    const resourcesPath = path.join(path.dirname(app.getAppPath()), 'resources');
    const filePath = path.join(resourcesPath, 'peptides', filename);

    if (!fs.existsSync(filePath)) {
      return { success: false, error: 'File does not exist', path: filePath };
    }

    const fileData = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileData);

    return {
      success: true,
      path: filePath,
      data: jsonData
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
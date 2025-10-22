import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface PeptideDB extends DBSchema {
  likes: {
    key: string;
    value: {
      fragment: string;
      timestamp: number;
    };
  };
}

const DB_NAME = 'peptideAnalyzer';
const DB_VERSION = 1;
const STORAGE_KEY = 'peptide_likes';

let dbPromise: Promise<IDBPDatabase<PeptideDB>> | null = null;

// Initialize IndexedDB
async function initDB() {
  if (!dbPromise) {
    dbPromise = openDB<PeptideDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('likes')) {
          db.createObjectStore('likes', { keyPath: 'fragment' });
        }
      },
    });
  }
  return dbPromise;
}

// Load likes from localStorage
function loadFromLocalStorage(): Set<string> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return new Set();
  }
}

// Save likes to localStorage
function saveToLocalStorage(likes: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(likes)));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

// Sync data between IndexedDB and localStorage
async function syncStorage() {
  try {
    const db = await initDB();
    const idbLikes = await db.getAll('likes');
    const idbSet = new Set(idbLikes.map(like => like.fragment));
    const localSet = loadFromLocalStorage();

    // Merge both sets
    const mergedSet = new Set([...idbSet, ...localSet]);

    // Update both storages
    const tx = db.transaction('likes', 'readwrite');
    const store = tx.objectStore('likes');

    // Update IndexedDB
    for (const fragment of mergedSet) {
      if (!idbSet.has(fragment)) {
        await store.put({ fragment, timestamp: Date.now() });
      }
    }

    // Update localStorage
    saveToLocalStorage(mergedSet);

    return mergedSet;
  } catch (error) {
    console.error('Error syncing storage:', error);
    return loadFromLocalStorage(); // Fallback to localStorage
  }
}

export async function toggleLike(fragment: string): Promise<boolean> {
  try {
    // Try IndexedDB first
    const db = await initDB();
    const tx = db.transaction('likes', 'readwrite');
    const store = tx.objectStore('likes');

    const existing = await store.get(fragment);
    const localLikes = loadFromLocalStorage();

    if (existing || localLikes.has(fragment)) {
      await store.delete(fragment);
      localLikes.delete(fragment);
      saveToLocalStorage(localLikes);
      return false;
    } else {
      await store.put({ fragment, timestamp: Date.now() });
      localLikes.add(fragment);
      saveToLocalStorage(localLikes);
      return true;
    }
  } catch (error) {
    console.error('Error in toggleLike:', error);
    // Fallback to localStorage only
    const localLikes = loadFromLocalStorage();
    const isLiked = localLikes.has(fragment);
    if (isLiked) {
      localLikes.delete(fragment);
    } else {
      localLikes.add(fragment);
    }
    saveToLocalStorage(localLikes);
    return !isLiked;
  }
}

export async function getLikedPeptides(): Promise<Set<string>> {
  try {
    return await syncStorage();
  } catch (error) {
    console.error('Error in getLikedPeptides:', error);
    return loadFromLocalStorage(); // Fallback to localStorage
  }
}

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

let dbPromise: Promise<IDBPDatabase<PeptideDB>> | null = null;

export async function initDB() {
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

export async function toggleLike(fragment: string) {
  const db = await initDB();
  const tx = db.transaction('likes', 'readwrite');
  const store = tx.objectStore('likes');

  try {
    const existing = await store.get(fragment);
    if (existing) {
      await store.delete(fragment);
      return false;
    } else {
      await store.put({ fragment, timestamp: Date.now() });
      return true;
    }
  } catch (error) {
    console.error('Error in toggleLike:', error);
    throw error;
  }
}

export async function getLikedPeptides(): Promise<Set<string>> {
  try {
    const db = await initDB();
    const likes = await db.getAll('likes');
    return new Set(likes.map(like => like.fragment));
  } catch (error) {
    console.error('Error in getLikedPeptides:', error);
    return new Set();
  }
}
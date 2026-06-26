export function readLocal<T>(key: string, fallback: T): T {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return fallback;
  }
}

export function writeLocal<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing to localStorage key "${key}":`, error);
  }
}

export function removeLocal(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
  }
}

export function exportLocalState(keys: Record<string, string>): object {
  const state: Record<string, any> = {};
  for (const [, storageKey] of Object.entries(keys)) {
    try {
      const item = window.localStorage.getItem(storageKey);
      if (item) {
        state[storageKey] = JSON.parse(item);
      }
    } catch (error) {
      console.warn(`Error exporting localStorage key "${storageKey}":`, error);
    }
  }
  return state;
}

export function importLocalState(payload: any, keys: Record<string, string>, merge = false): boolean {
  if (typeof payload !== 'object' || payload === null) {
    return false;
  }

  try {
    if (!merge) {
      // Clear all known keys before importing if not merging
      for (const storageKey of Object.values(keys)) {
        removeLocal(storageKey);
      }
    }

    for (const [key, value] of Object.entries(payload)) {
      if (Object.values(keys).includes(key)) {
        writeLocal(key, value);
      }
    }
    return true;
  } catch (error) {
    console.warn('Error importing local state:', error);
    return false;
  }
}

export function resetLocalState(keys: Record<string, string>): void {
  for (const storageKey of Object.values(keys)) {
    removeLocal(storageKey);
  }
}
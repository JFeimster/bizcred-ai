import { STORAGE_KEYS, StorageKey } from './storageKeys';
import { STORAGE_DEFAULTS } from './storageDefaults';

export function readLocal<T>(key: StorageKey, fallback?: T): T {
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return fallback !== undefined ? fallback : STORAGE_DEFAULTS[key] as T;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return fallback !== undefined ? fallback : STORAGE_DEFAULTS[key] as T;
  }
}

export function writeLocal<T>(key: StorageKey, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error writing to localStorage key "${key}":`, error);
  }
}

export function removeLocal(key: StorageKey): void {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
  }
}

export function exportLocalState(): string {
  try {
    const state: Record<string, any> = {};
    for (const key of Object.values(STORAGE_KEYS)) {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        state[key] = JSON.parse(item);
      }
    }
    return JSON.stringify(state, null, 2);
  } catch (error) {
    console.error('Failed to export local state', error);
    return '{}';
  }
}

export function importLocalState(payload: string): boolean {
  try {
    const state = JSON.parse(payload);
    for (const key of Object.values(STORAGE_KEYS)) {
      if (state[key] !== undefined) {
        writeLocal(key, state[key]);
      }
    }
    return true;
  } catch (error) {
    console.error('Failed to import local state', error);
    return false;
  }
}

export function resetLocalState(): void {
  try {
    for (const key of Object.values(STORAGE_KEYS)) {
      removeLocal(key);
    }
  } catch (error) {
    console.error('Failed to reset local state', error);
  }
}

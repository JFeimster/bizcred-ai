import { STORAGE_KEYS, type StorageKey } from './storageKeys';

export function readLocal<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeLocal<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Keep UI safe if storage is unavailable.
  }
}

export function removeLocal(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Keep UI safe if storage is unavailable.
  }
}

export function exportLocalState(): string {
  const state: Record<string, unknown> = {};

  try {
    for (const key of Object.values(STORAGE_KEYS)) {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        state[key] = JSON.parse(raw);
      }
    }
  } catch {
    return '{}';
  }

  return JSON.stringify(state, null, 2);
}

export function importLocalState(payload: string): boolean {
  try {
    const parsed = JSON.parse(payload) as Partial<Record<StorageKey, unknown>>;
    for (const key of Object.values(STORAGE_KEYS)) {
      if (Object.prototype.hasOwnProperty.call(parsed, key)) {
        writeLocal(key, parsed[key]);
      }
    }
    return true;
  } catch {
    return false;
  }
}

export function resetLocalState(): void {
  for (const key of Object.values(STORAGE_KEYS)) {
    removeLocal(key);
  }
}

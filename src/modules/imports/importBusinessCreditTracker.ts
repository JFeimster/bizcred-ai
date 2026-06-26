import { importLocalState } from '../../storage/localStorageClient';

export async function importBusinessCreditTracker(file: File): Promise<boolean> {
  if (!file.name.toLowerCase().endsWith('.json')) {
    throw new Error('Dashboard backup imports must be JSON files.');
  }

  const text = await file.text();
  JSON.parse(text);
  return importLocalState(text);
}

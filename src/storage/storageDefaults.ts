import { STORAGE_KEYS } from './storageKeys';
import type { BusinessProfile } from '../types/businessProfile';
import type { Passport } from '../types/passport';
import type { Tradeline } from '../types/tradeline';
import type { Roadmap } from '../types/roadmap';
import type { Alert } from '../types/alert';
import type { ImportJob } from '../types/importJob';

export const STORAGE_DEFAULTS: Record<string, any> = {
  [STORAGE_KEYS.PROFILE]: null,
  [STORAGE_KEYS.PASSPORT]: null,
  [STORAGE_KEYS.TRADELINES]: [] as Tradeline[],
  [STORAGE_KEYS.ROADMAP]: { id: 'default', items: [] } as Roadmap,
  [STORAGE_KEYS.ALERTS]: [] as Alert[],
  [STORAGE_KEYS.IMPORT_JOBS]: [] as ImportJob[],
  [STORAGE_KEYS.SETTINGS]: {}
};

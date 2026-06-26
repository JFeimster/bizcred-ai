export const STORAGE_KEYS = {
  PROFILE: 'bizcredit.v1.profile',
  PASSPORT: 'bizcredit.v1.passport',
  TRADELINES: 'bizcredit.v1.tradelines',
  ROADMAP: 'bizcredit.v1.roadmap',
  ALERTS: 'bizcredit.v1.alerts',
  IMPORT_JOBS: 'bizcredit.v1.importJobs',
  SETTINGS: 'bizcredit.v1.settings'
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

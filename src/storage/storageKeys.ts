export const STORAGE_KEYS = {
  profile: 'bizcredit.v1.profile',
  passport: 'bizcredit.v1.passport',
  tradelines: 'bizcredit.v1.tradelines',
  roadmap: 'bizcredit.v1.roadmap',
  alerts: 'bizcredit.v1.alerts',
  importJobs: 'bizcredit.v1.importJobs',
  settings: 'bizcredit.v1.settings',
  notionTemplateSources: 'bizcredit.v1.notionTemplateSources'
} as const;

export type StorageKey = typeof STORAGE_KEYS[keyof typeof STORAGE_KEYS];

export const LEGACY_STORAGE_KEYS = {
  PROFILE: STORAGE_KEYS.profile,
  PASSPORT: STORAGE_KEYS.passport,
  TRADELINES: STORAGE_KEYS.tradelines,
  ROADMAP: STORAGE_KEYS.roadmap,
  ALERTS: STORAGE_KEYS.alerts,
  IMPORT_JOBS: STORAGE_KEYS.importJobs,
  SETTINGS: STORAGE_KEYS.settings,
  NOTION_TEMPLATE_SOURCES: STORAGE_KEYS.notionTemplateSources
} as const;

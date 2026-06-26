import { STORAGE_KEYS } from './storageKeys';
import type { BusinessProfile } from '../types/businessProfile';
import type { Tradeline } from '../types/tradeline';
import type { Roadmap } from '../types/roadmap';
import type { ReadinessAlert } from '../types/alert';
import type { ImportJob } from '../types/importJob';

export const defaultProfile: BusinessProfile = {
  businessName: '',
  entityType: '',
  formationDate: '',
  businessLicense: false,
  monthlyRevenueRange: '',
  primaryGoal: '',
  hasEin: false,
  hasBusinessBankAccount: false,
  hasBusinessAddress: false,
  hasBusinessPhone: false,
  hasWebsite: false,
  hasDomainEmail: false,
  hasDuns: false
};

export const defaultTradelines: Tradeline[] = [];

export const STORAGE_DEFAULTS = {
  [STORAGE_KEYS.profile]: defaultProfile,
  [STORAGE_KEYS.passport]: null,
  [STORAGE_KEYS.tradelines]: defaultTradelines,
  [STORAGE_KEYS.roadmap]: { id: 'default', items: [] } as Roadmap,
  [STORAGE_KEYS.alerts]: [] as ReadinessAlert[],
  [STORAGE_KEYS.importJobs]: [] as ImportJob[],
  [STORAGE_KEYS.settings]: {}
} as const;

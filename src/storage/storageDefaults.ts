import type { BusinessProfile } from '../types/businessProfile';
import type { Tradeline } from '../types/tradeline';

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

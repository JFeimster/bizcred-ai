import type { BusinessProfile } from '../../types/businessProfile';
import type { Tradeline } from '../../types/tradeline';

export function getUnlockedVendorTier(profile: BusinessProfile, tradelines: Tradeline[]): number {
  const foundationReady = profile.hasEin && profile.hasBusinessBankAccount;
  const confirmedReporting = tradelines.filter((item) => item.status === 'reporting_confirmed').length;

  if (foundationReady && confirmedReporting >= 3) return 3;
  if (foundationReady && confirmedReporting >= 1) return 2;
  if (foundationReady) return 1;
  return 0;
}

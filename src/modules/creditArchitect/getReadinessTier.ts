import type { BusinessProfile } from '../../types/businessProfile';
import type { Tradeline } from '../../types/tradeline';

export function getReadinessTier(profile: BusinessProfile, tradelines: Tradeline[]): string {
  const foundationComplete =
    profile.hasEin &&
    profile.hasBusinessBankAccount &&
    profile.hasBusinessAddress;

  const identityComplete =
    profile.hasBusinessPhone &&
    profile.hasWebsite &&
    profile.hasDomainEmail &&
    profile.hasDuns;

  const hasReportingTradelines = tradelines.some(
    (t) => t.status === 'reporting_confirmed'
  );

  const hasStarterTradelines = tradelines.length > 0;

  if (foundationComplete && identityComplete && hasReportingTradelines) {
    return 'Fundable';
  }

  if (foundationComplete && identityComplete && hasStarterTradelines) {
    return 'Building';
  }

  if (foundationComplete) {
    return 'Identity Setup';
  }

  return 'Foundation';
}

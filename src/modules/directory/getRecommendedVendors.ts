import type { BusinessProfile } from '../../types/businessProfile';
import type { Vendor } from '../../types/vendor';
import { compareDirectoryItems } from './compareDirectoryItems';

export function getRecommendedVendors(profile: BusinessProfile, vendors: Vendor[]): Vendor[] {
  return [...vendors]
    .filter((vendor) => {
      if (vendor.requiresDuns && !profile.hasDuns) return false;
      if (vendor.requiresBankAccount && !profile.hasBusinessBankAccount) return false;
      return true;
    })
    .sort(compareDirectoryItems)
    .slice(0, 5);
}

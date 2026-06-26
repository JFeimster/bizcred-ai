import type { BusinessProfile } from '../../types/businessProfile';
import type { Tradeline } from '../../types/tradeline';

export interface RiskFlag {
  id: string;
  label: string;
}

export function getRiskFlags(profile: BusinessProfile, tradelines: Tradeline[]): RiskFlag[] {
  const flags: RiskFlag[] = [];

  if (!profile.hasEin) flags.push({ id: 'no-ein', label: 'no EIN' });
  if (!profile.hasBusinessBankAccount) flags.push({ id: 'no-bank', label: 'no business bank account' });
  if (!profile.hasDuns) flags.push({ id: 'no-duns', label: 'no DUNS' });
  if (!profile.hasBusinessPhone) flags.push({ id: 'no-phone', label: 'no business phone' });
  if (!profile.hasDomainEmail) flags.push({ id: 'no-email', label: 'no professional email/domain email' });
  if (!profile.hasWebsite) flags.push({ id: 'no-website', label: 'no website' });

  if (tradelines.length === 0) {
    flags.push({ id: 'no-history', label: 'no vendor/tradeline history' });
  }

  const hasPaid = tradelines.some(t => t.status === 'paid' || t.status === 'reporting_confirmed');
  if (tradelines.length > 0 && !hasPaid) {
    flags.push({ id: 'no-payment-history', label: 'missing payment history' });
  }

  const unverified = tradelines.some(t => t.status === 'researching' || t.status === 'applied');
  if (unverified) {
    flags.push({ id: 'unverified-reporting', label: 'unverified reporting assumptions' });
  }

  return flags;
}

import type { BusinessProfile } from '../../types/businessProfile';
import type { Tradeline } from '../../types/tradeline';

export function getNextBestMove(profile: BusinessProfile, tradelines: Tradeline[]): string {
  if (!profile.hasEin) return 'Add or confirm your EIN before applying for starter vendor accounts.';
  if (!profile.hasBusinessBankAccount) return 'Open or confirm a dedicated business bank account.';
  if (!profile.hasBusinessPhone || !profile.hasDomainEmail) return 'Tighten business identity signals with phone and domain email.';
  if (!profile.hasDuns) return 'Research DUNS setup and verify bureau profile details directly.';
  if (tradelines.length === 0) return 'Research starter vendors and save one to the planner.';
  return 'Review planner statuses and verify vendor terms/reporting directly before the next action.';
}

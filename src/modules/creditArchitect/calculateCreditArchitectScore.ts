import type { BusinessProfile } from '../../types/businessProfile';
import type { Tradeline } from '../../types/tradeline';

export interface CreditScoreResult {
  score: number;
  completedSignals: number;
  totalSignals: number;
}

export function calculateCreditArchitectScore(profile: BusinessProfile, tradelines: Tradeline[]): CreditScoreResult {
  const checks = [
    Boolean(profile.businessName),
    Boolean(profile.entityType),
    Boolean(profile.formationDate),
    profile.hasEin,
    profile.hasBusinessBankAccount,
    profile.hasBusinessAddress,
    profile.hasBusinessPhone,
    profile.hasWebsite,
    profile.hasDomainEmail,
    profile.hasDuns,
    tradelines.length > 0
  ];

  const completedSignals = checks.filter(Boolean).length;
  const totalSignals = checks.length;
  const score = Math.max(0, Math.min(100, Math.round((completedSignals / totalSignals) * 100)));

  return { score, completedSignals, totalSignals };
}

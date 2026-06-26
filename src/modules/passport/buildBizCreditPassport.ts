import type { BusinessProfile } from '../../types/businessProfile';
import type { Tradeline } from '../../types/tradeline';
import { calculateCreditArchitectScore } from '../creditArchitect/calculateCreditArchitectScore';
import { getReadinessTier } from '../creditArchitect/getReadinessTier';
import { buildRoadmap } from '../roadmap/buildRoadmap';
import type { RoadmapStep } from '../../types/roadmap';

export interface BizCreditPassport {
  foundation: {
    businessName: string;
    entityType: string;
    formationDate: string;
    hasEin: boolean;
    hasBank: boolean;
    hasAddress: boolean;
    hasPhone: boolean;
    hasWebsite: boolean;
    hasDomainEmail: boolean;
  };
  bureauSetup: {
    hasDuns: boolean;
  };
  vendorCredit: Tradeline[];
  scoreHistorySummary: {
    currentScore: number;
    signalsCompleted: number;
    totalSignals: number;
  };
  fundingReadiness: {
    tier: string;
  };
  milestones: RoadmapStep[];
}

export function buildBizCreditPassport(profile: BusinessProfile, tradelines: Tradeline[]): BizCreditPassport {
  const scoreResult = calculateCreditArchitectScore(profile, tradelines);
  const tier = getReadinessTier(profile, tradelines);
  const milestones = buildRoadmap(profile, tradelines);

  return {
    foundation: {
      businessName: profile.businessName || 'Not Set',
      entityType: profile.entityType || 'Not Set',
      formationDate: profile.formationDate || 'Not Set',
      hasEin: profile.hasEin,
      hasBank: profile.hasBusinessBankAccount,
      hasAddress: profile.hasBusinessAddress,
      hasPhone: profile.hasBusinessPhone,
      hasWebsite: profile.hasWebsite,
      hasDomainEmail: profile.hasDomainEmail
    },
    bureauSetup: {
      hasDuns: profile.hasDuns
    },
    vendorCredit: tradelines,
    scoreHistorySummary: {
      currentScore: scoreResult.score,
      signalsCompleted: scoreResult.completedSignals,
      totalSignals: scoreResult.totalSignals
    },
    fundingReadiness: {
      tier: tier
    },
    milestones: milestones
  };
}

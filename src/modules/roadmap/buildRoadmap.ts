import type { BusinessProfile } from '../../types/businessProfile';
import type { Tradeline } from '../../types/tradeline';
import type { RoadmapStep } from '../../types/roadmap';

export function buildRoadmap(profile: BusinessProfile, tradelines: Tradeline[]): RoadmapStep[] {
  return [
    { id: 'foundation', phase: 'Foundation', title: 'Confirm business foundation', description: 'Entity, EIN, business address, bank account, and contact signals.', isComplete: Boolean(profile.hasEin && profile.hasBusinessBankAccount && profile.businessName) },
    { id: 'identity', phase: 'Identity', title: 'Tighten business identity signals', description: 'Business phone, website, domain email, and DUNS verification.', isComplete: Boolean(profile.hasBusinessPhone && profile.hasWebsite && profile.hasDomainEmail && profile.hasDuns) },
    { id: 'starter-vendors', phase: 'Starter Vendors', title: 'Research starter vendor path', description: 'Save vendors to the planner and verify terms directly.', isComplete: tradelines.length > 0 },
    { id: 'verification', phase: 'Verification', title: 'Verify reporting and payments', description: 'Confirm requirements, payment timing, and reporting behavior directly.', isComplete: tradelines.some((item) => item.status === 'reporting_confirmed') }
  ];
}

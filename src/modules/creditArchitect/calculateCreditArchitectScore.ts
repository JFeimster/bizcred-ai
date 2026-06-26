import { BusinessProfile } from '../../types/businessProfile';
import { Tradeline } from '../../types/tradeline';

export interface ScoreCategory {
  id: string;
  label: string;
  score: number;
}

export interface CreditArchitectScoreResult {
  overall: number;
  categories: ScoreCategory[];
  missingSignals: string[];
  recommendations: string[];
}

export function calculateCreditArchitectScore(
  profile: BusinessProfile,
  tradelines: Tradeline[],
  completedTasksCount: number = 0
): CreditArchitectScoreResult {
  let score = 0;
  const missingSignals: string[] = [];
  const recommendations: string[] = [];

  const categories: ScoreCategory[] = [
    { id: 'entity_setup', label: 'Entity Setup', score: 0 },
    { id: 'business_identity', label: 'Business Identity', score: 0 },
    { id: 'banking_readiness', label: 'Banking Readiness', score: 0 },
    { id: 'vendor_readiness', label: 'Vendor Readiness', score: 0 },
    { id: 'documentation_readiness', label: 'Documentation Readiness', score: 0 },
    { id: 'funding_readiness', label: 'Funding Readiness', score: 0 },
    { id: 'task_progress', label: 'Task Progress', score: 0 },
  ];

  // Entity Setup
  if (profile.entityType !== 'other' && profile.entityType !== 'sole_proprietorship') {
    categories[0].score += 10;
  } else {
    missingSignals.push('Consider forming an LLC or Corporation for stronger liability protection and credit separation.');
  }

  if (profile.einStatus === 'active') {
    categories[0].score += 10;
  } else {
    missingSignals.push('An active EIN is required for most business credit applications.');
  }

  // Business Identity
  if (profile.businessAddress) {
    categories[1].score += 5;
  } else {
    missingSignals.push('Missing business address.');
  }

  if (profile.businessPhone) {
    categories[1].score += 5;
  } else {
    missingSignals.push('Missing dedicated business phone.');
  }

  if (profile.website && profile.domainEmail) {
    categories[1].score += 5;
  } else {
    missingSignals.push('Professional website and domain email are recommended to establish credibility.');
  }

  if (profile.dunsNumber) {
    categories[1].score += 5;
  } else {
    recommendations.push('Register for a free DUNS number to start building your business credit profile with D&B.');
  }

  // Banking Readiness
  if (profile.businessBankAccount) {
    categories[2].score += 15;
  } else {
    missingSignals.push('A dedicated business bank account is crucial. Avoid mixing personal and business funds.');
  }

  // Vendor Readiness
  const activeTradelines = tradelines.filter(t => t.status === 'active' || t.status === 'reporting').length;
  categories[3].score = Math.min(20, activeTradelines * 5); // 5 points per active tradeline, up to 20

  if (activeTradelines === 0) {
    recommendations.push('Establish Net-30 vendor accounts to start creating positive payment history.');
  } else if (activeTradelines < 3) {
    recommendations.push('Aim for at least 3-5 active vendor accounts to strengthen your profile.');
  }

  // Task Progress
  categories[6].score = Math.min(10, completedTasksCount * 2);

  // Sum up all categories
  categories.forEach(c => {
    score += c.score;
  });

  // Clamp score between 0 and 100
  score = Math.max(0, Math.min(100, isNaN(score) ? 0 : score));
  categories.forEach(c => {
      c.score = Math.max(0, Math.min(100, isNaN(c.score) ? 0 : c.score));
  });

  if (score > 80) {
    recommendations.push('Review your readiness for higher-tier funding options, but verify requirements directly with lenders.');
  }

  return {
    overall: score,
    categories,
    missingSignals,
    recommendations
  };
}
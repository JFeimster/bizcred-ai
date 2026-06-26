import { BusinessProfile } from '../../types/businessProfile';
import { Tradeline } from '../../types/tradeline';
import { Roadmap, RoadmapPhase } from '../../types/roadmap';
import { CreditArchitectScoreResult } from '../creditArchitect/calculateCreditArchitectScore';

export function buildRoadmap(
  profile: BusinessProfile,
  tradelines: Tradeline[],
  scoreResult: CreditArchitectScoreResult,
  templates: RoadmapPhase[]
): Roadmap {
  // Determine current phase based on profile and tradelines
  let currentPhase = 1;

  const isFoundationComplete =
    profile.entityType !== 'other' &&
    profile.entityType !== 'sole_proprietorship' &&
    profile.einStatus === 'active';

  const isIdentityComplete =
    profile.businessAddress !== '' &&
    profile.businessPhone !== '' &&
    profile.domainEmail !== '' &&
    profile.dunsNumber !== '';

  const activeTradelinesCount = tradelines.filter(t => t.status === 'active' || t.status === 'reporting').length;
  const isStarterVendorsComplete = activeTradelinesCount >= 3;

  if (isFoundationComplete) currentPhase = 2;
  if (isFoundationComplete && isIdentityComplete) currentPhase = 3;
  if (isFoundationComplete && isIdentityComplete && isStarterVendorsComplete) currentPhase = 4;
  if (currentPhase === 4 && scoreResult.overall > 80) currentPhase = 5;

  // Deep clone templates to ensure we don't mutate the original data
  const phases = JSON.parse(JSON.stringify(templates)) as RoadmapPhase[];

  // Update step completion status based on real data
  phases.forEach(phase => {
    phase.steps.forEach(step => {
      // Very basic example mappings - would be more robust in reality
      if (step.id === 'form_entity' && isFoundationComplete) step.isComplete = true;
      if (step.id === 'get_ein' && profile.einStatus === 'active') step.isComplete = true;
      if (step.id === 'get_duns' && profile.dunsNumber !== '') step.isComplete = true;
      if (step.id === 'open_bank_account' && profile.businessBankAccount) step.isComplete = true;
      if (step.id === 'add_tier1_vendors' && isStarterVendorsComplete) step.isComplete = true;
    });
  });

  return {
    currentPhase,
    phases,
    generatedAt: new Date().toISOString()
  };
}
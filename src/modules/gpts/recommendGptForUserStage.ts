import type { CustomGpt } from '../../types/CustomGpt';
import customGptsData from '../../../data/gpts/custom-gpts.normalized.json';

export function recommendGptForUserStage(stage: string): CustomGpt[] {
  const gpts = customGptsData as CustomGpt[];

  const validStages = [
    'foundation',
    'vendor_credit',
    'funding_readiness',
    'cash_flow',
    'automation',
    'marketing',
    'operations'
  ];

  if (!validStages.includes(stage)) {
    return [];
  }

  return gpts.filter(g => g.recommended_stage === stage);
}

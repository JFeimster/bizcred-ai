import type { CustomGpt } from '../../types/CustomGpt';

export function recommendGptForUserStage(stage: string, gpts: CustomGpt[]): CustomGpt[] {
  const normalizedStage = stage.toLowerCase();
  return gpts
    .filter((gpt) => String(gpt.recommended_stage || '').toLowerCase().includes(normalizedStage))
    .slice(0, 5);
}

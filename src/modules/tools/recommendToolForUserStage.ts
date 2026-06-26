import type { FundingTool } from '../../types/FundingTool';

export function recommendToolForUserStage(stage: string, tools: FundingTool[]): FundingTool[] {
  const normalizedStage = stage.toLowerCase();
  return tools
    .filter((tool) => {
      const target = `${tool.recommended_stage || ''} ${tool.build_state || ''} ${tool.persona || ''}`.toLowerCase();
      return target.includes(normalizedStage);
    })
    .slice(0, 5);
}

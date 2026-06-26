import type { FundingTool } from '../../types/FundingTool';
import fundingToolsData from '../../../data/tools/funding-tools.normalized.json';

// Basic recommendation logic based on stage mapping to persona or status for demo purposes
export function recommendToolForUserStage(stage: string): FundingTool[] {
  const tools = fundingToolsData as FundingTool[];

  // This is a simplified matching logic. In reality, you'd map stages to specific tool attributes.
  // We use `stage` here to prevent unused variable warnings in a demo function.
  if (!stage) return [];

  return tools.filter(t => t.status === 'active');
}

import fundingToolsData from '../../../data/tools/funding-tools.normalized.json';
import type { FundingTool } from '../../types/FundingTool';

export interface FundingToolFilters {
  persona?: string;
  problemKeyword?: string;
  assetType?: string;
  buildState?: string;
  status?: string;
  partnerChannel?: string;
}

function includes(value: unknown, query: string): boolean {
  return String(value || '').toLowerCase().includes(query.toLowerCase());
}

export function searchFundingTools(filters: FundingToolFilters): FundingTool[] {
  let tools = fundingToolsData as FundingTool[];

  if (filters.persona) {
    tools = tools.filter((tool) => includes(tool.persona, filters.persona || ''));
  }
  if (filters.problemKeyword) {
    tools = tools.filter((tool) => includes(tool.problem_keyword, filters.problemKeyword || '') || includes(tool.description, filters.problemKeyword || ''));
  }
  if (filters.assetType) {
    tools = tools.filter((tool) => includes(tool.asset_type, filters.assetType || '') || includes(tool.category, filters.assetType || ''));
  }
  if (filters.buildState) {
    tools = tools.filter((tool) => includes(tool.build_state, filters.buildState || '') || includes(tool.recommended_stage, filters.buildState || ''));
  }
  if (filters.status) {
    tools = tools.filter((tool) => includes(tool.status, filters.status || ''));
  }
  if (filters.partnerChannel) {
    tools = tools.filter((tool) => includes(tool.partner_channel, filters.partnerChannel || ''));
  }

  return tools;
}

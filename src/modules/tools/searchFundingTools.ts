import type { FundingTool } from '../../types/FundingTool';
import fundingToolsData from '../../../data/tools/funding-tools.normalized.json';

export interface FundingToolFilters {
  persona?: string;
  problemKeyword?: string;
  assetType?: string;
  buildState?: string;
  status?: string;
  partnerChannel?: string;
}

export function searchFundingTools(filters: FundingToolFilters): FundingTool[] {
  let tools = fundingToolsData as FundingTool[];

  if (filters.persona) {
    tools = tools.filter(t => t.persona?.toLowerCase().includes(filters.persona!.toLowerCase()));
  }
  if (filters.problemKeyword) {
    tools = tools.filter(t => t.problem_keyword?.toLowerCase().includes(filters.problemKeyword!.toLowerCase()));
  }
  if (filters.assetType) {
    tools = tools.filter(t => t.asset_type?.toLowerCase().includes(filters.assetType!.toLowerCase()));
  }
  if (filters.buildState) {
    tools = tools.filter(t => t.build_state?.toLowerCase().includes(filters.buildState!.toLowerCase()));
  }
  if (filters.status) {
    tools = tools.filter(t => t.status?.toLowerCase().includes(filters.status!.toLowerCase()));
  }
  if (filters.partnerChannel) {
    tools = tools.filter(t => t.partner_channel?.toLowerCase().includes(filters.partnerChannel!.toLowerCase()));
  }

  return tools;
}

export interface FundingTool {
  id: string;
  name: string;
  slug?: string;
  category?: string;
  description?: string;
  inputFields?: string[];
  outputTypes?: string[];
  authMode?: 'none' | 'api_key' | 'oauth';
  status?: string;
  persona?: string;
  problem_keyword?: string;
  asset_type?: string;
  build_state?: string;
  partner_channel?: string;
  recommended_stage?: string;
  verification_status?: 'needs_review' | 'verified' | 'unverified';
}

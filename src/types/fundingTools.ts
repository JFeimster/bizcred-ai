export type VerificationStatus = 'unverified' | 'needs_review' | 'verified' | 'deprecated';

export interface FundingTool {
  id: string;
  name: string;
  type: 'loan' | 'line_of_credit' | 'credit_card' | 'grant' | 'other';
  provider: string;
  max_amount?: number;
  min_credit_score?: number;
  min_months_in_business?: number;
  min_monthly_revenue?: number;
  requires_pg: boolean;
  description: string;
  verification_status: VerificationStatus;
}

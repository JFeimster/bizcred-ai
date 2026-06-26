export type VerificationStatus = 'unverified' | 'needs_review' | 'verified' | 'deprecated';

export interface Vendor {
  id: string;
  name: string;
  tier: number;
  category: string;
  reports_to: string[];
  dnb_reporter: boolean;
  terms: string;
  requires_pg: boolean;
  ein_only: boolean;
  min_time_in_business_months: number;
  approval_notes: string;
  verification_status: VerificationStatus;
}

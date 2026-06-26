export type TradelineStatus =
  | 'planned'
  | 'researching'
  | 'applied'
  | 'active'
  | 'reporting'
  | 'needs_verification'
  | 'not_fit';

export type VerificationStatus =
  | 'unverified'
  | 'verified_reporting'
  | 'verified_not_reporting';

export interface Tradeline {
  id: string;
  vendorId: string;
  vendorName: string;
  tier: number;
  status: TradelineStatus;
  openedDate?: string;
  expectedReporting?: string[];
  notes?: string;
  verificationStatus: VerificationStatus;
}
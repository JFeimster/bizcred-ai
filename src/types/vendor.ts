export interface Vendor {
  id: string;
  slug?: string;
  name: string;
  tier: number;
  category: string;
  terms?: string;
  reportsTo: string[];
  startupFriendly: boolean;
  requiresDuns?: boolean;
  requiresDUNS?: boolean;
  requiresBankAccount?: boolean;
  requiresBusinessBankAccount?: boolean;
  hasFees?: boolean;
  minBusinessAge?: number;
  noPGPreferred?: boolean;
  verificationStatus: 'needs_review' | 'verified' | 'unverified';
  cautionNote?: string;
  overview?: string;
  requirements?: string[];
  applicationNotes?: string;
  source?: string;
  website?: string;
}

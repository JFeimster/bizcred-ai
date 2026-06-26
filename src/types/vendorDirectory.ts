export interface VendorDirectoryEntry {
  id: string;
  slug: string;
  name: string;
  category: string;
  tier: number;
  terms?: string;
  reportsTo: string[];
  startupFriendly: boolean;
  requiresDuns?: boolean;
  requiresBankAccount?: boolean;
  hasFees?: boolean;
  verificationStatus: 'needs_review' | 'verified' | 'unverified';
  cautionNote: string;
}

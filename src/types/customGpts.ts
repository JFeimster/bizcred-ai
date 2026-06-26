export type VerificationStatus = 'unverified' | 'needs_review' | 'verified' | 'deprecated';

export interface CustomGpt {
  id: string;
  name: string;
  description: string;
  url: string;
  category: 'planning' | 'analysis' | 'funding' | 'legal' | 'other';
  verification_status: VerificationStatus;
}

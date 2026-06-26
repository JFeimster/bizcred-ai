export interface CustomGpt {
  id: string;
  name: string;
  url?: string;
  category?: string;
  audience?: string[];
  description?: string;
  useCases?: string[];
  status?: string;
  recommended_stage?: string;
  keyword?: string;
  is_duplicate?: boolean;
  has_access_url?: boolean;
  verification_status?: 'needs_review' | 'verified' | 'unverified';
}

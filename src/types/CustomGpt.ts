export interface CustomGpt {
  id: string;
  name: string;
  recommended_stage?: string;
  keyword?: string;
  category?: string;
  is_duplicate?: boolean;
  has_access_url?: boolean;
  verification_status?: string;
}

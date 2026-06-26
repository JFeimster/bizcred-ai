export interface BizCreditScore {
  score: number;
  provider: 'DNB' | 'Experian' | 'Equifax' | 'FICO_SBSS' | 'Other';
  date_pulled: string;
}

export interface Passport {
  id: string;
  profile_id: string;
  scores: BizCreditScore[];
  data_completeness_percentage: number;
  fundability_status: 'poor' | 'fair' | 'good' | 'excellent';
  last_updated: string;
}

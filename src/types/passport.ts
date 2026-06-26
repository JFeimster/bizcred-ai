export interface PassportMilestone {
  id: string;
  title: string;
  status: 'not_started' | 'in_progress' | 'complete' | 'blocked';
  completedAt?: string;
}

export interface Passport {
  id: string;
  businessProfileId?: string;
  foundationScore: number;
  vendorReadinessScore: number;
  fundingReadinessScore: number;
  milestones: PassportMilestone[];
  updatedAt: string;
}

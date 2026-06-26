export type EntityType =
  | 'sole_proprietorship'
  | 'llc'
  | 's_corp'
  | 'c_corp'
  | 'partnership'
  | 'other';

export type MonthlyRevenueRange =
  | '0-1k'
  | '1k-5k'
  | '5k-10k'
  | '10k-50k'
  | '50k+';

export interface BusinessProfile {
  businessName: string;
  entityType: EntityType;
  formationDate: string; // ISO date string
  einStatus: 'none' | 'applied' | 'active';
  businessBankAccount: boolean;
  businessAddress: string;
  businessPhone: string;
  website: string;
  domainEmail: string;
  dunsNumber: string;
  businessLicense: boolean;
  monthlyRevenueRange: MonthlyRevenueRange;
  primaryGoal: string;
}
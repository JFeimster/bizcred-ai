export interface BusinessProfileAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface BusinessProfile {
  businessName: string;
  entityType: string;
  formationDate: string;
  businessLicense: boolean;
  monthlyRevenueRange: string;
  primaryGoal: string;
  hasEin: boolean;
  hasBusinessBankAccount: boolean;
  hasBusinessAddress: boolean;
  hasBusinessPhone: boolean;
  hasWebsite: boolean;
  hasDomainEmail: boolean;
  hasDuns: boolean;

  id?: string;
  legalName?: string;
  dbaName?: string;
  ein?: string;
  stateOfIncorporation?: string;
  address?: BusinessProfileAddress;
  phone?: string;
  website?: string;
  industry?: string;
  naicsCode?: string;
}

export interface BusinessProfile {
  id: string;
  legal_name: string;
  dba_name?: string;
  ein?: string;
  entity_type: string;
  date_established?: string;
  state_of_incorporation?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone?: string;
  website?: string;
  industry?: string;
  naics_code?: string;
}

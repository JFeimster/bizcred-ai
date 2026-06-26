export interface FundingToolRegistryEntry {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  inputFields: string[];
  outputTypes: string[];
  authMode: 'none' | 'api_key' | 'oauth';
  status: 'planned' | 'active' | 'archived';
}

export interface CustomGptRegistryEntry {
  id: string;
  name: string;
  url?: string;
  category: string;
  audience: string[];
  description: string;
  useCases: string[];
  status: 'draft' | 'published' | 'archived';
}

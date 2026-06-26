export interface NotionTemplateSource {
  id: string;
  name: string;
  url: string;
  objectType: 'page' | 'database' | 'template';
  mappedRegistry?: string;
  notes?: string;
}

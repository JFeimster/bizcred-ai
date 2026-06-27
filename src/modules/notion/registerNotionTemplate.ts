import { NotionTemplateSource, NotionTemplateType, NotionAccessMode } from '../../types/notion';

export function registerNotionTemplate(
  name: string,
  url: string,
  sourceType: NotionTemplateType,
  accessMode: NotionAccessMode,
  notes?: string
): NotionTemplateSource {
  return {
    id: `notion-src-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    name,
    url,
    sourceType,
    accessMode,
    syncEnabled: false,
    notes,
    createdAt: new Date().toISOString()
  };
}

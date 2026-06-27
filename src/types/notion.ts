export type NotionTemplateType =
  | 'business_hq'
  | 'bizcredit_passport'
  | 'credit_tracker'
  | 'vendor_directory'
  | 'funding_dashboard'
  | 'course_workspace'
  | 'other';

export type NotionAccessMode =
  | 'public_copy_link'
  | 'exported_markdown'
  | 'exported_csv'
  | 'notion_api_connection';

export type NotionSyncMode = 'manual' | 'auto';

export interface NotionFieldMapping {
  notionField: string;
  localField: string;
}

export interface NotionTemplateSource {
  id: string;
  name: string;
  url: string;
  sourceType: NotionTemplateType;
  accessMode: NotionAccessMode;
  syncEnabled: boolean;
  notes?: string;
  createdAt: string;
  lastImportedAt?: string;
  lastSyncedAt?: string;
  notionPageId?: string;
  notionDatabaseId?: string;
  notionDataSourceId?: string;
}

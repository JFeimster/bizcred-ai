import { NotionTemplateSource } from '../../types/notion';

export function getNotionTemplateNextStep(source: NotionTemplateSource): string {
  if (source.accessMode === 'public_copy_link') {
    return 'Duplicate this template to your own Notion workspace. Return here to update your reference URL if you plan to export data later.';
  }

  if (source.accessMode === 'exported_markdown') {
    return 'Export this Notion page as Markdown and import it manually into the system via the Imports tab.';
  }

  if (source.accessMode === 'exported_csv') {
    return 'Use CSV export from your Notion database for row-based data like vendors. Import it using the Imports tab.';
  }

  if (source.accessMode === 'notion_api_connection') {
    return 'API sync is future-gated and not active. Please use manual Markdown/CSV exports for now.';
  }

  return 'Verify your Notion setup and follow manual export/import processes.';
}

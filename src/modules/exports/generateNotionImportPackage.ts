import { exportPassportMarkdown } from './exportPassportMarkdown';
import { exportTradelinesCsv } from './exportTradelinesCsv';

export interface ExportFile {
  filename: string;
  content: string;
  mimeType: string;
}

export function generateNotionImportPackage(): ExportFile[] {
  return [
    {
      filename: 'bizcredit-passport.md',
      content: exportPassportMarkdown(),
      mimeType: 'text/markdown'
    },
    {
      filename: 'tradeline-planner.csv',
      content: exportTradelinesCsv(),
      mimeType: 'text/csv'
    },
    {
      filename: 'roadmap.md',
      content: '# Roadmap\n\nYour business credit roadmap export will appear here in a future pass.\n',
      mimeType: 'text/markdown'
    },
    {
      filename: 'vendor-directory.csv',
      content: 'id,name,category,tier,terms,reportsTo,verificationStatus\n',
      mimeType: 'text/csv'
    },
    {
      filename: 'import-instructions.md',
      content: '# Manual Import Instructions\n\nImport CSV files into matching Notion databases. Import Markdown files into matching Notion pages. Review all imported data manually.\n',
      mimeType: 'text/markdown'
    }
  ];
}

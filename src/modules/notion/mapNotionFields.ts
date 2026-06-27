import { NotionTemplateType, NotionFieldMapping } from '../../types/notion';

export function mapNotionFields(sourceType: NotionTemplateType): NotionFieldMapping[] {
  switch (sourceType) {
    case 'business_hq':
      return [
        { notionField: 'Business Name', localField: 'companyName' },
        { notionField: 'EIN', localField: 'ein' },
        { notionField: 'Formation Date', localField: 'incorporationDate' }
      ];
    case 'vendor_directory':
      return [
        { notionField: 'Vendor Name', localField: 'name' },
        { notionField: 'Category', localField: 'category' },
        { notionField: 'Tier', localField: 'tier' }
      ];
    case 'credit_tracker':
      return [
        { notionField: 'Bureau', localField: 'bureau' },
        { notionField: 'Score', localField: 'score' },
        { notionField: 'Date Updated', localField: 'date' }
      ];
    case 'bizcredit_passport':
      return [
        { notionField: 'Status', localField: 'readinessStatus' }
      ];
    default:
      return [
        { notionField: 'Title', localField: 'name' },
        { notionField: 'Notes', localField: 'notes' }
      ];
  }
}

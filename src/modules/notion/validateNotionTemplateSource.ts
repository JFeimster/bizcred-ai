import { NotionTemplateType, NotionAccessMode } from '../../types/notion';

export function validateNotionTemplateSource(
  name: string,
  url: string,
  sourceType: NotionTemplateType,
  accessMode: NotionAccessMode
): string[] {
  const errors: string[] = [];

  if (!name || name.trim().length === 0) {
    errors.push('Name is required.');
  }

  if (!url || url.trim().length === 0) {
    errors.push('URL is required.');
  } else {
    try {
      new URL(url);
    } catch {
      errors.push('URL must be a valid format.');
    }
  }

  if (!sourceType) {
    errors.push('Source Type is required.');
  }

  if (!accessMode) {
    errors.push('Access Mode is required.');
  }

  return errors;
}

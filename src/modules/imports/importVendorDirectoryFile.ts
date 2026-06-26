import type { VendorDirectoryEntry } from '../../types/vendorDirectory';
import { dedupeVendorDirectory } from './dedupeVendorDirectory';
import { normalizeVendorDirectory } from './normalizeVendorDirectory';

type RawVendor = Record<string, unknown>;

export async function importVendorDirectoryFile(file: File): Promise<VendorDirectoryEntry[]> {
  const text = await file.text();
  const lowerName = file.name.toLowerCase();
  let rawData: RawVendor[] = [];

  if (lowerName.endsWith('.json')) {
    const parsed = JSON.parse(text) as RawVendor[] | RawVendor;
    rawData = Array.isArray(parsed) ? parsed : [parsed];
  } else if (lowerName.endsWith('.csv')) {
    rawData = parseSimpleCsv(text);
  } else {
    throw new Error('Vendor directory imports support CSV and JSON only.');
  }

  return dedupeVendorDirectory(normalizeVendorDirectory(rawData));
}

function parseSimpleCsv(csvText: string): RawVendor[] {
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) return [];

  const headers = splitCsvLine(lines[0]).map((header) => header.trim());
  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    const row: RawVendor = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    return row;
  });
}

function splitCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

import type { VendorDirectoryEntry } from '../../types/vendorDirectory';

export function dedupeVendorDirectory(entries: VendorDirectoryEntry[]): VendorDirectoryEntry[] {
  const ids = new Set<string>();
  const names = new Set<string>();
  const result: VendorDirectoryEntry[] = [];

  for (const entry of entries) {
    const nameKey = entry.name.trim().toLowerCase();
    if (!ids.has(entry.id) && !names.has(nameKey)) {
      ids.add(entry.id);
      names.add(nameKey);
      result.push(entry);
    }
  }

  return result;
}

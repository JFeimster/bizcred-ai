import type { VendorDirectoryEntry } from '../../types/vendorDirectory';

type RawVendor = Record<string, unknown>;

function toBool(value: unknown): boolean {
  return value === true || value === 'true' || value === 'TRUE' || value === 'yes' || value === '1';
}

function toReportsTo(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String).filter(Boolean);
  if (typeof value === 'string') return value.split(/[;,]/).map((item) => item.trim()).filter(Boolean);
  return [];
}

export function normalizeVendorDirectory(rawData: RawVendor[]): VendorDirectoryEntry[] {
  return rawData.map((item, index) => {
    const name = String(item.name || item.vendorName || `Imported Vendor ${index + 1}`);
    const slug = String(item.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    const tier = Number(item.tier || 1);

    return {
      id: String(item.id || `vendor-${slug || index + 1}`),
      slug,
      name,
      category: String(item.category || 'General'),
      tier: Number.isFinite(tier) ? tier : 1,
      terms: String(item.terms || ''),
      reportsTo: toReportsTo(item.reportsTo),
      startupFriendly: toBool(item.startupFriendly),
      requiresDuns: toBool(item.requiresDuns),
      requiresBankAccount: toBool(item.requiresBankAccount),
      hasFees: toBool(item.hasFees),
      verificationStatus: item.verificationStatus === 'verified' ? 'verified' : 'needs_review',
      cautionNote: String(item.cautionNote || 'Imported record. Review before use.')
    };
  });
}

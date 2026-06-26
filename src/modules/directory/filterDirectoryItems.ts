import type { Vendor } from '../../types/vendor';

export interface DirectoryFilters {
  query?: string;
  tier?: number | 'all';
  category?: string;
  reportsTo?: string;
  startupFriendlyOnly?: boolean;
}

export interface VendorDirectoryItem extends Vendor {
  terms: string;
}

export const starterVendors: VendorDirectoryItem[] = [
  {
    id: 'uline',
    slug: 'uline',
    name: 'Uline',
    tier: 1,
    category: 'Office / Supplies',
    terms: 'Net 30',
    reportsTo: ['D&B'],
    startupFriendly: true,
    verificationStatus: 'needs_review',
    cautionNote: 'Verify requirements, fees, terms, and reporting directly.'
  },
  {
    id: 'quill',
    slug: 'quill',
    name: 'Quill',
    tier: 1,
    category: 'Office / Supplies',
    terms: 'Net 30',
    reportsTo: ['D&B'],
    startupFriendly: true,
    verificationStatus: 'needs_review',
    cautionNote: 'Verify requirements, fees, terms, and reporting directly.'
  },
  {
    id: 'grainger',
    slug: 'grainger',
    name: 'Grainger',
    tier: 2,
    category: 'Industrial / Supplies',
    terms: 'Net 30',
    reportsTo: ['D&B'],
    startupFriendly: false,
    verificationStatus: 'needs_review',
    cautionNote: 'Verify requirements, fees, terms, and reporting directly.'
  }
];

function normalizeFilters(filters: string | DirectoryFilters): DirectoryFilters {
  return typeof filters === 'string' ? { query: filters } : filters;
}

export function filterDirectoryItems<T extends Vendor>(items: T[], filters: string | DirectoryFilters): T[] {
  const normalized = normalizeFilters(filters);
  const query = normalized.query?.trim().toLowerCase() || '';

  return items.filter((item) => {
    const fields = [item.name, item.category, item.terms || '', item.reportsTo.join(' ')];
    const haystack = fields.join(' ').toLowerCase();
    const lowerBureaus = item.reportsTo.map((bureau) => bureau.toLowerCase());

    if (query && !haystack.includes(query)) return false;
    if (normalized.tier && normalized.tier !== 'all' && item.tier !== normalized.tier) return false;
    if (normalized.category && item.category !== normalized.category) return false;
    if (normalized.reportsTo && !lowerBureaus.includes(normalized.reportsTo.toLowerCase())) return false;
    if (normalized.startupFriendlyOnly && !item.startupFriendly) return false;

    return true;
  });
}

export interface VendorDirectoryItem {
  id: string;
  name: string;
  tier: number;
  category: string;
  terms: string;
  reportsTo: string[];
  startupFriendly: boolean;
  verificationStatus: 'needs_review' | 'verified' | 'unverified';
}

export const starterVendors: VendorDirectoryItem[] = [
  { id: 'uline', name: 'Uline', tier: 1, category: 'Office / Supplies', terms: 'Net 30', reportsTo: ['D&B'], startupFriendly: true, verificationStatus: 'needs_review' },
  { id: 'quill', name: 'Quill', tier: 1, category: 'Office / Supplies', terms: 'Net 30', reportsTo: ['D&B'], startupFriendly: true, verificationStatus: 'needs_review' },
  { id: 'grainger', name: 'Grainger', tier: 2, category: 'Industrial / Supplies', terms: 'Net 30', reportsTo: ['D&B'], startupFriendly: false, verificationStatus: 'needs_review' }
];

export function filterDirectoryItems(items: VendorDirectoryItem[], query: string): VendorDirectoryItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;
  return items.filter((item) => [item.name, item.category, item.terms, item.reportsTo.join(' ')].join(' ').toLowerCase().includes(normalized));
}

export interface VendorItem {
  id: string;
  name: string;
  tier: number;
  category: string;
  reports_to: string[];
  terms: string;
  requires_pg: boolean;
  ein_only: boolean;
  min_time_in_business_months: number;
  approval_notes: string;
}

export interface DirectoryFilters {
  search?: string;
  tier?: number | null;
  category?: string | null;
  reports_to?: string | null;
  requires_pg?: boolean | null;
  ein_only?: boolean | null;
  min_time_in_business_months?: number | null;
}

export function filterDirectoryItems(items: VendorItem[], filters: DirectoryFilters): VendorItem[] {
  return items.filter(item => {
    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesName = item.name?.toLowerCase().includes(searchLower);
      const matchesCategory = item.category?.toLowerCase().includes(searchLower);
      if (!matchesName && !matchesCategory) return false;
    }

    // Tier
    if (filters.tier !== undefined && filters.tier !== null) {
      if (item.tier !== filters.tier) return false;
    }

    // Category
    if (filters.category) {
      if (item.category !== filters.category) return false;
    }

    // Reports To
    if (filters.reports_to) {
      if (!item.reports_to || !item.reports_to.includes(filters.reports_to)) return false;
    }

    // Requires PG
    if (filters.requires_pg !== undefined && filters.requires_pg !== null) {
      if (item.requires_pg !== filters.requires_pg) return false;
    }

    // EIN Only
    if (filters.ein_only !== undefined && filters.ein_only !== null) {
      if (item.ein_only !== filters.ein_only) return false;
    }

    // Min Time in Business
    if (filters.min_time_in_business_months !== undefined && filters.min_time_in_business_months !== null) {
      if ((item.min_time_in_business_months || 0) > filters.min_time_in_business_months) return false;
    }

    return true;
  });
}
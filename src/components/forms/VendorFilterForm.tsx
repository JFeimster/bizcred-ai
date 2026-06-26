import type { DirectoryFilters } from '../../modules/directory/filterDirectoryItems';

interface VendorFilterFormProps {
  filters: DirectoryFilters;
  onFilterChange: (filters: DirectoryFilters) => void;
}

export function VendorFilterForm({ filters, onFilterChange }: VendorFilterFormProps) {
  return (
    <div className="brutal-card form-grid">
      <label>
        Search
        <input
          value={filters.query || ''}
          onChange={(event) => onFilterChange({ ...filters, query: event.target.value })}
          placeholder="Vendor, category, terms, bureau"
        />
      </label>
      <label>
        Tier
        <select
          value={filters.tier || 'all'}
          onChange={(event) => onFilterChange({ ...filters, tier: event.target.value === 'all' ? 'all' : Number(event.target.value) })}
        >
          <option value="all">All tiers</option>
          <option value="1">Tier 1</option>
          <option value="2">Tier 2</option>
          <option value="3">Tier 3</option>
        </select>
      </label>
      <label>
        Reports to
        <input
          value={filters.reportsTo || ''}
          onChange={(event) => onFilterChange({ ...filters, reportsTo: event.target.value })}
          placeholder="D&B, Experian, Equifax"
        />
      </label>
      <label className="checkbox-line">
        <input
          type="checkbox"
          checked={Boolean(filters.startupFriendlyOnly)}
          onChange={(event) => onFilterChange({ ...filters, startupFriendlyOnly: event.target.checked })}
        />
        <span>Startup-friendly only</span>
      </label>
    </div>
  );
}

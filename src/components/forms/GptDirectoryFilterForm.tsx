import type { ChangeEvent } from 'react';
import type { CustomGptFilters } from '../../modules/gpts/searchCustomGpts';

interface GptDirectoryFilterFormProps {
  filters: CustomGptFilters;
  onFilterChange: (filters: CustomGptFilters) => void;
}

export default function GptDirectoryFilterForm({ filters, onFilterChange }: GptDirectoryFilterFormProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    onFilterChange({ ...filters, [name]: value });
  }

  function handleAccessUrlChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFilters = { ...filters };
    if (event.target.checked) {
      nextFilters.hasAccessUrl = true;
    } else {
      delete nextFilters.hasAccessUrl;
    }
    onFilterChange(nextFilters);
  }

  return (
    <div className="brutal-card form-grid">
      <label>
        Recommended Stage
        <select name="recommendedStage" value={filters.recommendedStage || ''} onChange={handleChange}>
          <option value="">Any</option>
          <option value="foundation">Foundation</option>
          <option value="vendor_credit">Vendor Credit</option>
          <option value="funding_readiness">Funding Readiness</option>
          <option value="cash_flow">Cash Flow</option>
          <option value="automation">Automation</option>
          <option value="marketing">Marketing</option>
          <option value="operations">Operations</option>
        </select>
      </label>
      <label>
        Keyword
        <input name="keyword" value={filters.keyword || ''} onChange={handleChange} placeholder="readiness, funding, vendor" />
      </label>
      <label>
        Category
        <input name="category" value={filters.category || ''} onChange={handleChange} placeholder="finance, funding, operations" />
      </label>
      <label className="checkbox-line">
        <input type="checkbox" checked={Boolean(filters.hasAccessUrl)} onChange={handleAccessUrlChange} />
        <span>Has access URL</span>
      </label>
    </div>
  );
}

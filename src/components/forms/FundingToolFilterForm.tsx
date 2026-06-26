import type { ChangeEvent } from 'react';
import type { FundingToolFilters } from '../../modules/tools/searchFundingTools';

interface FundingToolFilterFormProps {
  filters: FundingToolFilters;
  onFilterChange: (filters: FundingToolFilters) => void;
}

export default function FundingToolFilterForm({ filters, onFilterChange }: FundingToolFilterFormProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    onFilterChange({ ...filters, [name]: value });
  }

  return (
    <div className="brutal-card form-grid">
      <label>
        Persona
        <input name="persona" value={filters.persona || ''} onChange={handleChange} placeholder="broker, startup, operator" />
      </label>
      <label>
        Problem Keyword
        <input name="problemKeyword" value={filters.problemKeyword || ''} onChange={handleChange} placeholder="cash flow, readiness, vendor" />
      </label>
      <label>
        Asset Type
        <input name="assetType" value={filters.assetType || ''} onChange={handleChange} placeholder="calculator, checklist, GPT" />
      </label>
      <label>
        Build State
        <select name="buildState" value={filters.buildState || ''} onChange={handleChange}>
          <option value="">Any</option>
          <option value="foundation">Foundation</option>
          <option value="mvp">MVP</option>
          <option value="planned">Planned</option>
          <option value="active">Active</option>
        </select>
      </label>
      <label>
        Status
        <select name="status" value={filters.status || ''} onChange={handleChange}>
          <option value="">Any</option>
          <option value="planned">Planned</option>
          <option value="active">Active</option>
          <option value="archived">Archived</option>
        </select>
      </label>
      <label>
        Partner Channel
        <input name="partnerChannel" value={filters.partnerChannel || ''} onChange={handleChange} placeholder="broker, affiliate, direct" />
      </label>
    </div>
  );
}

import React, { useState } from 'react';
import type { FundingToolFilters } from '../../modules/tools/searchFundingTools';

interface FundingToolFilterFormProps {
  onFilterChange: (filters: FundingToolFilters) => void;
}

const FundingToolFilterForm: React.FC<FundingToolFilterFormProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FundingToolFilters>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <form className="filter-form" style={{ marginBottom: '2rem', padding: '1rem', border: '2px solid black', backgroundColor: '#f0f0f0' }}>
      <h3 style={{ marginTop: 0 }}>Filter Tools</h3>
      <div className="form-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <label htmlFor="persona">Persona</label>
          <input type="text" id="persona" name="persona" onChange={handleChange} className="form-control" />
        </div>
        <div>
          <label htmlFor="problemKeyword">Problem Keyword</label>
          <input type="text" id="problemKeyword" name="problemKeyword" onChange={handleChange} className="form-control" />
        </div>
        <div>
          <label htmlFor="assetType">Asset Type</label>
          <input type="text" id="assetType" name="assetType" onChange={handleChange} className="form-control" />
        </div>
        <div>
          <label htmlFor="buildState">Build State</label>
          <select id="buildState" name="buildState" onChange={handleChange} className="form-control">
            <option value="">Any</option>
            <option value="mvp">MVP</option>
            <option value="scaling">Scaling</option>
            <option value="established">Established</option>
          </select>
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select id="status" name="status" onChange={handleChange} className="form-control">
            <option value="">Any</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label htmlFor="partnerChannel">Partner Channel</label>
          <input type="text" id="partnerChannel" name="partnerChannel" onChange={handleChange} className="form-control" />
        </div>
      </div>
    </form>
  );
};

export default FundingToolFilterForm;

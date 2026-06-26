import React, { useState } from 'react';
import type { CustomGptFilters } from '../../modules/gpts/searchCustomGpts';

interface GptDirectoryFilterFormProps {
  onFilterChange: (filters: CustomGptFilters) => void;
}

const GptDirectoryFilterForm: React.FC<GptDirectoryFilterFormProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<CustomGptFilters>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let newValue: any = value;

    // We update state for text and select fields
    if (type !== 'checkbox') {
        const newFilters = { ...filters, [name]: newValue };
        setFilters(newFilters);
        onFilterChange(newFilters);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const { name, checked } = e.target;
     // If checkbox is unchecked, we remove the filter so it shows all GPTs
     const newFilters = { ...filters };
     if (checked) {
         newFilters[name as keyof CustomGptFilters] = true as never;
     } else {
         delete newFilters[name as keyof CustomGptFilters];
     }

     setFilters(newFilters);
     onFilterChange(newFilters);
  };

  return (
    <form className="filter-form" style={{ marginBottom: '2rem', padding: '1rem', border: '2px solid black', backgroundColor: '#f0f0f0' }}>
      <h3 style={{ marginTop: 0 }}>Filter GPTs</h3>
      <div className="form-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div>
          <label htmlFor="recommendedStage">Recommended Stage</label>
          <select id="recommendedStage" name="recommendedStage" onChange={handleChange} className="form-control">
            <option value="">Any</option>
            <option value="foundation">Foundation</option>
            <option value="vendor_credit">Vendor Credit</option>
            <option value="funding_readiness">Funding Readiness</option>
            <option value="cash_flow">Cash Flow</option>
            <option value="automation">Automation</option>
            <option value="marketing">Marketing</option>
            <option value="operations">Operations</option>
          </select>
        </div>
        <div>
          <label htmlFor="keyword">Keyword</label>
          <input type="text" id="keyword" name="keyword" onChange={handleChange} className="form-control" />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <input type="text" id="category" name="category" onChange={handleChange} className="form-control" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input type="checkbox" id="hasAccessUrl" name="hasAccessUrl" onChange={handleCheckboxChange} />
          <label htmlFor="hasAccessUrl" style={{ margin: 0 }}>Has Access URL</label>
        </div>
      </div>
    </form>
  );
};

export default GptDirectoryFilterForm;

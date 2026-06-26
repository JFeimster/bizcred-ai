import React, { useState, useEffect } from 'react';
import GptDirectoryFilterForm from '../components/forms/GptDirectoryFilterForm';
import CustomGptCard from '../components/cards/CustomGptCard';
import { searchCustomGpts, type CustomGptFilters } from '../modules/gpts/searchCustomGpts';
import type { CustomGpt } from '../types/CustomGpt';

const GptDirectoryPage: React.FC = () => {
  const [gpts, setGpts] = useState<CustomGpt[]>([]);
  const [filters, setFilters] = useState<CustomGptFilters>({});

  useEffect(() => {
    setGpts(searchCustomGpts(filters));
  }, [filters]);

  const handleFilterChange = (newFilters: CustomGptFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Custom GPT Directory</h1>
        <p className="page-description">
          Discover Custom GPTs designed to assist with various stages of business credit and funding readiness.
          <em> Educational purposes only.</em>
        </p>
      </header>

      <section className="filter-section">
        <GptDirectoryFilterForm onFilterChange={handleFilterChange} />
      </section>

      <section className="results-section">
        <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {gpts.length > 0 ? (
            gpts.map(gpt => (
              <CustomGptCard key={gpt.id} gpt={gpt} />
            ))
          ) : (
            <p>No Custom GPTs found matching your criteria.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default GptDirectoryPage;

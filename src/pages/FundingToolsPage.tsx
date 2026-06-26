import React, { useState, useEffect } from 'react';
import FundingToolFilterForm from '../components/forms/FundingToolFilterForm';
import FundingToolCard from '../components/cards/FundingToolCard';
import { searchFundingTools, type FundingToolFilters } from '../modules/tools/searchFundingTools';
import type { FundingTool } from '../types/FundingTool';

const FundingToolsPage: React.FC = () => {
  const [tools, setTools] = useState<FundingTool[]>([]);
  const [filters, setFilters] = useState<FundingToolFilters>({});

  useEffect(() => {
    setTools(searchFundingTools(filters));
  }, [filters]);

  const handleFilterChange = (newFilters: FundingToolFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Funding Tools Directory</h1>
        <p className="page-description">
          Explore tools to help build and manage your business credit profile.
          <em> Educational purposes only.</em>
        </p>
      </header>

      <section className="filter-section">
        <FundingToolFilterForm onFilterChange={handleFilterChange} />
      </section>

      <section className="results-section">
        <div className="card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {tools.length > 0 ? (
            tools.map(tool => (
              <FundingToolCard key={tool.id} tool={tool} />
            ))
          ) : (
            <p>No tools found matching your criteria.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default FundingToolsPage;

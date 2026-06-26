import { useMemo, useState } from 'react';
import FundingToolCard from '../components/cards/FundingToolCard';
import FundingToolFilterForm from '../components/forms/FundingToolFilterForm';
import { searchFundingTools, type FundingToolFilters } from '../modules/tools/searchFundingTools';

export default function FundingToolsPage() {
  const [filters, setFilters] = useState<FundingToolFilters>({});
  const tools = useMemo(() => searchFundingTools(filters), [filters]);

  return (
    <section className="page-stack">
      <div className="page-header">
        <p className="eyebrow">Resource Layer</p>
        <h1>Funding Tools Directory</h1>
        <p>Explore local-first tools for business-credit setup, funding readiness, and operating checklists. Educational planning only.</p>
      </div>

      <FundingToolFilterForm filters={filters} onFilterChange={setFilters} />

      <div className="card-grid">
        {tools.length > 0 ? (
          tools.map((tool) => <FundingToolCard key={tool.id} tool={tool} />)
        ) : (
          <article className="brutal-card">
            <h2>No tools found</h2>
            <p>Clear or broaden the filters to see more tools.</p>
          </article>
        )}
      </div>
    </section>
  );
}

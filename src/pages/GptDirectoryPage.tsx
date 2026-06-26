import { useMemo, useState } from 'react';
import CustomGptCard from '../components/cards/CustomGptCard';
import GptDirectoryFilterForm from '../components/forms/GptDirectoryFilterForm';
import { searchCustomGpts, type CustomGptFilters } from '../modules/gpts/searchCustomGpts';

export default function GptDirectoryPage() {
  const [filters, setFilters] = useState<CustomGptFilters>({});
  const gpts = useMemo(() => searchCustomGpts(filters), [filters]);

  return (
    <section className="page-stack">
      <div className="page-header">
        <p className="eyebrow">Resource Layer</p>
        <h1>Custom GPT Directory</h1>
        <p>Find GPTs for business-credit readiness, vendor research, funding prep, and operating workflows. Educational planning only.</p>
      </div>

      <GptDirectoryFilterForm filters={filters} onFilterChange={setFilters} />

      <div className="card-grid">
        {gpts.length > 0 ? (
          gpts.map((gpt) => <CustomGptCard key={gpt.id} gpt={gpt} />)
        ) : (
          <article className="brutal-card">
            <h2>No GPTs found</h2>
            <p>Clear or broaden the filters to see more GPTs.</p>
          </article>
        )}
      </div>
    </section>
  );
}

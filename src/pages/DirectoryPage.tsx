import { useMemo, useState } from 'react';
import { filterDirectoryItems, starterVendors } from '../modules/directory/filterDirectoryItems';
import { readLocal, writeLocal } from '../storage/localStorageClient';
import { defaultTradelines } from '../storage/storageDefaults';
import { STORAGE_KEYS } from '../storage/storageKeys';
import type { Tradeline } from '../types/tradeline';

export default function DirectoryPage() {
  const [query, setQuery] = useState('');
  const vendors = useMemo(() => filterDirectoryItems(starterVendors, query), [query]);

  function saveToPlanner(vendorName: string, tier: number, reportsTo: string[]) {
    const current = readLocal<Tradeline[]>(STORAGE_KEYS.tradelines, defaultTradelines);
    const next: Tradeline = {
      id: crypto.randomUUID(),
      vendorName,
      accountType: 'Vendor account',
      tier,
      status: 'researching',
      limitAmount: 0,
      balanceAmount: 0,
      reportsTo,
      notes: 'Verify requirements, terms, and reporting directly before applying.'
    };
    writeLocal(STORAGE_KEYS.tradelines, [...current, next]);
  }

  return (
    <section className="page-stack">
      <div className="page-header">
        <p className="eyebrow">Directory</p>
        <h1>Credit Vendor Directory</h1>
        <p>Research starter vendors and save candidates to the planner. Reporting and terms must be verified directly.</p>
      </div>

      <div className="brutal-card">
        <label>Search vendors<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, category, terms, bureau" /></label>
      </div>

      <div className="card-grid">
        {vendors.map((vendor) => (
          <article className="brutal-card" key={vendor.id}>
            <div className="card-topline">
              <span className="tier-badge">Tier {vendor.tier}</span>
              <span className="status-pill warning">{vendor.verificationStatus.replace('_', ' ')}</span>
            </div>
            <h2>{vendor.name}</h2>
            <p>{vendor.category} · {vendor.terms}</p>
            <p>Reports to: {vendor.reportsTo.join(', ')}</p>
            <button className="neo-button" type="button" onClick={() => saveToPlanner(vendor.name, vendor.tier, vendor.reportsTo)}>Save to Planner</button>
          </article>
        ))}
      </div>
    </section>
  );
}

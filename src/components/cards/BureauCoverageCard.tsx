import type { Tradeline } from '../../types/tradeline';
import { BureauBadge } from '../badges/BureauBadge';

export function BureauCoverageCard({ tradelines, hasDuns }: { tradelines: Tradeline[], hasDuns: boolean }) {
  const reportingBureaus = new Set<string>();
  tradelines.forEach(t => {
    if (t.status === 'reporting_confirmed') {
      t.reportsTo?.forEach(bureau => reportingBureaus.add(bureau));
    }
  });

  return (
    <article className="brutal-card">
      <h2>Bureau Coverage</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Dun & Bradstreet (DUNS)</span>
          <BureauBadge verified={hasDuns} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Experian Business</span>
          <BureauBadge verified={reportingBureaus.has('experian')} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Equifax Business</span>
          <BureauBadge verified={reportingBureaus.has('equifax')} />
        </div>
      </div>
    </article>
  );
}

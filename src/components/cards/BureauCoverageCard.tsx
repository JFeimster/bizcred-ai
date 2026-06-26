import type { Tradeline } from '../../types/tradeline';
import { BureauBadge } from '../badges/BureauBadge';

function normalizedBureauSet(tradelines: Tradeline[]) {
  const reportingBureaus = new Set<string>();
  tradelines.forEach((tradeline) => {
    if (tradeline.status === 'reporting_confirmed') {
      tradeline.reportsTo?.forEach((bureau) => reportingBureaus.add(bureau.toLowerCase()));
    }
  });
  return reportingBureaus;
}

export function BureauCoverageCard({ tradelines, hasDuns }: { tradelines: Tradeline[]; hasDuns: boolean }) {
  const reportingBureaus = normalizedBureauSet(tradelines);

  return (
    <article className="brutal-card">
      <h2>Bureau Coverage</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Dun & Bradstreet (DUNS)</span>
          <BureauBadge verified={hasDuns || reportingBureaus.has('d&b') || reportingBureaus.has('dnb')} />
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

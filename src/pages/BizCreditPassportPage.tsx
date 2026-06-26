import { useMemo, useState } from 'react';
import { readLocal } from '../storage/localStorageClient';
import { defaultProfile, defaultTradelines } from '../storage/storageDefaults';
import { STORAGE_KEYS } from '../storage/storageKeys';
import type { BusinessProfile } from '../types/businessProfile';
import type { Tradeline } from '../types/tradeline';
import { buildBizCreditPassport } from '../modules/passport/buildBizCreditPassport';
import { BureauBadge } from '../components/badges/BureauBadge';
import { ReadinessBadge } from '../components/badges/ReadinessBadge';

export default function BizCreditPassportPage() {
  const [profile] = useState<BusinessProfile>(() => readLocal(STORAGE_KEYS.profile, defaultProfile));
  const [tradelines] = useState<Tradeline[]>(() => readLocal(STORAGE_KEYS.tradelines, defaultTradelines));

  const passport = useMemo(() => buildBizCreditPassport(profile, tradelines), [profile, tradelines]);

  const reportingBureaus = new Set<string>();
  tradelines.forEach(t => {
    if (t.status === 'reporting_confirmed') {
      t.reportsTo?.forEach(bureau => reportingBureaus.add(bureau));
    }
  });

  return (
    <section className="page-stack">
      <div className="page-header">
        <p className="eyebrow">BizCredit Builder OS</p>
        <h1>BizCredit Passport</h1>
        <p>Comprehensive overview of your business credit profile and readiness signals.</p>
        <div style={{ marginTop: '10px' }}>
          <ReadinessBadge tier={passport.fundingReadiness.tier} />
        </div>
      </div>

      <div className="two-column-grid">
        <article className="brutal-card">
          <h2>Business Foundation</h2>
          <div style={{ display: 'grid', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Business Name</span>
              <strong>{passport.foundation.businessName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Entity Type</span>
              <strong>{passport.foundation.entityType}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Formation Date</span>
              <strong>{passport.foundation.formationDate}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>EIN</span>
              <span className={passport.foundation.hasEin ? 'status-pill success' : 'status-pill warning'}>{passport.foundation.hasEin ? 'Yes' : 'No'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Bank Account</span>
              <span className={passport.foundation.hasBank ? 'status-pill success' : 'status-pill warning'}>{passport.foundation.hasBank ? 'Yes' : 'No'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Address</span>
              <span className={passport.foundation.hasAddress ? 'status-pill success' : 'status-pill warning'}>{passport.foundation.hasAddress ? 'Yes' : 'No'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Phone</span>
              <span className={passport.foundation.hasPhone ? 'status-pill success' : 'status-pill warning'}>{passport.foundation.hasPhone ? 'Yes' : 'No'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Website</span>
              <span className={passport.foundation.hasWebsite ? 'status-pill success' : 'status-pill warning'}>{passport.foundation.hasWebsite ? 'Yes' : 'No'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Domain Email</span>
              <span className={passport.foundation.hasDomainEmail ? 'status-pill success' : 'status-pill warning'}>{passport.foundation.hasDomainEmail ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </article>

        <article className="brutal-card">
          <h2>Bureau Setup</h2>
          <div style={{ display: 'grid', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Dun & Bradstreet (DUNS)</span>
              <BureauBadge verified={passport.bureauSetup.hasDuns} />
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

          <h2 style={{ marginTop: '20px' }}>Score History Summary</h2>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div>
              <span className="metric-label">Credit Architect Score</span>
              <strong className="metric-value">{passport.scoreHistorySummary.currentScore}</strong>
            </div>
            <div>
              <p>{passport.scoreHistorySummary.signalsCompleted} / {passport.scoreHistorySummary.totalSignals} signals complete</p>
            </div>
          </div>
        </article>
      </div>

      <div className="card-grid">
        <article className="brutal-card">
          <h2>Vendor Credit & Tradeline Evidence</h2>
          {passport.vendorCredit.length === 0 ? (
            <p>No vendor credit or tradelines tracked.</p>
          ) : (
            <div className="table-responsive">
              <table className="brutal-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ borderBottom: '2px solid var(--ink)', padding: '8px' }}>Vendor</th>
                    <th style={{ borderBottom: '2px solid var(--ink)', padding: '8px' }}>Type</th>
                    <th style={{ borderBottom: '2px solid var(--ink)', padding: '8px' }}>Status</th>
                    <th style={{ borderBottom: '2px solid var(--ink)', padding: '8px' }}>Limit</th>
                  </tr>
                </thead>
                <tbody>
                  {passport.vendorCredit.map(t => (
                    <tr key={t.id}>
                      <td style={{ borderBottom: '1px solid var(--ink)', padding: '8px' }}>{t.vendorName}</td>
                      <td style={{ borderBottom: '1px solid var(--ink)', padding: '8px' }}>{t.accountType}</td>
                      <td style={{ borderBottom: '1px solid var(--ink)', padding: '8px' }}>
                        <span className="status-pill info" style={{ fontSize: '0.65rem' }}>{t.status.replace('_', ' ')}</span>
                      </td>
                      <td style={{ borderBottom: '1px solid var(--ink)', padding: '8px' }}>${t.limitAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </article>

        <article className="brutal-card">
          <h2>Milestones</h2>
          <div className="timeline">
            {passport.milestones.map(step => (
              <div className="roadmap-row" key={step.id}>
                <span className={step.isComplete ? 'status-pill success' : 'status-pill warning'}>
                  {step.phase}
                </span>
                <span>{step.title}</span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="safety-disclaimer" style={{ marginTop: '30px', padding: '15px', border: '1px solid var(--ink)', background: 'var(--paper)', fontSize: '0.85rem' }}>
        <strong>Educational planning only.</strong> This does not guarantee approvals, funding, bureau reporting, tradelines, score changes, or lender outcomes. Verify vendor requirements and reporting directly.
      </div>
    </section>
  );
}

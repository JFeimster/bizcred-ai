import { useMemo, useState } from 'react';
import { generateAlerts } from '../modules/alerts/generateAlerts';
import { calculateCreditArchitectScore } from '../modules/creditArchitect/calculateCreditArchitectScore';
import { getNextBestMove } from '../modules/creditArchitect/getNextBestMove';
import { getReadinessTier } from '../modules/creditArchitect/getReadinessTier';
import { buildRoadmap } from '../modules/roadmap/buildRoadmap';
import { readLocal, writeLocal, removeLocal } from '../storage/localStorageClient';
import { defaultProfile, defaultTradelines } from '../storage/storageDefaults';
import { STORAGE_KEYS } from '../storage/storageKeys';
import type { BusinessProfile } from '../types/businessProfile';
import type { Tradeline } from '../types/tradeline';

import { CreditArchitectScoreCard } from '../components/cards/CreditArchitectScoreCard';
import { NextBestMoveCard } from '../components/cards/NextBestMoveCard';
import { ProfileCompletenessCard } from '../components/cards/ProfileCompletenessCard';
import { BureauCoverageCard } from '../components/cards/BureauCoverageCard';
import { MilestoneProgressCard } from '../components/cards/MilestoneProgressCard';
import { AlertSummaryCard } from '../components/cards/AlertSummaryCard';
import { ReadinessBadge } from '../components/badges/ReadinessBadge';

export default function BusinessHqPage() {
  const [profile, setProfile] = useState<BusinessProfile>(() => readLocal(STORAGE_KEYS.profile, defaultProfile));
  const [tradelines, setTradelines] = useState<Tradeline[]>(() => readLocal(STORAGE_KEYS.tradelines, defaultTradelines));

  const score = useMemo(() => calculateCreditArchitectScore(profile, tradelines), [profile, tradelines]);
  const nextMove = useMemo(() => getNextBestMove(profile, tradelines), [profile, tradelines]);
  const tier = useMemo(() => getReadinessTier(profile, tradelines), [profile, tradelines]);
  const alerts = useMemo(() => generateAlerts(profile, tradelines), [profile, tradelines]);
  const milestones = useMemo(() => buildRoadmap(profile, tradelines), [profile, tradelines]);

  const handleExport = () => {
    const data = { profile, tradelines };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bizcredit-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            if (data.profile) {
              setProfile(data.profile);
              writeLocal(STORAGE_KEYS.profile, data.profile);
            }
            if (data.tradelines) {
              setTradelines(data.tradelines);
              writeLocal(STORAGE_KEYS.tradelines, data.tradelines);
            }
          } catch (err) {
            console.error('Import failed', err);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      setProfile(defaultProfile);
      setTradelines(defaultTradelines);
      removeLocal(STORAGE_KEYS.profile);
      removeLocal(STORAGE_KEYS.tradelines);
    }
  };

  return (
    <section className="page-stack">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p className="eyebrow">BizCredit Builder OS</p>
            <h1>Business HQ</h1>
            <p>Local-first readiness dashboard. No backend storage, no tracking, and no approval guarantees.</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleExport} className="status-pill info" style={{ cursor: 'pointer', background: 'none' }}>Export Data</button>
            <button onClick={handleImport} className="status-pill info" style={{ cursor: 'pointer', background: 'none' }}>Import Data</button>
            <button onClick={handleReset} className="status-pill danger" style={{ cursor: 'pointer', background: 'none' }}>Reset</button>
          </div>
        </div>
        <div style={{ marginTop: '10px' }}>
          <ReadinessBadge tier={tier} />
        </div>
      </div>

      <div className="card-grid">
        <CreditArchitectScoreCard score={score.score} completedSignals={score.completedSignals} totalSignals={score.totalSignals} />
        <NextBestMoveCard nextMove={nextMove} />
        <ProfileCompletenessCard profile={profile} />
      </div>

      <div className="two-column-grid">
        <BureauCoverageCard tradelines={tradelines} hasDuns={profile.hasDuns} />
        <MilestoneProgressCard milestones={milestones} />
      </div>

      <div className="two-column-grid">
        <AlertSummaryCard alerts={alerts} />
      </div>

      <div className="safety-disclaimer" style={{ marginTop: '30px', padding: '15px', border: '1px solid var(--ink)', background: 'var(--paper)', fontSize: '0.85rem' }}>
        <strong>Educational planning only.</strong> This does not guarantee approvals, funding, bureau reporting, tradelines, score changes, or lender outcomes. Verify vendor requirements and reporting directly.
      </div>
    </section>
  );
}

import { useMemo, useState } from 'react';
import { generateAlerts } from '../modules/alerts/generateAlerts';
import { calculateCreditArchitectScore } from '../modules/creditArchitect/calculateCreditArchitectScore';
import { getNextBestMove } from '../modules/creditArchitect/getNextBestMove';
import { buildRoadmap } from '../modules/roadmap/buildRoadmap';
import { readLocal } from '../storage/localStorageClient';
import { defaultProfile, defaultTradelines } from '../storage/storageDefaults';
import { STORAGE_KEYS } from '../storage/storageKeys';
import type { BusinessProfile } from '../types/businessProfile';
import type { Tradeline } from '../types/tradeline';

export default function DashboardPage() {
  const [profile] = useState<BusinessProfile>(() => readLocal(STORAGE_KEYS.profile, defaultProfile));
  const [tradelines] = useState<Tradeline[]>(() => readLocal(STORAGE_KEYS.tradelines, defaultTradelines));

  const score = useMemo(() => calculateCreditArchitectScore(profile, tradelines), [profile, tradelines]);
  const nextMove = useMemo(() => getNextBestMove(profile, tradelines), [profile, tradelines]);
  const alerts = useMemo(() => generateAlerts(profile, tradelines), [profile, tradelines]);
  const roadmap = useMemo(() => buildRoadmap(profile, tradelines), [profile, tradelines]);

  return (
    <section className="page-stack">
      <div className="page-header">
        <p className="eyebrow">BizCredit Builder OS</p>
        <h1>Business HQ</h1>
        <p>Local-first readiness dashboard. No backend storage, no tracking, and no approval guarantees.</p>
      </div>

      <div className="card-grid">
        <article className="brutal-card accent-acid">
          <span className="metric-label">Credit Architect Score</span>
          <strong className="metric-value">{score.score}</strong>
          <p>{score.completedSignals} of {score.totalSignals} setup signals complete.</p>
        </article>
        <article className="brutal-card accent-yellow">
          <span className="metric-label">Next Best Move</span>
          <p>{nextMove}</p>
        </article>
        <article className="brutal-card accent-cyan">
          <span className="metric-label">Planner</span>
          <strong className="metric-value">{tradelines.length}</strong>
          <p>vendors or tradelines being tracked.</p>
        </article>
      </div>

      <div className="two-column-grid">
        <article className="brutal-card">
          <h2>Alerts</h2>
          {alerts.length === 0 ? <p>No major setup alerts.</p> : alerts.map((alert) => (
            <div className={`alert ${alert.severity}`} key={alert.id}>
              <strong>{alert.title}</strong>
              <p>{alert.message}</p>
            </div>
          ))}
        </article>

        <article className="brutal-card">
          <h2>Roadmap Snapshot</h2>
          {roadmap.map((step) => (
            <div className="roadmap-row" key={step.id}>
              <span className={step.isComplete ? 'status-pill success' : 'status-pill warning'}>{step.phase}</span>
              <span>{step.title}</span>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}

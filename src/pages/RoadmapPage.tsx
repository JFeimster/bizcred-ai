import { useMemo, useState } from 'react';
import { buildRoadmap } from '../modules/roadmap/buildRoadmap';
import { readLocal } from '../storage/localStorageClient';
import { defaultProfile, defaultTradelines } from '../storage/storageDefaults';
import { STORAGE_KEYS } from '../storage/storageKeys';
import type { BusinessProfile } from '../types/businessProfile';
import type { Tradeline } from '../types/tradeline';

export default function RoadmapPage() {
  const [profile] = useState<BusinessProfile>(() => readLocal(STORAGE_KEYS.profile, defaultProfile));
  const [tradelines] = useState<Tradeline[]>(() => readLocal(STORAGE_KEYS.tradelines, defaultTradelines));
  const roadmap = useMemo(() => buildRoadmap(profile, tradelines), [profile, tradelines]);

  return (
    <section className="page-stack">
      <div className="page-header">
        <p className="eyebrow">Roadmap</p>
        <h1>Readiness Roadmap</h1>
        <p>Sequenced educational checklist for business-credit setup and vendor research.</p>
      </div>

      <div className="timeline">
        {roadmap.map((step) => (
          <article className="brutal-card roadmap-card" key={step.id}>
            <span className={step.isComplete ? 'status-pill success' : 'status-pill warning'}>{step.isComplete ? 'Complete' : 'Next'}</span>
            <h2>{step.phase}: {step.title}</h2>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

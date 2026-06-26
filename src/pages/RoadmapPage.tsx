import { useState, useEffect } from 'react';
import { readLocal } from '../storage/localStorageClient';
import { STORAGE_KEYS } from '../storage/storageKeys';
import { defaultBusinessProfile, defaultTradelines } from '../storage/storageDefaults';
import { buildRoadmap } from '../modules/roadmap/buildRoadmap';
import { calculateCreditArchitectScore } from '../modules/creditArchitect/calculateCreditArchitectScore';
import { Roadmap, RoadmapPhase } from '../types/roadmap';

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  useEffect(() => {
    // In a real app we'd fetch templates dynamically. Here we fetch from public.
    fetch('/data/templates/roadmap-templates.json')
      .then(res => res.json())
      .then((templates: RoadmapPhase[]) => {
        const profile = readLocal(STORAGE_KEYS.BUSINESS_PROFILE, defaultBusinessProfile);
        const tradelines = readLocal(STORAGE_KEYS.TRADELINES, defaultTradelines);
        const scoreResult = calculateCreditArchitectScore(profile, tradelines);

        const generatedRoadmap = buildRoadmap(profile, tradelines, scoreResult, templates);
        setRoadmap(generatedRoadmap);
      })
      .catch(err => console.error("Failed to load roadmap templates:", err));
  }, []);

  if (!roadmap) return <div>Loading roadmap...</div>;

  const currentPhaseData = roadmap.phases.find(p => p.phase === roadmap.currentPhase);

  return (
    <div>
      <h1 className="page-header">Credit Builder Roadmap</h1>

      <div className="warning-strip">
        Educational tool only. Following this roadmap does not guarantee approvals, funding, or specific credit score increases.
      </div>

      {currentPhaseData && (
        <div className="brutal-card" style={{ backgroundColor: 'var(--acid)', marginBottom: 'var(--space-xl)' }}>
          <h2 style={{ marginBottom: '0.25rem' }}>Current: Phase {currentPhaseData.phase} - {currentPhaseData.title}</h2>
          <p style={{ fontWeight: 'bold' }}>{currentPhaseData.description}</p>

          <div style={{ backgroundColor: 'var(--surface)', padding: 'var(--space-md)', border: 'var(--border-thin)', marginTop: 'var(--space-md)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Caution Note</h4>
            <p className="text-sm" style={{ margin: 0 }}>{currentPhaseData.cautionNote}</p>
          </div>
        </div>
      )}

      <div className="dashboard-row">
        {/* Timeline */}
        <div className="brutal-card" style={{ flex: '2 1 600px' }}>
          <h3 className="brutal-card-title">Roadmap Phases</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {roadmap.phases.map(phase => (
              <div
                key={phase.id}
                style={{
                  padding: '1rem',
                  border: 'var(--border-thick)',
                  backgroundColor: phase.phase < roadmap.currentPhase ? 'var(--gray-light)' : phase.phase === roadmap.currentPhase ? 'var(--yellow)' : 'var(--surface)',
                  opacity: phase.phase > roadmap.currentPhase ? 0.6 : 1
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0 }}>Phase {phase.phase}: {phase.title}</h4>
                  {phase.phase < roadmap.currentPhase && <span className="status-pill success">Completed</span>}
                  {phase.phase === roadmap.currentPhase && <span className="status-pill info">In Progress</span>}
                </div>

                {phase.phase === roadmap.currentPhase && (
                  <div style={{ marginTop: '1rem' }}>
                    <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                      {phase.steps.map(step => (
                        <li key={step.id} style={{ marginBottom: '0.5rem', textDecoration: step.isComplete ? 'line-through' : 'none' }}>
                          <strong>{step.title}:</strong> {step.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        <div style={{ flex: '1 1 300px' }}>
          {currentPhaseData && (
            <>
              <div className="brutal-card" style={{ backgroundColor: 'var(--surface)' }}>
                <h3 className="brutal-card-title">Recommended Actions</h3>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem' }}>
                  {currentPhaseData.recommendedActions.map((action, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>{action}</li>
                  ))}
                </ul>
              </div>

              <div className="brutal-card" style={{ backgroundColor: 'var(--pink)', color: 'var(--ink)' }}>
                <h3 className="brutal-card-title">BizCredit GPT Prompt</h3>
                <p className="text-sm" style={{ fontStyle: 'italic' }}>Copy this into the GPT:</p>
                <div style={{ backgroundColor: 'var(--surface)', padding: '0.5rem', border: 'var(--border-thin)', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
                  "I am currently in Phase {currentPhaseData.phase}: {currentPhaseData.title} of building my business credit. What are the specific underwriting requirements I should verify before proceeding?"
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
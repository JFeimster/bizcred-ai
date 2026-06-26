import type { CustomGpt } from '../../types/CustomGpt';

interface CustomGptCardProps {
  gpt: CustomGpt;
}

export default function CustomGptCard({ gpt }: CustomGptCardProps) {
  return (
    <article className="brutal-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start' }}>
        <div>
          <h2>{gpt.name}</h2>
          <p>{gpt.description || 'Educational GPT resource for business-credit readiness.'}</p>
        </div>
        <span className="status-pill info">{gpt.category || 'GPT'}</span>
      </div>

      <div className="timeline">
        {gpt.recommended_stage && <div className="roadmap-row"><strong>Stage</strong><span>{gpt.recommended_stage}</span></div>}
        {gpt.audience?.length ? <div className="roadmap-row"><strong>Audience</strong><span>{gpt.audience.join(', ')}</span></div> : null}
        <div className="roadmap-row"><strong>Access URL</strong><span>{gpt.has_access_url || gpt.url ? 'Available' : 'Not available'}</span></div>
        <div className="roadmap-row"><strong>Verification</strong><span className="status-pill warning">{gpt.verification_status || 'needs_review'}</span></div>
      </div>
    </article>
  );
}

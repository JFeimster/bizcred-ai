import type { FundingTool } from '../../types/FundingTool';

interface FundingToolCardProps {
  tool: FundingTool;
}

export default function FundingToolCard({ tool }: FundingToolCardProps) {
  return (
    <article className="brutal-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start' }}>
        <div>
          <h2>{tool.name}</h2>
          <p>{tool.description || 'Educational funding-readiness tool.'}</p>
        </div>
        <span className="status-pill info">{tool.status || 'planned'}</span>
      </div>

      <div className="timeline">
        {tool.persona && <div className="roadmap-row"><strong>Persona</strong><span>{tool.persona}</span></div>}
        {tool.problem_keyword && <div className="roadmap-row"><strong>Solves</strong><span>{tool.problem_keyword}</span></div>}
        {tool.asset_type && <div className="roadmap-row"><strong>Asset Type</strong><span>{tool.asset_type}</span></div>}
        {tool.partner_channel && <div className="roadmap-row"><strong>Channel</strong><span>{tool.partner_channel}</span></div>}
        <div className="roadmap-row"><strong>Verification</strong><span className="status-pill warning">{tool.verification_status || 'needs_review'}</span></div>
      </div>
    </article>
  );
}

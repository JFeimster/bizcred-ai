import React from 'react';
import type { FundingTool } from '../../types/FundingTool';

interface FundingToolCardProps {
  tool: FundingTool;
}

const FundingToolCard: React.FC<FundingToolCardProps> = ({ tool }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{tool.name}</h3>
        {tool.status && <span className="badge">{tool.status}</span>}
      </div>
      <div className="card-body">
        {tool.persona && (
          <div className="detail-row">
            <span className="detail-label">Persona:</span>
            <span className="detail-value">{tool.persona}</span>
          </div>
        )}
        {tool.asset_type && (
          <div className="detail-row">
            <span className="detail-label">Asset Type:</span>
            <span className="detail-value">{tool.asset_type}</span>
          </div>
        )}
        {tool.problem_keyword && (
          <div className="detail-row">
            <span className="detail-label">Solves:</span>
            <span className="detail-value">{tool.problem_keyword}</span>
          </div>
        )}
        <div className="detail-row">
          <span className="detail-label">Verification:</span>
          <span className={`badge ${tool.verification_status === 'verified' ? 'success' : 'warning'}`}>
            {tool.verification_status || 'needs_review'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FundingToolCard;

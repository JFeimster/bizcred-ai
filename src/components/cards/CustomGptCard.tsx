import React from 'react';
import type { CustomGpt } from '../../types/CustomGpt';

interface CustomGptCardProps {
  gpt: CustomGpt;
}

const CustomGptCard: React.FC<CustomGptCardProps> = ({ gpt }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{gpt.name}</h3>
        {gpt.category && <span className="badge">{gpt.category}</span>}
      </div>
      <div className="card-body">
        {gpt.recommended_stage && (
          <div className="detail-row">
            <span className="detail-label">Stage:</span>
            <span className="detail-value">{gpt.recommended_stage}</span>
          </div>
        )}
        <div className="detail-row">
          <span className="detail-label">Access URL:</span>
          <span className="detail-value">{gpt.has_access_url ? 'Available' : 'Not Available'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Verification:</span>
          <span className={`badge ${gpt.verification_status === 'verified' ? 'success' : 'warning'}`}>
            {gpt.verification_status || 'needs_review'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomGptCard;

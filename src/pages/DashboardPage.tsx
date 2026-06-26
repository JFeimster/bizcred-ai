import { useState, useEffect } from 'react';
import { readLocal } from '../storage/localStorageClient';
import { STORAGE_KEYS } from '../storage/storageKeys';
import { defaultBusinessProfile, defaultTradelines } from '../storage/storageDefaults';
import { calculateCreditArchitectScore } from '../modules/creditArchitect/calculateCreditArchitectScore';
import { getNextBestMove } from '../modules/creditArchitect/getNextBestMove';
import { generateAlerts } from '../modules/alerts/generateAlerts';

export default function DashboardPage() {
  const [profile, setProfile] = useState(defaultBusinessProfile);
  const [tradelines, setTradelines] = useState(defaultTradelines);
  const [isEmptyState, setIsEmptyState] = useState(true);

  useEffect(() => {
    const savedProfile = readLocal(STORAGE_KEYS.BUSINESS_PROFILE, defaultBusinessProfile);
    const savedTradelines = readLocal(STORAGE_KEYS.TRADELINES, defaultTradelines);
    setProfile(savedProfile);
    setTradelines(savedTradelines);

    // Check if empty state
    if (savedProfile.businessName || savedProfile.entityType !== 'other' || savedTradelines.length > 0) {
      setIsEmptyState(false);
    }
  }, []);

  if (isEmptyState) {
    return (
      <div className="empty-state">
        <h2 className="page-title">Welcome to BizCredit OS</h2>
        <p>Your local-first command center for building business credit.</p>
        <div style={{ marginTop: '2rem' }}>
          <h3>Starter Checklist</h3>
          <ul style={{ textAlign: 'left', display: 'inline-block', maxWidth: '400px' }}>
            <li>Go to <strong>Profile</strong> to set up your business foundation.</li>
            <li>Explore the <strong>Directory</strong> to find starter vendors.</li>
            <li>Use the <strong>Tradeline Planner</strong> to track your applications.</li>
            <li>Check your <strong>Roadmap</strong> to see your next steps.</li>
          </ul>
        </div>
      </div>
    );
  }

  const scoreResult = calculateCreditArchitectScore(profile, tradelines, 0);
  const nextMove = getNextBestMove(scoreResult, profile, tradelines);
  const alerts = generateAlerts(profile, tradelines);

  return (
    <div>
      <h1 className="page-header">Dashboard</h1>

      <div className="dashboard-row">
        {/* Score Card */}
        <div className="brutal-card metric-card">
          <h3 className="brutal-card-title">Credit Architect Score</h3>
          <div className="metric-value">{scoreResult.overall}</div>
          <p className="text-sm">Readiness Indicator (0-100)</p>
        </div>

        {/* Next Best Move */}
        <div className="brutal-card" style={{ backgroundColor: 'var(--acid)' }}>
          <h3 className="brutal-card-title">Next Best Move</h3>
          <h4 style={{ margin: '1rem 0 0.5rem 0' }}>{nextMove.title}</h4>
          <p className="text-sm">{nextMove.reason}</p>
          <div className="status-pill info" style={{ marginTop: '0.5rem' }}>{nextMove.action}</div>
        </div>

        {/* Profile Completeness */}
        <div className="brutal-card">
          <h3 className="brutal-card-title">Profile Signals</h3>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Entity Setup:</span>
              <span className={profile.entityType !== 'other' ? 'text-mono' : 'text-mono'} style={{ color: profile.entityType !== 'other' ? 'green' : 'red' }}>
                {profile.entityType !== 'other' ? 'YES' : 'NO'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Active EIN:</span>
              <span className={profile.einStatus === 'active' ? 'text-mono' : 'text-mono'} style={{ color: profile.einStatus === 'active' ? 'green' : 'red' }}>
                {profile.einStatus === 'active' ? 'YES' : 'NO'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Bank Account:</span>
              <span className={profile.businessBankAccount ? 'text-mono' : 'text-mono'} style={{ color: profile.businessBankAccount ? 'green' : 'red' }}>
                {profile.businessBankAccount ? 'YES' : 'NO'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-row">
        {/* Alerts Summary */}
        <div className="brutal-card" style={{ flex: '2 1 600px' }}>
          <h3 className="brutal-card-title">Readiness Alerts ({alerts.length})</h3>
          {alerts.length === 0 ? (
            <p>All clear! Your foundation looks solid.</p>
          ) : (
            <div>
              {alerts.slice(0, 3).map(alert => (
                <div key={alert.id} className={`alert-card ${alert.severity}`}>
                  <div className="alert-header">
                    <span className="alert-title">{alert.title}</span>
                    <span className={`status-pill ${alert.severity === 'critical' ? 'danger' : 'warning'}`}>{alert.severity}</span>
                  </div>
                  <p className="text-sm" style={{ marginBottom: '0.5rem' }}>{alert.description}</p>
                </div>
              ))}
              {alerts.length > 3 && <p className="text-sm">...and {alerts.length - 3} more alerts.</p>}
            </div>
          )}
        </div>

        {/* Tradeline Summary */}
        <div className="brutal-card">
          <h3 className="brutal-card-title">Tradeline Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{tradelines.length}</div>
              <div className="text-sm">Total</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{tradelines.filter(t => t.status === 'active' || t.status === 'reporting').length}</div>
              <div className="text-sm">Active</div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="brutal-card action-card" style={{ flex: '1 1 200px' }}>
          <h3 style={{ margin: 0 }}>Build My Roadmap</h3>
        </div>
        <div className="brutal-card action-card" style={{ flex: '1 1 200px', backgroundColor: 'var(--yellow)' }}>
          <h3 style={{ margin: 0 }}>Find Tier 1 Vendors</h3>
        </div>
        <div className="brutal-card action-card" style={{ flex: '1 1 200px', backgroundColor: 'var(--pink)' }}>
          <h3 style={{ margin: 0 }}>Add Vendor to Planner</h3>
        </div>
        <div className="brutal-card action-card" style={{ flex: '1 1 200px', backgroundColor: 'var(--cyan)' }}>
          <h3 style={{ margin: 0 }}>Check Funding Readiness</h3>
        </div>
        <div className="brutal-card action-card" style={{ flex: '1 1 200px', backgroundColor: 'var(--gray-light)' }}>
          <h3 style={{ margin: 0 }}>Export Dashboard</h3>
        </div>
        <div className="brutal-card action-card" style={{ flex: '1 1 200px', backgroundColor: 'var(--acid)' }}>
          <h3 style={{ margin: 0 }}>Backup Dashboard</h3>
        </div>
      </div>
    </div>
  );
}
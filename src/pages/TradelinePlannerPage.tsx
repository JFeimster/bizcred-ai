import { useState, useEffect } from 'react';
import { readLocal, writeLocal } from '../storage/localStorageClient';
import { STORAGE_KEYS } from '../storage/storageKeys';
import { defaultTradelines } from '../storage/storageDefaults';
import { Tradeline, TradelineStatus, VerificationStatus } from '../types/tradeline';
import { addTradeline, updateTradeline, removeTradeline } from '../modules/tradelines/updateTradeline';

export default function TradelinePlannerPage() {
  const [tradelines, setTradelines] = useState<Tradeline[]>(defaultTradelines);
  const [newVendorName, setNewVendorName] = useState('');
  const [newTier, setNewTier] = useState(1);

  useEffect(() => {
    setTradelines(readLocal<Tradeline[]>(STORAGE_KEYS.TRADELINES, defaultTradelines));
  }, []);

  const saveState = (newState: Tradeline[]) => {
    setTradelines(newState);
    writeLocal(STORAGE_KEYS.TRADELINES, newState);
  };

  const handleStatusChange = (id: string, newStatus: TradelineStatus) => {
    const updated = updateTradeline(tradelines, { ...tradelines.find(t => t.id === id)!, status: newStatus });
    saveState(updated);
  };

  const handleVerificationChange = (id: string, newStatus: VerificationStatus) => {
    const updated = updateTradeline(tradelines, { ...tradelines.find(t => t.id === id)!, verificationStatus: newStatus });
    saveState(updated);
  };

  const handleRemove = (id: string) => {
    const updated = removeTradeline(tradelines, id);
    saveState(updated);
  };

  const handleAddTradeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendorName) return;

    const newTradeline: Tradeline = {
      id: `custom_${Date.now()}`,
      vendorId: `custom_${Date.now()}`,
      vendorName: newVendorName,
      tier: newTier,
      status: 'planned',
      verificationStatus: 'unverified'
    };

    const updated = addTradeline(tradelines, newTradeline);
    saveState(updated);
    setNewVendorName('');
  };

  return (
    <div>
      <h1 className="page-header">Tradeline Planner</h1>
      <div className="warning-strip">
        Educational tool only. Adding a tradeline here does not guarantee approval or bureau reporting. Verify directly.
      </div>

      <div className="dashboard-row">
        <div className="brutal-card metric-card" style={{ flex: '1 1 200px' }}>
          <h3 className="brutal-card-title">Planned</h3>
          <div className="metric-value">{tradelines.filter(t => t.status === 'planned' || t.status === 'researching').length}</div>
        </div>
        <div className="brutal-card metric-card" style={{ flex: '1 1 200px', backgroundColor: 'var(--cyan)' }}>
          <h3 className="brutal-card-title">Applied</h3>
          <div className="metric-value">{tradelines.filter(t => t.status === 'applied').length}</div>
        </div>
        <div className="brutal-card metric-card" style={{ flex: '1 1 200px', backgroundColor: 'var(--acid)' }}>
          <h3 className="brutal-card-title">Active/Reporting</h3>
          <div className="metric-value">{tradelines.filter(t => t.status === 'active' || t.status === 'reporting').length}</div>
        </div>
      </div>

      <div className="brutal-card" style={{ marginBottom: 'var(--space-lg)' }}>
        <h3 className="brutal-card-title">Add Custom Tradeline</h3>
        <form onSubmit={handleAddTradeline} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ marginBottom: 0, flex: '1 1 300px' }}>
            <label className="form-label">Vendor Name</label>
            <input type="text" value={newVendorName} onChange={(e) => setNewVendorName(e.target.value)} className="neo-input" placeholder="e.g., Uline, Quill..." required />
          </div>
          <div className="form-group" style={{ marginBottom: 0, flex: '0 0 100px' }}>
            <label className="form-label">Tier</label>
            <select value={newTier} onChange={(e) => setNewTier(Number(e.target.value))} className="neo-select">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <button type="submit" className="neo-button neo-button--primary" style={{ flex: '0 0 auto' }}>Add to Planner</button>
        </form>
      </div>

      <div className="table-container">
        <table className="neo-table">
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Tier</th>
              <th>Status</th>
              <th>Verification</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tradelines.map(t => (
              <tr key={t.id}>
                <td><strong>{t.vendorName}</strong></td>
                <td><span className="tier-badge">{t.tier}</span></td>
                <td>
                  <select
                    value={t.status}
                    onChange={(e) => handleStatusChange(t.id, e.target.value as TradelineStatus)}
                    className="neo-select text-sm"
                    style={{ width: 'auto', padding: '0.25rem' }}
                  >
                    <option value="planned">Planned</option>
                    <option value="researching">Researching</option>
                    <option value="applied">Applied</option>
                    <option value="active">Active</option>
                    <option value="reporting">Reporting</option>
                    <option value="needs_verification">Needs Verification</option>
                    <option value="not_fit">Not Fit</option>
                  </select>
                </td>
                <td>
                  <select
                    value={t.verificationStatus}
                    onChange={(e) => handleVerificationChange(t.id, e.target.value as VerificationStatus)}
                    className="neo-select text-sm"
                    style={{ width: 'auto', padding: '0.25rem' }}
                  >
                    <option value="unverified">Unverified</option>
                    <option value="verified_reporting">Verified Reporting</option>
                    <option value="verified_not_reporting">Verified Not Reporting</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleRemove(t.id)} className="neo-button neo-button--danger text-sm" style={{ padding: '0.25rem 0.5rem' }}>Remove</button>
                </td>
              </tr>
            ))}
            {tradelines.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                  No tradelines in planner. Go to Directory to add some.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
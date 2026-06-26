import React, { useState, useEffect } from 'react';
import { readLocal, writeLocal } from '../storage/localStorageClient';
import { STORAGE_KEYS } from '../storage/storageKeys';
import { defaultBusinessProfile } from '../storage/storageDefaults';
import { BusinessProfile } from '../types/businessProfile';

export default function ProfilePage() {
  const [profile, setProfile] = useState<BusinessProfile>(defaultBusinessProfile);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const savedProfile = readLocal<BusinessProfile>(STORAGE_KEYS.BUSINESS_PROFILE, defaultBusinessProfile);
    setProfile(savedProfile);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    // Type casting because we know we are handling a checkbox input if type is 'checkbox'
    const checked = (e.target as HTMLInputElement).checked;

    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    writeLocal(STORAGE_KEYS.BUSINESS_PROFILE, profile);
    setSaveStatus('Profile Saved!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  return (
    <div>
      <h1 className="page-header">Business Profile</h1>
      <div className="warning-strip">
        Complete this profile to generate an accurate readiness score and roadmap.
      </div>

      <form onSubmit={handleSave} className="page-grid" style={{ gridTemplateColumns: '1fr' }}>

        {/* Foundation */}
        <fieldset className="neo-fieldset">
          <legend className="neo-legend">Business Foundation</legend>
          <div className="dashboard-row" style={{ marginBottom: 0 }}>
            <div className="form-group">
              <label className="form-label">Business Name</label>
              <input type="text" name="businessName" value={profile.businessName} onChange={handleChange} className="neo-input" placeholder="Legal Entity Name" />
            </div>
            <div className="form-group">
              <label className="form-label">Entity Type</label>
              <select name="entityType" value={profile.entityType} onChange={handleChange} className="neo-select">
                <option value="other">Other / Not Formed</option>
                <option value="sole_proprietorship">Sole Proprietorship</option>
                <option value="llc">LLC</option>
                <option value="s_corp">S-Corp</option>
                <option value="c_corp">C-Corp</option>
                <option value="partnership">Partnership</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">EIN Status</label>
              <select name="einStatus" value={profile.einStatus} onChange={handleChange} className="neo-select">
                <option value="none">None</option>
                <option value="applied">Applied</option>
                <option value="active">Active</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Formation Date</label>
              <input type="date" name="formationDate" value={profile.formationDate} onChange={handleChange} className="neo-input" />
            </div>
          </div>
          <div className="form-group checkbox-group" style={{ marginTop: '1rem' }}>
            <input type="checkbox" name="businessBankAccount" checked={profile.businessBankAccount} onChange={handleChange} className="neo-checkbox" id="bankCheck" />
            <label htmlFor="bankCheck" style={{ fontWeight: 'bold' }}>I have a dedicated Business Bank Account</label>
          </div>
        </fieldset>

        {/* Identity Signals */}
        <fieldset className="neo-fieldset">
          <legend className="neo-legend">Identity Signals</legend>
          <div className="dashboard-row" style={{ marginBottom: 0 }}>
            <div className="form-group">
              <label className="form-label">Business Phone</label>
              <input type="text" name="businessPhone" value={profile.businessPhone} onChange={handleChange} className="neo-input" placeholder="(555) 555-5555" />
            </div>
            <div className="form-group">
              <label className="form-label">Business Address</label>
              <input type="text" name="businessAddress" value={profile.businessAddress} onChange={handleChange} className="neo-input" placeholder="123 Main St, Suite 100" />
            </div>
            <div className="form-group">
              <label className="form-label">DUNS Number</label>
              <input type="text" name="dunsNumber" value={profile.dunsNumber} onChange={handleChange} className="neo-input" placeholder="9-digit DUNS" />
            </div>
          </div>
        </fieldset>

        {/* Web Presence */}
        <fieldset className="neo-fieldset">
          <legend className="neo-legend">Web Presence</legend>
          <div className="dashboard-row" style={{ marginBottom: 0 }}>
            <div className="form-group">
              <label className="form-label">Website URL</label>
              <input type="url" name="website" value={profile.website} onChange={handleChange} className="neo-input" placeholder="https://www.yourdomain.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Domain Email</label>
              <input type="email" name="domainEmail" value={profile.domainEmail} onChange={handleChange} className="neo-input" placeholder="info@yourdomain.com" />
            </div>
          </div>
        </fieldset>

        {/* Revenue/Funding Context */}
        <fieldset className="neo-fieldset">
          <legend className="neo-legend">Revenue / Funding Context</legend>
          <div className="dashboard-row" style={{ marginBottom: 0 }}>
            <div className="form-group">
              <label className="form-label">Monthly Revenue</label>
              <select name="monthlyRevenueRange" value={profile.monthlyRevenueRange} onChange={handleChange} className="neo-select">
                <option value="0-1k">$0 - $1,000</option>
                <option value="1k-5k">$1,000 - $5,000</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-50k">$10,000 - $50,000</option>
                <option value="50k+">$50,000+</option>
              </select>
            </div>
          </div>
          <div className="form-group checkbox-group" style={{ marginTop: '1rem' }}>
            <input type="checkbox" name="businessLicense" checked={profile.businessLicense} onChange={handleChange} className="neo-checkbox" id="licenseCheck" />
            <label htmlFor="licenseCheck" style={{ fontWeight: 'bold' }}>I have required Business Licenses</label>
          </div>
        </fieldset>

        {/* Goals */}
        <fieldset className="neo-fieldset">
          <legend className="neo-legend">Goals</legend>
          <div className="form-group">
            <label className="form-label">Primary Goal</label>
            <input type="text" name="primaryGoal" value={profile.primaryGoal} onChange={handleChange} className="neo-input" placeholder="e.g., Get a business credit card, qualify for a loan..." />
          </div>
        </fieldset>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
          <button type="submit" className="neo-button neo-button--primary">Save Profile</button>
          {saveStatus && <span className="status-pill success">{saveStatus}</span>}
        </div>
      </form>
    </div>
  );
}
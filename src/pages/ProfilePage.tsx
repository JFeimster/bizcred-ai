import { useState } from 'react';
import { readLocal, writeLocal } from '../storage/localStorageClient';
import { defaultProfile } from '../storage/storageDefaults';
import { STORAGE_KEYS } from '../storage/storageKeys';
import type { BusinessProfile } from '../types/businessProfile';

const checkboxFields: Array<keyof BusinessProfile> = [
  'businessLicense',
  'hasEin',
  'hasBusinessBankAccount',
  'hasBusinessAddress',
  'hasBusinessPhone',
  'hasWebsite',
  'hasDomainEmail',
  'hasDuns'
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<BusinessProfile>(() => readLocal(STORAGE_KEYS.profile, defaultProfile));
  const [saved, setSaved] = useState(false);

  function updateField<K extends keyof BusinessProfile>(key: K, value: BusinessProfile[K]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function saveProfile() {
    writeLocal(STORAGE_KEYS.profile, profile);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  }

  return (
    <section className="page-stack">
      <div className="page-header">
        <p className="eyebrow">Local Profile</p>
        <h1>Business Profile</h1>
        <p>Track setup signals without turning this into a loan application.</p>
      </div>

      <div className="brutal-card form-grid">
        <label>Business name<input value={profile.businessName} onChange={(event) => updateField('businessName', event.target.value)} /></label>
        <label>Entity type<input value={profile.entityType} onChange={(event) => updateField('entityType', event.target.value)} placeholder="LLC, Corporation, etc." /></label>
        <label>Formation date<input type="month" value={profile.formationDate} onChange={(event) => updateField('formationDate', event.target.value)} /></label>
        <label>Monthly revenue range<input value={profile.monthlyRevenueRange} onChange={(event) => updateField('monthlyRevenueRange', event.target.value)} placeholder="$0-$5k, $5k-$10k, etc." /></label>
        <label className="wide-field">Primary goal<input value={profile.primaryGoal} onChange={(event) => updateField('primaryGoal', event.target.value)} placeholder="Example: prepare for vendor credit research" /></label>
      </div>

      <div className="brutal-card checkbox-grid">
        {checkboxFields.map((field) => (
          <label key={field} className="checkbox-line">
            <input type="checkbox" checked={Boolean(profile[field])} onChange={(event) => updateField(field, event.target.checked as BusinessProfile[typeof field])} />
            <span>{field.replace(/([A-Z])/g, ' $1')}</span>
          </label>
        ))}
      </div>

      <button className="neo-button" type="button" onClick={saveProfile}>{saved ? 'Saved' : 'Save Profile'}</button>
    </section>
  );
}

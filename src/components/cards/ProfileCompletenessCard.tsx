import type { BusinessProfile } from '../../types/businessProfile';

export function ProfileCompletenessCard({ profile }: { profile: BusinessProfile }) {
  const fields = [
    { label: 'Business Name', complete: Boolean(profile.businessName) },
    { label: 'Entity Type', complete: Boolean(profile.entityType) },
    { label: 'Formation Date', complete: Boolean(profile.formationDate) },
    { label: 'EIN', complete: profile.hasEin },
    { label: 'Bank Account', complete: profile.hasBusinessBankAccount },
    { label: 'Business Address', complete: profile.hasBusinessAddress },
    { label: 'Business Phone', complete: profile.hasBusinessPhone },
    { label: 'Website', complete: profile.hasWebsite },
    { label: 'Domain Email', complete: profile.hasDomainEmail }
  ];

  const completed = fields.filter(f => f.complete).length;
  const percentage = Math.round((completed / fields.length) * 100);

  return (
    <article className="brutal-card">
      <h2>Profile Completion</h2>
      <div style={{ marginBottom: '10px' }}>
        <strong>{percentage}%</strong> ({completed}/{fields.length})
      </div>
      <div style={{ display: 'grid', gap: '8px' }}>
        {fields.map(f => (
          <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{f.label}</span>
            <span className={f.complete ? 'status-pill success' : 'status-pill warning'}>
              {f.complete ? 'Yes' : 'No'}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

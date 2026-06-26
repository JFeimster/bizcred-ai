import { readLocal } from '../../storage/localStorageClient';
import { STORAGE_KEYS } from '../../storage/storageKeys';
import type { BusinessProfile } from '../../types/businessProfile';
import type { Passport } from '../../types/passport';

export function exportPassportMarkdown(): string {
  const profile = readLocal<BusinessProfile | null>(STORAGE_KEYS.profile, null);
  const passport = readLocal<Passport | null>(STORAGE_KEYS.passport, null);
  const businessName = profile?.businessName || 'Unnamed Business';

  const lines = [
    `# BizCredit Passport: ${businessName}`,
    '',
    '## Readiness Scores',
    `- Foundation Score: ${passport?.foundationScore ?? 0}/100`,
    `- Vendor Readiness Score: ${passport?.vendorReadinessScore ?? 0}/100`,
    `- Funding Readiness Score: ${passport?.fundingReadinessScore ?? 0}/100`,
    ''
  ];

  if (profile) {
    lines.push(
      '## Business Profile Highlights',
      `- Entity Type: ${profile.entityType || 'Not set'}`,
      `- EIN: ${profile.hasEin ? 'Yes' : 'No'}`,
      `- DUNS: ${profile.hasDuns ? 'Yes' : 'No'}`,
      `- Business Bank Account: ${profile.hasBusinessBankAccount ? 'Yes' : 'No'}`,
      `- Business Address: ${profile.hasBusinessAddress ? 'Yes' : 'No'}`,
      `- Business Phone: ${profile.hasBusinessPhone ? 'Yes' : 'No'}`,
      `- Website: ${profile.hasWebsite ? 'Yes' : 'No'}`,
      `- Domain Email: ${profile.hasDomainEmail ? 'Yes' : 'No'}`,
      ''
    );
  }

  if (passport?.milestones?.length) {
    lines.push('## Milestones');
    passport.milestones.forEach((milestone) => {
      lines.push(`- ${milestone.title} (${milestone.status})`);
    });
    lines.push('');
  }

  lines.push('---', 'Exported via BizCredit OS Local-First Builder. Educational planning only.');
  return lines.join('\n');
}

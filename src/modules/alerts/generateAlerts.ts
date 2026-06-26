import { Alert } from '../../types/alert';
import { BusinessProfile } from '../../types/businessProfile';
import { Tradeline } from '../../types/tradeline';

export function generateAlerts(profile: BusinessProfile, tradelines: Tradeline[]): Alert[] {
  const alerts: Alert[] = [];

  if (profile.einStatus !== 'active') {
    alerts.push({
      id: 'missing_ein',
      title: 'Missing Active EIN',
      description: 'An active Employer Identification Number is a fundamental requirement for business credit.',
      severity: 'critical',
      category: 'setup',
      actionRequired: 'Apply for an EIN via the IRS.',
      actionLink: 'profile'
    });
  }

  if (!profile.businessBankAccount) {
    alerts.push({
      id: 'missing_bank_account',
      title: 'Missing Business Bank Account',
      description: 'Without a dedicated business bank account, vendors and lenders cannot verify your financial separation.',
      severity: 'critical',
      category: 'setup',
      actionRequired: 'Open a business checking account.',
      actionLink: 'profile'
    });
  }

  if (!profile.domainEmail) {
    alerts.push({
      id: 'missing_domain_email',
      title: 'Missing Domain Email',
      description: 'Using a free email service (like @gmail.com) can lead to automatic denials from many underwriters.',
      severity: 'warning',
      category: 'profile',
      actionRequired: 'Set up an email address using your business domain.',
      actionLink: 'profile'
    });
  }

  if (!profile.dunsNumber) {
    alerts.push({
      id: 'missing_duns',
      title: 'Missing DUNS Number',
      description: 'Dun & Bradstreet is a major business credit bureau. A DUNS number is required to build a profile with them.',
      severity: 'warning',
      category: 'setup',
      actionRequired: 'Register for a free DUNS number.',
      actionLink: 'profile'
    });
  }

  const activeTradelines = tradelines.filter(t => t.status === 'active' || t.status === 'reporting').length;
  if (activeTradelines === 0) {
    alerts.push({
      id: 'no_active_tradelines',
      title: 'No Active Vendor Accounts',
      description: 'You currently have no active vendor accounts to report payment history.',
      severity: 'warning',
      category: 'tradeline',
      actionRequired: 'Research and apply for Net-30 accounts.',
      actionLink: 'directory'
    });
  }

  const needsVerification = tradelines.filter(t => t.status === 'needs_verification');
  if (needsVerification.length > 0) {
    alerts.push({
      id: 'unverified_tradelines',
      title: 'Unverified Vendor Reporting',
      description: `You have ${needsVerification.length} vendor(s) that need their reporting status verified directly with them.`,
      severity: 'info',
      category: 'tradeline',
      actionRequired: 'Contact vendors to confirm bureau reporting.',
      actionLink: 'planner'
    });
  }

  return alerts;
}
import type { BusinessProfile } from '../../types/businessProfile';
import type { Tradeline } from '../../types/tradeline';
import type { ReadinessAlert } from '../../types/alert';

export function generateAlerts(profile: BusinessProfile, tradelines: Tradeline[]): ReadinessAlert[] {
  const alerts: ReadinessAlert[] = [];

  if (!profile.hasEin) alerts.push({ id: 'ein', severity: 'warning', title: 'EIN missing', message: 'Confirm EIN setup before vendor research.' });
  if (!profile.hasBusinessBankAccount) alerts.push({ id: 'bank', severity: 'warning', title: 'Bank account missing', message: 'A dedicated business bank account is a common readiness signal.' });
  if (!profile.hasDuns) alerts.push({ id: 'duns', severity: 'info', title: 'DUNS not confirmed', message: 'Verify DUNS and bureau profile details directly.' });
  if (tradelines.length === 0) alerts.push({ id: 'planner', severity: 'info', title: 'Planner empty', message: 'Save a starter vendor to begin tracking readiness.' });

  return alerts;
}

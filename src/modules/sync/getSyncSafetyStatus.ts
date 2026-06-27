import type { DashboardSyncTarget, DashboardSyncSafetyStatus } from '../../types/dashboardSnapshot';

export function getSyncSafetyStatus(target: DashboardSyncTarget): DashboardSyncSafetyStatus {
  switch (target) {
    case 'local_backup':
      return 'safe_browser_only';
    case 'notion_export':
      return 'requires_user_review';
    case 'future_api_sync':
      return 'requires_auth_later';
    default:
      return 'do_not_sync';
  }
}

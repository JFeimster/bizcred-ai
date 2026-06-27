import { DashboardSnapshot } from '../../types/dashboardSnapshot';

export function createSnapshotDownload(snapshot: DashboardSnapshot): string {
  try {
    return JSON.stringify(snapshot, null, 2);
  } catch {
    return '{}';
  }
}

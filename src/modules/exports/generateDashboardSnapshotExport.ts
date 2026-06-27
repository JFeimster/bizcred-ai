import { buildDashboardSnapshot } from '../sync/buildDashboardSnapshot';
import { sanitizeSnapshotForExport } from '../sync/sanitizeSnapshotForExport';
import { createSnapshotDownload } from '../sync/createSnapshotDownload';

export interface DashboardExportResult {
  filename: string;
  content: string;
  mimeType: string;
}

export function generateDashboardSnapshotExport(): DashboardExportResult {
  const rawSnapshot = buildDashboardSnapshot();
  const safeSnapshot = sanitizeSnapshotForExport(rawSnapshot);
  const content = createSnapshotDownload(safeSnapshot);

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `bizcredit-snapshot-${timestamp}.json`;

  return {
    filename,
    content,
    mimeType: 'application/json'
  };
}

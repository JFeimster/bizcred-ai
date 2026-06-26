import { exportLocalState } from '../../storage/localStorageClient';

export function exportDashboardJson(): string {
  return exportLocalState();
}

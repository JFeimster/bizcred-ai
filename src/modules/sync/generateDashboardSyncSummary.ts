import { DashboardSnapshot } from '../../types/dashboardSnapshot';

export interface DashboardSyncSummary {
  sectionCount: number;
  tradelineCount: number;
  alertCount: number;
  importJobCount: number;
  lastUpdatedTimestamp: string | null;
  recommendedNextAction: string;
}

export function generateDashboardSyncSummary(snapshot: DashboardSnapshot): DashboardSyncSummary {
  let sectionCount = 0;
  let tradelineCount = 0;
  let alertCount = 0;
  let importJobCount = 0;

  for (const [key, value] of Object.entries(snapshot.sections)) {
    if (value !== null && value !== undefined) {
      sectionCount++;

      if (key === 'tradelines' && Array.isArray(value)) {
        tradelineCount = value.length;
      }
      if (key === 'alerts' && Array.isArray(value)) {
        alertCount = value.length;
      }
      if (key === 'imports' && Array.isArray(value)) {
        importJobCount = value.length;
      }
    }
  }

  let recommendedNextAction = 'Export dashboard snapshot to backup your data.';
  if (tradelineCount === 0 && !snapshot.sections.passport) {
    recommendedNextAction = 'Fill out your BizCredit Passport to get started.';
  } else if (tradelineCount === 0) {
    recommendedNextAction = 'Add some tradelines from the Directory.';
  }

  return {
    sectionCount,
    tradelineCount,
    alertCount,
    importJobCount,
    lastUpdatedTimestamp: snapshot.meta.timestamp || null,
    recommendedNextAction
  };
}

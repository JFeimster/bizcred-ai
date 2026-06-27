import {
  DashboardSnapshot,
  DashboardSnapshotSection,
  DashboardSyncDiff,
  DashboardSyncDiffItem
} from '../../types/dashboardSnapshot';

export function compareDashboardSnapshots(
  oldSnapshot: DashboardSnapshot,
  newSnapshot: DashboardSnapshot
): DashboardSyncDiff {
  const items: DashboardSyncDiffItem[] = [];

  const sectionsToCompare: DashboardSnapshotSection[] = [
    'profile',
    'passport',
    'tradelines',
    'roadmap',
    'alerts',
    'imports',
    'exports',
    'fundingTools',
    'customGpts',
    'notionTemplateSources'
  ];

  for (const section of sectionsToCompare) {
    const oldData = oldSnapshot.sections[section];
    const newData = newSnapshot.sections[section];

    if (!oldData && newData) {
      items.push({ section, type: 'added', details: `Added ${section}` });
    } else if (oldData && !newData) {
      items.push({ section, type: 'removed', details: `Removed ${section}` });
    } else if (oldData && newData && JSON.stringify(oldData) !== JSON.stringify(newData)) {
      items.push({ section, type: 'changed', details: `Updated ${section}` });
    }
  }

  return {
    timestamp: new Date().toISOString(),
    items,
    hasChanges: items.length > 0
  };
}

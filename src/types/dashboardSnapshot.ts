export type DashboardSyncTarget = 'notion_export' | 'local_backup' | 'future_api_sync';

export type DashboardSyncSafetyStatus =
  | 'safe_browser_only'
  | 'requires_user_review'
  | 'requires_auth_later'
  | 'do_not_sync';

export type DashboardSnapshotSection =
  | 'profile'
  | 'passport'
  | 'tradelines'
  | 'roadmap'
  | 'alerts'
  | 'imports'
  | 'exports'
  | 'fundingTools'
  | 'customGpts'
  | 'notionTemplateSources';

export interface DashboardSnapshotMeta {
  timestamp: string;
  version: string;
  source: string;
}

export interface DashboardSnapshot {
  meta: DashboardSnapshotMeta;
  sections: {
    profile?: unknown | null;
    passport?: unknown | null;
    tradelines?: unknown | null;
    roadmap?: unknown | null;
    alerts?: unknown | null;
    imports?: unknown | null;
    exports?: unknown | null;
    fundingTools?: unknown | null;
    customGpts?: unknown | null;
    notionTemplateSources?: unknown | null;
  };
}

export type DashboardSyncDiffType = 'added' | 'removed' | 'changed';

export interface DashboardSyncDiffItem {
  section: DashboardSnapshotSection;
  type: DashboardSyncDiffType;
  details?: string; // High-level detail, no sensitive info
}

export interface DashboardSyncDiff {
  timestamp: string;
  items: DashboardSyncDiffItem[];
  hasChanges: boolean;
}

# Dashboard Snapshot & Sync Prep

This document outlines the Dashboard Snapshot engine for BizCredit.

## What is a Dashboard Snapshot?
A "Dashboard Snapshot" is a point-in-time extraction of all available user state from the browser's `localStorage`. It aggregates sections such as:
- Profile
- Passport
- Tradelines
- Roadmap
- Alerts
- Imports
- Exports
- Funding Tools
- Custom GPTs
- Notion Template Sources

## Local-First Behavior
All dashboard data currently operates on a local-first principle. Data is persisted purely in the browser's `localStorage`. Snapshots are constructed locally using read helpers without sending data over a network. Empty or missing sections are handled gracefully without throwing exceptions that could disrupt the user interface.

## Support for Manual Notion Export
Snapshots serve as the foundational payload for Notion Template exports. By packaging all local data into a structured `DashboardSnapshot`, tools can easily format this payload into Markdown or CSV downloads for users to manually import into their Notion setups.

## Support for Future Authenticated Sync
By structuring data into standard `DashboardSnapshot` types and capturing differences via `DashboardSyncDiff`, we lay the groundwork for future sync features. An API could eventually accept a `DashboardSnapshot` and diff it against cloud state securely, once authentication is established.

## What Should Never Be Synced Publicly
Sensitive fields, tokens, keys, and passwords must never be part of exported or synced payloads. The `sanitizeSnapshotForExport` utility aggressively strips out any keys matching patterns like:
- `token`
- `apiKey`
- `secret`
- `password`
- `authorization`
- `bearer`

## Why This Is Not Live Sync
BizCredit uses a strictly local-first approach to respect user privacy and adhere to the project's stateless architectural requirements. True live sync would require backend databases and user authentication, which are explicitly out of scope. Snapshots enable offline-friendly backups, manual exports, and "sync prep" without violating constraints.

## Safety Statuses
Any sync target can be classified using `DashboardSyncSafetyStatus` to determine user review or authorization requirements:
- `safe_browser_only`: Entirely offline and local operations.
- `requires_user_review`: Data leaves the browser but requires explicit manual action (e.g., Notion Markdown export).
- `requires_auth_later`: Fully authenticated remote syncs (Future capability).
- `do_not_sync`: Unsafe or explicitly forbidden destinations.

## Examples of Snapshot Metadata
Every snapshot includes a `DashboardSnapshotMeta` block describing when it was captured and its source.
```json
"meta": {
  "timestamp": "2024-05-20T10:00:00.000Z",
  "version": "1.0",
  "source": "bizcred-ai-local"
}
```

## Future Integration Points
- **Export Registry**: Add the export to UI download mechanisms when safe registry patterns are available.
- **Diff Analysis Tool**: Visualize added/changed sections before producing a diff target.
- **Future API**: Authenticated users pushing snapshots to cloud endpoints securely.

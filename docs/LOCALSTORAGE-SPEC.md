# LocalStorage Spec

The React app layer is local-first. It stores user-entered planning data in the browser only.

## Keys

- `bizcredit.v1.profile` — business setup/readiness profile.
- `bizcredit.v1.passport` — reserved BizCredit Passport summary object.
- `bizcredit.v1.tradelines` — saved vendor/tradeline planner items.
- `bizcredit.v1.roadmap` — roadmap snapshot or generated roadmap state.
- `bizcredit.v1.alerts` — local readiness alerts.
- `bizcredit.v1.importJobs` — local import job history.
- `bizcredit.v1.settings` — reserved for future local UI settings.

## Helpers

`src/storage/localStorageClient.ts` exposes:

- `readLocal(key, fallback)`
- `writeLocal(key, value)`
- `removeLocal(key)`
- `exportLocalState()`
- `importLocalState(payload)`
- `resetLocalState()`

Storage helpers must never throw into the UI.

## Privacy posture

No backend writes, auth, analytics, or user tracking are required for this local-first layer.

## Safety posture

Stored data is used for educational readiness planning only. It does not imply approvals, funding, bureau reporting, tradelines, score changes, or lender outcomes. Vendor requirements and reporting should be verified directly.

# LocalStorage Spec

The React app layer is local-first. It stores user-entered planning data in the browser only.

## Keys

- `bizcredit.v1.profile` — business setup/readiness profile.
- `bizcredit.v1.tradelines` — saved vendor/tradeline planner items.
- `bizcredit.v1.settings` — reserved for future local UI settings.

## Privacy posture

No backend writes, auth, analytics, or user tracking are required for this local-first layer.

## Safety posture

Stored data is used for educational readiness planning only. It does not imply approvals, funding, bureau reporting, tradelines, score changes, or lender outcomes. Vendor requirements and reporting should be verified directly.

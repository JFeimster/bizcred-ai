# Data Model

This repository now has two related data layers:

1. **UI state contracts** used by the local-first React app.
2. **Normalized registry contracts** used for vendors, GPTs, tools, Notion sources, schemas, and future imports.

## UI State Contracts

Primary UI state lives in `src/types/` and browser localStorage.

- `BusinessProfile` — local business setup/readiness profile.
- `Tradeline` — local vendor/tradeline planner row.
- `ReadinessAlert` — local dashboard alert.
- `Roadmap` / `RoadmapStep` — local roadmap state.
- `ImportJob` — local import attempt metadata.
- `Passport` — reserved summary object for future BizCredit Passport views.

## Normalized Registry Data

Normalized data lives in `data/`:

- `data/vendors/net30-vendors.normalized.json`
- `data/gpts/custom-gpts.normalized.json`
- `data/tools/funding-tools.normalized.json`
- `data/notion/notion-template-sources.json`

JSON schemas live in `schemas/` and should be used as the target contract for imports and future registry expansion.

## Safety Rules

- Educational planning only.
- No approval guarantees.
- No funding guarantees.
- No bureau reporting guarantees.
- No tradeline guarantees.
- No score-change guarantees.
- No credit repair framing.
- Vendor requirements, fees, terms, and reporting must be verified directly.

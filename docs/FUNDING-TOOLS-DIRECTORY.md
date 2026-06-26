# Funding Tools Directory

The Funding Tools Directory is a local-first resource layer for BizCredit OS.

## Scope

- React page: `src/pages/FundingToolsPage.tsx`
- Card component: `src/components/cards/FundingToolCard.tsx`
- Filter form: `src/components/forms/FundingToolFilterForm.tsx`
- Search helper: `src/modules/tools/searchFundingTools.ts`
- Data source: `data/tools/funding-tools.normalized.json`
- Read-only API: `api/funding-tools.js`
- OpenAPI file: `actions/funding-tools.openapi.yaml`

## Data posture

The directory uses approved local/system records. It does not store user-submitted data and does not perform matching against private business records.

## Safety posture

- Educational planning only.
- Read-only public records only.
- No approval, funding, bureau reporting, tradeline, score-change, or lender-outcome guarantees.
- Users should verify all requirements and tool fit directly.

## Filters

- persona
- problem keyword
- asset type
- build state / recommended stage
- status
- partner channel

## Future considerations

Do not turn this into a write endpoint or private matching workflow without the paid/auth rules in `docs/API-SAFETY-RULES.md`.

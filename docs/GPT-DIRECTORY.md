# Custom GPT Directory

The Custom GPT Directory is a local-first resource layer for finding GPT resources connected to business-credit and funding-readiness workflows.

## Scope

- React page: `src/pages/GptDirectoryPage.tsx`
- Card component: `src/components/cards/CustomGptCard.tsx`
- Filter form: `src/components/forms/GptDirectoryFilterForm.tsx`
- Search helper: `src/modules/gpts/searchCustomGpts.ts`
- Data source: `data/gpts/custom-gpts.normalized.json`
- Read-only API: `api/gpt-directory.js`
- OpenAPI file: `actions/custom-gpt-directory.openapi.yaml`

## Data posture

The directory uses approved local/system GPT records. It does not accept private user data and does not create, edit, or delete GPTs.

## Safety posture

- Educational planning only.
- Read-only public/system records only.
- No approval, funding, bureau reporting, tradeline, score-change, or lender-outcome guarantees.
- Users should verify GPT access URLs and tool fit directly.

## Filters

- recommended stage
- keyword
- category
- has access URL

## Future considerations

Do not turn this into a write endpoint, private sync workflow, or paid tool gate without the auth rules in `docs/API-SAFETY-RULES.md`.

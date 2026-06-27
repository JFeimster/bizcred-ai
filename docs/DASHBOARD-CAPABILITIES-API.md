# Dashboard Capabilities API

## Purpose

The Dashboard Capabilities API provides read-only public endpoints that catalog what BizCredit OS can currently do. It exposes active modules, safe read-only API schemas, browser-only workflows, and future gated workflows without exposing private dashboard data or write functionality.

It acts as a self-discovery map for Custom GPT actions so the GPT can explain what is available now, what is local-only, and what should not be treated as live sync.

## API Endpoints

### `GET /api/dashboard-capabilities`

Returns a high-level overview of the application state, including:

- Active app pages/modules.
- Current localStorage feature areas.
- Active safe read-only APIs.
- Workflows explicitly limited to the browser.
- Gated future backend workflows.
- Safety flags confirming there are no public writes, imports, or live syncing by default.

Example response shape:

```json
{
  "app": "BizCredit OS",
  "version": "1.0.0",
  "mode": "local-first",
  "activePages": ["Business HQ", "BizCredit Passport", "Notion Bridge"],
  "readOnlyApis": ["/api/health", "/api/dashboard-capabilities"],
  "browserOnlyWorkflows": ["localStorage data persistence", "manual Notion Markdown/CSV exports"],
  "futureGatedWorkflows": ["/api/funding/match", "Live Notion Sync"],
  "safety": {
    "noPublicWrites": true,
    "noPublicImports": true,
    "noLiveNotionSync": true,
    "noUserDataReturned": true,
    "educationalOnly": true
  },
  "disclaimer": "Educational planning only..."
}
```

### `GET /api/action-manifest`

Returns a static directory of current, secondary, legacy, and future OpenAPI schema definitions mapped in the repository.

Example response shape:

```json
{
  "data": [
    {
      "file": "actions/bizcredit-builder.openapi.yaml",
      "status": "canonical",
      "safeForNoAuth": true,
      "endpointFamily": "/api/*",
      "importIntoGPT": true,
      "notes": "Canonical core read-only GPT Actions."
    },
    {
      "file": "actions/vendor-directory.openapi.yaml",
      "status": "legacy_reference",
      "safeForNoAuth": false,
      "endpointFamily": "legacy/reference only",
      "importIntoGPT": false,
      "notes": "Do not import into GPT Actions."
    }
  ],
  "disclaimer": "Educational planning only..."
}
```

## Why It Is Safe for No-Auth

These endpoints are strictly read-only and return hardcoded metadata about the application architecture.

- **No user data:** They do not read or return data from localStorage, sessions, browser files, or imported records.
- **No secrets exposed:** They return no API keys, OAuth tokens, database URLs, environment variables, or private Notion credentials.
- **No mutations:** They accept only `GET` and `OPTIONS` requests.
- **No live sync:** They do not connect to Notion, OpenAI, lenders, bureaus, CRMs, or funding platforms.

## What It Does Not Expose

This API does not expose:

- Live user business profiles, scores, prompts, imports, tradelines, or dashboard state.
- Active authentication tokens or external API keys.
- Internal logic for future paid/gated algorithms.
- Any write/import/sync workflow.

## How GPT Actions Can Use It

A Custom GPT can query these endpoints to:

1. Understand the current deployment's safe capabilities.
2. Tell the user which workflows are available in the browser only.
3. Discover which OpenAPI files are canonical, secondary, legacy, or future-gated.
4. Correctly explain that Notion sync, imports, tradeline saves, passport build, and funding match workflows are not public no-auth APIs.

## Clarification: Not Dashboard or Notion Sync

This API does **not** synchronize data between the Custom GPT and the user's dashboard, and it does **not** connect to the Notion API. BizCredit OS remains local-first. Any movement of user data through export/import remains a manual, browser-only workflow unless a future authenticated backend architecture is explicitly approved.

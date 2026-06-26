# OpenAPI File Map

This document outlines the organization of OpenAPI specification files in the BizCredit OS repository, mapping existing definitions and defining the strategy for future namespace-based schemas.

> **IMPORTANT**: This is a map/spec document only. Do NOT create any of the "Future OpenAPI Files" listed below in the current pass.

## Current Existing OpenAPI Files

* `actions/bizcredit-builder.openapi.yaml` - The canonical, main OpenAPI specification mapping to the core BizCredit GPT Actions.
* `actions/vendor-directory.openapi.yaml` - Existing secondary action file detailing the vendor directory integration schemas.

### Currently Documented Endpoints

The existing OpenAPI files already cover the read-only canonical API functions:

* `GET /api/health`
* `GET /api/vendors`
* `GET /api/vendor-by-id`
* `GET /api/vendor-summary`
* `GET /api/readiness-rules`

## Future OpenAPI Strategy (By Namespace)

To keep API definitions modular and maintainable, future OpenAPI specifications should be split by namespace.

> **DO NOT CREATE THESE FILES YET.**

| Namespace | Proposed File Path | Endpoint Family | Safety / Auth Posture |
| :--- | :--- | :--- | :--- |
| **Directory** | `actions/directory.openapi.yaml` | `/api/directory/*` | Search (`/search`) is safe for no-auth (read-only). Dedupe (`/dedupe`) requires Paid/Auth/Verified access or should remain browser-only. |
| **Tools & GPTs** | `actions/tools-gpts.openapi.yaml` | `/api/tools/*`, `/api/gpts/*` | Search functionality is generally safe for no-auth (read-only). |
| **Funding** | `actions/funding.openapi.yaml` | `/api/funding/*` | Requires Paid/Auth/Verified access due to the sensitive nature of business profiles and funding matches. |
| **Imports** | `actions/imports.openapi.yaml` | `/api/imports/*` | Requires Paid/Auth/Verified access. Recommended to remain as browser-only local workflows instead of true backend APIs. |
| **Passport** | `actions/passport.openapi.yaml` | `/api/passport/*` | Requires Paid/Auth/Verified access. Recommended to remain as browser-only local workflows. |
| **Tradelines** | `actions/tradelines.openapi.yaml` | `/api/tradelines/*` | Requires Paid/Auth/Verified access. Highly recommended to remain as browser-only local workflows. |
| **Notion/Exports**| `actions/exports.openapi.yaml` | `/api/exports/*`, `/api/notion/*` | Requires Paid/Auth/Verified access. Exporting data securely requires robust authentication. Manual browser-only exports are preferred until OAuth architecture is approved. |

## Do Not Create In This Pass

As explicitly defined by the API expansion plan rules, the following items MUST NOT be created during the current documentation pass:

* `actions/directory.openapi.yaml`
* `actions/tools-gpts.openapi.yaml`
* `actions/funding.openapi.yaml`
* `actions/imports.openapi.yaml`
* `actions/passport.openapi.yaml`
* `actions/tradelines.openapi.yaml`
* `actions/exports.openapi.yaml`
* Any other new `.yaml` or `.json` OpenAPI schemas.

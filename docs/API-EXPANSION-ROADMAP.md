# API Expansion Roadmap

This document outlines the proposed namespaces and specific endpoints for the future expansion of the BizCredit OS API.

> **IMPORTANT**: This is a documentation/spec pass only. The endpoints listed below are **NOT** implemented yet and should not be built, nor should their OpenAPI schemas be created, until explicitly instructed.

## Proposed Namespaces

The API is structured around the following planned namespaces to organize future functionality:

* `/api/notion/*` - Future Notion integration endpoints. Do not build until OAuth/auth/token-handling architecture is explicitly approved.
* `/api/imports/*` - Future import endpoints. Most import flows should remain browser-only because they handle user-submitted files and local state.
* `/api/directory/*` - Future vendor directory search and normalization endpoints.
* `/api/passport/*` - Future Business Credit Passport endpoints. Passport building should remain browser-only unless paid/verified auth is approved.
* `/api/tradelines/*` - Future user tradeline record endpoints. These should remain browser-only in the current local-first architecture.
* `/api/tools/*` - Future read-only tool directory endpoints.
* `/api/gpts/*` - Future read-only Custom GPT directory endpoints.
* `/api/exports/*` - Future export endpoints. Manual/browser-only exports are preferred unless authenticated backend export workflows are approved.
* `/api/funding/*` - Future funding match endpoints. These require paid/verified/authenticated access and careful no-guarantee framing.

## Future Endpoints

Below is the detailed documentation for specific future endpoints.

| Endpoint | Purpose | Request Shape | Response Shape | Auth Posture | Safe for no-auth? | Paid access required? | Touches user-submitted data? | Should stay browser-only instead? | Build status | Notes / Safety rationale |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `POST /api/imports/vendor-directory` | Import bulk vendor data | `{ "vendors": [...], "source": "manual" }` | `{ "success": boolean, "imported_count": number, "needs_review_count": number }` | Restricted/Admin or paid verified user | No | Recommended | Yes | **Yes** | Do not build yet | Should strictly stay as a browser-only local workflow using `localStorage` to avoid server-side persistence of user data unless an authenticated backend is introduced. Do not implement public uploads. |
| `POST /api/imports/credit-tracker` | Import credit tracker data | `{ "profile": {...}, "tradelines": [...], "roadmap": {...} }` | `{ "success": boolean, "imported_count": number, "warnings": [...] }` | User Auth | No | Recommended | Yes | **Yes** | Do not build yet | Highly recommended to remain browser-only. Persisting user credit tracker data server-side requires strict auth and privacy considerations not currently present. |
| `POST /api/directory/search` | Search vendor directory | `{ "query": "string", "filters": {...} }` | `{ "results": [...] }` | None / API Key | Yes (if rate limited) | No | No | No | Do not build yet | Read-only operation. Safe for no-auth only if it searches approved public/system directory data and includes rate limiting. |
| `POST /api/directory/dedupe` | Deduplicate directory entries | `{ "entries": [...] }` | `{ "deduped_entries": [...] }` | Admin Auth or browser-only local workflow | No | Recommended | Yes | **Yes** | Do not build yet | Accepts user-submitted or admin-submitted entries. Prefer browser-only dedupe for imports. If ever server-side, it must require admin/auth and must not persist submitted data by default. |
| `POST /api/passport/build` | Generate a Credit Passport | `{ "profile_data": {...}, "preferences": {...} }` | `{ "passport": {...}, "summary": {...} }` | User Auth | No | Yes | Yes | **Yes** | Do not build yet | Requires processing sensitive user business data. Should remain a browser-only workflow to maintain the local-first architecture unless paid/verified auth is implemented. |
| `POST /api/tradelines/save` | Save a new tradeline | `{ "vendor_id": "string", "limitAmount": number, "status": "string" }` | `{ "success": boolean, "tradeline_id": "string" }` | User Auth | No | Recommended | Yes | **Yes** | Do not build yet | Modifies user state heavily. Must remain browser-only (saved to `localStorage`) to avoid storing user PII on the server. |
| `POST /api/tradelines/update-status` | Update tradeline status | `{ "tradeline_id": "string", "status": "string" }` | `{ "success": boolean }` | User Auth | No | Recommended | Yes | **Yes** | Do not build yet | State mutation on user data. Strongly recommend keeping this as a browser-only local workflow. |
| `POST /api/tools/search` | Search available tools | `{ "query": "string", "category": "string" }` | `{ "tools": [...] }` | None | Yes | No | No | No | Do not build yet | Read-only search function. Safe for public no-auth access only for approved public/system tool records. |
| `POST /api/gpts/search` | Search available GPTs | `{ "query": "string", "features": [...] }` | `{ "gpts": [...] }` | None | Yes | No | No | No | Do not build yet | Read-only search function. Safe for public no-auth access only for approved public/system GPT records. |
| `POST /api/exports/notion-package` | Generate a manual Notion import package | `{ "export_scope": "passport|planner|all", "local_state": {...} }` | `{ "files": [{ "filename": "string", "content_type": "string" }] }` | Browser-only local workflow or future user auth | No | Yes | Yes | **Yes** | Do not build yet | Do not pass Notion tokens through request bodies. In the current phase, this should remain a browser-only manual export that generates Markdown/CSV files. Future direct Notion sync requires a separate OAuth architecture. |
| `POST /api/funding/match` | Find funding matches | `{ "business_profile": {...}, "desired_amount": number }` | `{ "matches": [...], "disclaimer": "string" }` | User Auth / paid verified access | No | Yes | Yes | No | Do not build yet | Processes sensitive business profiling data to return matches. Should not be public no-auth. Requires careful framing to avoid guarantees of funding, approvals, or lender outcomes. |

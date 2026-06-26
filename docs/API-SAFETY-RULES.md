# API Safety Rules

These rules dictate the strict safety policies regarding any future expansion of the BizCredit OS API. They must be followed carefully to protect user privacy, maintain the integrity of our static read-only serverless environment, and avoid making unverified claims.

## Core Safety Constraints

1. **No Public No-Auth Write Endpoints**: Under no circumstances should any endpoint that modifies data (creates, updates, deletes) be exposed to the public without stringent authentication.
2. **No Public No-Auth Import Endpoints**: Endpoints that accept bulk data imports (e.g., CSVs, vendor directories) cannot be unauthenticated. They represent a significant risk for abuse.
3. **No Public No-Auth Notion Sync**: Integrating with third-party platforms like Notion requires handling API tokens and user data. This must never be done over public unauthenticated endpoints.
4. **No Public No-Auth Paid Workflow Endpoints**: Endpoints that support paid features or verified workflows must be properly gated and authenticated to prevent circumvention.
5. **No Server-Side Storage Without Explicit Approval**: The current API architecture is strictly read-only and serverless. No user state, documents, or personal information may be persisted server-side. Wait for an explicitly approved backend architecture.
6. **No User-Submitted Data Persistence By Default**: Any future API development should favor returning data back to the client for local storage rather than storing it on the server.
7. **No Secrets in Frontend Code**: API keys, OAuth tokens, and any other sensitive credentials must NEVER be stored in the frontend codebase. All external service integrations must proxy through secure backend functions using environment variables.
8. **No OAuth/API-Key Workflows In This Pass**: Implementing third-party authentication or providing API access keys is out of scope for the current expansion pass.
9. **No Credit Repair Framing**: The API and its consumers must never present the tool as a "credit repair" service.
10. **No Guarantees**: API responses and their associated frontend implementations must strictly avoid making guarantees for approvals, funding amounts, bureau reporting, tradelines, score changes, or positive lender outcomes.
11. **Verification Required**: All vendor, lender, and reporting details provided by the API must be verified directly by the end user before applying. Endpoints describing vendor requirements are informational only.

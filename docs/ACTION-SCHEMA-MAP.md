# GPT Actions Schema Mapping

This document details the canonical schema to be used for Custom GPT Actions.

## Canonical Schema
**File:** `actions/bizcredit-builder.openapi.yaml`

This is the **canonical schema** that should be imported into Custom GPT Actions. It aligns precisely with the actual `/api/` endpoints hosted on Vercel.

### Endpoint Mapping

| API Endpoint             | Operation ID                 | Description                                      |
|--------------------------|------------------------------|--------------------------------------------------|
| `/api/health`            | `getBizCreditApiHealth`      | Health check endpoint                            |
| `/api/vendors`           | `listBizCreditVendors`       | List and filter vendors                          |
| `/api/vendor-by-id`      | `getBizCreditVendorById`     | Get a specific vendor by ID                      |
| `/api/vendor-summary`    | `getBizCreditVendorSummary`  | Get summary statistics for vendors               |
| `/api/readiness-rules`   | `getBizCreditReadinessRules` | Get readiness scoring rules and setup tasks      |

## Legacy Reference
**File:** `actions/vendor-directory.openapi.yaml`

This file is a **legacy reference** and should **NOT** be imported into Custom GPT Actions. It contains older, non-canonical paths that do not map to the current API deployment.

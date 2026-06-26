# BizCredit OS Template Bridge - Data Model

This document outlines the core domain models powering the BizCredit OS local-first template bridge.
All data models exist exclusively within the browser (`localStorage`) and sync to the user's Notion workspace or are exported as JSON.

## Core Models

### `BusinessProfile`
The canonical representation of the user's business entity.
- **Fields:** `legal_name`, `ein`, `entity_type`, `address`, `naics_code`, etc.
- **Purpose:** Acts as the root data required to match against vendor and funding requirements.

### `Passport`
A summarized "health score" of the business profile.
- **Fields:** `scores` (DNB, Experian, etc.), `data_completeness_percentage`, `fundability_status`.
- **Purpose:** Tracks the progression of the business toward prime funding readiness.

### `Vendor`
An institutional creditor, supplier, or service that extends business credit.
- **Fields:** `tier`, `reports_to`, `terms`, `requires_pg`, `verification_status`.
- **Purpose:** A read-only directory item sourced from `data/vendors/net30-vendors.normalized.json`. *Verification status defaults to `needs_review`.*

### `Tradeline`
A user-specific instance of a credit relationship with a `Vendor`.
- **Fields:** `vendor_id`, `status` (planned, applied, approved, etc.), `credit_limit`.
- **Purpose:** Tracks the active credit building journey.

### `FundingTool` & `CustomGpt`
Directories for actionable next steps once the profile is built.

### `Roadmap` & `RoadmapItem`
Actionable steps generated from the AI analysis of the user's profile and passport.

### `ImportJob`
Tracks the status and history of pulling data from legacy systems or external APIs.

## Verification Status
To protect users and maintain data integrity, all external directory entities (Vendors, Funding Tools, Custom GPTs) include a mandatory `verification_status` field (`unverified` | `needs_review` | `verified` | `deprecated`).

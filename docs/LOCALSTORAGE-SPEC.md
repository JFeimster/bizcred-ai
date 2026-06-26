# LocalStorage Specification

BizCredit Builder OS uses local browser storage (`localStorage`) as its sole persistence layer. This ensures user data remains completely private and is never sent to a backend server.

## Overview

- **Storage Method:** `window.localStorage`
- **Format:** JSON strings
- **Prefix:** `bizcred_`

## Keys and Data Shapes

### 1. `bizcred_profile_v1`
Stores the user's business profile and foundational information.
**Shape:** `BusinessProfile`
- `businessName`: string
- `entityType`: string
- `formationDate`: string
- `einStatus`: string
- `businessBankAccount`: boolean
- `businessAddress`: string
- `businessPhone`: string
- `website`: string
- `domainEmail`: string
- `dunsNumber`: string
- `businessLicense`: boolean
- `monthlyRevenueRange`: string
- `primaryGoal`: string

### 2. `bizcred_tradelines_v1`
Stores the user's planned and active vendor tradelines.
**Shape:** `Tradeline[]`
- `id`: string
- `vendorId`: string
- `vendorName`: string
- `tier`: number
- `status`: string
- `verificationStatus`: string

### 3. `bizcred_roadmap_v1`
Stores the generated roadmap and phase progression.
**Shape:** `Roadmap`
- `currentPhase`: number
- `phases`: RoadmapPhase[]
- `generatedAt`: ISO date string

### 4. `bizcred_alerts_v1`
Stores generated readiness alerts.
**Shape:** `Alert[]`
- `id`: string
- `title`: string
- `description`: string
- `severity`: string

*(Legacy keys from static app)*
- `bizcred_tasks_v1`
- `bizcred_vendor_tracker_v1`
- `bizcred_prompt_history_v1`
- `bizcred_score_history_v1`

## Data Management

### Import / Export Behavior
The application allows users to export their entire state as a JSON file. During import, the application validates known keys. By default, an import will clear all existing known keys to prevent stale data mixing, unless a "merge" option is explicitly requested.

### Reset Behavior
Resetting local state clears only the known `bizcred_` keys listed above. It does not wipe the entire browser `localStorage` to avoid interfering with other applications hosted on the same domain/port.

## Browser-Only Persistence Caveats

1. **Device Specific:** Data is tied to the specific browser and device where it was entered. It will not sync across devices (e.g., from desktop to mobile).
2. **Clearing Data:** If the user clears their browser cookies and site data, all BizCredit Builder OS data will be permanently lost unless they have a recent JSON export.
3. **Storage Limits:** LocalStorage is typically limited to ~5MB per origin. While textual JSON data is unlikely to hit this limit, it is a hard constraint.
4. **Incognito/Private Browsing:** Data entered during an incognito session will be wiped as soon as the session is closed.
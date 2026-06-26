# LocalStorage Specification

The BizCredit OS relies strictly on browser `localStorage` for state persistence. There is no backend database.

## Key Namespace
All keys operate under the `bizcredit.v1.*` namespace to allow for future migrations.

| Key | TypeScript Type | Description |
| :--- | :--- | :--- |
| `bizcredit.v1.profile` | `BusinessProfile` | The core entity data (EIN, address, etc). |
| `bizcredit.v1.passport` | `Passport` | The summarized fundability and score tracking. |
| `bizcredit.v1.tradelines` | `Tradeline[]` | The user's specific vendor credit lines. |
| `bizcredit.v1.roadmap` | `Roadmap` | Step-by-step tasks for the user. |
| `bizcredit.v1.alerts` | `Alert[]` | System or AI-driven notifications. |
| `bizcredit.v1.importJobs` | `ImportJob[]` | History of data imports. |
| `bizcredit.v1.settings` | `Record<string, any>` | App settings, Notion integrations, etc. |

## Storage Client API
The `localStorageClient.ts` provides a safe wrapper around the native browser API. It **never throws errors into the UI**, catching serialization and quota errors gracefully.

- `readLocal<T>(key, fallback?)`: Reads and parses a key, falling back to safe defaults defined in `storageDefaults.ts`.
- `writeLocal<T>(key, value)`: Safely stringifies and writes to local storage.
- `removeLocal(key)`: Deletes a specific key.
- `exportLocalState()`: Dumps all `bizcredit.v1.*` keys into a single formatted JSON string for backup.
- `importLocalState(payload)`: Safely parses a JSON backup and restores keys.
- `resetLocalState()`: Wipes all `bizcredit.v1.*` keys (Factory Reset).

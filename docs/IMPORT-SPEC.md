# Local-First Import Export Spec

The BizCredit OS React application is local-first. Import parsing and export generation happen in the browser using standard web APIs. No data is uploaded to a server.

## Supported Import Types

- CSV: lightweight browser parsing for vendor-directory rows.
- JSON: direct parsing for vendor arrays and full local dashboard backups.
- XLSX, PDF, Markdown: placeholder options only in this MVP. Convert to CSV or JSON before importing.

## Workflows

### Vendor Directory Import

- Target: local vendor-import review flow.
- Formats: CSV or JSON.
- Rules: imported records default to `needs_review` unless explicitly marked `verified`.
- Deduping: repeated IDs or exact vendor-name matches are collapsed.

### Business Credit Tracker Import

- Target: known `bizcredit.v1.*` localStorage keys.
- Format: JSON only.
- Rules: payload is parsed locally and written only to recognized localStorage keys.

## Security and Privacy

- No backend upload.
- No OAuth.
- No server-side storage.
- Review imported records manually.
- Verify vendor requirements, terms, fees, and reporting directly.

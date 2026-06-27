# Notion Template Bridge

The **Notion Template Bridge** is a local-first management layer that allows users to register their Notion templates and view instructions on how to use them with BizCred OS.

## Core Features & Local-First Behavior
- **Manual Mapping**: Users can store references to their Notion resources (pages, databases, templates) directly in local storage.
- **No Active Sync**: There is no live Notion API connection, token storage, or OAuth flow. The bridge exists purely to organize external references.
- **Export/Import Workflows**: The bridge provides suggestions on how users can manually move their data, such as exporting Notion pages as Markdown or databases as CSVs and manually uploading them to the system's *Imports* tab.
- **Reference Only**: Public Notion copy links are treated as raw URLs to easily duplicate templates to a personal workspace. They cannot be interacted with from inside the application.

## API Integration (Disabled)
The system prevents users from enabling live Notion sync (`notion_api_connection`). Any references to this mode are strictly marked as "Disabled" and "Future-gated" in the UI.

**Why?**
- Prevents users from storing sensitive API tokens directly in the browser's `localStorage` in cleartext.
- Eliminates the need for backend infrastructure to handle OAuth handshakes.
- Keeps the system lightweight, secure, and entirely self-contained within the static Vercel preview or local environment.

## Usage
Add templates using the form on the *Notion Bridge* page. When registered, each template provides a specific instruction (a "Suggested Next Action") depending on the selected *Access Mode*.

## Security Guidelines
- **Do not request or add token inputs.**
- **Do not introduce `notion-hq` or external Node dependencies.**
- **Do not make calls to `api.notion.com`.**
- **Follow educational planning restrictions.** No funding/approval/tradeline guarantees should be made regarding the capabilities of Notion templates.
# BizCredit Builder AI

A static, launch-ready landing page for **BizCredit Builder GPT**.

This version was rebuilt from the ground up to avoid the generic dark SaaS look. The page uses a true neon-neobrutalist fintech direction: split cream/black hero, acid green, hot pink, signal yellow, cyan blocks, thick black borders, hard offset shadows, marquee strip, warning tape, bento cards, and a brutal “Business Credit OS” dashboard mockup.

## Files

```txt
bizcredit-builder-neobrutalist-redesign/
├── index.html
├── dashboard.html
├── vendors.html
├── styles.css
├── script.js
├── README.md
├── api/
│   ├── health.js
│   ├── vendors.js
│   ├── vendor-by-id.js
│   ├── vendor-summary.js
│   ├── readiness-rules.js
│   ├── ai-health.js
│   ├── generate-readiness-plan.js
│   ├── explain-vendor-path.js
│   ├── generate-gpt-prompt.js
│   ├── funding-tools.js
│   ├── gpt-directory.js
│   ├── dashboard-capabilities.js
│   └── action-manifest.js
├── actions/
│   ├── bizcredit-builder.openapi.yaml
│   ├── vendor-directory.openapi.yaml
│   ├── funding-tools.openapi.yaml
│   ├── custom-gpt-directory.openapi.yaml
│   └── dashboard-capabilities.openapi.yaml
├── data/
│   ├── setup-tasks.json
│   ├── prompt-templates.json
│   ├── readiness-rules.json
│   ├── credit-vendors.registry.json
│   ├── tools/
│   │   └── funding-tools.normalized.json
│   ├── gpts/
│   │   └── custom-gpts.normalized.json
│   └── notion/
│       └── notion-template-sources.json
├── docs/
│   ├── GPT-ACTIONS-SETUP.md
│   ├── AI-API-SETUP.md
│   ├── ACTION-SCHEMA-MAP.md
│   ├── API-EXPANSION-ROADMAP.md
│   ├── API-SAFETY-RULES.md
│   ├── OPENAPI-FILE-MAP.md
│   ├── DASHBOARD-CAPABILITIES-API.md
│   ├── DASHBOARD-SNAPSHOT-SYNC.md
│   ├── FUNDING-TOOLS-DIRECTORY.md
│   ├── GPT-DIRECTORY.md
│   ├── IMPORT-SPEC.md
│   ├── MANUAL-NOTION-EXPORT.md
│   ├── NOTION-TEMPLATE-BRIDGE.md
│   ├── SCHEMAS.md
│   └── VERCEL-DEPLOYMENT-CONTROL.md
├── assets/
│   ├── js/
│   │   ├── storage.js
│   │   ├── readiness-engine.js
│   │   ├── vendor-tracker.js
│   │   ├── prompt-builder.js
│   │   ├── ai-client.js
│   │   └── dashboard.js
│   └── css/
│       └── dashboard.css
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── routes.tsx
    ├── pages/
    ├── components/
    ├── modules/
    ├── storage/
    ├── styles/
    └── types/
```

## LocalStorage Keys

The static dashboard and React app persist data directly in the browser using localStorage.

Legacy/static dashboard keys:

```txt
bizcred_profile_v1
bizcred_tasks_v1
bizcred_vendor_tracker_v1
bizcred_prompt_history_v1
bizcred_score_history_v1
```

React/local-first app keys:

```txt
bizcredit.v1.profile
bizcredit.v1.passport
bizcredit.v1.tradelines
bizcredit.v1.roadmap
bizcredit.v1.alerts
bizcredit.v1.importJobs
bizcredit.v1.settings
bizcredit.v1.notionTemplateSources
```

**Important**:

* The app is local-first. User dashboard data is stored in the browser unless a future authenticated backend is explicitly added.
* No approval, funding, tradeline, reporting, score-change, or lender-outcome guarantees are made.
* Vendor reporting, terms, requirements, fees, and availability must always be verified directly before relying on them.

## What is included

* Static HTML, CSS, and vanilla JavaScript launch pages
* React/Vite local-first app shell
* No backend storage required for dashboard state
* Responsive mobile-first layout
* Sticky brutalist header
* Marquee strip
* Split hero layout
* Color-blocked sections
* Brutalist dashboard mockup
* Scroll reveal animations
* Magnetic CTA hover
* Cursor-reactive cards
* FAQ accordion
* Copy-to-clipboard starter prompt
* SEO title and meta description
* Open Graph basics
* SoftwareApplication schema
* Optional server-side AI generation endpoints with safe prompt fallback
* Local-first Business HQ and BizCredit Passport
* Credit Directory and Vendor Profile workflow
* Tradeline Planner
* Funding Tools Directory
* Custom GPT Directory
* Manual Import / Export pages
* Local Notion Template Bridge
* Dashboard Snapshot + Sync Prep helpers
* Safe read-only capability/action manifest APIs

## Main CTA

The launch buttons point to:

```txt
https://chatgpt.com/g/g-6836dda9d7e881918dd6018226121e03-credit-builder-gpt
```

To change the GPT link, search for the existing URL inside `index.html` and replace it with your new link.

## Customization

### Change colors

Open `styles.css` and edit the variables at the top:

```css
:root {
  --ink: #050505;
  --cream: #fff4d6;
  --acid: #b6ff00;
  --pink: #ff3cac;
  --purple: #7c3aed;
  --cyan: #00e5ff;
  --orange: #ff7a00;
  --yellow: #ffe500;
  --red: #ff264a;
}
```

### Change copy

Most landing page copy lives directly inside `index.html`.

Recommended sections to customize:

* Hero headline
* Hero subheadline
* Built For cards
* What It Does cards
* Use Cases
* Offer/Value section
* FAQ
* Footer CTA

### Change the starter prompt

Search in `index.html` for:

```txt
I’m trying to build business credit from scratch.
```

Replace the full prompt with your preferred starting prompt.

## Deployment

### Netlify

1. Go to Netlify.
2. Drag the whole folder into the deploy area.
3. Netlify will publish the static site.

### Vercel

1. Create a new Vercel project.
2. Upload or connect the folder.
3. No framework preset is needed for the static pages.
4. Deploy as a static site.

> **Note:** Automatic Git deployments are disabled by default to preserve preview limits. See [`docs/VERCEL-DEPLOYMENT-CONTROL.md`](docs/VERCEL-DEPLOYMENT-CONTROL.md) for instructions on how to enable production deploys.

### GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `styles.css`, `script.js`, and `README.md`.
3. Go to repository settings.
4. Enable GitHub Pages from the main branch.

### Local preview

For an accurate local preview of the static pages, run:

```bash
python -m http.server 8000
```

Then open:

```txt
http://localhost:8000
```

Serverless functions do not run under `python -m http.server`. AI panels will fall back to copy/paste prompts in that mode.

### React app local preview

For the React app layer, install dependencies and run the Vite dev server:

```bash
npm install
npm run dev
```

For production build verification:

```bash
npm run build
```

## Data Management

You can export, import, or reset local dashboard data from the dashboard/app data management workflows.

The current data posture is:

* Browser-first local persistence
* Manual import/export
* Manual Notion template references
* No live Notion sync
* No server-side storage of user dashboard state by default
* No public write/import endpoints

## Phase 2: GPT Actions & API Endpoints

A set of read-only serverless API endpoints has been added to the `/api` directory to allow a Custom GPT to fetch live repository data.

Core read-only endpoints:

```txt
/api/health
/api/vendors
/api/vendor-by-id
/api/vendor-summary
/api/readiness-rules
```

Additional read-only directory endpoints:

```txt
/api/funding-tools
/api/gpt-directory
```

Capability and action-manifest endpoints:

```txt
/api/dashboard-capabilities
/api/action-manifest
```

OpenAPI files:

```txt
actions/bizcredit-builder.openapi.yaml
actions/funding-tools.openapi.yaml
actions/custom-gpt-directory.openapi.yaml
actions/dashboard-capabilities.openapi.yaml
```

Important schema posture:

* `actions/bizcredit-builder.openapi.yaml` is the canonical core GPT Action schema.
* `actions/vendor-directory.openapi.yaml` is a legacy/reference file and should not be imported into GPT Actions.
* `actions/funding-tools.openapi.yaml` and `actions/custom-gpt-directory.openapi.yaml` are secondary read-only schemas.
* `actions/dashboard-capabilities.openapi.yaml` exposes read-only capability/action-manifest metadata.

See:

```txt
docs/GPT-ACTIONS-SETUP.md
docs/ACTION-SCHEMA-MAP.md
docs/DASHBOARD-CAPABILITIES-API.md
docs/OPENAPI-FILE-MAP.md
```

## Phase 3: Optional Server-Side AI Generation

Optional server-side AI endpoints can generate a readiness plan, vendor path explanation, or copy/paste GPT prompt from local dashboard state.

Endpoints:

```txt
/api/ai-health
/api/generate-readiness-plan
/api/explain-vendor-path
/api/generate-gpt-prompt
```

Frontend:

```txt
assets/js/ai-client.js
```

Environment:

```txt
OPENAI_API_KEY
OPENAI_MODEL
```

Docs:

```txt
docs/AI-API-SETUP.md
```

Do not commit `.env` or real secrets. Only `.env.example` should be committed.

## Local-First React App

The React/Vite app extends the original static launch site with a local-first dashboard experience.

Current pages/modules include:

```txt
Business HQ
BizCredit Passport
Profile
Credit Directory
Vendor Profile
Tradeline Planner
Roadmap
Funding Tools
GPT Directory
Notion Bridge
Imports
Exports
Schemas
```

The app shell is wired through:

```txt
src/App.tsx
src/routes.tsx
```

The app uses local modules for:

* credit architect scoring
* readiness tier logic
* risk flags
* next-best-move guidance
* BizCredit Passport building
* alerts
* vendor directory filtering
* tradeline planning
* funding tool search
* GPT directory search
* Notion template reference mapping
* dashboard snapshot export/sync-prep

## Manual Import / Export

The import/export layer is intentionally local-first.

Supported MVP import types:

* CSV vendor-directory import
* JSON dashboard backup import
* JSON vendor directory import

Manual exports include:

* dashboard JSON backup
* BizCredit Passport Markdown
* Tradeline Planner CSV
* Notion-ready Markdown/CSV package

Docs:

```txt
docs/IMPORT-SPEC.md
docs/MANUAL-NOTION-EXPORT.md
docs/SCHEMAS.md
```

## Notion Template Bridge

The Notion Template Bridge is a local-first reference manager for Notion templates and source pages.

It supports:

* registering Notion template/source references locally
* mapping source purpose to dashboard workflows
* suggesting manual Markdown/CSV export/import next steps
* tracking references without OAuth or live sync

It does **not**:

* call the Notion API
* store Notion tokens
* perform OAuth
* push data into Notion
* sync dashboard state live

Docs:

```txt
docs/NOTION-TEMPLATE-BRIDGE.md
```

## Dashboard Snapshot + Sync Prep

The dashboard snapshot layer prepares local app data for backup, export, comparison, and future sync planning.

It supports:

* building a local dashboard snapshot
* comparing snapshots
* sanitizing snapshots for export
* stripping sensitive-looking fields
* generating sync summaries
* classifying safe vs. gated sync targets

It does **not**:

* create backend sync
* call Notion
* call external APIs
* persist data server-side
* expose dashboard state publicly

Docs:

```txt
docs/DASHBOARD-SNAPSHOT-SYNC.md
```

## API Expansion Planning

Future API namespaces are documented, but most are intentionally not implemented yet.

Future namespaces include:

```txt
/api/notion/*
/api/imports/*
/api/directory/*
/api/passport/*
/api/tradelines/*
/api/tools/*
/api/gpts/*
/api/exports/*
/api/funding/*
```

The roadmap separates:

* safe no-auth read-only endpoints
* browser-only local workflows
* paid/verified workflows
* future OAuth/API-key workflows

Docs:

```txt
docs/API-EXPANSION-ROADMAP.md
docs/API-SAFETY-RULES.md
docs/OPENAPI-FILE-MAP.md
```

## Safety Rules

The project intentionally avoids:

* credit repair framing
* fake testimonials
* approval guarantees
* funding guarantees
* bureau reporting guarantees
* tradeline guarantees
* score-change promises
* lender-outcome promises
* public no-auth write endpoints
* public no-auth import endpoints
* public no-auth Notion sync
* server-side user-data persistence by default
* secrets in frontend code

Use educational language:

* readiness
* setup
* common gaps
* next steps
* operating checklist
* educational planning
* verify directly

## Vercel Deployment Control

Automatic Git deployments are disabled by default to preserve preview limits.

The current deployment-control pattern is managed in:

```txt
vercel.json
docs/VERCEL-DEPLOYMENT-CONTROL.md
```

To deploy production manually, temporarily enable deployment for `main`, push the intended production commit, then disable it again.

Do not accidentally re-enable preview deployments for all branches.

## Compliance Note

This project positions BizCredit Builder as an educational planning assistant.

It does not provide:

* legal advice
* tax advice
* lending advice
* credit repair services
* approval guarantees
* funding guarantees
* score-change guarantees
* bureau reporting guarantees
* lender-outcome guarantees

Users should verify vendor, lender, bureau, and reporting details directly.

## Recommended Next Upgrades

* Add a custom domain
* Add analytics
* Add a booking/contact form for Guided Review
* Add screenshots or a real demo video
* Add a small comparison section: “Random advice vs. sequenced credit-building plan”
* Add an operator/runbook page showing active, browser-only, and future-gated capabilities
* Add a clean public docs index for API schemas and dashboard workflows


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
│   └── generate-gpt-prompt.js
├── data/
│   ├── setup-tasks.json
│   ├── prompt-templates.json
│   ├── readiness-rules.json
│   └── credit-vendors.registry.json
└── assets/
    ├── js/
    │   ├── storage.js
    │   ├── readiness-engine.js
    │   ├── vendor-tracker.js
    │   ├── prompt-builder.js
    │   ├── ai-client.js
    │   └── dashboard.js
    └── css/
        └── dashboard.css
```

## LocalStorage Keys

The dashboard persists your data directly in your browser using these keys:

- `bizcred_profile_v1`
- `bizcred_tasks_v1`
- `bizcred_vendor_tracker_v1`
- `bizcred_prompt_history_v1`
- `bizcred_score_history_v1`

**Important**:

- `data/credit-vendors.registry.json` currently contains an empty array. **TODO:** You must copy the vendor registry from `JFeimster/BizCredit` into this file to populate the vendor tracker.
- No approval, funding, tradeline, reporting, score-change, or lender-outcome guarantees are made. Vendor reporting must always be verified directly before relying on it.

## What is included

- Static HTML, CSS, and vanilla JavaScript
- No frontend framework required for the static pages
- Responsive mobile-first layout
- Sticky brutalist header
- Marquee strip
- Split hero layout
- Color-blocked sections
- Brutalist dashboard mockup
- Scroll reveal animations
- Magnetic CTA hover
- Cursor-reactive cards
- FAQ accordion
- Copy-to-clipboard starter prompt
- SEO title and meta description
- Open Graph basics
- SoftwareApplication schema
- Optional server-side AI generation endpoints with safe prompt fallback

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

Most copy lives directly inside `index.html`.

Recommended sections to customize:

- Hero headline
- Hero subheadline
- Built For cards
- What It Does cards
- Use Cases
- Offer/Value section
- FAQ
- Footer CTA

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

### Data Management

You can export, import, or completely reset your local data from the Data Management section at the bottom of the Dashboard page.

## Phase 2: GPT Actions & API Endpoints

A set of read-only serverless API endpoints has been added to the `/api` directory to allow a Custom GPT to fetch live vendor data and readiness rules.

- **Endpoints:** `/api/health`, `/api/vendors`, `/api/vendor-by-id`, `/api/vendor-summary`, and `/api/readiness-rules`.
- **OpenAPI Schema:** Located at `actions/bizcredit-builder.openapi.yaml`.
- **Usage:** The Custom GPT uses these endpoints through OpenAI Actions to answer user queries with up-to-date repository data.
- **Architecture Rules:** The static browser frontend does **not** expose OpenAI API keys. API keys must stay server-side.

See `docs/GPT-ACTIONS-SETUP.md` for deployment and integration instructions.

## Phase 3: Optional Server-Side AI Generation

Optional server-side AI endpoints can generate a readiness plan, vendor path explanation, or copy/paste GPT prompt from local dashboard state.

- **Endpoints:** `/api/ai-health`, `/api/generate-readiness-plan`, `/api/explain-vendor-path`, and `/api/generate-gpt-prompt`.
- **Frontend:** `assets/js/ai-client.js` calls these endpoints and falls back to prompt mode when AI is not configured.
- **Environment:** Configure `OPENAI_API_KEY` and optional `OPENAI_MODEL` in Vercel or your local serverless environment.
- **Docs:** See `docs/AI-API-SETUP.md`.

Do not commit `.env` or real secrets. Only `.env.example` should be committed.

## Compliance note

This page intentionally avoids fake testimonials, approval guarantees, score-change promises, credit repair claims, and lender/funding guarantees. It positions BizCredit Builder as an educational planning assistant.

## Recommended next upgrades

- Add a custom domain
- Add analytics
- Add a booking/contact form for Guided Review
- Add screenshots or a real demo video
- Add a small comparison section: “Random advice vs. sequenced credit-building plan”

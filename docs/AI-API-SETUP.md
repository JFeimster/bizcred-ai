# AI API Setup

This repo includes optional server-side AI generation endpoints for the static BizCredit dashboard.

The static pages still work without AI. When the endpoints are unavailable or `OPENAI_API_KEY` is missing, the frontend falls back to copy/paste prompt-builder mode.

## Environment variables

Create environment variables in Vercel or your local serverless environment:

```txt
OPENAI_API_KEY=your_server_side_key
OPENAI_MODEL=gpt-5.5-mini
```

Do not commit `.env` or any real API key. Only `.env.example` should be committed.

## Endpoints

```txt
GET  /api/ai-health
POST /api/generate-readiness-plan
POST /api/explain-vendor-path
POST /api/generate-gpt-prompt
```

## Local behavior

If you run the site with:

```bash
python -m http.server 8000
```

then Vercel serverless functions do not execute. This is expected. The frontend catches that condition and falls back to prompt mode.

Use Vercel Dev or a deployed Vercel environment to exercise the serverless endpoints.

## Safety posture

All generated outputs must remain educational planning only.

The endpoints and frontend must not claim or imply:

- approval guarantees
- funding guarantees
- bureau reporting guarantees
- tradeline guarantees
- score increase guarantees
- lender outcomes
- credit repair services
- legal, tax, lending, or financial advice

Users should verify vendor requirements, lender terms, and bureau reporting directly before acting.

## Request limits

The shared serverless helper rejects request bodies larger than 100 KB and returns safe JSON errors for invalid methods, invalid JSON, missing API configuration, and OpenAI/API failures.

## OpenAPI

The canonical Custom GPT Action schema remains:

```txt
actions/bizcredit-builder.openapi.yaml
```

The AI endpoints are included as optional generation endpoints. They are not required for the read-only vendor/readiness data actions to work.

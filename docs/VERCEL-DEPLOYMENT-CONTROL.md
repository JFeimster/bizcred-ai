# Vercel Deployment Control

## Current Default

Automatic Git deployments are disabled for this repository to avoid burning preview deployments on every branch commit.

The root `vercel.json` uses Vercel's documented full deployment kill switch:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "git": {
    "deploymentEnabled": false
  }
}
```

This blocks automatic Git-triggered deployments for both production and preview branches.

## How to Temporarily Enable Production Deploys

If you need to deploy the `main` branch to production, temporarily replace the kill switch with this branch map:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "git": {
    "deploymentEnabled": {
      "main": true,
      "*": false
    }
  }
}
```

Then:

1. Commit and push that temporary change to `main`.
2. Confirm the production deploy completes.
3. Immediately restore the full kill switch:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "git": {
    "deploymentEnabled": false
  }
}
```

4. Commit and push the lockout restore.

## Preview Deployments

Preview branches should remain disabled. Do not change `"*": false` unless you are intentionally opening a controlled preview window.

## Manual Deployments

Disabling Git-triggered deployments does not remove your ability to manually trigger a deployment from the Vercel dashboard or Vercel CLI. Manual deployments should be used only during controlled deployment windows.

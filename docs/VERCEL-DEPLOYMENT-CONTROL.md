# Vercel Deployment Control

## Current Default

By default, automatic Git deployments are disabled for this repository to avoid burning through Vercel's free preview deploy limits when merging various branches. Both `main` and all preview branches (`*`) have their deployments set to `false` in the root `vercel.json` file.

## How to Temporarily Enable Production Deploys

If you need to deploy the `main` branch to production:

1. Open `vercel.json` in the repository root.
2. Change `"main": false` to `"main": true`.
3. Commit and push the change to `main`. This will trigger the production deploy.
4. **Crucial:** After the production deploy successfully completes, change `"main": true` back to `"main": false`, and commit/push again.

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

Preview branches (`*`) should remain disabled unless deliberately changed for testing.

## Manual Deployments

Disabling Git-triggered deployments does not remove your ability to manually trigger a deployment. You can still go into the Vercel dashboard and manually deploy any branch if needed.

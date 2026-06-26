# GPT Actions Setup Guide

## Purpose of the API
The `/api` endpoints provide a lightweight, read-only interface for the BizCredit Builder Custom GPT to query vendor data and readiness planning rules directly from this repository. This allows the GPT to provide up-to-date, structured information without requiring manual updates to the GPT's knowledge base.

## Deployment on Vercel
1. Create a new Vercel project and link it to your GitHub repository.
2. Vercel will automatically detect the `/api` directory and deploy the files inside as serverless Node.js functions.
3. No framework preset is needed. Deploy as a static site.

## Finding the Production Base URL
1. Once deployed, Vercel will provide a production URL (e.g., `https://your-project-name.vercel.app`).
2. This URL will serve both the static landing page and the API endpoints (e.g., `https://your-project-name.vercel.app/api/health`).
3. You will need this URL to configure the Custom GPT Actions.

## Importing the OpenAPI Schema into Custom GPT
1. Go to the Custom GPT editor in ChatGPT.
2. Under the "Configure" tab, scroll down to "Actions" and click "Create new action".
3. In the "Authentication" section, select "None" (these endpoints are read-only and open by default).
4. In the "Schema" section, copy and paste the contents of `actions/bizcredit-builder.openapi.yaml`.
5. Update the `servers` section in the imported schema to replace `https://your-production-url.vercel.app` with your actual Vercel production URL.
6. Save the Custom GPT.

## Testing the Endpoints
You can test the endpoints in the Custom GPT preview or directly via your browser/curl using your production URL:

- **Health Check:** `GET /api/health`
- **Vendor Summary:** `GET /api/vendor-summary`
- **List Vendors:** `GET /api/vendors?limit=5`
- **Vendor by ID:** `GET /api/vendor-by-id?id=vendor_id_here`

## Safety and Compliance Language
When interacting with users, the Custom GPT must adhere to the following guidelines (enforced by the API disclaimers and schema descriptions):
- **Educational Planning Only:** All information provided is for educational purposes.
- **Verify Vendor Terms:** Vendor terms and reporting behaviors change frequently. Users must verify details directly with the vendor before applying.
- **No Guarantees:** There are no guarantees for approvals, funding, bureau reporting, tradelines, score changes, or specific lender outcomes. This is not credit repair.

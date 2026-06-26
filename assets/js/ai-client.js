const DISCLAIMER = 'Educational planning only. This tool does not guarantee approvals, funding, bureau reporting, tradelines, score changes, credit score increases, or lender outcomes. Verify vendor requirements, lender terms, and bureau reporting directly.';

async function fetchJson(endpoint, options = {}) {
  const response = await fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error('AI endpoint did not return JSON. Falling back to prompt mode.');
  }

  const data = await response.json();
  if (!response.ok) {
    const err = new Error(data.error || 'AI endpoint unavailable.');
    err.payload = data;
    throw err;
  }

  return data;
}

export async function checkAiHealth() {
  try {
    const data = await fetchJson('/api/ai-health', { method: 'GET' });
    return Boolean(data.aiConfigured);
  } catch (_error) {
    return false;
  }
}

function buildReadinessFallback(payload) {
  return [
    'Create an educational business-credit readiness plan from this dashboard state.',
    'Use setup/readiness language only. Do not guarantee approvals, funding, bureau reporting, tradelines, score changes, or lender outcomes.',
    'Tell me the top gaps, next 5 actions, vendor/tradeline cautions, and what I should verify directly.',
    '',
    JSON.stringify(payload || {}, null, 2),
    '',
    DISCLAIMER
  ].join('\n');
}

function buildVendorPathFallback(payload) {
  return [
    'Explain a safe business-credit vendor path from this vendor tracker state.',
    'Use sequence/readiness language only. Do not guarantee approvals, reporting, tradelines, funding, score changes, or lender outcomes.',
    'Tell me what to research next, what to verify directly, and what statuses should change next.',
    '',
    JSON.stringify(payload || {}, null, 2),
    '',
    DISCLAIMER
  ].join('\n');
}

function buildGptPromptFallback(payload) {
  return [
    'I am using BizCredit Builder GPT. Build me an educational business-credit readiness plan from this dashboard state.',
    'Please identify setup gaps, next actions, vendor sequence, and verification steps.',
    'Do not frame this as credit repair and do not guarantee approvals, funding, bureau reporting, tradelines, score changes, or lender outcomes.',
    '',
    JSON.stringify(payload || {}, null, 2),
    '',
    DISCLAIMER
  ].join('\n');
}

async function postOrFallback(endpoint, payload, fallbackBuilder, responseField) {
  try {
    const data = await fetchJson(endpoint, {
      method: 'POST',
      body: JSON.stringify(payload || {})
    });

    return {
      ok: true,
      fallback: false,
      text: data[responseField] || data.plan || data.explanation || data.prompt || '',
      raw: data
    };
  } catch (error) {
    return {
      ok: false,
      fallback: true,
      text: error.payload?.fallbackPrompt || fallbackBuilder(payload),
      raw: error.payload || null
    };
  }
}

export function aiDisclaimer() {
  return DISCLAIMER;
}

export async function generateReadinessPlan(payload) {
  return postOrFallback('/api/generate-readiness-plan', payload, buildReadinessFallback, 'plan');
}

export async function explainVendorPath(payload) {
  return postOrFallback('/api/explain-vendor-path', payload, buildVendorPathFallback, 'explanation');
}

export async function generateGptPrompt(payload) {
  return postOrFallback('/api/generate-gpt-prompt', payload, buildGptPromptFallback, 'prompt');
}

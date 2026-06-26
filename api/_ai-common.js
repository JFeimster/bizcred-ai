const DISCLAIMER = 'Educational planning only. This tool does not guarantee approvals, funding, bureau reporting, tradelines, score changes, credit score increases, or lender outcomes. Verify vendor requirements, lender terms, and bureau reporting directly.';

const MAX_BODY_BYTES = 100 * 1024;
const DEFAULT_MODEL = 'gpt-5.5-mini';

function setCorsHeaders(res, methods = 'POST, OPTIONS') {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', methods);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(res, status, payload) {
  res.status(status).json({ disclaimer: DISCLAIMER, ...payload });
}

function rejectMethod(req, res, allowedMethod) {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }

  if (req.method !== allowedMethod) {
    sendJson(res, 405, { ok: false, error: 'Method not allowed' });
    return true;
  }

  return false;
}

async function parseJsonBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body;
  }

  let raw = '';

  if (typeof req.body === 'string') {
    raw = req.body;
  } else if (Buffer.isBuffer(req.body)) {
    raw = req.body.toString('utf8');
  } else {
    for await (const chunk of req) {
      raw += chunk;
      if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) {
        const err = new Error('Payload too large');
        err.statusCode = 413;
        throw err;
      }
    }
  }

  if (!raw.trim()) return {};

  if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) {
    const err = new Error('Payload too large');
    err.statusCode = 413;
    throw err;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    const err = new Error('Invalid JSON request body');
    err.statusCode = 400;
    throw err;
  }
}

function isAiConfigured() {
  return Boolean(process.env.OPENAI_API_KEY);
}

function getConfiguredModel() {
  return process.env.OPENAI_MODEL || DEFAULT_MODEL;
}

function compactPayload(payload) {
  return JSON.stringify(payload || {}, null, 2).slice(0, 12000);
}

function extractOutputText(data) {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const chunks = [];
  const output = Array.isArray(data?.output) ? data.output : [];

  output.forEach((item) => {
    const content = Array.isArray(item?.content) ? item.content : [];
    content.forEach((part) => {
      if (typeof part?.text === 'string') chunks.push(part.text);
      if (typeof part?.value === 'string') chunks.push(part.value);
    });
  });

  return chunks.join('\n').trim();
}

async function callOpenAI({ taskName, instruction, payload, maxOutputTokens = 900 }) {
  if (!isAiConfigured()) {
    const err = new Error('AI generation is not configured for this deployment.');
    err.statusCode = 503;
    err.safe = true;
    throw err;
  }

  const model = getConfiguredModel();
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      instructions: [
        'You are BizCredit Builder AI, an educational business-credit readiness planning assistant.',
        'You must not provide legal, tax, credit repair, lending, or financial advice.',
        'You must not guarantee approvals, funding, bureau reporting, tradelines, score changes, or lender outcomes.',
        'Use readiness, setup, common gaps, sequencing, and next-step language.',
        'Tell users to verify vendor requirements, lender terms, and reporting directly.',
        `Always include this disclaimer exactly once: ${DISCLAIMER}`
      ].join('\n'),
      input: [
        `Task: ${taskName}`,
        instruction,
        'Dashboard payload:',
        compactPayload(payload)
      ].join('\n\n'),
      max_output_tokens: maxOutputTokens
    })
  });

  if (!response.ok) {
    const err = new Error('AI generation request failed.');
    err.statusCode = response.status >= 400 && response.status < 600 ? response.status : 502;
    err.safe = true;
    throw err;
  }

  const data = await response.json();
  const text = extractOutputText(data);

  if (!text) {
    const err = new Error('AI generation returned an empty response.');
    err.statusCode = 502;
    err.safe = true;
    throw err;
  }

  return { text, model };
}

function safeErrorPayload(error, fallbackPrompt) {
  return {
    ok: false,
    fallback: true,
    error: error?.safe ? error.message : 'AI generation is unavailable. Use the fallback prompt instead.',
    fallbackPrompt
  };
}

module.exports = {
  DISCLAIMER,
  setCorsHeaders,
  sendJson,
  rejectMethod,
  parseJsonBody,
  isAiConfigured,
  getConfiguredModel,
  callOpenAI,
  safeErrorPayload
};
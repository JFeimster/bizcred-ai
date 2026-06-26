const {
  setCorsHeaders,
  sendJson,
  rejectMethod,
  parseJsonBody,
  callOpenAI,
  safeErrorPayload
} = require('./_ai-common');

function buildFallbackPrompt(payload) {
  return [
    'Create an educational business-credit readiness plan from this dashboard state.',
    'Do not guarantee approvals, funding, bureau reporting, tradelines, score changes, or lender outcomes.',
    'Use readiness/setup/common gap language only and remind me to verify vendor and lender terms directly.',
    '',
    JSON.stringify(payload || {}, null, 2)
  ].join('\n');
}

module.exports = async (req, res) => {
  setCorsHeaders(res, 'POST, OPTIONS');
  if (rejectMethod(req, res, 'POST')) return;

  let payload;
  try {
    payload = await parseJsonBody(req);
  } catch (error) {
    sendJson(res, error.statusCode || 400, { ok: false, error: error.message });
    return;
  }

  const fallbackPrompt = buildFallbackPrompt(payload);

  try {
    const result = await callOpenAI({
      taskName: 'Generate readiness plan',
      instruction: [
        'Return a concise readiness plan with these sections:',
        '1. Current readiness snapshot.',
        '2. Top setup gaps.',
        '3. Next 5 actions in sequence.',
        '4. Vendor/tradeline cautions.',
        '5. Suggested GPT prompt to continue in BizCredit Builder GPT.'
      ].join('\n'),
      payload,
      maxOutputTokens: 900
    });

    sendJson(res, 200, {
      ok: true,
      source: 'openai',
      model: result.model,
      plan: result.text
    });
  } catch (error) {
    sendJson(res, error.statusCode || 503, safeErrorPayload(error, fallbackPrompt));
  }
};
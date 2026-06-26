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
    'Explain a safe business-credit vendor path from this vendor tracker state.',
    'Do not guarantee approvals, funding, bureau reporting, tradelines, score changes, or lender outcomes.',
    'Use sequence/readiness language only and tell me what to verify directly with each vendor.',
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
      taskName: 'Explain vendor path',
      instruction: [
        'Explain the vendor/tradeline sequence in plain English.',
        'Include which vendors look like starter research targets, which items need verification, and what status changes should happen next.',
        'Avoid approval/reporting guarantees and avoid credit repair framing.'
      ].join('\n'),
      payload,
      maxOutputTokens: 800
    });

    sendJson(res, 200, {
      ok: true,
      source: 'openai',
      model: result.model,
      explanation: result.text
    });
  } catch (error) {
    sendJson(res, error.statusCode || 503, safeErrorPayload(error, fallbackPrompt));
  }
};
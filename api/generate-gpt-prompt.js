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
    'Write a strong prompt I can paste into BizCredit Builder GPT using this dashboard state.',
    'The prompt should ask for an educational business-credit readiness plan and should not ask for guaranteed approvals, funding, reporting, tradelines, or score increases.',
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
      taskName: 'Generate BizCredit Builder GPT prompt',
      instruction: [
        'Generate one polished prompt the user can paste into BizCredit Builder GPT.',
        'Make the prompt specific to the dashboard payload.',
        'Ask for a readiness plan, vendor sequence, missing setup signals, and next actions.',
        'Keep the prompt educational and do not request guarantees.'
      ].join('\n'),
      payload,
      maxOutputTokens: 700
    });

    sendJson(res, 200, {
      ok: true,
      source: 'openai',
      model: result.model,
      prompt: result.text
    });
  } catch (error) {
    sendJson(res, error.statusCode || 503, safeErrorPayload(error, fallbackPrompt));
  }
};
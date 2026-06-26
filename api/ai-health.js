const {
  DISCLAIMER,
  setCorsHeaders,
  sendJson,
  isAiConfigured,
  getConfiguredModel
} = require('./_ai-common');

module.exports = async (req, res) => {
  setCorsHeaders(res, 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    sendJson(res, 405, { ok: false, error: 'Method not allowed' });
    return;
  }

  sendJson(res, 200, {
    ok: true,
    service: 'bizcredit-ai-generation',
    aiConfigured: isAiConfigured(),
    model: isAiConfigured() ? getConfiguredModel() : null,
    disclaimer: DISCLAIMER
  });
};
const fs = require('fs').promises;
const path = require('path');

const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

const includes = (value, query) => String(value || '').toLowerCase().includes(String(query || '').toLowerCase());

module.exports = async (req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const dataPath = path.join(process.cwd(), 'data/gpts/custom-gpts.normalized.json');
    let rawData;

    try {
      rawData = await fs.readFile(dataPath, 'utf-8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        return res.status(200).json({ data: [], meta: { total: 0, returned: 0, filters: req.query || {} }, disclaimer: 'Educational planning only. Verify GPT access and fit directly.' });
      }
      throw err;
    }

    let gpts = JSON.parse(rawData);
    const query = req.query || {};

    if (query.search) gpts = gpts.filter((gpt) => includes(gpt.name, query.search) || includes(gpt.description, query.search));
    if (query.recommended_stage) gpts = gpts.filter((gpt) => includes(gpt.recommended_stage, query.recommended_stage));
    if (query.keyword) gpts = gpts.filter((gpt) => includes(gpt.keyword, query.keyword) || includes(gpt.name, query.keyword) || includes(gpt.description, query.keyword));
    if (query.category) gpts = gpts.filter((gpt) => includes(gpt.category, query.category));
    if (query.has_access_url !== undefined) {
      const expected = query.has_access_url === 'true' || query.has_access_url === '1' || query.has_access_url === true;
      gpts = gpts.filter((gpt) => Boolean(gpt.has_access_url || gpt.url) === expected);
    }

    const total = gpts.length;
    const limit = Number.parseInt(query.limit, 10);
    if (!Number.isNaN(limit) && limit > 0) gpts = gpts.slice(0, limit);

    res.status(200).json({
      data: gpts,
      meta: { total, returned: gpts.length, filters: query },
      disclaimer: 'Educational planning only. No funding, approval, bureau reporting, tradeline, score-change, or lender-outcome guarantees.'
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error processing GPT directory', details: error.message });
  }
};

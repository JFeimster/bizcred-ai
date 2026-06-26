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
    const dataPath = path.join(process.cwd(), 'data/tools/funding-tools.normalized.json');
    let rawData;

    try {
      rawData = await fs.readFile(dataPath, 'utf-8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        return res.status(200).json({ data: [], meta: { total: 0, returned: 0, filters: req.query || {} }, disclaimer: 'Educational planning only. Verify tool fit and requirements directly.' });
      }
      throw err;
    }

    let tools = JSON.parse(rawData);
    const query = req.query || {};

    if (query.search) tools = tools.filter((tool) => includes(tool.name, query.search) || includes(tool.description, query.search));
    if (query.persona) tools = tools.filter((tool) => includes(tool.persona, query.persona));
    if (query.problem_keyword) tools = tools.filter((tool) => includes(tool.problem_keyword, query.problem_keyword));
    if (query.asset_type) tools = tools.filter((tool) => includes(tool.asset_type, query.asset_type) || includes(tool.category, query.asset_type));
    if (query.build_state) tools = tools.filter((tool) => includes(tool.build_state, query.build_state) || includes(tool.recommended_stage, query.build_state));
    if (query.status) tools = tools.filter((tool) => includes(tool.status, query.status));
    if (query.partner_channel) tools = tools.filter((tool) => includes(tool.partner_channel, query.partner_channel));

    const total = tools.length;
    const limit = Number.parseInt(query.limit, 10);
    if (!Number.isNaN(limit) && limit > 0) tools = tools.slice(0, limit);

    res.status(200).json({
      data: tools,
      meta: { total, returned: tools.length, filters: query },
      disclaimer: 'Educational planning only. No funding, approval, bureau reporting, tradeline, score-change, or lender-outcome guarantees.'
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error processing funding tools', details: error.message });
  }
};

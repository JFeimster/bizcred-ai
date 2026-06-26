const fs = require('fs').promises;
const path = require('path');

const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

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
    const dataPath = path.join(process.cwd(), 'data/credit-vendors.registry.json');
    let rawData;
    try {
      rawData = await fs.readFile(dataPath, 'utf-8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        return res.status(200).json({
          total_vendors: 0,
          count_by_tier: {},
          count_by_category: {},
          count_by_terms: {},
          count_by_bureau: {},
          count_requiring_pg: 0,
          count_ein_only: 0,
          count_reporting_to_dnb: 0,
          disclaimer: "Vendor requirements and reporting behavior may change. Verify directly before applying or relying on reporting."
        });
      }
      throw err;
    }

    const vendors = JSON.parse(rawData);

    const summary = {
      total_vendors: vendors.length,
      count_by_tier: {},
      count_by_category: {},
      count_by_terms: {},
      count_by_bureau: {},
      count_requiring_pg: 0,
      count_ein_only: 0,
      count_reporting_to_dnb: 0
    };

    vendors.forEach(v => {
      // Tier
      if (v.tier !== undefined) {
        summary.count_by_tier[v.tier] = (summary.count_by_tier[v.tier] || 0) + 1;
      }
      // Category
      if (v.category) {
        summary.count_by_category[v.category] = (summary.count_by_category[v.category] || 0) + 1;
      }
      // Terms
      if (v.terms) {
        summary.count_by_terms[v.terms] = (summary.count_by_terms[v.terms] || 0) + 1;
      }
      // Bureau & DNB
      if (Array.isArray(v.reports_to)) {
        let reportsToDnb = false;
        v.reports_to.forEach(bureau => {
          summary.count_by_bureau[bureau] = (summary.count_by_bureau[bureau] || 0) + 1;
          if (bureau.toLowerCase().includes('dnb') || bureau.toLowerCase().includes('dun')) {
            reportsToDnb = true;
          }
        });
        if (reportsToDnb) summary.count_reporting_to_dnb++;
      }
      // PG
      if (v.requires_pg) {
        summary.count_requiring_pg++;
      }
      // EIN Only
      if (v.ein_only) {
        summary.count_ein_only++;
      }
    });

    res.status(200).json({
      ...summary,
      disclaimer: "Vendor requirements and reporting behavior may change. Verify directly before applying or relying on reporting."
    });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error processing vendor summary', details: error.message });
  }
};
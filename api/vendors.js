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
          data: [],
          meta: { total: 0, returned: 0, filters: req.query || {} },
          disclaimer: "Vendor requirements and reporting behavior may change. Verify directly before applying or relying on reporting.",
          error: 'Vendor data file not found'
        });
      }
      throw err;
    }

    let vendors = JSON.parse(rawData);

    // Filter implementation
    const query = req.query || {};

    if (query.tier) {
      vendors = vendors.filter(v => v.tier === parseInt(query.tier, 10) || v.tier === query.tier);
    }
    if (query.category) {
      vendors = vendors.filter(v => v.category && v.category.toLowerCase() === query.category.toLowerCase());
    }
    if (query.terms) {
      vendors = vendors.filter(v => v.terms && v.terms.toLowerCase() === query.terms.toLowerCase());
    }
    if (query.reports_to) {
      const targetBureau = query.reports_to.toLowerCase();
      vendors = vendors.filter(v => v.reports_to && v.reports_to.some(b => b.toLowerCase() === targetBureau));
    }
    if (query.dnb_reporter !== undefined) {
      const isTrue = query.dnb_reporter === 'true' || query.dnb_reporter === '1' || query.dnb_reporter === true;
      vendors = vendors.filter(v => {
        const reportsToDnb = v.reports_to && v.reports_to.some(b => b.toLowerCase().includes('dnb') || b.toLowerCase().includes('dun'));
        return reportsToDnb === isTrue;
      });
    }
    if (query.requires_pg !== undefined) {
      const isTrue = query.requires_pg === 'true' || query.requires_pg === '1' || query.requires_pg === true;
      vendors = vendors.filter(v => !!v.requires_pg === isTrue);
    }
    if (query.ein_only !== undefined) {
      const isTrue = query.ein_only === 'true' || query.ein_only === '1' || query.ein_only === true;
      vendors = vendors.filter(v => !!v.ein_only === isTrue);
    }
    if (query.min_time_in_business_months_lte !== undefined) {
      const maxMonths = parseInt(query.min_time_in_business_months_lte, 10);
      if (!isNaN(maxMonths)) {
        vendors = vendors.filter(v => (v.min_time_in_business_months || 0) <= maxMonths);
      }
    }
    if (query.search) {
      const search = query.search.toLowerCase();
      vendors = vendors.filter(v =>
        (v.name && v.name.toLowerCase().includes(search)) ||
        (v.description && v.description.toLowerCase().includes(search))
      );
    }

    const total = vendors.length;

    if (query.limit) {
      const limit = parseInt(query.limit, 10);
      if (!isNaN(limit) && limit > 0) {
        vendors = vendors.slice(0, limit);
      }
    }

    res.status(200).json({
      data: vendors,
      meta: {
        total: total,
        returned: vendors.length,
        filters: query
      },
      disclaimer: "Vendor requirements and reporting behavior may change. Verify directly before applying or relying on reporting."
    });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error processing vendors', details: error.message });
  }
};
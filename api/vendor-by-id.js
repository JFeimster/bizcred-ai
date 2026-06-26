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

  const { id } = req.query || {};

  if (!id) {
    return res.status(400).json({ error: 'Vendor ID is required' });
  }

  try {
    const dataPath = path.join(process.cwd(), 'data/credit-vendors.registry.json');
    let rawData;
    try {
      rawData = await fs.readFile(dataPath, 'utf-8');
    } catch (err) {
      if (err.code === 'ENOENT') {
        return res.status(404).json({ error: 'Vendor data file not found' });
      }
      throw err;
    }

    const vendors = JSON.parse(rawData);
    const vendor = vendors.find(v => v.id === id);

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    res.status(200).json({
      data: vendor,
      disclaimer: "Vendor requirements and reporting behavior may change. Verify directly before applying or relying on reporting."
    });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error processing vendor', details: error.message });
  }
};
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
    const rulesPath = path.join(process.cwd(), 'data/readiness-rules.json');
    const tasksPath = path.join(process.cwd(), 'data/setup-tasks.json');

    let rules = {};
    let tasks = [];

    try {
      const rawRules = await fs.readFile(rulesPath, 'utf-8');
      rules = JSON.parse(rawRules);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    try {
      const rawTasks = await fs.readFile(tasksPath, 'utf-8');
      tasks = JSON.parse(rawTasks);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    res.status(200).json({
      setup_tasks: tasks,
      readiness_rules: rules,
      disclaimer: "Readiness scoring is educational and does not guarantee approvals, funding, bureau reporting, tradelines, score changes, or lender outcomes."
    });

  } catch (error) {
    res.status(500).json({ error: 'Internal server error processing readiness rules', details: error.message });
  }
};
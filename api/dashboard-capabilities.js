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

  res.status(200).json({
    app: 'BizCredit OS',
    version: '1.0.0',
    mode: 'local-first',
    activePages: [
      'Business HQ',
      'BizCredit Passport',
      'Profile',
      'Credit Directory',
      'Vendor Profile',
      'Tradeline Planner',
      'Roadmap',
      'Funding Tools',
      'GPT Directory',
      'Notion Bridge',
      'Imports',
      'Exports',
      'Schemas'
    ],
    activeLocalStorageAreas: [
      'bizcredit.v1.profile',
      'bizcredit.v1.passport',
      'bizcredit.v1.tradelines',
      'bizcredit.v1.roadmap',
      'bizcredit.v1.alerts',
      'bizcredit.v1.importJobs',
      'bizcredit.v1.settings',
      'bizcredit.v1.notionTemplateSources'
    ],
    readOnlyApis: [
      '/api/health',
      '/api/vendors',
      '/api/vendor-by-id',
      '/api/vendor-summary',
      '/api/readiness-rules',
      '/api/funding-tools',
      '/api/gpt-directory',
      '/api/dashboard-capabilities',
      '/api/action-manifest'
    ],
    browserOnlyWorkflows: [
      'localStorage data persistence',
      'manual Notion template references',
      'manual Notion Markdown/CSV exports',
      'dashboard snapshot export',
      'data import/export',
      'tradeline planning state updates'
    ],
    futureGatedWorkflows: [
      '/api/funding/match',
      '/api/imports/*',
      '/api/passport/build',
      '/api/tradelines/save',
      '/api/tradelines/update-status',
      '/api/exports/*',
      '/api/notion/*',
      'Live Notion Sync'
    ],
    safety: {
      noPublicWrites: true,
      noPublicImports: true,
      noLiveNotionSync: true,
      noUserDataReturned: true,
      educationalOnly: true
    },
    disclaimer: 'Educational planning only. No guarantees for approval, funding, reporting, tradelines, score changes, or lender outcomes. Verify vendor terms directly before applying.'
  });
};

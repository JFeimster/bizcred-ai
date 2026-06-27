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

  const manifest = [
    {
      file: 'actions/bizcredit-builder.openapi.yaml',
      status: 'canonical',
      safeForNoAuth: true,
      endpointFamily: '/api/*',
      importIntoGPT: true,
      notes: 'Canonical core read-only GPT Actions for health, vendors, vendor lookup, vendor summary, and readiness rules.'
    },
    {
      file: 'actions/vendor-directory.openapi.yaml',
      status: 'legacy_reference',
      safeForNoAuth: false,
      endpointFamily: 'legacy/reference only',
      importIntoGPT: false,
      notes: 'Legacy reference file. Do not import into GPT Actions; use actions/bizcredit-builder.openapi.yaml for canonical vendor endpoints.'
    },
    {
      file: 'actions/funding-tools.openapi.yaml',
      status: 'secondary',
      safeForNoAuth: true,
      endpointFamily: '/api/funding-tools',
      importIntoGPT: true,
      notes: 'Read-only API for funding tools directory.'
    },
    {
      file: 'actions/custom-gpt-directory.openapi.yaml',
      status: 'secondary',
      safeForNoAuth: true,
      endpointFamily: '/api/gpt-directory',
      importIntoGPT: true,
      notes: 'Read-only API for Custom GPT directory.'
    },
    {
      file: 'actions/dashboard-capabilities.openapi.yaml',
      status: 'secondary',
      safeForNoAuth: true,
      endpointFamily: '/api/dashboard-capabilities, /api/action-manifest',
      importIntoGPT: true,
      notes: 'Read-only capability and action manifest metadata. Does not expose user data or perform sync.'
    },
    {
      file: 'actions/directory.openapi.yaml',
      status: 'future_do_not_create_yet',
      safeForNoAuth: false,
      endpointFamily: '/api/directory/*',
      importIntoGPT: false,
      notes: 'Future file. Directory search may be safe later; dedupe touches submitted data and requires browser-only or authenticated handling.'
    },
    {
      file: 'actions/tools-gpts.openapi.yaml',
      status: 'future_do_not_create_yet',
      safeForNoAuth: true,
      endpointFamily: '/api/tools/*, /api/gpts/*',
      importIntoGPT: false,
      notes: 'Future file. Search functionality may be safe for no-auth only when backed by approved public/system records.'
    },
    {
      file: 'actions/funding.openapi.yaml',
      status: 'future_do_not_create_yet',
      safeForNoAuth: false,
      endpointFamily: '/api/funding/*',
      importIntoGPT: false,
      notes: 'Future file. Requires paid/auth/verified access and strict no-guarantee framing.'
    },
    {
      file: 'actions/imports.openapi.yaml',
      status: 'future_do_not_create_yet',
      safeForNoAuth: false,
      endpointFamily: '/api/imports/*',
      importIntoGPT: false,
      notes: 'Future file. Recommended to remain browser-only because import workflows touch user-submitted data.'
    },
    {
      file: 'actions/passport.openapi.yaml',
      status: 'future_do_not_create_yet',
      safeForNoAuth: false,
      endpointFamily: '/api/passport/*',
      importIntoGPT: false,
      notes: 'Future file. Recommended to remain browser-only unless authenticated backend storage is explicitly approved.'
    },
    {
      file: 'actions/tradelines.openapi.yaml',
      status: 'future_do_not_create_yet',
      safeForNoAuth: false,
      endpointFamily: '/api/tradelines/*',
      importIntoGPT: false,
      notes: 'Future file. Highly recommended to remain browser-only because tradeline workflows mutate user state.'
    },
    {
      file: 'actions/exports.openapi.yaml',
      status: 'future_do_not_create_yet',
      safeForNoAuth: false,
      endpointFamily: '/api/exports/*, /api/notion/*',
      importIntoGPT: false,
      notes: 'Future file. Requires authenticated/OAuth architecture. Manual browser-only exports are preferred for now.'
    }
  ];

  res.status(200).json({
    data: manifest,
    disclaimer: 'Educational planning only. No guarantees for approval, funding, reporting, tradelines, score changes, or lender outcomes. Verify vendor terms directly before applying.'
  });
};

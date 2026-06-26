import { loadFromStorage, saveToStorage } from './storage.js';
import { explainVendorPath } from './ai-client.js';

let vendorData = [];
const statusOptions = [
  { value: 'not_started', label: 'Not Started' },
  { value: 'researching', label: 'Researching' },
  { value: 'applied', label: 'Applied' },
  { value: 'active', label: 'Active' },
  { value: 'reporting', label: 'Reporting' },
  { value: 'needs_verification', label: 'Needs Verification' },
  { value: 'not_fit', label: 'Not Fit' }
];

async function initVendorTracker() {
  injectVendorAiPanel();
  setupAiVendorPath();

  try {
    const response = await fetch('data/credit-vendors.registry.json');
    if (!response.ok) throw new Error('Failed to load vendors');
    vendorData = await response.json();

    if (vendorData.length === 0) {
       const tbody = document.getElementById('vendor-table-body');
       if (tbody) {
          tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;">No vendor data found. Please see README to add vendor registry.</td></tr>';
       }
       return;
    }

    populateFilters();
    renderTable();
    setupEventListeners();
  } catch (error) {
    console.error('Error initializing vendor tracker:', error);
    const errorDiv = document.getElementById('vendor-error');
    if (errorDiv) errorDiv.style.display = 'block';
  }
}

function populateFilters() {
  const tiers = new Set();
  const categories = new Set();
  const terms = new Set();
  const bureaus = new Set();

  vendorData.forEach(v => {
    if (v.tier) tiers.add(v.tier);
    if (v.category) categories.add(v.category);
    if (v.terms) terms.add(v.terms);
    if (v.reports_to) v.reports_to.forEach(b => bureaus.add(b));
  });

  const populateSelect = (id, set) => {
    const select = document.getElementById(id);
    if (!select) return;
    Array.from(set).sort().forEach(val => {
      const option = document.createElement('option');
      option.value = val;
      option.textContent = val;
      select.appendChild(option);
    });
  };

  populateSelect('filter-tier', tiers);
  populateSelect('filter-category', categories);
  populateSelect('filter-terms', terms);
  populateSelect('filter-reports-to', bureaus);
}

function renderTable() {
  const tbody = document.getElementById('vendor-table-body');
  if (!tbody) return;

  const savedStatuses = loadFromStorage('VENDORS', {});
  const filterSearch = document.getElementById('search-vendor')?.value.toLowerCase() || '';
  const filterTier = document.getElementById('filter-tier')?.value;
  const filterCategory = document.getElementById('filter-category')?.value;
  const filterTerms = document.getElementById('filter-terms')?.value;
  const filterReportsTo = document.getElementById('filter-reports-to')?.value;
  const filterPG = document.getElementById('filter-requires-pg')?.checked;
  const filterEIN = document.getElementById('filter-ein-only')?.checked;

  const filteredData = vendorData.filter(v => {
    if (filterSearch && (!v.name || !v.name.toLowerCase().includes(filterSearch))) return false;
    if (filterTier && String(v.tier) !== String(filterTier)) return false;
    if (filterCategory && v.category !== filterCategory) return false;
    if (filterTerms && v.terms !== filterTerms) return false;
    if (filterReportsTo && (!v.reports_to || !v.reports_to.includes(filterReportsTo))) return false;
    if (filterPG && v.requires_pg !== true) return false;
    if (filterEIN && v.ein_only !== true) return false;
    return true;
  });

  tbody.innerHTML = '';

  if (filteredData.length === 0) {
      tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;">No vendors match your filters.</td></tr>';
      return;
  }

  filteredData.forEach(v => {
    const tr = document.createElement('tr');
    const currentStatus = savedStatuses[v.id] || 'not_started';
    let statusSelect = `<select class="status-select" data-id="${v.id}">`;
    statusOptions.forEach(opt => {
      statusSelect += `<option value="${opt.value}" ${currentStatus === opt.value ? 'selected' : ''}>${opt.label}</option>`;
    });
    statusSelect += '</select>';

    tr.innerHTML = `
      <td><strong>${v.name || 'N/A'}</strong></td>
      <td>${v.tier || 'N/A'}</td>
      <td>${v.category || 'N/A'}</td>
      <td>${v.reports_to ? v.reports_to.join(', ') : 'N/A'}</td>
      <td>${v.terms || 'N/A'}</td>
      <td>${v.requires_pg ? 'Yes' : 'No'}</td>
      <td>${v.ein_only ? 'Yes' : 'No'}</td>
      <td>${v.min_time_in_business_months !== undefined ? v.min_time_in_business_months + ' months' : 'N/A'}</td>
      <td>${v.approval_notes || ''}</td>
      <td>${statusSelect}</td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('.status-select').forEach(select => {
    select.addEventListener('change', (e) => {
      const id = e.target.getAttribute('data-id');
      const val = e.target.value;
      const currentStatuses = loadFromStorage('VENDORS', {});
      currentStatuses[id] = val;
      saveToStorage('VENDORS', currentStatuses);
    });
  });
}

function setupEventListeners() {
  const filters = [
    'search-vendor', 'filter-tier', 'filter-category',
    'filter-terms', 'filter-reports-to'
  ];
  filters.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', renderTable);
  });

  ['filter-requires-pg', 'filter-ein-only'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', renderTable);
  });
}

function injectVendorAiPanel() {
  if (document.getElementById('ai-vendor-path-panel')) return;

  const panel = document.querySelector('.vendors-panel');
  if (!panel) return;

  const aiPanel = document.createElement('div');
  aiPanel.id = 'ai-vendor-path-panel';
  aiPanel.className = 'panel bento-card yellow';
  aiPanel.style.marginTop = '24px';
  aiPanel.innerHTML = `
    <h3>AI Vendor Path Explanation</h3>
    <p>Generate a safe vendor-path explanation from your local tracker. If AI is unavailable, this creates a copy/paste prompt.</p>
    <p class="microcopy">Educational planning only. Verify vendor requirements and reporting directly.</p>
    <div class="hero-actions" style="margin-top: 15px;">
      <button type="button" class="button button-ink" id="ai-vendor-path-btn">Explain Vendor Path</button>
    </div>
    <div class="prompt-output-area" style="margin-top: 15px;">
      <textarea id="ai-vendor-path-output" rows="9" readonly placeholder="Vendor path explanation or fallback prompt appears here..."></textarea>
    </div>
  `;

  panel.appendChild(aiPanel);
}

function getVendorPathContext() {
  const statuses = loadFromStorage('VENDORS', {});
  const trackedVendors = Object.keys(statuses).map((id) => {
    const vendor = vendorData.find(v => v.id === id);
    return {
      id,
      status: statuses[id],
      name: vendor?.name || id,
      tier: vendor?.tier,
      category: vendor?.category,
      terms: vendor?.terms,
      reports_to: vendor?.reports_to,
      requires_pg: vendor?.requires_pg,
      ein_only: vendor?.ein_only
    };
  });

  return {
    trackedVendors,
    availableVendorCount: vendorData.length,
    sampleVendors: vendorData.slice(0, 20)
  };
}

function setupAiVendorPath() {
  document.getElementById('ai-vendor-path-btn')?.addEventListener('click', async (e) => {
    const output = document.getElementById('ai-vendor-path-output');
    const btn = e.target;
    const oldText = btn.innerText;
    btn.innerText = 'Generating...';
    btn.disabled = true;

    const result = await explainVendorPath(getVendorPathContext());
    output.value = result.text;

    btn.innerText = result.fallback ? 'Fallback Ready' : 'Path Ready';
    setTimeout(() => {
      btn.innerText = oldText;
      btn.disabled = false;
    }, 1500);
  });
}

if (document.getElementById('vendor-table')) {
  initVendorTracker();
}

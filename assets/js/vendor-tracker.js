import { loadFromStorage, saveToStorage } from './storage.js';

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
  try {
    const response = await fetch('data/credit-vendors.registry.json');
    if (!response.ok) throw new Error('Failed to load vendors');
    vendorData = await response.json();

    if (vendorData.length === 0) {
       // Optional: Render a fallback message in the table if empty
       const tbody = document.getElementById('vendor-table-body');
       if(tbody) {
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
    if (filterSearch && !v.vendor_name.toLowerCase().includes(filterSearch)) return false;
    if (filterTier && v.tier !== filterTier) return false;
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

    // Status Dropdown
    const currentStatus = savedStatuses[v.id] || 'not_started';
    let statusSelect = `<select class="status-select" data-id="${v.id}">`;
    statusOptions.forEach(opt => {
      statusSelect += `<option value="${opt.value}" ${currentStatus === opt.value ? 'selected' : ''}>${opt.label}</option>`;
    });
    statusSelect += `</select>`;

    tr.innerHTML = `
      <td><strong>${v.vendor_name || 'N/A'}</strong></td>
      <td>${v.tier || 'N/A'}</td>
      <td>${v.category || 'N/A'}</td>
      <td>${v.reports_to ? v.reports_to.join(', ') : 'N/A'}</td>
      <td>${v.terms || 'N/A'}</td>
      <td>${v.requires_pg ? 'Yes' : 'No'}</td>
      <td>${v.ein_only ? 'Yes' : 'No'}</td>
      <td>${v.min_time_in_biz || 'N/A'}</td>
      <td>${v.notes || ''}</td>
      <td>${statusSelect}</td>
    `;
    tbody.appendChild(tr);
  });

  // Bind events to new select elements
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
    if(el) el.addEventListener('input', renderTable);
  });

  ['filter-requires-pg', 'filter-ein-only'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.addEventListener('change', renderTable);
  });
}

// Run init if on vendors page
if (document.getElementById('vendor-table')) {
  initVendorTracker();
}

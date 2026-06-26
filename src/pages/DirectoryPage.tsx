import { useState, useEffect } from 'react';
import { VendorItem, filterDirectoryItems, DirectoryFilters } from '../modules/directory/filterDirectoryItems';
import { readLocal, writeLocal } from '../storage/localStorageClient';
import { STORAGE_KEYS } from '../storage/storageKeys';
import { defaultTradelines } from '../storage/storageDefaults';
import { Tradeline } from '../types/tradeline';
import { addTradeline } from '../modules/tradelines/updateTradeline';

export default function DirectoryPage() {
  const [vendors, setVendors] = useState<VendorItem[]>([]);
  const [savedVendorIds, setSavedVendorIds] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<DirectoryFilters>({
    search: '',
    tier: null,
    ein_only: null
  });

  useEffect(() => {
    // In a real app we might fetch this. Since it's a static build requirement, we can import or fetch from public.
    // For this scaffold, we'll fetch from the public data folder
    fetch('/data/vendors/net30-vendors.json')
      .then(res => res.json())
      .then(data => setVendors(data))
      .catch(err => console.error("Failed to load vendors:", err));

    // Load saved tradelines to show correct button state
    const tradelines = readLocal<Tradeline[]>(STORAGE_KEYS.TRADELINES, defaultTradelines);
    const ids = new Set(tradelines.map(t => t.vendorId));
    setSavedVendorIds(ids);
  }, []);

  const handleSaveToPlanner = (vendor: VendorItem) => {
    const tradelines = readLocal<Tradeline[]>(STORAGE_KEYS.TRADELINES, defaultTradelines);

    const newTradeline: Tradeline = {
      id: `dir_${vendor.id}_${Date.now()}`,
      vendorId: vendor.id,
      vendorName: vendor.name,
      tier: vendor.tier,
      status: 'planned',
      verificationStatus: 'unverified'
    };

    const updated = addTradeline(tradelines, newTradeline);
    writeLocal(STORAGE_KEYS.TRADELINES, updated);

    setSavedVendorIds(prev => {
      const next = new Set(prev);
      next.add(vendor.id);
      return next;
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFilters(prev => {
      if (name === 'search') return { ...prev, search: value };
      if (name === 'tier') return { ...prev, tier: value ? parseInt(value) : null };
      if (name === 'ein_only') return { ...prev, ein_only: value === 'true' ? true : value === 'false' ? false : null };
      return prev;
    });
  };

  const filteredVendors = filterDirectoryItems(vendors, filters);

  return (
    <div>
      <h1 className="page-header">Vendor Directory</h1>

      <div className="warning-strip">
        Educational purposes only. Verify reporting behavior and requirements directly with vendors. No approval guarantees.
      </div>

      <div className="dashboard-row">
        {/* Filter Panel */}
        <div className="brutal-card" style={{ flex: '0 0 300px' }}>
          <h3 className="brutal-card-title">Filters</h3>
          <div className="form-group">
            <label className="form-label">Search</label>
            <input type="text" name="search" value={filters.search || ''} onChange={handleFilterChange} className="neo-input" placeholder="Vendor name..." />
          </div>
          <div className="form-group">
            <label className="form-label">Tier</label>
            <select name="tier" value={filters.tier || ''} onChange={handleFilterChange} className="neo-select">
              <option value="">All Tiers</option>
              <option value="1">Tier 1 (Starter)</option>
              <option value="2">Tier 2</option>
              <option value="3">Tier 3</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">EIN Only (No PG)</label>
            <select name="ein_only" value={filters.ein_only == null ? '' : filters.ein_only.toString()} onChange={handleFilterChange} className="neo-select">
              <option value="">Any</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        {/* Vendor List */}
        <div style={{ flex: '1 1 600px' }}>
          <div className="table-container">
            <table className="neo-table">
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Tier</th>
                  <th>Reports To</th>
                  <th>Terms</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map(vendor => (
                  <tr key={vendor.id}>
                    <td>
                      <strong>{vendor.name}</strong>
                      <div className="text-sm text-mono" style={{ marginTop: '0.25rem', color: 'var(--gray-dark)' }}>
                        {vendor.category}
                      </div>
                    </td>
                    <td>
                      <span className="tier-badge">{vendor.tier}</span>
                    </td>
                    <td>
                      {vendor.reports_to.map(bureau => (
                        <span key={bureau} className="bureau-badge">{bureau}</span>
                      ))}
                    </td>
                    <td>{vendor.terms}</td>
                    <td>
                      {savedVendorIds.has(vendor.id) ? (
                        <span className="status-pill success">Saved</span>
                      ) : (
                        <button
                          onClick={() => handleSaveToPlanner(vendor)}
                          className="neo-button neo-button--secondary text-sm"
                        >
                          Save to Planner
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {filteredVendors.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>
                      No vendors match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
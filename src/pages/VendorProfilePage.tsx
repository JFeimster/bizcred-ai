import vendorsData from '../../data/vendors/net30-vendors.normalized.json';
import { TierBadge } from '../components/badges/TierBadge';
import { readLocal, writeLocal } from '../storage/localStorageClient';
import { defaultTradelines } from '../storage/storageDefaults';
import { STORAGE_KEYS } from '../storage/storageKeys';
import type { Tradeline } from '../types/tradeline';
import type { Vendor } from '../types/vendor';

interface VendorProfilePageProps {
  vendorId: string | null;
  onBack: () => void;
}

export default function VendorProfilePage({ vendorId, onBack }: VendorProfilePageProps) {
  const allVendors = vendorsData as Vendor[];
  const vendor = allVendors.find((item) => item.id === vendorId);

  function saveToPlanner() {
    if (!vendor) return;
    const current = readLocal<Tradeline[]>(STORAGE_KEYS.tradelines, defaultTradelines);
    const next: Tradeline = {
      id: `tradeline-${Date.now()}`,
      vendorId: vendor.id,
      vendorName: vendor.name,
      vendorWebsite: vendor.website,
      accountType: 'Vendor account',
      tier: vendor.tier,
      status: 'researching',
      limitAmount: 0,
      balanceAmount: 0,
      terms: vendor.terms,
      reportsTo: vendor.reportsTo,
      notes: 'Verify requirements, terms, fees, and reporting directly before applying.'
    };
    writeLocal(STORAGE_KEYS.tradelines, [...current, next]);
  }

  if (!vendor) {
    return (
      <section className="page-stack">
        <div className="page-header">
          <p className="eyebrow">Vendor Profile</p>
          <h1>Vendor not found</h1>
          <p>Select a vendor from the directory.</p>
          <button className="neo-button" type="button" onClick={onBack}>Back to Directory</button>
        </div>
      </section>
    );
  }

  return (
    <section className="page-stack">
      <div className="page-header">
        <p className="eyebrow">Vendor Profile</p>
        <h1>{vendor.name}</h1>
        <p>{vendor.category} · {vendor.terms || 'Terms must be verified directly'}</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <TierBadge tier={vendor.tier} />
          <span className="status-pill warning">{vendor.verificationStatus.replace(/_/g, ' ')}</span>
        </div>
      </div>

      <div className="two-column-grid">
        <article className="brutal-card">
          <h2>Requirements Snapshot</h2>
          <p><strong>Reports to:</strong> {vendor.reportsTo.join(', ')}</p>
          <p><strong>Startup friendly:</strong> {vendor.startupFriendly ? 'Yes' : 'Verify directly'}</p>
          <p><strong>DUNS required:</strong> {vendor.requiresDuns ? 'May be required' : 'Not indicated'}</p>
          <p><strong>Bank account required:</strong> {vendor.requiresBankAccount ? 'Common requirement' : 'Verify directly'}</p>
          <p><strong>Fees:</strong> {vendor.hasFees ? 'May have fees' : 'Not indicated'}</p>
        </article>

        <article className="brutal-card">
          <h2>Application Notes</h2>
          <p>{vendor.applicationNotes || vendor.cautionNote || 'Verify vendor requirements, terms, fees, and reporting directly before applying.'}</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="neo-button" type="button" onClick={saveToPlanner}>Save to Planner</button>
            <button className="neo-button" type="button" onClick={onBack}>Back to Directory</button>
          </div>
        </article>
      </div>

      <div className="safety-disclaimer brutal-card">
        <strong>Educational planning only.</strong> This vendor profile does not guarantee approval, funding, bureau reporting, tradelines, score changes, or lender outcomes. Verify details directly with the vendor.
      </div>
    </section>
  );
}

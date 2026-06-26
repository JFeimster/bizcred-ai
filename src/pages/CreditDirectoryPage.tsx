import { useMemo, useState } from 'react';
import vendorsData from '../../data/vendors/net30-vendors.normalized.json';
import { VendorFilterForm } from '../components/forms/VendorFilterForm';
import { VendorDirectoryTable } from '../components/tables/VendorDirectoryTable';
import { filterDirectoryItems, type DirectoryFilters } from '../modules/directory/filterDirectoryItems';
import { readLocal, writeLocal } from '../storage/localStorageClient';
import { defaultTradelines } from '../storage/storageDefaults';
import { STORAGE_KEYS } from '../storage/storageKeys';
import type { Tradeline } from '../types/tradeline';
import type { Vendor } from '../types/vendor';

interface CreditDirectoryPageProps {
  onViewProfile: (vendorId: string) => void;
}

export default function CreditDirectoryPage({ onViewProfile }: CreditDirectoryPageProps) {
  const [filters, setFilters] = useState<DirectoryFilters>({});
  const allVendors = vendorsData as Vendor[];
  const vendors = useMemo(() => filterDirectoryItems(allVendors, filters), [allVendors, filters]);

  function saveToPlanner(vendor: Vendor) {
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
      notes: 'Verify requirements, terms, and reporting directly before applying.'
    };
    writeLocal(STORAGE_KEYS.tradelines, [...current, next]);
  }

  return (
    <section className="page-stack">
      <div className="page-header">
        <p className="eyebrow">Directory</p>
        <h1>Credit Vendor Directory</h1>
        <p>Research starter vendors and save candidates to the planner. Reporting and terms must be verified directly.</p>
      </div>

      <VendorFilterForm filters={filters} onFilterChange={setFilters} />

      <VendorDirectoryTable
        vendors={vendors}
        onSaveToPlanner={saveToPlanner}
        onViewProfile={(vendor) => onViewProfile(vendor.id)}
      />
    </section>
  );
}

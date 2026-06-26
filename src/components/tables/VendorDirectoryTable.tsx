import type { Vendor } from '../../types/vendor';
import { TierBadge } from '../badges/TierBadge';

interface VendorDirectoryTableProps {
  vendors: Vendor[];
  onSaveToPlanner: (vendor: Vendor) => void;
  onViewProfile: (vendor: Vendor) => void;
}

export function VendorDirectoryTable({ vendors, onSaveToPlanner, onViewProfile }: VendorDirectoryTableProps) {
  return (
    <div className="brutal-card table-wrap">
      <table>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Tier</th>
            <th>Category</th>
            <th>Terms</th>
            <th>Reports To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.length === 0 ? (
            <tr><td colSpan={6}>No vendors match the current filters.</td></tr>
          ) : vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td><strong>{vendor.name}</strong></td>
              <td><TierBadge tier={vendor.tier} /></td>
              <td>{vendor.category}</td>
              <td>{vendor.terms || 'Verify directly'}</td>
              <td>{vendor.reportsTo.join(', ')}</td>
              <td>
                <button type="button" onClick={() => onViewProfile(vendor)}>View</button>{' '}
                <button type="button" onClick={() => onSaveToPlanner(vendor)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

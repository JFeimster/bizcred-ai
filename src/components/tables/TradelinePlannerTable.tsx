import type { Tradeline, TradelineStatus } from '../../types/tradeline';
import { StatusBadge } from '../badges/StatusBadge';

const statuses: TradelineStatus[] = ['researching', 'ready_to_apply', 'planned', 'applied', 'approved', 'first_purchase', 'paid', 'reporting', 'reporting_confirmed', 'closed'];

interface TradelinePlannerTableProps {
  tradelines: Tradeline[];
  onStatusChange: (id: string, status: TradelineStatus) => void;
  onRemove: (id: string) => void;
}

export function TradelinePlannerTable({ tradelines, onStatusChange, onRemove }: TradelinePlannerTableProps) {
  return (
    <div className="brutal-card table-wrap">
      <table>
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Status</th>
            <th>Limit</th>
            <th>Balance</th>
            <th>Reports To</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tradelines.length === 0 ? (
            <tr><td colSpan={7}>No planner items yet. Save a vendor from Directory or add one manually.</td></tr>
          ) : tradelines.map((item) => (
            <tr key={item.id}>
              <td>{item.vendorName}</td>
              <td>
                <StatusBadge status={item.status} />
                <select value={item.status} onChange={(event) => onStatusChange(item.id, event.target.value as TradelineStatus)}>
                  {statuses.map((status) => <option value={status} key={status}>{status.replace(/_/g, ' ')}</option>)}
                </select>
              </td>
              <td>{item.limitAmount}</td>
              <td>{item.balanceAmount}</td>
              <td>{item.reportsTo.length ? item.reportsTo.join(', ') : 'Verify directly'}</td>
              <td>{item.notes}</td>
              <td><button type="button" onClick={() => onRemove(item.id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

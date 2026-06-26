import { useState } from 'react';
import { addTradeline, changeTradelineStatus, removeTradeline } from '../modules/tradelines/updateTradeline';
import { readLocal, writeLocal } from '../storage/localStorageClient';
import { defaultTradelines } from '../storage/storageDefaults';
import { STORAGE_KEYS } from '../storage/storageKeys';
import type { Tradeline, TradelineStatus } from '../types/tradeline';

const statuses: TradelineStatus[] = ['researching', 'ready_to_apply', 'applied', 'approved', 'denied', 'first_purchase', 'paid', 'reporting_confirmed', 'closed'];

export default function TradelinePlannerPage() {
  const [tradelines, setTradelines] = useState<Tradeline[]>(() => readLocal(STORAGE_KEYS.tradelines, defaultTradelines));
  const [vendorName, setVendorName] = useState('');

  function persist(next: Tradeline[]) {
    setTradelines(next);
    writeLocal(STORAGE_KEYS.tradelines, next);
  }

  function handleAdd() {
    if (!vendorName.trim()) return;
    persist(addTradeline(tradelines, {
      vendorName: vendorName.trim(),
      accountType: 'Vendor account',
      tier: 1,
      status: 'researching',
      limitAmount: 0,
      balanceAmount: 0,
      reportsTo: [],
      notes: 'Verify vendor terms and reporting directly.'
    }));
    setVendorName('');
  }

  return (
    <section className="page-stack">
      <div className="page-header">
        <p className="eyebrow">Planner</p>
        <h1>Tradeline Planner</h1>
        <p>Track research status locally. This does not imply approval, reporting, or score changes.</p>
      </div>

      <div className="brutal-card form-row">
        <input value={vendorName} onChange={(event) => setVendorName(event.target.value)} placeholder="Vendor name" />
        <button className="neo-button" type="button" onClick={handleAdd}>Add Tradeline</button>
      </div>

      <div className="brutal-card table-wrap">
        <table>
          <thead>
            <tr><th>Vendor</th><th>Status</th><th>Reports To</th><th>Notes</th><th>Action</th></tr>
          </thead>
          <tbody>
            {tradelines.length === 0 ? (
              <tr><td colSpan={5}>No planner items yet. Save a vendor from Directory or add one manually.</td></tr>
            ) : tradelines.map((item) => (
              <tr key={item.id}>
                <td>{item.vendorName}</td>
                <td>
                  <select value={item.status} onChange={(event) => persist(changeTradelineStatus(tradelines, item.id, event.target.value as TradelineStatus))}>
                    {statuses.map((status) => <option value={status} key={status}>{status.replaceAll('_', ' ')}</option>)}
                  </select>
                </td>
                <td>{item.reportsTo.length ? item.reportsTo.join(', ') : 'Verify directly'}</td>
                <td>{item.notes}</td>
                <td><button type="button" onClick={() => persist(removeTradeline(tradelines, item.id))}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

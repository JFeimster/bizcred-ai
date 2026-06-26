import { useState } from 'react';
import type { Tradeline } from '../../types/tradeline';

interface TradelineFormProps {
  onAdd: (input: Omit<Tradeline, 'id'>) => void;
}

export function TradelineForm({ onAdd }: TradelineFormProps) {
  const [vendorName, setVendorName] = useState('');
  const [tier, setTier] = useState(1);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!vendorName.trim()) return;

    onAdd({
      vendorName: vendorName.trim(),
      accountType: 'Vendor account',
      tier,
      status: 'researching',
      limitAmount: 0,
      balanceAmount: 0,
      reportsTo: [],
      notes: 'Verify vendor terms and reporting directly.'
    });
    setVendorName('');
    setTier(1);
  }

  return (
    <form className="brutal-card form-row" onSubmit={handleSubmit}>
      <input value={vendorName} onChange={(event) => setVendorName(event.target.value)} placeholder="Vendor name" />
      <select value={tier} onChange={(event) => setTier(Number(event.target.value))}>
        <option value={1}>Tier 1</option>
        <option value={2}>Tier 2</option>
        <option value={3}>Tier 3</option>
      </select>
      <button className="neo-button" type="submit">Add Tradeline</button>
    </form>
  );
}

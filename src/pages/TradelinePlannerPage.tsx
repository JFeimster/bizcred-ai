import { useState } from 'react';
import { TradelineForm } from '../components/forms/TradelineForm';
import { TradelinePlannerTable } from '../components/tables/TradelinePlannerTable';
import { addTradeline, changeTradelineStatus, removeTradeline } from '../modules/tradelines/updateTradeline';
import { readLocal, writeLocal } from '../storage/localStorageClient';
import { defaultTradelines } from '../storage/storageDefaults';
import { STORAGE_KEYS } from '../storage/storageKeys';
import type { Tradeline, TradelineStatus } from '../types/tradeline';

export default function TradelinePlannerPage() {
  const [tradelines, setTradelines] = useState<Tradeline[]>(() => readLocal(STORAGE_KEYS.tradelines, defaultTradelines));

  function persist(next: Tradeline[]) {
    setTradelines(next);
    writeLocal(STORAGE_KEYS.tradelines, next);
  }

  function handleAdd(input: Omit<Tradeline, 'id'>) {
    persist(addTradeline(tradelines, input));
  }

  function handleStatusChange(id: string, status: TradelineStatus) {
    persist(changeTradelineStatus(tradelines, id, status));
  }

  function handleRemove(id: string) {
    persist(removeTradeline(tradelines, id));
  }

  return (
    <section className="page-stack">
      <div className="page-header">
        <p className="eyebrow">Planner</p>
        <h1>Tradeline Planner</h1>
        <p>Track research status locally. Verify vendor terms and reporting directly.</p>
      </div>

      <TradelineForm onAdd={handleAdd} />
      <TradelinePlannerTable tradelines={tradelines} onStatusChange={handleStatusChange} onRemove={handleRemove} />
    </section>
  );
}

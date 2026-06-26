import type { Tradeline, TradelineStatus } from '../../types/tradeline';

export function changeTradelineStatusRecord(tradelines: Tradeline[], id: string, status: TradelineStatus): Tradeline[] {
  return tradelines.map((item) => item.id === id ? { ...item, status } : item);
}

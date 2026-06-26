import type { Tradeline, TradelineStatus } from '../../types/tradeline';

export function addTradeline(tradelines: Tradeline[], input: Omit<Tradeline, 'id'>): Tradeline[] {
  return [...tradelines, { ...input, id: crypto.randomUUID() }];
}

export function changeTradelineStatus(tradelines: Tradeline[], id: string, status: TradelineStatus): Tradeline[] {
  return tradelines.map((item) => item.id === id ? { ...item, status } : item);
}

export function removeTradeline(tradelines: Tradeline[], id: string): Tradeline[] {
  return tradelines.filter((item) => item.id !== id);
}

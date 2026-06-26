import { Tradeline, TradelineStatus } from '../../types/tradeline';

export function addTradeline(tradelines: Tradeline[], newTradeline: Tradeline): Tradeline[] {
  // Check if already exists by vendorId
  if (tradelines.some(t => t.vendorId === newTradeline.vendorId)) {
    return tradelines;
  }
  return [...tradelines, newTradeline];
}

export function updateTradeline(tradelines: Tradeline[], updatedTradeline: Tradeline): Tradeline[] {
  return tradelines.map(t => t.id === updatedTradeline.id ? updatedTradeline : t);
}

export function removeTradeline(tradelines: Tradeline[], idToRemove: string): Tradeline[] {
  return tradelines.filter(t => t.id !== idToRemove);
}

export function changeTradelineStatus(tradelines: Tradeline[], id: string, newStatus: TradelineStatus): Tradeline[] {
  return tradelines.map(t => {
    if (t.id === id) {
      return { ...t, status: newStatus };
    }
    return t;
  });
}
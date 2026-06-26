import type { Tradeline } from '../../types/tradeline';

export function addTradelineRecord(tradelines: Tradeline[], input: Omit<Tradeline, 'id'>): Tradeline[] {
  const id = `tradeline-${Date.now()}`;
  return [...tradelines, { ...input, id }];
}

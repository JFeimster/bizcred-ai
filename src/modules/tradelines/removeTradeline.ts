import type { Tradeline } from '../../types/tradeline';

export function removeTradelineRecord(tradelines: Tradeline[], id: string): Tradeline[] {
  return tradelines.filter((item) => item.id !== id);
}

export type TradelineStatus = 'researching' | 'ready_to_apply' | 'planned' | 'applied' | 'approved' | 'denied' | 'first_purchase' | 'paid' | 'reporting' | 'reporting_confirmed' | 'closed';

export interface Tradeline {
  id: string;
  vendorName: string;
  accountType: string;
  tier: number;
  status: TradelineStatus;
  limitAmount: number;
  balanceAmount: number;
  reportsTo: string[];
  notes: string;

  vendorId?: string;
  dateOpened?: string;
  lastReported?: string;
}

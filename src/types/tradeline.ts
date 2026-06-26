export type TradelineStatus = 'planned' | 'applied' | 'approved' | 'denied' | 'reporting' | 'closed';

export interface Tradeline {
  id: string;
  vendor_id: string;
  status: TradelineStatus;
  credit_limit?: number;
  current_balance?: number;
  date_opened?: string;
  last_reported?: string;
  notes?: string;
}

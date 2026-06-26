export type AlertType = 'info' | 'warning' | 'error' | 'success';

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  created_at: string;
  read: boolean;
  action_url?: string;
  action_text?: string;
}

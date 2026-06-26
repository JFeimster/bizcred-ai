export type AlertSeverity = 'info' | 'warning' | 'critical';
export type AlertCategory = 'setup' | 'tradeline' | 'profile' | 'general';

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  category: AlertCategory;
  actionRequired?: string;
  actionLink?: string; // Route path or identifier for internal navigation
}
export type AlertSeverity = 'info' | 'warning' | 'danger';

export interface ReadinessAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
}

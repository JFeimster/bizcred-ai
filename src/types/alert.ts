export type AlertSeverity = 'info' | 'warning' | 'danger';
export type AlertType = AlertSeverity | 'error' | 'success';

export interface ReadinessAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  message: string;
}

export interface Alert {
  id: string;
  type: AlertType;
  message: string;
  createdAt: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
}

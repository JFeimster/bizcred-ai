export interface NotionConfig {
  database_id: string;
  api_key?: string; // Stored securely if needed, though strictly we rely on LocalStorage
  integration_status: 'disconnected' | 'connected' | 'syncing' | 'error';
  last_synced?: string;
}

export interface NotionDashboard {
  url?: string;
  config: NotionConfig;
}

export type ImportJobStatus = 'queued' | 'processing' | 'complete' | 'failed';

export interface ImportJob {
  id: string;
  sourceType: 'csv' | 'json' | 'xlsx' | 'markdown' | 'pdf' | 'manual';
  targetRegistry: string;
  status: ImportJobStatus;
  createdAt: string;
  completedAt?: string;
  recordsTotal?: number;
  recordsImported?: number;
  errors?: string[];
}

export type ImportJobStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface ImportJob {
  id: string;
  source: string;
  status: ImportJobStatus;
  started_at: string;
  completed_at?: string;
  records_processed: number;
  records_failed: number;
  error_message?: string;
}

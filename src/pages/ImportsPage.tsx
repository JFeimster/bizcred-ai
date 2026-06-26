import { useEffect, useState } from 'react';
import ImportFileForm from '../components/forms/ImportFileForm';
import ImportJobsTable from '../components/tables/ImportJobsTable';
import { importBusinessCreditTracker } from '../modules/imports/importBusinessCreditTracker';
import { importVendorDirectoryFile } from '../modules/imports/importVendorDirectoryFile';
import { readLocal, writeLocal } from '../storage/localStorageClient';
import { STORAGE_KEYS } from '../storage/storageKeys';
import type { ImportJob } from '../types/importJob';

export default function ImportsPage() {
  const [jobs, setJobs] = useState<ImportJob[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

  useEffect(() => {
    setJobs(readLocal<ImportJob[]>(STORAGE_KEYS.importJobs, []));
  }, []);

  function persistJobs(nextJobs: ImportJob[]) {
    const trimmed = nextJobs.slice(0, 50);
    setJobs(trimmed);
    writeLocal(STORAGE_KEYS.importJobs, trimmed);
  }

  async function handleImport(file: File, type: string) {
    setMessage(null);

    const job: ImportJob = {
      id: `job-${Date.now()}`,
      sourceType: file.name.toLowerCase().endsWith('.csv') ? 'csv' : 'json',
      targetRegistry: type,
      status: 'processing',
      createdAt: new Date().toISOString()
    };

    try {
      if (type === 'vendor-directory') {
        const entries = await importVendorDirectoryFile(file);
        job.status = 'complete';
        job.recordsTotal = entries.length;
        job.recordsImported = entries.length;
        job.completedAt = new Date().toISOString();
        setMessage({ type: 'success', text: `Imported ${entries.length} vendor records for local review.` });
      } else if (type === 'business-tracker') {
        const ok = await importBusinessCreditTracker(file);
        job.status = ok ? 'complete' : 'failed';
        job.completedAt = new Date().toISOString();
        if (!ok) job.errors = ['Backup payload did not match known localStorage keys.'];
        setMessage(ok ? { type: 'success', text: 'Dashboard backup restored locally.' } : { type: 'danger', text: 'Import did not update local state.' });
      } else {
        throw new Error('This import target is not active in the MVP.');
      }
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Import failed.';
      job.status = 'failed';
      job.errors = [text];
      job.completedAt = new Date().toISOString();
      setMessage({ type: 'danger', text });
    }

    persistJobs([job, ...jobs]);
  }

  return (
    <section className="page-stack">
      <div className="page-header">
        <p className="eyebrow">Template Bridge</p>
        <h1>Manual Import</h1>
        <p>Import local CSV or JSON files. Data stays in the browser and imported records should be reviewed manually.</p>
      </div>

      {message && <div className={`alert ${message.type}`}>{message.text}</div>}

      <ImportFileForm onImport={handleImport} />
      <ImportJobsTable jobs={jobs} />
    </section>
  );
}

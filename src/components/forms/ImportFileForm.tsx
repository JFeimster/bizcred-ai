import { useState, type ChangeEvent, type FormEvent } from 'react';

interface ImportFileFormProps {
  onImport: (file: File, type: string) => void | Promise<void>;
}

export default function ImportFileForm({ onImport }: ImportFileFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [importType, setImportType] = useState('vendor-directory');
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] || null;
    setFile(selected);
    setError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError('Please select a file to import.');
      return;
    }

    const ext = file.name.split('.').pop()?.toLowerCase();

    if (importType === 'business-tracker' && ext !== 'json') {
      setError('Business tracker backups must be JSON files.');
      return;
    }

    if (importType !== 'business-tracker' && ext !== 'csv' && ext !== 'json') {
      setError('This MVP supports CSV and JSON imports only.');
      return;
    }

    await onImport(file, importType);
    setFile(null);
  }

  return (
    <form className="brutal-card form-grid" onSubmit={handleSubmit}>
      <div className="alert warning wide-field">
        <strong>Local-first import:</strong> Data is parsed in your browser. Review imported records manually.
      </div>

      <label>
        Import target
        <select value={importType} onChange={(event) => setImportType(event.target.value)}>
          <option value="vendor-directory">Vendor Directory (CSV, JSON)</option>
          <option value="business-tracker">Full Dashboard Backup (JSON)</option>
          <option value="tradeline-planner">Tradeline Planner (coming soon)</option>
          <option value="credit-scores">Credit Scores (coming soon)</option>
        </select>
      </label>

      <label>
        File selection
        <input type="file" onChange={handleFileChange} accept=".csv,.json,.xlsx,.md,.pdf" />
      </label>

      {error && <div className="alert danger wide-field">{error}</div>}

      <button type="submit" className="neo-button" disabled={!file}>Import Local File</button>
    </form>
  );
}

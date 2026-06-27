import React, { useState, useEffect } from 'react';
import { NotionTemplateSource, NotionTemplateType, NotionAccessMode } from '../types/notion';
import { registerNotionTemplate } from '../modules/notion/registerNotionTemplate';
import { getNotionTemplateNextStep } from '../modules/notion/getNotionTemplateNextStep';
import { validateNotionTemplateSource } from '../modules/notion/validateNotionTemplateSource';
import { readLocal, writeLocal } from '../storage/localStorageClient';
import { STORAGE_KEYS } from '../storage/storageKeys';

const NotionSyncPage: React.FC = () => {
  const [sources, setSources] = useState<NotionTemplateSource[]>([]);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [sourceType, setSourceType] = useState<NotionTemplateType>('business_hq');
  const [accessMode, setAccessMode] = useState<NotionAccessMode>('public_copy_link');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const loaded = readLocal<NotionTemplateSource[]>(STORAGE_KEYS.notionTemplateSources, []);
    setSources(loaded);
  }, []);

  const handleAddSource = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateNotionTemplateSource(name, url, sourceType, accessMode);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newSource = registerNotionTemplate(name, url, sourceType, accessMode, notes);
    const updatedSources = [...sources, newSource];

    setSources(updatedSources);
    writeLocal(STORAGE_KEYS.notionTemplateSources, updatedSources);

    // reset form
    setName('');
    setUrl('');
    setSourceType('business_hq');
    setAccessMode('public_copy_link');
    setNotes('');
    setErrors([]);
  };

  const handleDelete = (id: string) => {
    const updatedSources = sources.filter(s => s.id !== id);
    setSources(updatedSources);
    writeLocal(STORAGE_KEYS.notionTemplateSources, updatedSources);
  };

  return (
    <div className="dashboard-content">
      <header className="dashboard-header">
        <h1>Notion Template Bridge</h1>
      </header>

      <div className="alert-banner info" style={{ marginBottom: '1.5rem' }}>
        <strong>Safety Notice:</strong> Manual/local-first only. No Notion API sync is active. We do not require or ask for your Notion access tokens. This tool is for educational planning only; verify setups directly.
      </div>

      <section className="dashboard-section card">
        <h2>Add Template / Source</h2>
        {errors.length > 0 && (
          <div className="alert-banner error" style={{ marginBottom: '1rem' }}>
            {errors.map((err, i) => <div key={i}>{err}</div>)}
          </div>
        )}
        <form onSubmit={handleAddSource} className="form-grid">
          <div className="form-group">
            <label>Name</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g., BizCredit Master Template" />
          </div>
          <div className="form-group">
            <label>Notion URL</label>
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://notion.so/..." />
          </div>
          <div className="form-group">
            <label>Source Type</label>
            <select value={sourceType} onChange={e => setSourceType(e.target.value as NotionTemplateType)}>
              <option value="business_hq">Business HQ</option>
              <option value="bizcredit_passport">BizCredit Passport</option>
              <option value="credit_tracker">Credit Tracker</option>
              <option value="vendor_directory">Vendor Directory</option>
              <option value="funding_dashboard">Funding Dashboard</option>
              <option value="course_workspace">Course Workspace</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Access Mode</label>
            <select value={accessMode} onChange={e => setAccessMode(e.target.value as NotionAccessMode)}>
              <option value="public_copy_link">Public Copy Link</option>
              <option value="exported_markdown">Exported Markdown</option>
              <option value="exported_csv">Exported CSV</option>
              <option value="notion_api_connection" disabled>Notion API Connection (Future / Disabled)</option>
            </select>
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Notes (Optional)</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any helpful reminders..." />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <button type="submit" className="button primary">Register Source</button>
          </div>
        </form>
      </section>

      <section className="dashboard-section card" style={{ marginTop: '2rem' }}>
        <h2>Saved Sources</h2>
        {sources.length === 0 ? (
          <p>No Notion templates registered yet.</p>
        ) : (
          <div className="grid-2col">
            {sources.map(source => (
              <div key={source.id} className="card" style={{ border: '1px solid var(--border)', background: 'var(--bg-subtle)' }}>
                <h3>{source.name}</h3>
                <p><strong>Type:</strong> {source.sourceType}</p>
                <p><strong>Mode:</strong> {source.accessMode}</p>
                <p><a href={source.url} target="_blank" rel="noopener noreferrer">Open in Notion</a></p>
                <p><em>{source.notes}</em></p>
                <div className="alert-banner info" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                  <strong>Suggested Next Action:</strong><br />
                  {getNotionTemplateNextStep(source)}
                </div>
                <button onClick={() => handleDelete(source.id)} className="button text-danger" style={{ marginTop: '1rem' }}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-section card" style={{ marginTop: '2rem' }}>
        <h2>Manual Export & Import Instructions</h2>
        <div style={{ lineHeight: '1.6' }}>
          <p><strong>To Import Data from Notion:</strong></p>
          <ol>
            <li>Go to your Notion page or database.</li>
            <li>Click the `...` menu in the top right corner.</li>
            <li>Select <strong>Export</strong>.</li>
            <li>Choose <strong>Markdown & CSV</strong> (for pages) or <strong>Markdown & CSV</strong> (for databases) and click Export.</li>
            <li>Extract the downloaded `.zip` file.</li>
            <li>Use the <strong>Imports</strong> tab in the sidebar to upload the CSV or Markdown files into BizCred OS.</li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default NotionSyncPage;

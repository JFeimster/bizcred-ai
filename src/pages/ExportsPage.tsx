import { exportDashboardJson } from '../modules/exports/exportDashboardJson';
import { exportPassportMarkdown } from '../modules/exports/exportPassportMarkdown';
import { exportTradelinesCsv } from '../modules/exports/exportTradelinesCsv';
import { generateNotionImportPackage } from '../modules/exports/generateNotionImportPackage';

function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function ExportsPage() {
  return (
    <section className="page-stack">
      <div className="page-header">
        <p className="eyebrow">Template Bridge</p>
        <h1>Manual Export</h1>
        <p>Download local files for manual workspace updates.</p>
      </div>

      <div className="card-grid">
        <article className="brutal-card accent-cyan">
          <h2>Dashboard JSON</h2>
          <p>Export recognized localStorage state.</p>
          <button className="neo-button" type="button" onClick={() => downloadFile('bizcredit-dashboard.json', exportDashboardJson(), 'application/json')}>Download JSON</button>
        </article>

        <article className="brutal-card accent-yellow">
          <h2>Passport Markdown</h2>
          <p>Export profile and readiness snapshot as Markdown.</p>
          <button className="neo-button" type="button" onClick={() => downloadFile('bizcredit-passport.md', exportPassportMarkdown(), 'text/markdown')}>Download Markdown</button>
        </article>

        <article className="brutal-card accent-acid">
          <h2>Planner CSV</h2>
          <p>Export current planner rows as CSV.</p>
          <button className="neo-button" type="button" onClick={() => downloadFile('tradeline-planner.csv', exportTradelinesCsv(), 'text/csv')}>Download CSV</button>
        </article>
      </div>

      <article className="brutal-card">
        <h2>Notion Package</h2>
        <p>Generate Markdown and CSV files for manual import.</p>
        <button className="neo-button" type="button" onClick={() => generateNotionImportPackage().forEach((file) => downloadFile(file.filename, file.content, file.mimeType))}>Generate Package</button>
      </article>
    </section>
  );
}

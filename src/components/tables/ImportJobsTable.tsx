import type { ImportJob } from '../../types/importJob';

interface ImportJobsTableProps {
  jobs: ImportJob[];
}

export default function ImportJobsTable({ jobs }: ImportJobsTableProps) {
  if (!jobs.length) {
    return <p>No recent imports.</p>;
  }

  return (
    <div className="brutal-card table-wrap">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Target</th>
            <th>Type</th>
            <th>Status</th>
            <th>Records</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{new Date(job.createdAt).toLocaleString()}</td>
              <td>{job.targetRegistry}</td>
              <td>{job.sourceType.toUpperCase()}</td>
              <td><span className={job.status === 'complete' ? 'status-pill success' : job.status === 'failed' ? 'status-pill danger' : 'status-pill warning'}>{job.status}</span></td>
              <td>{job.recordsImported ?? 0} / {job.recordsTotal ?? 0}</td>
              <td>{job.errors?.[0] || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

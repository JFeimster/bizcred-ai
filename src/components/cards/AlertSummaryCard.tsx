import type { ReadinessAlert } from '../../types/alert';

export function AlertSummaryCard({ alerts }: { alerts: ReadinessAlert[] }) {
  return (
    <article className="brutal-card">
      <h2>Alert Summary</h2>
      {alerts.length === 0 ? (
        <p>No major setup alerts.</p>
      ) : (
        <div style={{ display: 'grid', gap: '10px' }}>
          {alerts.map((alert) => (
            <div className={`alert ${alert.severity}`} key={alert.id}>
              <strong>{alert.title}</strong>
              <p style={{ margin: '4px 0 0' }}>{alert.message}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

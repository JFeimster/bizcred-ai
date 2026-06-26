export function RiskBadge({ label }: { label: string }) {
  return (
    <span className="status-pill danger" style={{ marginRight: '8px', marginBottom: '8px' }}>
      {label}
    </span>
  );
}

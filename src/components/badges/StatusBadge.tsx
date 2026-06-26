export function StatusBadge({ status }: { status: string }) {
  const label = status.replace(/_/g, ' ');
  const className = status.includes('confirmed') || status === 'approved' ? 'status-pill success' : 'status-pill info';
  return <span className={className}>{label}</span>;
}

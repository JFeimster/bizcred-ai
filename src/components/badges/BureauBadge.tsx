export function BureauBadge({ verified }: { verified: boolean }) {
  return (
    <span className={verified ? 'status-pill success' : 'status-pill warning'}>
      {verified ? 'Verified' : 'Unverified'}
    </span>
  );
}

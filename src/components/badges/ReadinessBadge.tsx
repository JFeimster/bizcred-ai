export function ReadinessBadge({ tier }: { tier: string }) {
  let className = 'tier-badge';
  if (tier === 'Fundable') className += ' success';
  else if (tier === 'Building') className += ' info';

  return <span className={className}>{tier}</span>;
}

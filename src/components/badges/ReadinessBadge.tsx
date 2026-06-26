export function ReadinessBadge({ tier }: { tier: string }) {
  let className = 'tier-badge';
  if (tier === 'Fundable') className += ' success'; // You can map tiers to styles in CSS
  else if (tier === 'Building') className += ' info';

  return (
    <span className={className}>{tier}</span>
  );
}

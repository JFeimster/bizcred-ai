export function NextBestMoveCard({ nextMove }: { nextMove: string }) {
  return (
    <article className="brutal-card accent-yellow">
      <span className="metric-label">Next Best Move</span>
      <p>{nextMove}</p>
    </article>
  );
}

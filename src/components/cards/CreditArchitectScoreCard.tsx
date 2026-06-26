export function CreditArchitectScoreCard({ score, completedSignals, totalSignals }: { score: number, completedSignals: number, totalSignals: number }) {
  return (
    <article className="brutal-card accent-acid">
      <span className="metric-label">Credit Architect Score</span>
      <strong className="metric-value">{score}</strong>
      <p>{completedSignals} of {totalSignals} setup signals complete.</p>
    </article>
  );
}

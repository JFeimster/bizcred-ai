import type { RoadmapStep } from '../../types/roadmap';

export function MilestoneProgressCard({ milestones }: { milestones: RoadmapStep[] }) {
  return (
    <article className="brutal-card">
      <h2>Milestone Progress</h2>
      <div className="timeline">
        {milestones.map((step) => (
          <div className="roadmap-row" key={step.id}>
            <span className={step.isComplete ? 'status-pill success' : 'status-pill warning'}>
              {step.phase}
            </span>
            <span>{step.title}</span>
          </div>
        ))}
      </div>
    </article>
  );
}

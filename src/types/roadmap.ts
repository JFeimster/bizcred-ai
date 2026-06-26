export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  isComplete: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface RoadmapPhase {
  id: string;
  phase: number;
  title: string;
  description: string;
  recommendedActions: string[];
  cautionNote: string;
  steps: RoadmapStep[];
}

export interface Roadmap {
  currentPhase: number;
  phases: RoadmapPhase[];
  generatedAt: string;
}
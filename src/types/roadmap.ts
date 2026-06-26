export interface RoadmapStep {
  id: string;
  phase: string;
  title: string;
  description: string;
  isComplete: boolean;
}

export interface Roadmap {
  id: string;
  items: RoadmapStep[];
  createdAt?: string;
  updatedAt?: string;
}

export type RoadmapItemStatus = 'todo' | 'in_progress' | 'done' | 'skipped';

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: RoadmapItemStatus;
  due_date?: string;
  completed_date?: string;
  priority: 'low' | 'medium' | 'high';
  category: 'setup' | 'credit_building' | 'funding' | 'compliance' | 'other';
}

export interface Roadmap {
  id: string;
  items: RoadmapItem[];
}

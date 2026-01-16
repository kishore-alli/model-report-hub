export interface Model {
  id: string;
  name: string;
  description?: string;
}

export interface Report {
  id: string;
  modelId: string;
  name: string;
  reportDate?: string;
}

export interface ExecutiveSummary {
  id: string;
  reportId: string;
  content: string;
}

export interface FooterNote {
  id: string;
  reportId: string;
  annotation: string;
  orderIndex: number;
}

export interface Analysis {
  id: string;
  reportId: string;
  title: string;
  content: string;
}

export interface ActionPlan {
  id: string;
  reportId: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
}

export type SectionType = 'executive-summary' | 'footer-notes' | 'analysis' | 'action-plan';

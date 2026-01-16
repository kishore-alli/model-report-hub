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

export interface ExecutiveSummaryEntry {
  id: string;
  reportId: string;
  summary: string;
  level: string;
  sequence: number;
}

export interface FooterNote {
  id: string;
  reportId: string;
  annotation: string;
  orderIndex: number;
}

export interface AnalysisSection {
  id: string;
  reportId: string;
  name: string;
}

export interface AnalysisEntry {
  id: string;
  analysisSectionId: string;
  analysis: string;
  level: string;
}

export interface ActionPlan {
  id: string;
  reportId: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: string;
}

export type SectionType = 'executive-summary' | 'footer-notes' | 'analysis' | 'action-plan';

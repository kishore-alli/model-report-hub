import { Model, Report, ExecutiveSummaryEntry, FooterNote, AnalysisSection, AnalysisEntry, ActionPlan } from '@/types/mpm';

export const mockModels: Model[] = [
  { id: '1', name: 'CCFA Severity Model', description: 'PD/LGD model for retail portfolio' },
  { id: '2', name: 'Borrower Behavior Model', description: 'VaR calculation model' },
  { id: '3', name: 'Integrator Model', description: 'Real-time fraud scoring' },
  { id: '4', name: 'RVI Model', description: 'Predictive churn analysis' },
];

export const mockReports: Report[] = [
  { id: '1', modelId: '1', name: '2025 Q3', reportDate: '2024-12-31' },
  { id: '2', modelId: '1', name: '2025 Q4', reportDate: '2024-09-30' },
  { id: '3', modelId: '2', name: 'Annual Review 2024', reportDate: '2024-12-31' },
  { id: '4', modelId: '3', name: 'Monthly Report - December', reportDate: '2024-12-31' },
  { id: '5', modelId: '4', name: 'Q4 2024 Analysis', reportDate: '2024-12-31' },
];

export const mockExecutiveSummaries: ExecutiveSummaryEntry[] = [
  { id: '1', reportId: '1', summary: 'The Credit Risk Model performed within expected parameters during Q4 2024.', level: 'High', sequence: 1 },
  { id: '2', reportId: '1', summary: 'Key metrics showed improvement in discrimination power with a Gini coefficient of 0.72.', level: 'Medium', sequence: 2 },
  { id: '3', reportId: '1', summary: 'No significant model drift detected during the reporting period.', level: 'Low', sequence: 3 },
  { id: '4', reportId: '2', summary: 'Q3 2024 showed stable performance with minor adjustments recommended.', level: 'High', sequence: 1 },
];

export const mockFooterNotes: FooterNote[] = [
  { id: '1', reportId: '1', annotation: 'Data sourced from production systems as of December 31, 2024', orderIndex: 1 },
  { id: '2', reportId: '1', annotation: 'All calculations performed using approved methodology v2.3', orderIndex: 2 },
  { id: '3', reportId: '1', annotation: 'Excludes accounts with less than 6 months history', orderIndex: 3 },
];

export const mockAnalysisSections: AnalysisSection[] = [
  { id: '1', reportId: '1', name: 'Discrimination Analysis' },
  { id: '2', reportId: '1', name: 'Calibration Assessment' },
  { id: '3', reportId: '1', name: 'Stability Analysis' },
  { id: '4', reportId: '2', name: 'Quarterly Review' },
];

export const mockAnalysisEntries: AnalysisEntry[] = [
  { id: '1', analysisSectionId: '1', analysis: 'The model demonstrates strong discriminatory power across all segments.', level: 'High' },
  { id: '2', analysisSectionId: '1', analysis: 'ROC-AUC improved to 0.86 from previous quarter.', level: 'Medium' },
  { id: '3', analysisSectionId: '2', analysis: 'Predicted probabilities align well with observed default rates.', level: 'High' },
  { id: '4', analysisSectionId: '2', analysis: 'Minor overestimation noted in low-risk segment.', level: 'Low' },
  { id: '5', analysisSectionId: '3', analysis: 'PSI values remain below threshold across all score bands.', level: 'Medium' },
];

export const mockActionPlans: ActionPlan[] = [
  { id: '1', reportId: '1', description: 'Adjust calibration parameters for accounts with PD < 1%', status: 'in-progress', dueDate: '2025-02-28' },
  { id: '2', reportId: '1', description: 'Reflect Q4 findings in model documentation', status: 'pending', dueDate: '2025-01-31' },
  { id: '3', reportId: '1', description: 'Present findings to Model Risk Committee', status: 'completed', dueDate: '2025-01-15' },
];

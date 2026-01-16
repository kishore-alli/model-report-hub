import { Model, Report, ExecutiveSummary, FooterNote, Analysis, ActionPlan } from '@/types/mpm';

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

export const mockExecutiveSummaries: ExecutiveSummary[] = [
  { id: '1', reportId: '1', content: 'The Credit Risk Model performed within expected parameters during Q4 2024. Key metrics showed improvement in discrimination power with a Gini coefficient of 0.72, up from 0.68 in the previous quarter.' },
  { id: '2', reportId: '2', content: 'Q3 2024 showed stable performance with minor adjustments recommended for the low-risk segment calibration.' },
];

export const mockFooterNotes: FooterNote[] = [
  { id: '1', reportId: '1', annotation: 'Data sourced from production systems as of December 31, 2024', orderIndex: 1 },
  { id: '2', reportId: '1', annotation: 'All calculations performed using approved methodology v2.3', orderIndex: 2 },
  { id: '3', reportId: '1', annotation: 'Excludes accounts with less than 6 months history', orderIndex: 3 },
];

export const mockAnalyses: Analysis[] = [
  { id: '1', reportId: '1', title: 'Discrimination Analysis', content: 'The model demonstrates strong discriminatory power across all segments. ROC-AUC improved to 0.86.' },
  { id: '2', reportId: '1', title: 'Calibration Assessment', content: 'Predicted probabilities align well with observed default rates. Minor overestimation noted in low-risk segment.' },
  { id: '3', reportId: '1', title: 'Stability Analysis', content: 'PSI values remain below threshold across all score bands, indicating stable population characteristics.' },
];

export const mockActionPlans: ActionPlan[] = [
  { id: '1', reportId: '1', title: 'Recalibrate Low-Risk Segment', description: 'Adjust calibration parameters for accounts with PD < 1%', status: 'in-progress', dueDate: '2025-02-28' },
  { id: '2', reportId: '1', title: 'Update Documentation', description: 'Reflect Q4 findings in model documentation', status: 'pending', dueDate: '2025-01-31' },
  { id: '3', reportId: '1', title: 'Stakeholder Presentation', description: 'Present findings to Model Risk Committee', status: 'completed', dueDate: '2025-01-15' },
];

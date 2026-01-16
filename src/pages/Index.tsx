import { useState } from 'react';
import { FilterBar } from '@/components/FilterBar';
import { ReportSidebar } from '@/components/ReportSidebar';
import { ExecutiveSummarySection } from '@/components/sections/ExecutiveSummarySection';
import { FooterNotesSection } from '@/components/sections/FooterNotesSection';
import { AnalysisSection } from '@/components/sections/AnalysisSection';
import { ActionPlanSection } from '@/components/sections/ActionPlanSection';
import { mockModels, mockReports } from '@/data/mockData';
import { SectionType } from '@/types/mpm';
import { FileText } from 'lucide-react';

const Index = () => {
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<SectionType>('executive-summary');

  const handleModelChange = (modelId: string) => {
    setSelectedModelId(modelId);
    setSelectedReportId(null);
  };

  const handleReportChange = (reportId: string) => {
    setSelectedReportId(reportId);
  };

  const selectedModel = mockModels.find((m) => m.id === selectedModelId);
  const selectedReport = mockReports.find((r) => r.id === selectedReportId);

  const renderSection = () => {
    if (!selectedReportId) return null;

    switch (activeSection) {
      case 'executive-summary':
        return <ExecutiveSummarySection reportId={selectedReportId} />;
      case 'footer-notes':
        return <FooterNotesSection reportId={selectedReportId} />;
      case 'analysis':
        return <AnalysisSection reportId={selectedReportId} />;
      case 'action-plan':
        return <ActionPlanSection reportId={selectedReportId} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-6 py-4">
        <h1 className="text-xl font-semibold">MPM Report Management</h1>
        <p className="text-sm opacity-80">Model Performance Monitoring</p>
      </header>

      {/* Filter Bar */}
      <FilterBar
        models={mockModels}
        reports={mockReports}
        selectedModelId={selectedModelId}
        selectedReportId={selectedReportId}
        onModelChange={handleModelChange}
        onReportChange={handleReportChange}
      />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <ReportSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          disabled={!selectedReportId}
        />

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {!selectedModelId ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <FileText className="h-16 w-16 mb-4 opacity-30" />
              <p className="text-lg">Select a model to get started</p>
              <p className="text-sm">Choose a model from the dropdown above</p>
            </div>
          ) : !selectedReportId ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <FileText className="h-16 w-16 mb-4 opacity-30" />
              <p className="text-lg">Select a report</p>
              <p className="text-sm">
                Choose a report for <strong>{selectedModel?.name}</strong>
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">{selectedReport?.name}</h2>
                <p className="text-muted-foreground">
                  {selectedModel?.name} • {selectedReport?.reportDate}
                </p>
              </div>
              {renderSection()}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;

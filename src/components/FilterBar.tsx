import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Model, Report } from '@/types/mpm';

interface FilterBarProps {
  models: Model[];
  reports: Report[];
  selectedModelId: string | null;
  selectedReportId: string | null;
  onModelChange: (modelId: string) => void;
  onReportChange: (reportId: string) => void;
}

export function FilterBar({
  models,
  reports,
  selectedModelId,
  selectedReportId,
  onModelChange,
  onReportChange,
}: FilterBarProps) {
  const filteredReports = selectedModelId
    ? reports.filter((r) => r.modelId === selectedModelId)
    : [];

  return (
    <div className="flex items-center gap-4 p-4 bg-card border-b">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-muted-foreground">Model:</label>
        <Select value={selectedModelId || ''} onValueChange={onModelChange}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-muted-foreground">Report:</label>
        <Select
          value={selectedReportId || ''}
          onValueChange={onReportChange}
          disabled={!selectedModelId}
        >
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder={selectedModelId ? "Select a report" : "Select a model first"} />
          </SelectTrigger>
          <SelectContent>
            {filteredReports.map((report) => (
              <SelectItem key={report.id} value={report.id}>
                {report.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

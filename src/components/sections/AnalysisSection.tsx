import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Save } from 'lucide-react';
import { AnalysisSection as AnalysisSectionType, AnalysisEntry } from '@/types/mpm';
import { mockAnalysisSections, mockAnalysisEntries } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface AnalysisSectionProps {
  reportId: string;
}

const levelOptions = ['High', 'Medium', 'Low'];

export function AnalysisSection({ reportId }: AnalysisSectionProps) {
  const { toast } = useToast();
  const [sections, setSections] = useState<AnalysisSectionType[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string>('');
  const [entries, setEntries] = useState<AnalysisEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const reportSections = mockAnalysisSections.filter((s) => s.reportId === reportId);
    setSections(reportSections);
    if (reportSections.length > 0) {
      setSelectedSectionId(reportSections[0].id);
    } else {
      setSelectedSectionId('');
    }
  }, [reportId]);

  useEffect(() => {
    if (selectedSectionId) {
      const sectionEntries = mockAnalysisEntries.filter((e) => e.analysisSectionId === selectedSectionId);
      setEntries(sectionEntries);
    } else {
      setEntries([]);
    }
  }, [selectedSectionId]);

  const addEntry = () => {
    if (!selectedSectionId) return;
    const newEntry: AnalysisEntry = {
      id: `temp-${Date.now()}`,
      analysisSectionId: selectedSectionId,
      analysis: '',
      level: 'Medium',
    };
    setEntries([...entries, newEntry]);
  };

  const updateEntry = (id: string, field: keyof AnalysisEntry, value: string) => {
    setEntries(entries.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const removeEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
    toast({
      title: 'Saved',
      description: 'Analysis entries have been updated.',
    });
  };

  const selectedSection = sections.find((s) => s.id === selectedSectionId);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Analysis</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addEntry} disabled={!selectedSectionId}>
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
          <Button onClick={handleSave} disabled={isLoading || !selectedSectionId}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Analysis Section:</label>
            <Select value={selectedSectionId} onValueChange={setSelectedSectionId}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select an analysis section..." />
              </SelectTrigger>
              <SelectContent>
                {sections.map((section) => (
                  <SelectItem key={section.id} value={section.id}>
                    {section.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {!selectedSectionId ? (
            <p className="text-muted-foreground text-center py-8">
              Please select an analysis section to view and edit entries.
            </p>
          ) : entries.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No entries for "{selectedSection?.name}". Click "Add Entry" to create one.
            </p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-3">
                    <Textarea
                      value={entry.analysis}
                      onChange={(e) => updateEntry(entry.id, 'analysis', e.target.value)}
                      placeholder="Enter analysis..."
                      className="min-h-[80px]"
                    />
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium">Level:</label>
                      <Select
                        value={entry.level}
                        onValueChange={(value) => updateEntry(entry.id, 'level', value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {levelOptions.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEntry(entry.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

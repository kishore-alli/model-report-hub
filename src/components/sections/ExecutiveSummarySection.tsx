import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Save, GripVertical } from 'lucide-react';
import { ExecutiveSummaryEntry } from '@/types/mpm';
import { mockExecutiveSummaries } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface ExecutiveSummarySectionProps {
  reportId: string;
}

const levelOptions = ['High', 'Medium', 'Low'];

export function ExecutiveSummarySection({ reportId }: ExecutiveSummarySectionProps) {
  const { toast } = useToast();
  const [entries, setEntries] = useState<ExecutiveSummaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const reportEntries = mockExecutiveSummaries
      .filter((s) => s.reportId === reportId)
      .sort((a, b) => a.sequence - b.sequence);
    setEntries(reportEntries);
  }, [reportId]);

  const addEntry = () => {
    const maxSequence = entries.length > 0 ? Math.max(...entries.map((e) => e.sequence)) : 0;
    const newEntry: ExecutiveSummaryEntry = {
      id: `temp-${Date.now()}`,
      reportId,
      summary: '',
      level: 'Medium',
      sequence: maxSequence + 1,
    };
    setEntries([...entries, newEntry]);
  };

  const updateEntry = (id: string, field: keyof ExecutiveSummaryEntry, value: string | number) => {
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
      description: 'Executive summary entries have been updated.',
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Executive Summary</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addEntry}>
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {entries.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No executive summary entries yet. Click "Add Entry" to create one.
            </p>
          ) : (
            entries.map((entry, index) => (
              <div key={entry.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-2 text-muted-foreground pt-2">
                    <GripVertical className="h-4 w-4" />
                    <span className="text-sm font-medium">#{entry.sequence}</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <Textarea
                      value={entry.summary}
                      onChange={(e) => updateEntry(entry.id, 'summary', e.target.value)}
                      placeholder="Enter summary..."
                      className="min-h-[80px]"
                    />
                    <div className="flex items-center gap-4">
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
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Sequence:</label>
                        <Input
                          type="number"
                          value={entry.sequence}
                          onChange={(e) => updateEntry(entry.id, 'sequence', parseInt(e.target.value) || 1)}
                          className="w-[80px]"
                          min={1}
                        />
                      </div>
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

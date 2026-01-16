import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Save, ChevronDown, ChevronUp } from 'lucide-react';
import { Analysis } from '@/types/mpm';
import { mockAnalyses } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface AnalysisSectionProps {
  reportId: string;
}

export function AnalysisSection({ reportId }: AnalysisSectionProps) {
  const { toast } = useToast();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const reportAnalyses = mockAnalyses.filter((a) => a.reportId === reportId);
    setAnalyses(reportAnalyses);
    setOpenItems(new Set(reportAnalyses.map((a) => a.id)));
  }, [reportId]);

  const toggleItem = (id: string) => {
    const newOpen = new Set(openItems);
    if (newOpen.has(id)) {
      newOpen.delete(id);
    } else {
      newOpen.add(id);
    }
    setOpenItems(newOpen);
  };

  const addAnalysis = () => {
    const newAnalysis: Analysis = {
      id: `temp-${Date.now()}`,
      reportId,
      title: '',
      content: '',
    };
    setAnalyses([...analyses, newAnalysis]);
    setOpenItems(new Set([...openItems, newAnalysis.id]));
  };

  const updateAnalysis = (id: string, field: keyof Analysis, value: string) => {
    setAnalyses(analyses.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const removeAnalysis = (id: string) => {
    setAnalyses(analyses.filter((a) => a.id !== id));
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
    toast({
      title: 'Saved',
      description: 'Analysis sections have been updated.',
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Analysis</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addAnalysis}>
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analyses.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No analysis sections yet. Click "Add Section" to create one.
            </p>
          ) : (
            analyses.map((analysis) => (
              <Collapsible
                key={analysis.id}
                open={openItems.has(analysis.id)}
                onOpenChange={() => toggleItem(analysis.id)}
              >
                <div className="border rounded-lg">
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-accent/50">
                      <div className="flex items-center gap-3 flex-1">
                        {openItems.has(analysis.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                        <span className="font-medium">
                          {analysis.title || 'Untitled Section'}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeAnalysis(analysis.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-4 pt-0 space-y-3">
                      <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          value={analysis.title}
                          onChange={(e) => updateAnalysis(analysis.id, 'title', e.target.value)}
                          placeholder="Section title..."
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Content</label>
                        <Textarea
                          value={analysis.content}
                          onChange={(e) => updateAnalysis(analysis.id, 'content', e.target.value)}
                          placeholder="Analysis content..."
                          className="mt-1 min-h-[150px]"
                        />
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

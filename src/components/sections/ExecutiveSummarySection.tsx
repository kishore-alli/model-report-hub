import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { ExecutiveSummary } from '@/types/mpm';
import { mockExecutiveSummaries } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface ExecutiveSummarySectionProps {
  reportId: string;
}

export function ExecutiveSummarySection({ reportId }: ExecutiveSummarySectionProps) {
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const summary = mockExecutiveSummaries.find((s) => s.reportId === reportId);
    setContent(summary?.content || '');
  }, [reportId]);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
    toast({
      title: 'Saved',
      description: 'Executive summary has been updated.',
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Executive Summary</CardTitle>
        <Button onClick={handleSave} disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </CardHeader>
      <CardContent>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter the executive summary for this report..."
          className="min-h-[300px] resize-y"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Provide a high-level overview of the model's performance during this reporting period.
        </p>
      </CardContent>
    </Card>
  );
}

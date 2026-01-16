import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Save } from 'lucide-react';
import { ActionPlan } from '@/types/mpm';
import { mockActionPlans } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface ActionPlanSectionProps {
  reportId: string;
}

const statusColors: Record<ActionPlan['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  'in-progress': 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  completed: 'bg-green-100 text-green-800 hover:bg-green-100',
};

const statusLabels: Record<ActionPlan['status'], string> = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export function ActionPlanSection({ reportId }: ActionPlanSectionProps) {
  const { toast } = useToast();
  const [plans, setPlans] = useState<ActionPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const reportPlans = mockActionPlans.filter((p) => p.reportId === reportId);
    setPlans(reportPlans);
  }, [reportId]);

  const addPlan = () => {
    const newPlan: ActionPlan = {
      id: `temp-${Date.now()}`,
      reportId,
      title: '',
      description: '',
      status: 'pending',
      dueDate: '',
    };
    setPlans([...plans, newPlan]);
  };

  const updatePlan = (id: string, field: keyof ActionPlan, value: string) => {
    setPlans(plans.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const removePlan = (id: string) => {
    setPlans(plans.filter((p) => p.id !== id));
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
    toast({
      title: 'Saved',
      description: 'Action plans have been updated.',
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Action Plan</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addPlan}>
            <Plus className="h-4 w-4 mr-2" />
            Add Action
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {plans.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No action items yet. Click "Add Action" to create one.
            </p>
          ) : (
            plans.map((plan) => (
              <div key={plan.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <Input
                        value={plan.title}
                        onChange={(e) => updatePlan(plan.id, 'title', e.target.value)}
                        placeholder="Action title..."
                        className="flex-1"
                      />
                      <Badge className={statusColors[plan.status]}>
                        {statusLabels[plan.status]}
                      </Badge>
                    </div>
                    <Textarea
                      value={plan.description}
                      onChange={(e) => updatePlan(plan.id, 'description', e.target.value)}
                      placeholder="Description..."
                      className="min-h-[80px]"
                    />
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Status:</label>
                        <Select
                          value={plan.status}
                          onValueChange={(value) => updatePlan(plan.id, 'status', value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Due Date:</label>
                        <Input
                          type="date"
                          value={plan.dueDate || ''}
                          onChange={(e) => updatePlan(plan.id, 'dueDate', e.target.value)}
                          className="w-[160px]"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePlan(plan.id)}
                    className="ml-2"
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

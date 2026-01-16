import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical, Save } from 'lucide-react';
import { FooterNote } from '@/types/mpm';
import { mockFooterNotes } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface FooterNotesSectionProps {
  reportId: string;
}

export function FooterNotesSection({ reportId }: FooterNotesSectionProps) {
  const { toast } = useToast();
  const [notes, setNotes] = useState<FooterNote[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const reportNotes = mockFooterNotes
      .filter((n) => n.reportId === reportId)
      .sort((a, b) => a.orderIndex - b.orderIndex);
    setNotes(reportNotes);
  }, [reportId]);

  const addNote = () => {
    const newNote: FooterNote = {
      id: `temp-${Date.now()}`,
      reportId,
      annotation: '',
      orderIndex: notes.length + 1,
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id: string, annotation: string) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, annotation } : n)));
  };

  const removeNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
    toast({
      title: 'Saved',
      description: 'Footer notes have been updated.',
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Footer Note Annotations</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addNote}>
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notes.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No footer notes yet. Click "Add Note" to create one.
            </p>
          ) : (
            notes.map((note, index) => (
              <div key={note.id} className="flex items-center gap-3 group">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                <span className="text-sm font-medium text-muted-foreground w-6">
                  {index + 1}.
                </span>
                <Input
                  value={note.annotation}
                  onChange={(e) => updateNote(note.id, e.target.value)}
                  placeholder="Enter annotation text..."
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeNote(note.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Add footnotes and annotations that will appear at the bottom of the report.
        </p>
      </CardContent>
    </Card>
  );
}

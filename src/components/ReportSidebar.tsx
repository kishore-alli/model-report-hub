import { FileText, StickyNote, BarChart3, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionType } from '@/types/mpm';

interface ReportSidebarProps {
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
  disabled?: boolean;
}

const menuItems: { id: SectionType; label: string; icon: React.ElementType }[] = [
  { id: 'executive-summary', label: 'Executive Summary', icon: FileText },
  { id: 'footer-notes', label: 'Footer Note Annotations', icon: StickyNote },
  { id: 'analysis', label: 'Analysis', icon: BarChart3 },
  { id: 'action-plan', label: 'Action Plan', icon: ClipboardList },
];

export function ReportSidebar({ activeSection, onSectionChange, disabled }: ReportSidebarProps) {
  return (
    <aside className="w-64 bg-card border-r min-h-full">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-foreground">Report Sections</h2>
      </div>
      <nav className="p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              disabled={disabled}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
                isActive && 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
              )}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Input } from '@/components/ui/input';

interface SortableItemProps {
  id: string;
  value: string;
  editing: boolean;
  onEdit: (value: string) => void;
  onStartEdit: () => void;
}

export default function SortableItem({
  id,
  value,
  editing,
  onEdit,
  onStartEdit,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="border p-2 min-h-[60px]">
      {editing ? (
        <Input
          value={value}
          onChange={(e) => onEdit(e.target.value)}
          onBlur={() => onEdit(value)}
          autoFocus
        />
      ) : (
        <div onClick={onStartEdit}>{value}</div>
      )}
    </div>
  );
}
